const { Router } = require("express");
const c = require("./adminAuth.controller");
const { rateLimitAdminLogin } = require("../../middlewares/rateLimitAdminLogin");

const router = Router();

router.post("/login", rateLimitAdminLogin, c.postLogin);
router.post("/logout", c.postLogout);

module.exports = router;
