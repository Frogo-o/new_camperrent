const { prisma } = require("../../db/prisma");

function badRequest(details) {
  const err = new Error("BAD_REQUEST");
  err.code = "BAD_REQUEST";
  err.details = Array.isArray(details) ? details : [String(details || "bad request")];
  return err;
}

function trimmedOrUndefined(v) {
  const s = String(v ?? "").trim();
  return s ? s : undefined;
}

async function getEditableBySlug(slug) {
  const product = await prisma.product.findUnique({
    where: { slug },
    select: {
      name: true,
      slug: true,
      articleNumber: true,
      description: true,
      price: true,
      isActive: true,
      categoryId: true,
      brandId: true,
      images: { select: { id: true, url: true, sortOrder: true }, orderBy: { sortOrder: "asc" } },
      infoFiles: {
        select: {
          id: true,
          url: true,
          filename: true,
          originalname: true,
          mimetype: true,
          size: true,
          sortOrder: true,
        },
        orderBy: { sortOrder: "asc" },
      },
    },
  });

  if (!product) {
    const err = new Error("NOT_FOUND");
    err.code = "NOT_FOUND";
    throw err;
  }

  return product;
}

async function patchBySlug(currentSlug, patch) {
  const existing = await prisma.product.findUnique({
    where: { slug: currentSlug },
    select: { id: true, slug: true },
  });

  if (!existing) {
    const err = new Error("NOT_FOUND");
    err.code = "NOT_FOUND";
    throw err;
  }

  if (patch.slug && patch.slug !== existing.slug) {
    const taken = await prisma.product.findUnique({
      where: { slug: patch.slug },
      select: { id: true },
    });
    if (taken) {
      const err = new Error("SLUG_TAKEN");
      err.code = "SLUG_TAKEN";
      throw err;
    }
  }

  try {
    return await prisma.product.update({
      where: { id: existing.id },
      data: patch,
      select: {
        name: true,
        slug: true,
        articleNumber: true,
        description: true,
        price: true,
        isActive: true,
        categoryId: true,
        brandId: true,
        images: { select: { id: true, url: true, sortOrder: true }, orderBy: { sortOrder: "asc" } },
        infoFiles: {
          select: {
            id: true,
            url: true,
            filename: true,
            originalname: true,
            mimetype: true,
            size: true,
            sortOrder: true,
          },
          orderBy: { sortOrder: "asc" },
        },
      },
    });
  } catch (e) {
    const msg = String(e?.code || "");
    if (msg === "P2003") {
      const err = new Error("BAD_FK");
      err.code = "BAD_FK";
      throw err;
    }
    throw e;
  }
}

async function requireProductIdBySlug(slug) {
  const product = await prisma.product.findUnique({
    where: { slug },
    select: { id: true },
  });
  if (!product) {
    const err = new Error("NOT_FOUND");
    err.code = "NOT_FOUND";
    throw err;
  }
  return product.id;
}

/* =========================
   IMAGES
========================= */

async function addImageBySlug(slug, raw) {
  const productId = await requireProductIdBySlug(slug);

  const url = String(raw?.url || "").trim();
  if (!url) throw badRequest(["url is required"]);

  const sortOrder = Number.isInteger(raw?.sortOrder) ? raw.sortOrder : 0;

  return await prisma.productImage.create({
    data: { productId, url, sortOrder },
    select: { id: true, url: true, sortOrder: true },
  });
}

async function patchImageBySlug(slug, imageIdRaw, raw) {
  const productId = await requireProductIdBySlug(slug);

  const imageId = Number(imageIdRaw);
  if (!Number.isInteger(imageId) || imageId <= 0) throw badRequest(["imageId must be positive integer"]);

  const url = raw?.url !== undefined ? String(raw.url || "").trim() : undefined;
  if (url !== undefined && !url) throw badRequest(["url must be non-empty string"]);

  const sortOrder = raw?.sortOrder !== undefined ? Number(raw.sortOrder) : undefined;
  if (sortOrder !== undefined && (!Number.isInteger(sortOrder) || sortOrder < 0)) {
    throw badRequest(["sortOrder must be integer >= 0"]);
  }

  const exists = await prisma.productImage.findFirst({
    where: { id: imageId, productId },
    select: { id: true },
  });
  if (!exists) {
    const err = new Error("NOT_FOUND");
    err.code = "NOT_FOUND";
    throw err;
  }

  const data = {};
  if (url !== undefined) data.url = url;
  if (sortOrder !== undefined) data.sortOrder = sortOrder;

  if (Object.keys(data).length === 0) throw badRequest(["nothing to update"]);

  return await prisma.productImage.update({
    where: { id: imageId },
    data,
    select: { id: true, url: true, sortOrder: true },
  });
}

