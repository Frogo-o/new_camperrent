const service = require("./adminOrders.service");

async function getOrders(req, res, next) {
  try {
    const result = await service.listOrders(req.query);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

async function getOrder(req, res, next) {
  try {
    const result = await service.getOrderById(req.params.id);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

async function resetFailedEmails(req, res, next) {
  try {
    const { orderId } = req.params;
    const result = await service.resetFailedOrderEmails(orderId);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

async function resetAllFailedEmails(req, res, next) {
  try {
    const result = await service.resetAllFailedEmails();
    res.json(result);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getOrders,
  getOrder,
  resetFailedEmails,
  resetAllFailedEmails,
};
