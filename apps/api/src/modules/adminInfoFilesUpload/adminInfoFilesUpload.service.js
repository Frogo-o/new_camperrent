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

function getInfoFilesPublicPath() {
  const p = String(process.env.INFO_FILES_PUBLIC_PATH || "/info-files").trim();
  return p.startsWith("/") ? p : `/${p}`;
}

function getMaxBytes() {
  const n = Number(process.env.INFO_FILES_MAX_BYTES || "20000000");
  if (!Number.isInteger(n) || n < 1024 || n > 200_000_000) {
    throw new Error("Missing/invalid ENV: INFO_FILES_MAX_BYTES");
  }
  return n;
}

function getAllowedMime() {
  const raw = String(
    process.env.INFO_FILES_ALLOWED_MIME ||
      "application/pdf,application/zip,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain,image/jpeg,image/png,image/webp"
  );
  return new Set(raw.split(",").map((s) => s.trim()).filter(Boolean));
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    if (process.env.NODE_ENV !== "production") {
      fs.mkdirSync(dir, { recursive: true });
    } else {
      throw new Error(`INFO_FILES_DIR does not exist: ${dir}`);
    }
  }

  try {
    fs.accessSync(dir, fs.constants.W_OK);
  } catch {
    throw new Error(`INFO_FILES_DIR is not writable: ${dir}`);
  }
}

function parseBoolQuery(v) {
  if (v === undefined) return false;
  if (v === true) return true;
  const s = String(v).trim().toLowerCase();
  return s === "true" || s === "1" || s === "yes";
}

function buildFileDto(file) {
  const url = `${getPublicBaseUrl()}${getInfoFilesPublicPath()}/${encodeURIComponent(file.filename)}`;
  return {
    filename: file.filename,
    originalname: file.originalname,
    size: file.size,
    mimetype: file.mimetype,
    url,
  };
}

let uploader = null;

function getUploader() {
  if (uploader) return uploader;

  const dir = getRequiredEnv("INFO_FILES_DIR");
  ensureDir(dir);

  const maxBytes = getMaxBytes();
  const allowed = getAllowedMime();

  const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, dir),
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname || "").toLowerCase();
      const safeExt = ext && ext.length <= 12 ? ext : ".bin";
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
        console.log("[MULTER ERROR]", { code: err.code, field: err.field, message: err.message });

        if (err.code === "LIMIT_FILE_SIZE") {
          return reject(httpError(400, "BAD_REQUEST", "File too large"));
        }

        return reject(
          httpError(400, "BAD_REQUEST", "Upload error", {
            code: err.code,
            field: err.field,
            message: err.message,
          })
        );
      }

      return reject(err);
    });
  });
}

async function uploadSingleOrMultipleInfoFiles(req, res) {
  const multiple = parseBoolQuery(req.query?.multipleUploads);
  const up = getUploader();

  if (!multiple) {
    await runMulter(
      req,
      res,
      up.fields([
        { name: "file", maxCount: 1 },
        { name: "files", maxCount: 1 },
      ])
    );

    const oneA = Array.isArray(req.files?.file) ? req.files.file[0] : null;
    const oneB = Array.isArray(req.files?.files) ? req.files.files[0] : null;
    const one = oneA || oneB;

    if (!one) {
      throw httpError(400, "BAD_REQUEST", "Missing file", [
        "file (or files) field is required (multipart/form-data)",
      ]);
    }

    return { data: buildFileDto(one) };
  }

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

module.exports = { uploadSingleOrMultipleInfoFiles };
