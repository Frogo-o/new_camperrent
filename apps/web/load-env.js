const fs = require("fs");
const path = require("path");

function parseEnvFile(content) {
  const parsed = {};

  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;

    const exportPrefix = line.startsWith("export ") ? 7 : 0;
    const eqIndex = line.indexOf("=", exportPrefix);
    if (eqIndex === -1) continue;

    const key = line.slice(exportPrefix, eqIndex).trim();
    if (!key) continue;

    let value = line.slice(eqIndex + 1).trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    parsed[key] = value;
  }

  return parsed;
}

function applyEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return;

  const parsed = parseEnvFile(fs.readFileSync(filePath, "utf8"));
  for (const [key, value] of Object.entries(parsed)) {
    process.env[key] = value;
  }
}

function loadLocalEnv() {
  const root = __dirname;
  const nodeEnv = process.env.NODE_ENV || "development";
  const candidates = [
    ".env",
    `.env.${nodeEnv}`,
    ".env.local",
    `.env.${nodeEnv}.local`,
  ];

  for (const name of candidates) {
    applyEnvFile(path.join(root, name));
  }
}

loadLocalEnv();

