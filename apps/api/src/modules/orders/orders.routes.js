const { Router } = require("express");
const controller = require("./orders.controller");
const { rateLimitOrders } = require("../../middlewares/rateLimitOrders");

const router = Router();

router.post("/", rateLimitOrders, controller.postOrder);

module.exports = router;
