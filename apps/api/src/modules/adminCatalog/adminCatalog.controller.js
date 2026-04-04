const service = require("./adminCatalog.service");

async function getCategories(req, res, next) {
  try {
    const data = await service.listCategoriesAdmin(req.query);
    res.json({ data });
  } catch (err) {
    next(err);
  }
}

async function getBrands(req, res, next) {
  try {
    const data = await service.listBrandsAdmin(req.query);
    res.json({ data });
  } catch (err) {
    next(err);
  }
}

async function createCategory(req, res, next) {
  try {
    const data = await service.createCategoryAdmin(req.body);
    res.status(201).json({ data });
  } catch (err) {
    next(err);
  }
}

async function createBrand(req, res, next) {
  try {
    const data = await service.createBrandAdmin(req.body);
    res.status(201).json({ data });
  } catch (err) {
    next(err);
  }
}

/* =========================
   PATCH (ALL-IN-ONE)
========================= */

async function patchCategory(req, res, next) {
  try {
    const data = await service.patchCategoryBySlugAdmin(
      req.params.slug,
      req.body
    );
    res.json({ data });
  } catch (err) {
    next(err);
  }
}

async function patchBrand(req, res, next) {
  try {
    const data = await service.patchBrandBySlugAdmin(
      req.params.slug,
      req.body
    );
    res.json({ data });
  } catch (err) {
    next(err);
  }
}

async function getProducts(req, res, next) {
  try {
    const result = await service.listProductsAdmin(req.query);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getCategories,
  getBrands,
  createCategory,
  createBrand,
  patchCategory,
  patchBrand,
  getProducts,
};
