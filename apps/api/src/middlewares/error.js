const { httpError } = require("../utils/httpError");

function errorHandler(err, req, res, next) {
  const status = err?.status || 500;

  const payload = {
    error: {
      status,
      message: err?.message || "Internal server error",
      code: err?.code,
    },
  };

  // DEV: покажи детайли (Prisma / stack)
  if (process.env.NODE_ENV !== "production") {
    payload.error.details = err?.details || err?.meta || null;
    payload.error.stack = err?.stack || null;
  }

  // Лог винаги (минимален)
  console.error("[ERROR]", {
    status,
    message: err?.message,
    code: err?.code,
    details: err?.details || err?.meta,
  });

  res.status(status).json(payload);
}

module.exports = { errorHandler };
