const { prisma } = require("../../db/prisma");
const { httpError } = require("../../utils/httpError");

const LIMITS = {
  name: 120,
  slug: 80,
  q: 100,
  brandSlug: 80,
  categorySlug: 80,
};

const EXCLUDED_BY_DEFAULT = ["camper-rent", "buy-camper"];

const MISSING_ARTICLE_NUMBER_TEXT = "липсва артикулен номер";

function isNonEmptyString(v) {
  if (v === undefined) return false;
  const s = String(v).trim();
  return s.length > 0;
}

function trimmedOrUndefined(v) {
  if (!isNonEmptyString(v)) return undefined;
  return String(v).trim();
}

function parseIntRequiredOrDefault(v, def) {
  if (v === undefined) return def;
  if (typeof v !== "string" || v.trim() === "") return NaN;
  const n = Number(v);
  if (!Number.isInteger(n)) return NaN;
  return n;
}

function parseBoolStrict(v) {
  if (v === undefined) return undefined;
  if (v === "true") return true;
  if (v === "false") return false;
  return null;
}

function badRequest(details) {
  return httpError(400, "BAD_REQUEST", "Invalid input", details);
}

function enforceMaxLen(name, value, max, details) {
  if (value !== undefined && value.length > max) {
    details.push(`${name} must be at most ${max} characters`);
  }
}

function normalizeSlug(v) {
  return String(v || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9\-]/g, "")
    .replace(/\-+/g, "-")
    .replace(/^\-+|\-+$/g, "");
}

function withArticleNumberFallback(p) {
  return {
    ...p,
    articleNumber: p.articleNumber ?? MISSING_ARTICLE_NUMBER_TEXT,
    infoFiles: Array.isArray(p?.infoFiles) ? p.infoFiles : [],
  };
}

function mapProductsWithArticleNumberFallback(products) {
  return products.map(withArticleNumberFallback);
}

/* =========================
   LIST PRODUCTS (ADMIN)
   - includeInactive=true => ONLY inactive (isActive=false)
   - includeInactive not true => ONLY active (isActive=true)
   - q searches by name OR slug OR articleNumber
========================= */

function parseListProductsAdminQuery(query) {
  const details = [];

  const page = parseIntRequiredOrDefault(query.page, 1);
  const limit = parseIntRequiredOrDefault(query.limit, 20);

  if (!Number.isInteger(page) || page < 1) details.push("page must be an integer >= 1");
  if (!Number.isInteger(limit) || limit < 1 || limit > 100) {
    details.push("limit must be an integer between 1 and 100");
  }

  const includeInactive = parseBoolStrict(query.includeInactive);
  if (includeInactive === null) details.push("includeInactive must be 'true' or 'false'");

  const categoryActiveOnly = parseBoolStrict(query.categoryActiveOnly);
  if (categoryActiveOnly === null) details.push("categoryActiveOnly must be 'true' or 'false'");

  const brandActiveOnly = parseBoolStrict(query.brandActiveOnly);
  if (brandActiveOnly === null) details.push("brandActiveOnly must be 'true' or 'false'");

  const hasBrand = parseBoolStrict(query.hasBrand);
  if (hasBrand === null) details.push("hasBrand must be 'true' or 'false'");

  const sort = String(query.sort || "newest");
  const allowedSort = new Set(["newest", "oldest", "price_asc", "price_desc", "name_asc", "name_desc"]);
  if (!allowedSort.has(sort)) details.push("sort is invalid");

  const q = trimmedOrUndefined(query.q);
  const brandSlug = trimmedOrUndefined(query.brandSlug);
  const categorySlug = trimmedOrUndefined(query.categorySlug);

  enforceMaxLen("q", q, LIMITS.q, details);
  enforceMaxLen("brandSlug", brandSlug, LIMITS.brandSlug, details);
  enforceMaxLen("categorySlug", categorySlug, LIMITS.categorySlug, details);

  if (details.length) throw badRequest(details);

  const where = {};
  const AND = [];

  // ✅ changed behavior:
  // includeInactive=true => show ONLY inactive
  // else => show ONLY active
  AND.push({ isActive: includeInactive === true ? false : true });

  // Category filter
  if (categorySlug) {
    const cat = { slug: categorySlug };
    if (categoryActiveOnly === true) cat.isActive = true;
    AND.push({ category: cat });
  } else if (categoryActiveOnly === true) {
    AND.push({ category: { isActive: true } });
  }

  // Brand filter
  if (brandSlug) {
    const b = { slug: brandSlug };
    if (brandActiveOnly === true) b.isActive = true;
    AND.push({ brand: b });
  } else if (brandActiveOnly === true) {
    // allow brandless OR active brand
    AND.push({ OR: [{ brandId: null }, { brand: { isActive: true } }] });
  }

  if (hasBrand === true) AND.push({ brandId: { not: null } });
  if (hasBrand === false) AND.push({ brandId: null });

  // ✅ search by name OR slug OR articleNumber
  if (q) {
    AND.push({
      OR: [
        { name: { contains: q } },
        { slug: { contains: q } },
        { articleNumber: { contains: q } },
      ],
    });
  }

  if (AND.length) where.AND = AND;

  const orderBy =
    sort === "price_asc"
      ? { price: "asc" }
      : sort === "price_desc"
      ? { price: "desc" }
      : sort === "name_asc"
      ? { name: "asc" }
      : sort === "name_desc"
      ? { name: "desc" }
      : sort === "oldest"
      ? { createdAt: "asc" }
      : { createdAt: "desc" };

  const skip = (page - 1) * limit;

  return { page, limit, skip, where, orderBy };
}

