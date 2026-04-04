// apps/api/src/modules/adminProducts/adminProducts.routes.js
const { Router } = require("express");
const controller = require("./adminProducts.controller");
const { requireAdmin } = require("../../middlewares/requireAdmin");

const router = Router();

router.post("/", requireAdmin, controller.postProduct);
router.post("/:id/images", requireAdmin, controller.postProductImage);

router.put("/:id", requireAdmin, controller.putProduct);

module.exports = router;
