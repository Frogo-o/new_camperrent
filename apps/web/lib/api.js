const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:4000";

async function readJsonSafe(res) {
  const text = await res.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

function joinUrl(base, path) {
  if (!base) return path;
  if (base.endsWith("/") && path.startsWith("/")) return base.slice(0, -1) + path;
  if (!base.endsWith("/") && !path.startsWith("/")) return base + "/" + path;
  return base + path;
}

async function apiGet(path) {
  const url = joinUrl(API_BASE_URL, path);

  let res;
  try {
    res = await fetch(url, { cache: "no-store" });
  } catch (e) {
    const err = new Error(`API unreachable: ${url}`);
    err.status = 0;
    err.cause = e;
    throw err;
  }

  const json = await readJsonSafe(res);

  if (!res.ok) {
    const err = new Error(json?.message || `Request failed: ${res.status}`);
    err.status = res.status;
    err.body = json;
    throw err;
  }

  return json;
}

export async function getCategories() {
  const json = await apiGet("/api/catalog/categories");
  return Array.isArray(json?.data) ? json.data : Array.isArray(json) ? json : [];
}

export async function getBrands() {
  const json = await apiGet("/api/catalog/brands");
  return Array.isArray(json?.data) ? json.data : Array.isArray(json) ? json : [];
}

export async function getProducts(params = {}) {
  const sp = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (v === undefined || v === null || v === "") continue;
    sp.set(k, String(v));
  }

  const qs = sp.toString();
  const json = await apiGet(`/api/catalog/products${qs ? `?${qs}` : ""}`);

  return {
    data: Array.isArray(json?.data) ? json.data : [],
    meta: json?.meta || { page: 1, limit: 12, total: 0, totalPages: 1 },
  };
}

export async function getProductBySlug(slug) {
  if (!slug) return null;

  const safe = encodeURIComponent(String(slug));

  try {
    const json = await apiGet(`/api/catalog/products/${safe}`);

    // backend може да връща или {data: {...}} или директно {...}
    if (json && typeof json === "object" && "data" in json) return json.data || null;
    return json || null;
  } catch (e) {
    // важно: 404 да стане null, за да може page.js да notFound()
    if (e?.status === 404) return null;
    throw e;
  }
}
