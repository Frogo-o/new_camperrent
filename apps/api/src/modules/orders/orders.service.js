// apps/api/src/modules/orders/orders.service.js
const { prisma } = require("../../db/prisma");
const { httpError } = require("../../utils/httpError");
const { orderEmailAdmin, subjectForKind } = require("./emails/orderEmailAdmin");
const { orderEmailCustomer, subjectForCustomerKind } = require("./emails/orderEmailCustomer");

const MISSING_ARTICLE_NUMBER_TEXT = "липсва артикулен номер";

function isNonEmptyString(v) {
  return typeof v === "string" && v.trim().length > 0;
}

function badRequest(message, details) {
  return httpError(400, "BAD_REQUEST", message, details);
}

function getRequiredNumberEnv(name) {
  const v = process.env[name];
  const n = Number(v);
  if (v === undefined || Number.isNaN(n)) {
    throw new Error(`Missing/invalid ENV: ${name}`);
  }
  return n;
}

function parseOptionalDate(v, fieldName, details) {
  if (v === undefined || v === null || v === "") return null;
  if (typeof v !== "string") {
    details.push(`${fieldName} must be an ISO date string`);
    return null;
  }
  const d = new Date(v);
  if (Number.isNaN(d.getTime())) {
    details.push(`${fieldName} must be a valid ISO date`);
    return null;
  }
  return d;
}

function parseOptionalInt(v, fieldName, details, { min = null, max = null } = {}) {
  if (v === undefined || v === null || v === "") return null;

  const n = typeof v === "number" ? v : Number(v);
  if (!Number.isFinite(n) || !Number.isInteger(n)) {
    details.push(`${fieldName} must be an integer`);
    return null;
  }
  if (min !== null && n < min) details.push(`${fieldName} must be >= ${min}`);
  if (max !== null && n > max) details.push(`${fieldName} must be <= ${max}`);
  return n;
}

function normalizeItems(items, maxItems, maxQtyPerItem) {
  if (!Array.isArray(items) || items.length === 0) {
    return { ok: false, details: ["items must be a non-empty array"] };
  }

  if (items.length > maxItems) {
    return { ok: false, details: [`items length must be <= ${maxItems}`] };
  }

  const map = new Map();
  const details = [];

  for (let i = 0; i < items.length; i++) {
    const it = items[i];

    if (!it || typeof it !== "object") {
      details.push(`items[${i}] must be an object`);
      continue;
    }

    const { productId, qty } = it;

    if (!Number.isInteger(productId) || productId < 1) {
      details.push(`items[${i}].productId must be integer >= 1`);
    }

    if (!Number.isInteger(qty)) {
      details.push(`items[${i}].qty must be integer`);
    } else {
      if (qty < 1) details.push(`items[${i}].qty must be >= 1`);
      if (qty > maxQtyPerItem) details.push(`items[${i}].qty must be <= ${maxQtyPerItem}`);
    }

    if (details.length) continue;

    const nextQty = (map.get(productId) || 0) + qty;
    if (nextQty > maxQtyPerItem) {
      details.push(`total qty for productId ${productId} must be <= ${maxQtyPerItem}`);
      continue;
    }

    map.set(productId, nextQty);
  }

  if (details.length) return { ok: false, details };

  const normalized = [...map.entries()].map(([productId, qty]) => ({ productId, qty }));
  return { ok: true, items: normalized };
}

function validateCreateOrderBody(rawBody) {
  const details = [];

  if (!rawBody || typeof rawBody !== "object") details.push("body must be an object");

  if (!isNonEmptyString(rawBody?.customerName)) details.push("customerName is required");
  if (!isNonEmptyString(rawBody?.email)) details.push("email is required");
  if (!isNonEmptyString(rawBody?.phone)) details.push("phone is required");
  if (!isNonEmptyString(rawBody?.address)) details.push("address is required");

  const deliveryMethod = rawBody?.deliveryMethod;
  if (deliveryMethod !== "COURIER" && deliveryMethod !== "PICKUP") {
    details.push("deliveryMethod must be COURIER or PICKUP");
  }

  if (rawBody?.note !== undefined && rawBody?.note !== null && typeof rawBody.note !== "string") {
    details.push("note must be a string");
  }

  const rentalFrom = parseOptionalDate(rawBody?.rentalFrom, "rentalFrom", details);
  const rentalTo = parseOptionalDate(rawBody?.rentalTo, "rentalTo", details);

  if (rentalFrom && rentalTo && rentalTo.getTime() < rentalFrom.getTime()) {
    details.push("rentalTo must be after rentalFrom");
  }

  const expectedMileageKm = parseOptionalInt(rawBody?.expectedMileageKm, "expectedMileageKm", details, { min: 0 });

  if (rawBody?.rentalPlace !== undefined && rawBody?.rentalPlace !== null && typeof rawBody.rentalPlace !== "string") {
    details.push("rentalPlace must be a string");
  }

  for (const key of ["country", "city", "postalCode", "street", "visitCountries"]) {
    const v = rawBody?.[key];
    if (v !== undefined && v !== null && typeof v !== "string") details.push(`${key} must be a string`);
  }

  if (rawBody?.rentalAccessories !== undefined && rawBody?.rentalAccessories !== null && typeof rawBody.rentalAccessories !== "string") {
    details.push("rentalAccessories must be a string");
  }

  if (details.length) throw badRequest("Invalid order payload", details);

  return {
    customerName: rawBody.customerName.trim(),
    email: rawBody.email.trim(),
    phone: rawBody.phone.trim(),
    address: rawBody.address.trim(),
    deliveryMethod: rawBody.deliveryMethod,
    note: rawBody.note ? rawBody.note.trim() : null,
    items: rawBody.items,

    rentalPlace: rawBody.rentalPlace ? String(rawBody.rentalPlace).trim() : null,
    rentalFrom,
    rentalTo,

    country: rawBody.country ? String(rawBody.country).trim() : null,
    city: rawBody.city ? String(rawBody.city).trim() : null,
    postalCode: rawBody.postalCode ? String(rawBody.postalCode).trim() : null,
    street: rawBody.street ? String(rawBody.street).trim() : null,

    expectedMileageKm,
    visitCountries: rawBody.visitCountries ? String(rawBody.visitCountries).trim() : null,

    rentalAccessories: rawBody.rentalAccessories ? String(rawBody.rentalAccessories).trim() : null,
  };
}

