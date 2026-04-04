const { prisma } = require("../../db/prisma");

async function resetFailedOrderEmails(orderId) {
    const maxAttempts = Number(process.env.ORDER_EMAIL_MAX_ATTEMPTS || "10");
    const id = Number(orderId);

    if (!Number.isInteger(id) || id < 1) {
        const err = new Error("Invalid orderId");
        err.statusCode = 400;
        throw err;
    }

    const updated = await prisma.orderEmail.updateMany({
        where: {
            orderId: id,
            status: "FAILED",
            attempts: { gte: maxAttempts },
        },
        data: {
            status: "PENDING",
            attempts: 0,
            lastError: null,
        },
    });

    return { reset: updated.count };
}

module.exports = { resetFailedOrderEmails };