/* =========================
   CATEGORIES / BRANDS
========================= */

async function listCategoriesAdmin(rawQuery) {
  const onlyActive = parseBoolStrict(rawQuery?.onlyActive);
  if (onlyActive === null) throw badRequest(["onlyActive must be 'true' or 'false'"]);

  const excludeSpecial = parseBoolStrict(rawQuery?.excludeSpecial);
  if (excludeSpecial === null) throw badRequest(["excludeSpecial must be 'true' or 'false'"]);

  const where = {};
  if (onlyActive === true) where.isActive = true;
  if (excludeSpecial === true) where.slug = { notIn: EXCLUDED_BY_DEFAULT };

  return prisma.category.findMany({
    where,
    select: { id: true, name: true, slug: true, isActive: true },
    orderBy: [{ isActive: "desc" }, { name: "asc" }],
  });
}

async function listBrandsAdmin(rawQuery) {
  const onlyActive = parseBoolStrict(rawQuery?.onlyActive);
  if (onlyActive === null) throw badRequest(["onlyActive must be 'true' or 'false'"]);

  const where = {};
  if (onlyActive === true) where.isActive = true;

  return prisma.brand.findMany({
    where,
    select: { id: true, name: true, slug: true, isActive: true },
    orderBy: [{ isActive: "desc" }, { name: "asc" }],
  });
}

async function createCategoryAdmin(body) {
  const details = [];
  const name = trimmedOrUndefined(body?.name);
  const slugRaw = trimmedOrUndefined(body?.slug);

  if (!name) details.push("name is required");
  if (!slugRaw) details.push("slug is required");

  enforceMaxLen("name", name, LIMITS.name, details);
  enforceMaxLen("slug", slugRaw, LIMITS.slug, details);

  const slug = normalizeSlug(slugRaw);
  if (slug.length < 2) details.push("slug is too short");

  if (details.length) throw badRequest(details);

  try {
    return await prisma.category.create({
      data: { name, slug, isActive: true },
      select: { id: true, name: true, slug: true, isActive: true },
    });
  } catch {
    throw httpError(409, "CONFLICT", "Category slug already exists");
  }
}

async function createBrandAdmin(body) {
  const details = [];
  const name = trimmedOrUndefined(body?.name);
  const slugRaw = trimmedOrUndefined(body?.slug);

  if (!name) details.push("name is required");
  if (!slugRaw) details.push("slug is required");

  enforceMaxLen("name", name, LIMITS.name, details);
  enforceMaxLen("slug", slugRaw, LIMITS.slug, details);

  const slug = normalizeSlug(slugRaw);
  if (slug.length < 2) details.push("slug is too short");

  if (details.length) throw badRequest(details);

  try {
    return await prisma.brand.create({
      data: { name, slug, isActive: true },
      select: { id: true, name: true, slug: true, isActive: true },
    });
  } catch {
    throw httpError(409, "CONFLICT", "Brand slug already exists");
  }
}

/* =========================
   PATCH (ALL-IN-ONE)
========================= */