function inferKindFromCategorySlugs(slugs) {
  if (slugs.has("camper-rent")) return "RENT";
  if (slugs.has("buy-camper")) return "BUY";
  return "ACCESSORY";
}

async function createOrder(rawBody) {
  const maxItems = getRequiredNumberEnv("ORDERS_MAX_ITEMS");
  const maxQtyPerItem = getRequiredNumberEnv("ORDERS_MAX_QTY_PER_ITEM");

  const body = validateCreateOrderBody(rawBody);

  const normalized = normalizeItems(body.items, maxItems, maxQtyPerItem);
  if (!normalized.ok) throw badRequest("Invalid order payload", normalized.details);

  const items = normalized.items;
  const productIds = items.map((i) => i.productId);

  const products = await prisma.product.findMany({
    where: { id: { in: productIds }, isActive: true },
    select: {
      id: true,
      price: true,
      name: true,
      slug: true,
      articleNumber: true,
      category: { select: { slug: true, name: true } },
    },
  });

  if (products.length !== productIds.length) {
    const found = new Set(products.map((p) => p.id));
    const missing = productIds.filter((id) => !found.has(id));
    throw badRequest("Some products are missing or inactive", { missingProductIds: missing });
  }

  const byId = new Map(products.map((p) => [p.id, p]));

  const orderItemsCreate = items.map((it) => {
    const p = byId.get(it.productId);
    const unitPrice = p.price;
    const lineTotal = unitPrice * it.qty;

    return {
      productId: it.productId,
      qty: it.qty,
      unitPrice,
      lineTotal,
    };
  });

  const subtotal = orderItemsCreate.reduce((sum, it) => sum + it.lineTotal, 0);
  const deliveryFee = 0;
  const total = subtotal + deliveryFee;

  const created = await prisma.$transaction(async (tx) => {
    const order = await tx.order.create({
      data: {
        customerName: body.customerName,
        email: body.email,
        phone: body.phone,
        address: body.address,
        deliveryMethod: body.deliveryMethod,
        note: body.note,
        subtotal,
        deliveryFee,
        total,

        rentalPlace: body.rentalPlace,
        rentalFrom: body.rentalFrom,
        rentalTo: body.rentalTo,
        country: body.country,
        city: body.city,
        postalCode: body.postalCode,
        street: body.street,
        expectedMileageKm: body.expectedMileageKm,
        visitCountries: body.visitCountries,
        rentalAccessories: body.rentalAccessories,

        items: { create: orderItemsCreate },
      },
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

        rentalPlace: true,
        rentalFrom: true,
        rentalTo: true,
        country: true,
        city: true,
        postalCode: true,
        street: true,
        expectedMileageKm: true,
        visitCountries: true,
        rentalAccessories: true,

        createdAt: true,
        items: {
          select: {
            productId: true,
            qty: true,
            unitPrice: true,
            lineTotal: true,
            product: {
              select: {
                name: true,
                slug: true,
                articleNumber: true,
                category: { select: { slug: true, name: true } },
              },
            },
          },
        },
      },
    });

    const emailItems = order.items.map((it) => ({
      productId: it.productId,
      productName: it.product.name,
      productSlug: it.product.slug,
      articleNumber: it.product.articleNumber ?? MISSING_ARTICLE_NUMBER_TEXT,
      qty: it.qty,
      price: it.unitPrice,
      total: it.lineTotal,
      categorySlug: it.product.category?.slug || "",
      categoryName: it.product.category?.name || "",
    }));

    const slugs = new Set(emailItems.map((i) => i.categorySlug).filter(Boolean));
    const kind = inferKindFromCategorySlugs(slugs);

    const emailOrder = {
      id: order.id,
      customerName: order.customerName,
      email: order.email,
      phone: order.phone,
      address: order.address,
      deliveryMethod: order.deliveryMethod,
      note: order.note,
      subtotal: order.subtotal,
      deliveryFee: order.deliveryFee,
      total: order.total,
      items: emailItems,

      rentalPlace: order.rentalPlace,
      rentalFrom: order.rentalFrom,
      rentalTo: order.rentalTo,
      country: order.country,
      city: order.city,
      postalCode: order.postalCode,
      street: order.street,
      expectedMileageKm: order.expectedMileageKm,
      visitCountries: order.visitCountries,
      rentalAccessories: order.rentalAccessories,
    };

    await tx.orderEmail.createMany({
      data: [
        {
          orderId: order.id,
          kind: "ADMIN",
          to: process.env.ORDERS_EMAIL_TO,
          subject: subjectForKind(kind, order.id),
          html: orderEmailAdmin(emailOrder),
          status: "PENDING",
        },
        {
          orderId: order.id,
          kind: "CUSTOMER",
          to: order.email,
          subject: subjectForCustomerKind(kind, order.id),
          html: orderEmailCustomer(emailOrder),
          status: "PENDING",
        },
      ],
    });

    return { order };
  });

  return created;
}

module.exports = { createOrder };
