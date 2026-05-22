const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:4000";

function joinUrl(base, path) {
  if (base.endsWith("/") && path.startsWith("/")) return base.slice(0, -1) + path;
  if (!base.endsWith("/") && !path.startsWith("/")) return `${base}/${path}`;
  return `${base}${path}`;
}

export async function getSeoCategories() {
  const url = joinUrl(API_BASE_URL, "/api/catalog/categories");
  const res = await fetch(url, { next: { revalidate: 900 } }).catch(() => null);

  if (!res) return [];

  if (!res.ok) return [];

  const json = await res.json().catch(() => null);
  return Array.isArray(json?.data) ? json.data : Array.isArray(json) ? json : [];
}
