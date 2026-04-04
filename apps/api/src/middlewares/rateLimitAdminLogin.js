const rateLimit = require("express-rate-limit");

const rateLimitAdminLogin = rateLimit({
    windowMs: process.env.ADMIN_LOGIN_RATE_LIMIT_WINDOW_MIN * 60 * 1000, // 5 минути
    max: process.env.ADMIN_LOGIN_RATE_LIMIT, // 5 опита
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        error: "TOO_MANY_REQUESTS",
        message: "Too many login attempts. Try again later.",
    },
});

module.exports = { rateLimitAdminLogin };
