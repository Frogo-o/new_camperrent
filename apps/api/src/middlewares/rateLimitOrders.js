const rateLimit = require("express-rate-limit");

const windowMin = Number(process.env.ORDERS_RATE_LIMIT_WINDOW_MIN);
const maxReq = Number(process.env.ORDERS_RATE_LIMIT);

const rateLimitOrders = rateLimit({
    windowMs: windowMin * 60 * 1000,
    max: maxReq,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        error: "TOO_MANY_REQUESTS",
        message: "Too many order attempts. Please try again later.",
    },
});

module.exports = { rateLimitOrders };
