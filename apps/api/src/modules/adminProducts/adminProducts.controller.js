// apps/api/src/modules/adminProducts/adminProducts.controller.js
const service = require("./adminProducts.service");

async function postProduct(req, res, next) {
    try {
        const result = await service.createProduct(req.body);
        res.status(201).json(result);
    } catch (e) {
        next(e);
    }
}

async function postProductImage(req, res, next) {
    try {
        const result = await service.addProductImage(req.params.id, req.body);
        res.status(201).json(result);
    } catch (e) {
        next(e);
    }
}

async function putProduct(req, res, next) {
    try {
        const result = await service.updateProduct(req.params.id, req.body);
        res.status(200).json(result);
    } catch (e) {
        next(e);
    }
}

module.exports = { postProduct, postProductImage, putProduct };