async function patchCategoryBySlugAdmin(slug, body) {
  const details = [];
  const s = trimmedOrUndefined(slug);
  if (!s) throw badRequest(["slug is required"]);

  const isObj = body !== null && typeof body === "object" && !Array.isArray(body);
  if (!isObj) throw httpError(400, "BAD_REQUEST", "Invalid body", ["body must be an object"]);

  const hasIsActive = Object.prototype.hasOwnProperty.call(body, "isActive");
  const hasName = Object.prototype.hasOwnProperty.call(body, "name");
  const hasSlug = Object.prototype.hasOwnProperty.call(body, "slug");

  if (!hasIsActive && !hasName && !hasSlug) {
    details.push("body must include at least one of: isActive, name, slug");
  }

  if (hasIsActive && typeof body.isActive !== "boolean") details.push("isActive must be boolean");

  const name = hasName ? trimmedOrUndefined(body.name) : undefined;
  const slugRaw = hasSlug ? trimmedOrUndefined(body.slug) : undefined;

  if (hasName && !name) details.push("name is required");
  if (hasSlug && !slugRaw) details.push("slug is required");

  enforceMaxLen("name", name, LIMITS.name, details);
  enforceMaxLen("slug", slugRaw, LIMITS.slug, details);

  const nextSlug = slugRaw ? normalizeSlug(slugRaw) : undefined;
  if (nextSlug !== undefined) {
    if (nextSlug.length < 2) details.push("slug is too short");
    if (nextSlug.length > LIMITS.slug) details.push("slug is too long after normalization");
  }

  if (details.length) throw badRequest(details);

  const existing = await prisma.category.findUnique({
    where: { slug: s },
    select: { id: true },
  });

  if (!existing) throw httpError(404, "NOT_FOUND", "Category not found");

  const data = {};
  if (hasIsActive) data.isActive = body.isActive;
  if (name !== undefined) data.name = name;
  if (nextSlug !== undefined) data.slug = nextSlug;

  try {
    return await prisma.category.update({
      where: { id: existing.id },
      data,
      select: { id: true, name: true, slug: true, isActive: true },
    });
  } catch {
    throw httpError(409, "CONFLICT", "Category slug already exists");
  }
}

async function patchBrandBySlugAdmin(slug, body) {
  const details = [];
  const s = trimmedOrUndefined(slug);
  if (!s) throw badRequest(["slug is required"]);

  const isObj = body !== null && typeof body === "object" && !Array.isArray(body);
  if (!isObj) throw httpError(400, "BAD_REQUEST", "Invalid body", ["body must be an object"]);

  const hasIsActive = Object.prototype.hasOwnProperty.call(body, "isActive");
  const hasName = Object.prototype.hasOwnProperty.call(body, "name");
  const hasSlug = Object.prototype.hasOwnProperty.call(body, "slug");

  if (!hasIsActive && !hasName && !hasSlug) {
    details.push("body must include at least one of: isActive, name, slug");
  }

  if (hasIsActive && typeof body.isActive !== "boolean") details.push("isActive must be boolean");

  const name = hasName ? trimmedOrUndefined(body.name) : undefined;
  const slugRaw = hasSlug ? trimmedOrUndefined(body.slug) : undefined;

  if (hasName && !name) details.push("name is required");
  if (hasSlug && !slugRaw) details.push("slug is required");

  enforceMaxLen("name", name, LIMITS.name, details);
  enforceMaxLen("slug", slugRaw, LIMITS.slug, details);

  const nextSlug = slugRaw ? normalizeSlug(slugRaw) : undefined;
  if (nextSlug !== undefined) {
    if (nextSlug.length < 2) details.push("slug is too short");
    if (nextSlug.length > LIMITS.slug) details.push("slug is too long after normalization");
  }

  if (details.length) throw badRequest(details);

  const existing = await prisma.brand.findUnique({
    where: { slug: s },
    select: { id: true },
  });

  if (!existing) throw httpError(404, "NOT_FOUND", "Brand not found");

  const data = {};
  if (hasIsActive) data.isActive = body.isActive;
  if (name !== undefined) data.name = name;
  if (nextSlug !== undefined) data.slug = nextSlug;

  try {
    return await prisma.brand.update({
      where: { id: existing.id },
      data,
      select: { id: true, name: true, slug: true, isActive: true },
    });
  } catch {
    throw httpError(409, "CONFLICT", "Brand slug already exists");
  }
}

/* =========================
   PRODUCTS
========================= */

async function listProductsAdmin(rawQuery) {
  const { page, limit, skip, where, orderBy } = parseListProductsAdminQuery(rawQuery);

  const [total, products] = await Promise.all([
    prisma.product.count({ where }),
    prisma.product.findMany({
      where,
      orderBy,
      skip,
      take: limit,
      select: {
        id: true,
        name: true,
        slug: true,
        articleNumber: true,
        price: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
        category: { select: { id: true, name: true, slug: true, isActive: true } },
        brand: { select: { id: true, name: true, slug: true, isActive: true } },
        images: {
          select: { id: true, url: true, sortOrder: true },
          orderBy: { sortOrder: "asc" },
          take: 1,
        },
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
          take: 1,
        },
      },
    }),
  ]);

  return {
    data: mapProductsWithArticleNumberFallback(products),
    meta: {
      page,
      limit,
      total,
      totalPages: Math.max(1, Math.ceil(total / limit)),
    },
  };
}

module.exports = {
  listCategoriesAdmin,
  listBrandsAdmin,
  createCategoryAdmin,
  createBrandAdmin,
  patchCategoryBySlugAdmin,
  patchBrandBySlugAdmin,
  listProductsAdmin,
};
