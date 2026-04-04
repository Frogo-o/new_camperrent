const multer = require("multer");
const path = require("path");
const crypto = require("crypto");
const fs = require("fs");
const { httpError } = require("../../utils/httpError");

function getRequiredEnv(name) {
  const v = process.env[name];
  if (!v || !String(v).trim()) throw new Error(`Missing ENV: ${name}`);
  return String(v).trim();
}

function getPublicBaseUrl() {
  const v = getRequiredEnv("PUBLIC_BASE_URL");
  return v.replace(/\/+$/, "");
}

function getUploadsPublicPath() {
  const p = String(process.env.UPLOADS_PUBLIC_PATH || "/uploads").trim();
  return p.startsWith("/") ? p : `/${p}`;
}

function getMaxBytes() {
  const n = Number(process.env.UPLOAD_MAX_BYTES || "5000000");
  if (!Number.isInteger(n) || n < 1024 || n > 50_000_000) {
    throw new Error("Missing/invalid ENV: UPLOAD_MAX_BYTES");
  }
  return n;
}

function getAllowedMime() {
  const raw = String(process.env.UPLOAD_ALLOWED_MIME || "image/jpeg,image/png,image/webp");
  return new Set(raw.split(",").map((s) => s.trim()).filter(Boolean));
}

function ensureUploadsDir(dir) {
  if (!fs.existsSync(dir)) {
    if (process.env.NODE_ENV !== "production") {
      fs.mkdirSync(dir, { recursive: true });
    } else {
      throw new Error(`UPLOADS_DIR does not exist: ${dir}`);
    }
  }

  try {
    fs.accessSync(dir, fs.constants.W_OK);
  } catch {
    throw new Error(`UPLOADS_DIR is not writable: ${dir}`);
  }
}

function parseBoolQuery(v) {
  if (v === undefined) return false;
  if (v === true) return true;
  const s = String(v).trim().toLowerCase();
  return s === "true" || s === "1" || s === "yes";
}

function buildFileDto(file) {
  const url = `${getPublicBaseUrl()}${getUploadsPublicPath()}/${encodeURIComponent(file.filename)}`;
  return {
    filename: file.filename,
    size: file.size,
    mimetype: file.mimetype,
    url,
  };
}

// правим мултер инстанцията 1 път
let uploader = null;

function getUploader() {
  if (uploader) return uploader;

  const uploadsDir = getRequiredEnv("UPLOADS_DIR");
  ensureUploadsDir(uploadsDir);

  const maxBytes = getMaxBytes();
  const allowed = getAllowedMime();

  const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadsDir),
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname || "").toLowerCase();
      const safeExt = [".jpg", ".jpeg", ".png", ".webp"].includes(ext) ? ext : ".bin";
      const name = `${Date.now()}-${crypto.randomBytes(10).toString("hex")}${safeExt}`;
      cb(null, name);
    },
  });

  uploader = multer({
    storage,
    limits: { fileSize: maxBytes },
    fileFilter: (req, file, cb) => {
      if (!allowed.has(file.mimetype)) {
        return cb(httpError(400, "BAD_REQUEST", "Invalid file type", { mimetype: file.mimetype }));
      }
      cb(null, true);
    },
  });

  return uploader;
}

function runMulter(req, res, mw) {
  return new Promise((resolve, reject) => {
    mw(req, res, (err) => {
      if (!err) return resolve();

      if (err instanceof multer.MulterError) {
        if (err.code === "LIMIT_FILE_SIZE") return reject(httpError(400, "BAD_REQUEST", "File too large"));
        return reject(httpError(400, "BAD_REQUEST", "Upload error", { code: err.code }));
      }

      return reject(err);
    });
  });
}

async function uploadSingleOrMultiple(req, res) {
  const multiple = parseBoolQuery(req.query?.multipleUploads);

  const up = getUploader();

  // single (old behavior)
  if (!multiple) {
    await runMulter(req, res, up.single("file"));

    if (!req.file) {
      throw httpError(400, "BAD_REQUEST", "Missing file", ["file field is required (multipart/form-data)"]);
    }

    return { data: buildFileDto(req.file) };
  }

  // multiple behavior
  // приемаме или files[], или file[] (за да не се караме с фронтенда)
  await runMulter(
    req,
    res,
    up.fields([
      { name: "files", maxCount: 20 },
      { name: "file", maxCount: 20 },
    ])
  );

  const listA = Array.isArray(req.files?.files) ? req.files.files : [];
  const listB = Array.isArray(req.files?.file) ? req.files.file : [];
  const files = listA.length ? listA : listB;

  if (!files.length) {
    throw httpError(400, "BAD_REQUEST", "Missing files", [
      "files field is required (multipart/form-data) when multipleUploads=true",
    ]);
  }

  return { data: files.map(buildFileDto) };
}

module.exports = { uploadSingleOrMultiple };
