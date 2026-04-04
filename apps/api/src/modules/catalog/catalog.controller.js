const service = require("./catalog.service");

async function getCategories(req, res, next) {
  try {
    const data = await service.listCategories();
    res.json({ data });
  } catch (err) {
    next(err);
  }
}

async function getBrands(req, res, next) {
  try {
    const data = await service.getBrands();
    res.json({ data });
  } catch (err) {
    next(err);
  }
}

async function getProducts(req, res, next) {
  try {
    const result = await service.listProducts(req.query);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

async function getProductBySlug(req, res, next) {
  try {
    const product = await service.getProductBySlug(req.params.slug);
    if (!product) {
      return res.status(404).json({ error: { message: "Product not found" } });
    }
    res.json({ data: product });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getCategories,
  getBrands,
  getProducts,
  getProductBySlug,
};