async function deleteImageBySlug(slug, imageIdRaw) {
  const productId = await requireProductIdBySlug(slug);

  const imageId = Number(imageIdRaw);
  if (!Number.isInteger(imageId) || imageId <= 0) throw badRequest(["imageId must be positive integer"]);

  const exists = await prisma.productImage.findFirst({
    where: { id: imageId, productId },
    select: { id: true },
  });
  if (!exists) {
    const err = new Error("NOT_FOUND");
    err.code = "NOT_FOUND";
    throw err;
  }

  await prisma.productImage.delete({ where: { id: imageId } });
}

async function reorderImagesBySlug(slug, raw) {
  const productId = await requireProductIdBySlug(slug);

  const items = Array.isArray(raw?.items) ? raw.items : null;
  if (!items || items.length === 0) throw badRequest(["items must be a non-empty array"]);

  const normalized = items.map((x) => ({
    id: Number(x?.id),
    sortOrder: Number(x?.sortOrder),
  }));

  for (const it of normalized) {
    if (!Number.isInteger(it.id) || it.id <= 0) throw badRequest(["each item.id must be positive integer"]);
    if (!Number.isInteger(it.sortOrder) || it.sortOrder < 0) throw badRequest(["each item.sortOrder must be integer >= 0"]);
  }

  const ids = normalized.map((x) => x.id);

  const rows = await prisma.productImage.findMany({
    where: { id: { in: ids }, productId },
    select: { id: true },
  });

  if (rows.length !== ids.length) {
    const err = new Error("BAD_REQUEST");
    err.code = "BAD_REQUEST";
    err.details = ["one or more images do not belong to this product"];
    throw err;
  }

  await prisma.$transaction(
    normalized.map((it) =>
      prisma.productImage.update({
        where: { id: it.id },
        data: { sortOrder: it.sortOrder },
      })
    )
  );

  return await prisma.productImage.findMany({
    where: { productId },
    select: { id: true, url: true, sortOrder: true },
    orderBy: [{ sortOrder: "asc" }, { id: "asc" }],
  });
}

/* =========================
   INFO FILES (like images)
========================= */

async function addInfoFileBySlug(slug, raw) {
  const productId = await requireProductIdBySlug(slug);

  const url = String(raw?.url || "").trim();
  if (!url) throw badRequest(["url is required"]);

  const filename = trimmedOrUndefined(raw?.filename);
  const originalname = trimmedOrUndefined(raw?.originalname);
  const mimetype = trimmedOrUndefined(raw?.mimetype);

  const sizeRaw = raw?.size;
  const size = sizeRaw === undefined ? undefined : Number(sizeRaw);
  if (size !== undefined && (!Number.isInteger(size) || size < 0)) throw badRequest(["size must be integer >= 0"]);

  const sortOrder = Number.isInteger(raw?.sortOrder) ? raw.sortOrder : 0;

  return await prisma.productInfoFile.create({
    data: {
      productId,
      url,
      filename: filename ?? null,
      originalname: originalname ?? null,
      mimetype: mimetype ?? null,
      size: size ?? null,
      sortOrder,
    },
    select: {
      id: true,
      url: true,
      filename: true,
      originalname: true,
      mimetype: true,
      size: true,
      sortOrder: true,
    },
  });
}

