const { Router } = require("express");
const controller = require("./catalog.controller");

const router = Router();

router.get("/categories", controller.getCategories);
router.get("/brands", controller.getBrands);
router.get("/products", controller.getProducts);
router.get("/products/:slug", controller.getProductBySlug);

module.exports = router;
