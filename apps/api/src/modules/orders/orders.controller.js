const service = require("./orders.service");

async function postOrder(req, res, next) {
  try {
    const result = await service.createOrder(req.body);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
}

module.exports = { postOrder };
