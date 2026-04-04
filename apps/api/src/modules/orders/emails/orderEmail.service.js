const { prisma } = require("../../../db/prisma");
const { sendMail } = require("../../../utils/mailer");

let running = false;

function getLockName() {
  const name = String(process.env.ORDER_EMAIL_WORKER_LOCK_KEY || "order_email_worker").trim();
  return name || "order_email_worker";
}

function getMaxAttempts() {
  const n = Number(process.env.ORDER_EMAIL_MAX_ATTEMPTS || "10");
  return Number.isInteger(n) && n >= 1 ? n : 10;
}

async function tryMysqlLock(lockName) {
  const rows = await prisma.$queryRaw`
    SELECT GET_LOCK(CAST(${lockName} AS CHAR), 0) AS locked
  `;
  const v = rows?.[0]?.locked;
  return v === 1 || v === "1";
}

async function releaseMysqlLock(lockName) {
  await prisma.$executeRaw`
    SELECT RELEASE_LOCK(CAST(${lockName} AS CHAR))
  `;
}

async function processPendingOrderEmails(batchSize = 10) {
  if (running) return;
  running = true;

  const lockName = getLockName();
  const maxAttempts = getMaxAttempts();

  let locked = false;

  const staleSec = Number(process.env.ORDER_EMAIL_SENDING_STALE_SEC || "120");
  const staleBefore = new Date(Date.now() - staleSec * 1000);

  try {
    await prisma.orderEmail.updateMany({
      where: { status: "SENDING", updatedAt: { lt: staleBefore } },
      data: {
        status: "FAILED",
        attempts: { increment: 1 },
        lastError: "Stale SENDING recovered by worker",
      },
    });

    locked = await tryMysqlLock(lockName);
    if (!locked) return;

    const candidates = await prisma.orderEmail.findMany({
      where: {
        status: { in: ["PENDING", "FAILED"] },
        attempts: { lt: maxAttempts },
      },
      orderBy: { createdAt: "asc" },
      take: batchSize,
      select: { id: true },
    });

    if (candidates.length === 0) return;

    const ids = candidates.map((c) => c.id);

    await prisma.orderEmail.updateMany({
      where: {
        id: { in: ids },
        status: { in: ["PENDING", "FAILED"] },
        attempts: { lt: maxAttempts },
      },
      data: { status: "SENDING" },
    });

    const sending = await prisma.orderEmail.findMany({
      where: { id: { in: ids }, status: "SENDING" },
      orderBy: { createdAt: "asc" },
      take: batchSize,
      select: {
        id: true,
        to: true,
        subject: true,
        html: true,
        attempts: true,
      },
    });

    for (const e of sending) {
      const html = String(e.html || "");
      if (!html.trim()) {
        await prisma.orderEmail.update({
          where: { id: e.id },
          data: {
            status: "FAILED",
            attempts: { increment: 1 },
            lastError: "Empty email html",
          },
        });
        continue;
      }

      try {
        const info = await sendMail({
          to: e.to,
          subject: e.subject,
          html,
        });

        await prisma.orderEmail.update({
          where: { id: e.id },
          data: {
            status: "SENT",
            sentAt: new Date(),
            lastError: null,
            providerMessageId: info?.messageId ? String(info.messageId) : null,
          },
        });
      } catch (err) {
        await prisma.orderEmail.update({
          where: { id: e.id },
          data: {
            status: "FAILED",
            attempts: { increment: 1 },
            lastError: String(err?.message || err),
          },
        });
      }
    }
  } finally {
    if (locked) {
      try {
        await releaseMysqlLock(lockName);
      } catch {}
    }
    running = false;
  }
}

module.exports = { processPendingOrderEmails };
