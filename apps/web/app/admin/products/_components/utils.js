export function normalizeList(x) {
  if (Array.isArray(x)) return x;
  if (x && Array.isArray(x.data)) return x.data;
  return [];
}

export async function safeJson(res) {
  try {
    return await res.json();
  } catch {
    return null;
  }
}

export function toBoolParam(v) {
  if (v === true) return "true";
  if (v === false) return "false";
  return "";
}

export function validateSlug(slug) {
  const s = String(slug || "").trim();
  if (!s) return "Slug е задължителен";
  if (s.length > 80) return "Slug е твърде дълъг";
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(s)) {
    return "Slug трябва да е lowercase, цифри и тирета (пример: solar-panels)";
  }
  return "";
}

export function validateName(name) {
  const s = String(name || "").trim();
  if (!s) return "Име е задължително";
  if (s.length > 120) return "Името е твърде дълго";
  return "";
}
