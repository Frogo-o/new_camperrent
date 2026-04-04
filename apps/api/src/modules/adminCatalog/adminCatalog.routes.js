const { Router } = require("express");
const controller = require("./adminCatalog.controller");
const { requireAdmin } = require("../../middlewares/requireAdmin");

const router = Router();

router.get("/categories", requireAdmin, controller.getCategories);
router.post("/categories", requireAdmin, controller.createCategory);
router.patch("/categories/:slug", requireAdmin, controller.patchCategory);

router.get("/brands", requireAdmin, controller.getBrands);
router.post("/brands", requireAdmin, controller.createBrand);
router.patch("/brands/:slug", requireAdmin, controller.patchBrand);

router.get("/products", requireAdmin, controller.getProducts);

module.exports = router;
