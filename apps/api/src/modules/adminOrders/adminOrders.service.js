const { prisma } = require("../../db/prisma");
const { httpError } = require("../../utils/httpError");

const MISSING_ARTICLE_NUMBER_TEXT = "липсва артикулен номер";

function badRequest(message, details) {
  return httpError(400, "BAD_REQUEST", message, details);
}

function parseIntParam(v, name, { min = 1, max = 100000 } = {}) {
  if (v === undefined) return undefined;
  const n = Number(v);
  if (!Number.isInteger(n) || n < min || n > max) {
    throw badRequest(`Invalid ${name}`, [`${name} must be integer in [${min}, ${max}]`]);
  }
  return n;
}

function parseEnumParam(v, name, allowed) {
  if (v === undefined) return undefined;
  if (!allowed.includes(v)) {
    throw badRequest(`Invalid ${name}`, [`${name} must be one of: ${allowed.join(", ")}`]);
  }
  return v;
}

function buildWhere({ q, emailStatus, emailKind }) {
  const where = {};

  if (q && String(q).trim()) {
    const term = String(q).trim();
    where.OR = [
      { customerName: { contains: term } },
      { email: { contains: term } },
      { phone: { contains: term } },
    ];
  }

  if (emailStatus) {
    where.emails = {
      some: {
        status: emailStatus,
        ...(emailKind ? { kind: emailKind } : {}),
      },
    };
  }

  return where;
}

function mapEmailSummary(emails) {
  const admin = emails.find((e) => e.kind === "ADMIN") || null;
  const customer = emails.find((e) => e.kind === "CUSTOMER") || null;

  const shape = (e) =>
    e
      ? {
          status: e.status,
          attempts: e.attempts,
          lastError: e.lastError,
          sentAt: e.sentAt,
          updatedAt: e.updatedAt,
          to: e.to,
          subject: e.subject,
        }
      : null;

  return { admin: shape(admin), customer: shape(customer) };
}

function getMaxAttempts() {
  const n = Number(process.env.ORDER_EMAIL_MAX_ATTEMPTS || "10");
  if (!Number.isInteger(n) || n < 1) {
    throw new Error("Missing/invalid ENV: ORDER_EMAIL_MAX_ATTEMPTS");
  }
  return n;
}

function getResetLimit() {
  const n = Number(process.env.ADMIN_RESET_FAILED_EMAILS_LIMIT || "200");
  if (!Number.isInteger(n) || n < 1 || n > 5000) {
    throw new Error("Missing/invalid ENV: ADMIN_RESET_FAILED_EMAILS_LIMIT");
  }
  return n;
}

async function listOrders(rawQuery) {
  const page = parseIntParam(rawQuery.page ?? "1", "page") ?? 1;
  const limit = parseIntParam(rawQuery.limit ?? "20", "limit", { min: 1, max: 100 }) ?? 20;

  const q = rawQuery.q;
  const emailStatus = parseEnumParam(rawQuery.emailStatus, "emailStatus", ["PENDING", "SENT", "FAILED"]);
  const emailKind = parseEnumParam(rawQuery.emailKind, "emailKind", ["ADMIN", "CUSTOMER"]);

  const where = buildWhere({ q, emailStatus, emailKind });

  const [total, rows] = await prisma.$transaction([
    prisma.order.count({ where }),
    prisma.order.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
      select: {
        id: true,
        customerName: true,
        email: true,
        phone: true,
        deliveryMethod: true,
        status: true,
        subtotal: true,
        deliveryFee: true,
        total: true,
        createdAt: true,
        emails: {
          select: {
            kind: true,
            status: true,
            attempts: true,
            lastError: true,
            sentAt: true,
            updatedAt: true,
            to: true,
            subject: true,
          },
        },
      },
    }),
  ]);

  return {
    data: rows.map((o) => ({
      id: o.id,
      customerName: o.customerName,
      email: o.email,
      phone: o.phone,
      deliveryMethod: o.deliveryMethod,
      status: o.status,
      subtotal: o.subtotal,
      deliveryFee: o.deliveryFee,
      total: o.total,
      createdAt: o.createdAt,
      emailSummary: mapEmailSummary(o.emails),
    })),
    meta: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  };
}

async function getOrderById(idRaw) {
  const id = Number(idRaw);
  if (!Number.isInteger(id) || id < 1) {
    throw badRequest("Invalid id", ["id must be integer >= 1"]);
  }

  const order = await prisma.order.findUnique({
    where: { id },
    select: {
      id: true,
      customerName: true,
      email: true,
      phone: true,
      address: true,
      deliveryMethod: true,
      note: true,
      status: true,
      subtotal: true,
      deliveryFee: true,
      total: true,
      createdAt: true,
      items: {
        select: {
          qty: true,
          unitPrice: true,
          lineTotal: true,
          product: { select: { id: true, name: true, slug: true, articleNumber: true } },
        },
      },
      emails: {
        select: {
          id: true,
          kind: true,
          to: true,
          subject: true,
          status: true,
          attempts: true,
          lastError: true,
          sentAt: true,
          createdAt: true,
          updatedAt: true,
        },
      },
    },
  });

  if (!order) throw httpError(404, "NOT_FOUND", "Order not found");

  return {
    data: {
      ...order,
      items: order.items.map((it) => ({
        ...it,
        product: it.product
          ? {
              ...it.product,
              articleNumber: it.product.articleNumber ?? MISSING_ARTICLE_NUMBER_TEXT,
            }
          : it.product,
      })),
      emailSummary: mapEmailSummary(order.emails),
    },
  };
}

// Reset FAILED emails for ONE order (only those that reached maxAttempts)
async function resetFailedOrderEmails(orderIdRaw) {
  const id = Number(orderIdRaw);
  if (!Number.isInteger(id) || id < 1) {
    throw badRequest("Invalid orderId", ["orderId must be integer >= 1"]);
  }

  const maxAttempts = getMaxAttempts();

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

// Reset ALL FAILED emails (only those that reached maxAttempts) with a safety limit
async function resetAllFailedEmails() {
  const maxAttempts = getMaxAttempts();
  const limit = getResetLimit();

  const ids = await prisma.orderEmail.findMany({
    where: {
      status: "FAILED",
      attempts: { gte: maxAttempts },
    },
    orderBy: { updatedAt: "asc" },
    take: limit,
    select: { id: true },
  });

  if (ids.length === 0) return { reset: 0, limited: false };

  const updated = await prisma.orderEmail.updateMany({
    where: { id: { in: ids.map((x) => x.id) } },
    data: {
      status: "PENDING",
      attempts: 0,
      lastError: null,
    },
  });

  return { reset: updated.count, limited: ids.length === limit };
}

module.exports = {
  listOrders,
  getOrderById,
  resetFailedOrderEmails,
  resetAllFailedEmails,
};
