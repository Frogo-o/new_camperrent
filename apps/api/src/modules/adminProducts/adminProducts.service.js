// apps/api/src/modules/adminProducts/adminProducts.service.js
const { prisma } = require("../../db/prisma");
const { httpError } = require("../../utils/httpError");

function badRequest(message, details) {
  return httpError(400, "BAD_REQUEST", message, details);
}

function isNonEmptyString(v) {
  return typeof v === "string" && v.trim().length > 0;
}

function normalizeSlug(s) {
  return String(s || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9\-]/g, "")
    .replace(/\-+/g, "-")
    .replace(/^\-+|\-+$/g, "");
}

function parseId(v, name) {
  const n = Number(v);
  if (!Number.isInteger(n) || n < 1) throw badRequest(`Invalid ${name}`, [`${name} must be integer >= 1`]);
  return n;
}

function parseNullableId(v, name) {
  if (v === null) return null;
  if (v === undefined) return undefined;
  return parseId(v, name);
}

function parsePrice(v) {
  const n = Number(v);
  if (!Number.isInteger(n) || n < 0 || n > 2_000_000_000) {
    throw badRequest("Invalid price", ["price must be integer >= 0"]);
  }
  return n;
}

function parseArticleNumber(v) {
  if (v === undefined) return undefined;
  if (v === null) return null;
  if (typeof v !== "string") throw badRequest("Invalid payload", ["articleNumber must be a string or null"]);
  const s = v.trim();
  if (!s) throw badRequest("Invalid payload", ["articleNumber must be a non-empty string or null"]);
  if (s.length > 64) throw badRequest("Invalid payload", ["articleNumber must be at most 64 characters"]);
  return s;
}

function trimOrNull(v) {
  if (v === undefined) return undefined;
  if (v === null) return null;
  if (typeof v !== "string") return null;
  const s = v.trim();
  return s ? s : null;
}

function parseNullableSize(v) {
  if (v === undefined) return undefined;
  if (v === null) return null;
  const n = Number(v);
  if (!Number.isInteger(n) || n < 0) throw badRequest("Invalid payload", ["size must be integer >= 0 or null"]);
  return n;
}

function pickInfoFileCreate(x, idx) {
  const url = isNonEmptyString(x?.url) ? String(x.url).trim() : null;
  if (!url) return null;

  const sortOrder = Number.isInteger(x?.sortOrder) ? x.sortOrder : idx;

  const filename = trimOrNull(x?.filename);
  const originalname = trimOrNull(x?.originalname);
  const mimetype = trimOrNull(x?.mimetype);
  const size = parseNullableSize(x?.size);

  return {
    url,
    sortOrder,
    filename: filename === undefined ? null : filename,
    originalname: originalname === undefined ? null : originalname,
    mimetype: mimetype === undefined ? null : mimetype,
    size: size === undefined ? null : size,
  };
}

async function createProduct(raw) {
  if (!raw || typeof raw !== "object") throw badRequest("Invalid payload", ["body must be an object"]);

  const name = isNonEmptyString(raw.name) ? raw.name.trim() : null;
  if (!name) throw badRequest("Invalid payload", ["name is required"]);

  const slug = normalizeSlug(raw.slug || name);
  if (!slug) throw badRequest("Invalid payload", ["slug is required"]);

  const articleNumber = parseArticleNumber(raw.articleNumber);

  const description = typeof raw.description === "string" ? raw.description : "";
  const price = parsePrice(raw.price);

  const categoryId = parseId(raw.categoryId, "categoryId");
  const brandId = raw.brandId === null || raw.brandId === undefined ? null : parseId(raw.brandId, "brandId");

  const isActive = raw.isActive === undefined ? true : !!raw.isActive;

  const images = Array.isArray(raw.images) ? raw.images : [];
  const createImages = images
    .filter((x) => x && typeof x === "object" && isNonEmptyString(x.url))
    .map((x, idx) => ({
      url: String(x.url).trim(),
      sortOrder: Number.isInteger(x.sortOrder) ? x.sortOrder : idx,
    }));

  const infoFiles = Array.isArray(raw.infoFiles) ? raw.infoFiles : [];
  const createInfoFiles = [];
  for (let i = 0; i < infoFiles.length; i++) {
    const row = pickInfoFileCreate(infoFiles[i], i);
    if (row) createInfoFiles.push(row);
  }

  try {
    const created = await prisma.product.create({
      data: {
        name,
        slug,
        ...(articleNumber !== undefined ? { articleNumber } : {}),
        description,
        price,
        isActive,
        categoryId,
        ...(brandId ? { brandId } : { brandId: null }),
        images: createImages.length ? { create: createImages } : undefined,
        infoFiles: createInfoFiles.length ? { create: createInfoFiles } : undefined,
      },
      select: {
        id: true,
        name: true,
        slug: true,
        articleNumber: true,
        description: true,
        price: true,
        isActive: true,
        categoryId: true,
        brandId: true,
        createdAt: true,
        updatedAt: true,
        images: { select: { id: true, url: true, sortOrder: true } },
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
        },
      },
    });

    return { data: created };
  } catch (e) {
    if (String(e?.code) === "P2002") {
      throw httpError(409, "CONFLICT", "Product slug already exists");
    }
    if (String(e?.code) === "P2003") {
      throw badRequest("Invalid foreign key", ["categoryId/brandId not found"]);
    }
    throw e;
  }
}

