const { prisma } = require("../../db/prisma");

function normalizeAdminStatus(x) {
  const v = String(x ?? "").trim().toUpperCase();
  if (!v) return null;
  if (v !== "ACTIVE" && v !== "COMPLETED") throw new Error("Invalid adminStatus");
  return v;
}

function firstItemName(items) {
  const arr = Array.isArray(items) ? items : [];
  if (!arr.length) return "";
  const name = arr[0]?.product?.name ? String(arr[0].product.name) : "";
  if (arr.length === 1) return name;
  return `${name} +${arr.length - 1}`;
}

function totalQty(items) {
  const arr = Array.isArray(items) ? items : [];
  return arr.reduce((sum, i) => sum + (Number(i.qty) || 0), 0);
}

async function list({ page, size, status }) {
  const p =
    Number.isFinite(Number(page)) && Number(page) > 0
      ? Math.floor(page)
      : 1;

  const s =
    Number.isFinite(Number(size)) && Number(size) > 0
      ? Math.min(Math.floor(size), 200)
      : 30;

  const st = normalizeAdminStatus(status);
  const where = st ? { adminStatus: st } : {};

  const [total, rows] = await Promise.all([
    prisma.order.count({ where }),
    prisma.order.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (p - 1) * s,
      take: s,
      select: {
        id: true,
        createdAt: true,
        customerName: true,
        total: true,
        adminStatus: true,
        items: {
          orderBy: { id: "asc" },
          select: {
            qty: true,
            product: {
              select: { name: true },
            },
          },
        },
      },
    }),
  ]);

  return {
    content: rows.map((o) => ({
      id: o.id,
      createdAt: o.createdAt,
      customerName: o.customerName,
      total: o.total,
      adminStatus: o.adminStatus,
      itemName: firstItemName(o.items),
      itemsCount: o.items.length,
      totalQty: totalQty(o.items),
    })),
    total,
    pageNumber: p,
    pageSize: s,
  };
}

async function getById({ id }) {
  const orderId = Number(id);
  if (!Number.isFinite(orderId)) return null;

  const o = await prisma.order.findUnique({
    where: { id: orderId },
    select: {
      id: true,
      createdAt: true,

      customerName: true,
      email: true,
      phone: true,
      address: true,
      deliveryMethod: true,
      note: true,

      status: true,
      adminStatus: true,

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

      items: {
        orderBy: { id: "asc" },
        select: {
          id: true,
          qty: true,
          unitPrice: true,
          lineTotal: true,
          product: {
            select: {
              id: true,
              name: true,
              slug: true,
              articleNumber: true,
            },
          },
        },
      },
    },
  });

  return o || null;
}

async function updateStatus({ id, adminStatus }) {
  const st = normalizeAdminStatus(adminStatus);
  if (!st) throw new Error("Invalid adminStatus");

  try {
    return await prisma.order.update({
      where: { id: Number(id) },
      data: { adminStatus: st },
      select: {
        id: true,
        createdAt: true,
        customerName: true,
        total: true,
        adminStatus: true,
      },
    });
  } catch (e) {
    return null;
  }
}

module.exports = {
  list,
  getById,
  updateStatus,
};
