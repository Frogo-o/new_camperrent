const fs = require("fs");
const path = require("path");

const root = __dirname;
const standaloneDir = path.join(root, ".next", "standalone");
const standaloneNextDir = path.join(standaloneDir, ".next");
const rootStaticDir = path.join(root, ".next", "static");
const standaloneStaticDir = path.join(standaloneNextDir, "static");
const rootPublicDir = path.join(root, "public");
const standalonePublicDir = path.join(standaloneDir, "public");

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function copyDirIfExists(source, destination) {
  if (!fs.existsSync(source)) return;
  ensureDir(path.dirname(destination));
  fs.rmSync(destination, { recursive: true, force: true });
  fs.cpSync(source, destination, { recursive: true });
}

if (!fs.existsSync(standaloneDir)) {
  throw new Error("Missing .next/standalone. Run the Next.js build first.");
}

ensureDir(standaloneNextDir);
copyDirIfExists(rootStaticDir, standaloneStaticDir);
copyDirIfExists(rootPublicDir, standalonePublicDir);

console.log("Standalone assets synced.");

