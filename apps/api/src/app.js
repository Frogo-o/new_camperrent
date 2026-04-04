const express = require("express");
const cors = require("cors");
const path = require("path");

const routes = require("./routes");
const { notFound } = require("./middlewares/notFound");
const { errorHandler } = require("./middlewares/error");

const app = express();

app.set("trust proxy", 1);
app.use(express.json({ limit: "1mb" }));

app.use(
  cors({
    origin: process.env.WEB_ORIGIN || "http://localhost:3000",
    credentials: true,
  })
);

const uploadsDir = process.env.UPLOADS_DIR;
if (!uploadsDir) {
  throw new Error("Missing ENV: UPLOADS_DIR");
}

app.use(
  "/api/uploads",
  express.static(path.resolve(uploadsDir), {
    maxAge: "7d",
    immutable: true,
    fallthrough: false,
  })
);

const uploadsPublicPathRaw = String(process.env.UPLOADS_PUBLIC_PATH || "/uploads").trim();
const uploadsPublicPath = uploadsPublicPathRaw.startsWith("/") ? uploadsPublicPathRaw : `/${uploadsPublicPathRaw}`;
app.use(
  uploadsPublicPath,
  express.static(path.resolve(uploadsDir), {
    maxAge: "7d",
    immutable: true,
    fallthrough: false,
  })
);

const infoFilesDir = process.env.INFO_FILES_DIR ? String(process.env.INFO_FILES_DIR).trim() : "";
if (infoFilesDir) {
  app.use(
    "/api/info-files",
    express.static(path.resolve(infoFilesDir), {
      maxAge: "7d",
      immutable: true,
      fallthrough: false,
    })
  );

  const infoFilesPublicPathRaw = String(process.env.INFO_FILES_PUBLIC_PATH || "/info-files").trim();
  const infoFilesPublicPath = infoFilesPublicPathRaw.startsWith("/") ? infoFilesPublicPathRaw : `/${infoFilesPublicPathRaw}`;
  app.use(
    infoFilesPublicPath,
    express.static(path.resolve(infoFilesDir), {
      maxAge: "7d",
      immutable: true,
      fallthrough: false,
    })
  );
}

const publicDir = process.env.PUBLIC_DIR;
if (!publicDir) {
  throw new Error("Missing ENV: PUBLIC_DIR");
}

const publicPathRaw = String(process.env.PUBLIC_PATH || "/public").trim();
const publicPath = publicPathRaw.startsWith("/") ? publicPathRaw : `/${publicPathRaw}`;
app.use(
  publicPath,
  express.static(path.resolve(publicDir), {
    maxAge: "30d",
    immutable: true,
    fallthrough: false,
  })
);

app.use("/api", routes);
app.get("/health", (req, res) => res.json({ ok: true }));
app.use(notFound);
app.use(errorHandler);

module.exports = app;
