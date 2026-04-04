const jwt = require("jsonwebtoken");
const { httpError } = require("../utils/httpError");

function getCookie(req, name) {
    const header = req.headers.cookie;
    if (!header) return null;

    for (const part of header.split(";")) {
        const [k, v] = part.trim().split("=");
        if (k === name) return decodeURIComponent(v);
    }
    return null;
}

function requireAdmin(req, res, next) {
    const cookieName = process.env.ADMIN_COOKIE_NAME || "admin_token";
    const token = getCookie(req, cookieName);

    if (!token) {
        return next(httpError(401, "UNAUTHORIZED", "Admin login required"));
    }

    try {
        const payload = jwt.verify(token, process.env.ADMIN_JWT_SECRET);
        req.admin = { user: payload.sub };
        next();
    } catch {
        return next(httpError(401, "UNAUTHORIZED", "Admin login required"));
    }
}

module.exports = { requireAdmin };