async function patchInfoFileBySlug(slug, fileIdRaw, raw) {
  const productId = await requireProductIdBySlug(slug);

  const fileId = Number(fileIdRaw);
  if (!Number.isInteger(fileId) || fileId <= 0) throw badRequest(["fileId must be positive integer"]);

  const exists = await prisma.productInfoFile.findFirst({
    where: { id: fileId, productId },
    select: { id: true },
  });
  if (!exists) {
    const err = new Error("NOT_FOUND");
    err.code = "NOT_FOUND";
    throw err;
  }

  const data = {};

  if (raw?.url !== undefined) {
    const url = String(raw.url || "").trim();
    if (!url) throw badRequest(["url must be non-empty string"]);
    data.url = url;
  }

  if (raw?.filename !== undefined) data.filename = trimmedOrUndefined(raw.filename) ?? null;
  if (raw?.originalname !== undefined) data.originalname = trimmedOrUndefined(raw.originalname) ?? null;
  if (raw?.mimetype !== undefined) data.mimetype = trimmedOrUndefined(raw.mimetype) ?? null;

  if (raw?.size !== undefined) {
    const size = Number(raw.size);
    if (!Number.isInteger(size) || size < 0) throw badRequest(["size must be integer >= 0"]);
    data.size = size;
  }

  if (raw?.sortOrder !== undefined) {
    const sortOrder = Number(raw.sortOrder);
    if (!Number.isInteger(sortOrder) || sortOrder < 0) throw badRequest(["sortOrder must be integer >= 0"]);
    data.sortOrder = sortOrder;
  }

  if (Object.keys(data).length === 0) throw badRequest(["nothing to update"]);

  return await prisma.productInfoFile.update({
    where: { id: fileId },
    data,
    select: {
      id: true,
      url: true,
      filename: true,
      originalname: true,
      mimetype: true,
      size: true,
      sortOrder: true,
    },
  });
}

async function deleteInfoFileBySlug(slug, fileIdRaw) {
  const productId = await requireProductIdBySlug(slug);

  const fileId = Number(fileIdRaw);
  if (!Number.isInteger(fileId) || fileId <= 0) throw badRequest(["fileId must be positive integer"]);

  const exists = await prisma.productInfoFile.findFirst({
    where: { id: fileId, productId },
    select: { id: true },
  });
  if (!exists) {
    const err = new Error("NOT_FOUND");
    err.code = "NOT_FOUND";
    throw err;
  }

  await prisma.productInfoFile.delete({ where: { id: fileId } });
}

async function reorderInfoFilesBySlug(slug, raw) {
  const productId = await requireProductIdBySlug(slug);

  const items = Array.isArray(raw?.items) ? raw.items : null;
  if (!items || items.length === 0) throw badRequest(["items must be a non-empty array"]);

  const normalized = items.map((x) => ({
    id: Number(x?.id),
    sortOrder: Number(x?.sortOrder),
  }));

  for (const it of normalized) {
    if (!Number.isInteger(it.id) || it.id <= 0) throw badRequest(["each item.id must be positive integer"]);
    if (!Number.isInteger(it.sortOrder) || it.sortOrder < 0) throw badRequest(["each item.sortOrder must be integer >= 0"]);
  }

  const ids = normalized.map((x) => x.id);

  const rows = await prisma.productInfoFile.findMany({
    where: { id: { in: ids }, productId },
    select: { id: true },
  });

  if (rows.length !== ids.length) {
    const err = new Error("BAD_REQUEST");
    err.code = "BAD_REQUEST";
    err.details = ["one or more files do not belong to this product"];
    throw err;
  }

  await prisma.$transaction(
    normalized.map((it) =>
      prisma.productInfoFile.update({
        where: { id: it.id },
        data: { sortOrder: it.sortOrder },
      })
    )
  );

  return await prisma.productInfoFile.findMany({
    where: { productId },
    select: {
      id: true,
      url: true,
      filename: true,
      originalname: true,
      mimetype: true,
      size: true,
      sortOrder: true,
    },
    orderBy: [{ sortOrder: "asc" }, { id: "asc" }],
  });
}

module.exports = {
  getEditableBySlug,
  patchBySlug,

  addImageBySlug,
  patchImageBySlug,
  deleteImageBySlug,
  reorderImagesBySlug,

  addInfoFileBySlug,
  patchInfoFileBySlug,
  deleteInfoFileBySlug,
  reorderInfoFilesBySlug,
};