async function addProductImage(productIdRaw, raw) {
  const productId = parseId(productIdRaw, "id");
  if (!raw || typeof raw !== "object") throw badRequest("Invalid payload", ["body must be an object"]);

  const url = isNonEmptyString(raw.url) ? raw.url.trim() : null;
  if (!url) throw badRequest("Invalid payload", ["url is required"]);

  const sortOrder = Number.isInteger(raw.sortOrder) ? raw.sortOrder : 0;

  const product = await prisma.product.findUnique({ where: { id: productId }, select: { id: true } });
  if (!product) throw httpError(404, "NOT_FOUND", "Product not found");

  const img = await prisma.productImage.create({
    data: { productId, url, sortOrder },
    select: { id: true, url: true, sortOrder: true, productId: true },
  });

  return { data: img };
}

async function addProductInfoFile(productIdRaw, raw) {
  const productId = parseId(productIdRaw, "id");
  if (!raw || typeof raw !== "object") throw badRequest("Invalid payload", ["body must be an object"]);

  const url = isNonEmptyString(raw.url) ? raw.url.trim() : null;
  if (!url) throw badRequest("Invalid payload", ["url is required"]);

  const sortOrder = Number.isInteger(raw.sortOrder) ? raw.sortOrder : 0;

  const filename = trimOrNull(raw.filename);
  const originalname = trimOrNull(raw.originalname);
  const mimetype = trimOrNull(raw.mimetype);
  const size = parseNullableSize(raw.size);

  const product = await prisma.product.findUnique({ where: { id: productId }, select: { id: true } });
  if (!product) throw httpError(404, "NOT_FOUND", "Product not found");

  const fileRow = await prisma.productInfoFile.create({
    data: {
      productId,
      url,
      sortOrder,
      filename: filename === undefined ? null : filename,
      originalname: originalname === undefined ? null : originalname,
      mimetype: mimetype === undefined ? null : mimetype,
      size: size === undefined ? null : size,
    },
    select: {
      id: true,
      url: true,
      filename: true,
      originalname: true,
      mimetype: true,
      size: true,
      sortOrder: true,
      productId: true,
    },
  });

  return { data: fileRow };
}

async function updateProduct(productIdRaw, raw) {
  const productId = parseId(productIdRaw, "id");
  if (!raw || typeof raw !== "object") throw badRequest("Invalid payload", ["body must be an object"]);

  const exists = await prisma.product.findUnique({ where: { id: productId }, select: { id: true } });
  if (!exists) throw httpError(404, "NOT_FOUND", "Product not found");

  const data = {};

  if (raw.name !== undefined) {
    const name = isNonEmptyString(raw.name) ? raw.name.trim() : null;
    if (!name) throw badRequest("Invalid payload", ["name must be a non-empty string"]);
    data.name = name;
    if (raw.slug === undefined) data.slug = normalizeSlug(name);
  }

  if (raw.slug !== undefined) {
    const slug = normalizeSlug(raw.slug);
    if (!slug) throw badRequest("Invalid payload", ["slug must be a non-empty string"]);
    data.slug = slug;
  }

  if (raw.articleNumber !== undefined) {
    data.articleNumber = parseArticleNumber(raw.articleNumber);
  }

  if (raw.description !== undefined) {
    if (raw.description !== null && typeof raw.description !== "string") {
      throw badRequest("Invalid payload", ["description must be a string"]);
    }
    data.description = raw.description || "";
  }

  if (raw.price !== undefined) {
    data.price = parsePrice(raw.price);
  }

  if (raw.isActive !== undefined) {
    data.isActive = !!raw.isActive;
  }

  if (raw.categoryId !== undefined) {
    data.categoryId = parseId(raw.categoryId, "categoryId");
  }

  if (raw.brandId !== undefined) {
    const brandId = parseNullableId(raw.brandId, "brandId");
    if (brandId !== undefined) data.brandId = brandId;
  }

  if (Object.keys(data).length === 0) {
    throw badRequest("Invalid payload", ["nothing to update"]);
  }

  try {
    const updated = await prisma.product.update({
      where: { id: productId },
      data,
      select: {
        id: true,
        name: true,
        slug: true,
        articleNumber: true,
        description: true,
        price: true,
        isActive: true,
        categoryId: true,
        brandId: true,
        createdAt: true,
        updatedAt: true,
        images: { select: { id: true, url: true, sortOrder: true } },
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
        },
      },
    });

    return { data: updated };
  } catch (e) {
    if (String(e?.code) === "P2002") {
      throw httpError(409, "CONFLICT", "Product slug already exists");
    }
    if (String(e?.code) === "P2003") {
      throw badRequest("Invalid foreign key", ["categoryId/brandId not found"]);
    }
    throw e;
  }
}

module.exports = { createProduct, addProductImage, addProductInfoFile, updateProduct };
