const { Router } = require("express");
const controller = require("./adminOrders.controller");

const router = Router();

router.get("/", controller.getOrders);
router.get("/:id", controller.getOrder);

// reset failed emails for one order
router.post("/:orderId/reset-failed-emails", controller.resetFailedEmails);

// reset all failed emails (safety-limited)
router.post("/emails/reset-failed", controller.resetAllFailedEmails);

module.exports = router;
