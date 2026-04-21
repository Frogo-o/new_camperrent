import { revalidateTag } from "next/cache";

export const CATALOG_PRODUCTS_TAG = "catalog:products";
export const CATALOG_PRODUCT_DETAIL_TAG = "catalog:product-detail";
export const CATALOG_BRANDS_TAG = "catalog:brands";
export const CATALOG_CATEGORIES_TAG = "catalog:categories";

export function catalogProductTag(slug) {
  return `catalog:product:${String(slug || "").trim()}`;
}

export function parseJsonSafe(text) {
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

export function collectProductSlugs(...values) {
  return values
    .flatMap((value) => {
      if (!value) return [];
      if (typeof value === "string") return [value];
      if (typeof value === "object") {
        return [value.slug, value?.data?.slug];
      }
      return [];
    })
    .map((slug) => String(slug || "").trim())
    .filter(Boolean);
}

export function revalidateProductDetail(productSlugs = []) {
  revalidateTag(CATALOG_PRODUCT_DETAIL_TAG);
  for (const slug of collectProductSlugs(productSlugs)) {
    revalidateTag(catalogProductTag(slug));
  }
}

export function revalidateProductListings() {
  revalidateTag(CATALOG_PRODUCTS_TAG);
}

export function revalidateTaxonomy({ brands = false, categories = false, includeProducts = true, includeProductDetails = true } = {}) {
  if (brands) revalidateTag(CATALOG_BRANDS_TAG);
  if (categories) revalidateTag(CATALOG_CATEGORIES_TAG);
  if (includeProducts) revalidateProductListings();
  if (includeProductDetails) revalidateProductDetail();
}

export function revalidatePublicCatalog({ productSlugs = [], includeProducts = true, includeProductDetails = true, includeBrands = true, includeCategories = true } = {}) {
  if (includeProducts) revalidateProductListings();
  if (includeProductDetails) revalidateProductDetail(productSlugs);
  if (includeBrands) revalidateTag(CATALOG_BRANDS_TAG);
  if (includeCategories) revalidateTag(CATALOG_CATEGORIES_TAG);
}
