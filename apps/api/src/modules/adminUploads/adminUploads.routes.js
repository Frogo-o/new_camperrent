const { Router } = require("express");
const controller = require("./adminUploads.controller");
const { requireAdmin } = require("../../middlewares/requireAdmin");

const router = Router();

router.post("/", requireAdmin, controller.uploadSingle);

module.exports = router;
