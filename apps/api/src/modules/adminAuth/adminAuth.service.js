const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { httpError } = require("../../utils/httpError");

const ADMIN_USERS_FALLBACK = [
  {
    user: "admin1",
    hash: "$2b$12$It/pX4NCzQRwLZv5QTipQuRpMgRR0chb8rfFv23AnMUXLeXOSfjqm",
  },
  {
    user: "admin2",
    hash: "$2b$12$ffJIuw.3tSBJfU33/GmjGeHjEayhec9SEZlIZ8RgUZErcp1lta5lC",
  },
];

function parseAdmins() {
  const raw = process.env.ADMIN_USERS;
  if (!raw) return ADMIN_USERS_FALLBACK;

  const parsed = raw
    .split(",")
    .map((x) => {
      const idx = x.indexOf(":");
      if (idx === -1) return null;
      const user = x.slice(0, idx).trim();
      const hash = x.slice(idx + 1).trim();
      if (!user || !hash) return null;
      return { user, hash };
    })
    .filter(Boolean);

  return parsed.length ? parsed : ADMIN_USERS_FALLBACK;
}

function setCookie(res, name, value, days) {
  const maxAge = days * 24 * 60 * 60;
  const parts = [
    `${name}=${encodeURIComponent(value)}`,
    `Max-Age=${maxAge}`,
    "Path=/",
    "HttpOnly",
    "SameSite=Lax",
  ];
  if (process.env.NODE_ENV === "production") parts.push("Secure");
  res.setHeader("Set-Cookie", parts.join("; "));
}

async function login({ username, password }, res) {
  // normalize
  username = typeof username === "string" ? username.trim() : "";
  password = typeof password === "string" ? password : "";

  console.log("[ADMIN LOGIN] input =", { username, passwordLen: password.length });

  if (!username || !password) {
    throw httpError(400, "BAD_REQUEST", "Missing credentials");
  }

  const admins = parseAdmins();
  console.log(
    "[ADMIN LOGIN] admins =",
    admins.map(a => ({ user: a.user, hashPrefix: a.hash?.slice(0, 7) }))
  );

  const admin = admins.find(a => a.user === username);
  console.log(
    "[ADMIN LOGIN] found =",
    admin ? { user: admin.user, hashPrefix: admin.hash.slice(0, 7) } : null
  );

  if (!admin) {
    throw httpError(401, "UNAUTHORIZED", "Invalid credentials");
  }

  const ok = await bcrypt.compare(password, admin.hash);
  console.log("[ADMIN LOGIN] bcrypt.compare =", ok);

  if (!ok) {
    throw httpError(401, "UNAUTHORIZED", "Invalid credentials");
  }

  const days = Number(process.env.ADMIN_JWT_TTL_DAYS || 30);
  const token = jwt.sign({}, process.env.ADMIN_JWT_SECRET, {
    subject: username,
    expiresIn: `${days}d`,
  });

  setCookie(
    res,
    process.env.ADMIN_COOKIE_NAME || "admin_token",
    token,
    days
  );

  return { ok: true };
}


function logout(res) {
  res.setHeader(
    "Set-Cookie",
    `${process.env.ADMIN_COOKIE_NAME || "admin_token"}=; Max-Age=0; Path=/; HttpOnly; SameSite=Lax`
  );
  return { ok: true };
}

module.exports = { login, logout };
