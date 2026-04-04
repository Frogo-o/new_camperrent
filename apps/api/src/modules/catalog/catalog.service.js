const { prisma } = require("../../db/prisma");
const { httpError } = require("../../utils/httpError");

const LIMITS = {
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
  return httpError(400, "BAD_REQUEST", "Invalid query params", details);
}

function enforceMaxLen(name, value, max, details) {
  if (value !== undefined && value.length > max) {
    details.push(`${name} must be at most ${max} characters`);
  }
}

function parseSeatsStrict(v) {
  if (v === undefined) return undefined;
  if (typeof v !== "string" || v.trim() === "") return undefined;
  const n = Number(v);
  if (!Number.isInteger(n)) return NaN;
  if (n < 1 || n > 12) return NaN;
  return n;
}

function parseProductsQueryStrict(query) {
  const details = [];

  const page = parseIntRequiredOrDefault(query.page, 1);
  const limit = parseIntRequiredOrDefault(query.limit, 12);

  if (!Number.isInteger(page) || page < 1) details.push("page must be an integer >= 1");
  if (!Number.isInteger(limit) || limit < 1 || limit > 60) {
    details.push("limit must be an integer between 1 and 60");
  }

  const hasBrand = parseBoolStrict(query.hasBrand);
  if (hasBrand === null) details.push("hasBrand must be 'true' or 'false'");

  const sort = String(query.sort || "newest");
  const allowedSort = new Set(["newest", "price_asc", "price_desc", "name_asc", "name_desc"]);
  if (!allowedSort.has(sort)) details.push("sort is invalid");

  const q = trimmedOrUndefined(query.q);
  const brandSlug = trimmedOrUndefined(query.brandSlug);
  const categorySlug = trimmedOrUndefined(query.categorySlug);

  enforceMaxLen("q", q, LIMITS.q, details);
  enforceMaxLen("brandSlug", brandSlug, LIMITS.brandSlug, details);
  enforceMaxLen("categorySlug", categorySlug, LIMITS.categorySlug, details);

  const seats = parseSeatsStrict(query.seats);
  if (Number.isNaN(seats)) details.push("seats must be an integer between 1 and 12");

  if (details.length) throw badRequest(details);

  const where = { isActive: true };

  if (categorySlug) {
    where.category = { slug: categorySlug, isActive: true };
  } else {
    where.category = { slug: { notIn: EXCLUDED_BY_DEFAULT }, isActive: true };
  }

  if (hasBrand === true) {
    where.brandId = { not: null };
    where.brand = { isActive: true };
  }

  if (hasBrand === false) {
    where.brandId = null;
  }

  if (hasBrand !== false && brandSlug) {
    where.brand = { slug: brandSlug, isActive: true };
  }

  if (q) {
    where.OR = [{ name: { contains: q } }, { articleNumber: { contains: q } }];
  }

  if (seats !== undefined) {
    const seatsText = `${seats} места`;
    if (where.OR) {
      where.AND = [{ OR: where.OR }, { name: { contains: seatsText } }];
      delete where.OR;
    } else {
      where.name = { contains: seatsText };
    }
  }

  const orderBy =
    sort === "price_asc"
      ? { price: "asc" }
      : sort === "price_desc"
      ? { price: "desc" }
      : sort === "name_asc"
      ? { name: "asc" }
      : sort === "name_desc"
      ? { name: "desc" }
      : { createdAt: "desc" };

  const skip = (page - 1) * limit;

  return { page, limit, skip, where, orderBy };
}

function withArticleNumberFallback(p) {
  return {
    ...p,
    articleNumber: p.articleNumber ?? MISSING_ARTICLE_NUMBER_TEXT,
  };
}

function mapProductsWithArticleNumberFallback(products) {
  return products.map(withArticleNumberFallback);
}

async function listCategories() {
  return prisma.category.findMany({
    where: {
      isActive: true,
      slug: { notIn: EXCLUDED_BY_DEFAULT },
    },
    select: { id: true, name: true, slug: true, isActive: true },
    orderBy: { name: "asc" },
  });
}

async function getBrands() {
  return prisma.brand.findMany({
    where: { isActive: true },
    select: { id: true, name: true, slug: true, isActive: true },
    orderBy: { name: "asc" },
  });
}

async function listProducts(rawQuery) {
  const { page, limit, skip, where, orderBy } = parseProductsQueryStrict(rawQuery);

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
        category: { select: { id: true, name: true, slug: true, isActive: true } },
        brand: { select: { id: true, name: true, slug: true, isActive: true } },
        images: {
          select: { id: true, url: true, sortOrder: true },
          orderBy: { sortOrder: "asc" },
          take: 1,
        },
        // ✅ additional info files (nullable -> empty array)
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

async function getProductBySlug(slug) {
  const product = await prisma.product.findFirst({
    where: {
      slug,
      isActive: true,
      category: { isActive: true },
    },
    select: {
      id: true,
      name: true,
      slug: true,
      articleNumber: true,
      description: true,
      price: true,
      isActive: true,
      createdAt: true,
      category: {
        select: { id: true, name: true, slug: true, isActive: true },
      },
      brand: {
        select: { id: true, name: true, slug: true, isActive: true },
      },
      images: {
        select: { id: true, url: true, sortOrder: true },
        orderBy: { sortOrder: "asc" },
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
      },
    },
  });

  if (!product) return null;


  if (product.brand && product.brand.isActive === false) {
    product.brand = null;
  }

  return withArticleNumberFallback(product);
}

module.exports = {
  listCategories,
  getBrands,
  listProducts,
  getProductBySlug,
};
