function requireNumber(name) {
  const v = process.env[name];
  if (v === undefined || v === null || isNaN(v) || v.trim() === "") {
    throw new Error(`Missing ENV: ${name}`);
  }

  const n = Number(v);
  if (Number.isNaN(n)) {
    throw new Error(`ENV ${name} must be a number`);
  }

  return n;
}

function requireString(name) {
  const v = process.env[name];
  if (typeof v !== "string" || v.trim() === "") {
    throw new Error(`Missing ENV: ${name}`);
  }

  return v;
}

function validateEnv() {
  // Orders / business logic
  requireNumber("ORDERS_MAX_ITEMS");
  requireNumber("ORDERS_MAX_QTY_PER_ITEM");
  requireNumber("ORDERS_RATE_LIMIT");
  requireNumber("ORDERS_RATE_LIMIT_WINDOW_MIN");
  requireNumber("ORDER_EMAIL_MAX_ATTEMPTS");

  // Email (SMTP)
  requireString("SMTP_HOST");
  requireNumber("SMTP_PORT");
  requireString("SMTP_USER");
  requireString("SMTP_PASS");
  requireString("ORDERS_EMAIL_FROM");
  requireString("ORDERS_EMAIL_TO");
  requireNumber("ADMIN_LOGIN_RATE_LIMIT");
  requireNumber("ADMIN_LOGIN_RATE_LIMIT_WINDOW_MIN");
}

module.exports = { validateEnv };
