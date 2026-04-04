const { Router } = require("express");
const controller = require("./adminRequests.controller");

const router = Router();

router.get("/", controller.list);
router.get("/:id", controller.getById);
router.patch("/:id/status", controller.updateStatus);

module.exports = router;
