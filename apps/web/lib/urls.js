export function toArray(x) {
    if (Array.isArray(x)) return x;
    if (Array.isArray(x?.content)) return x.content;
    if (Array.isArray(x?.items)) return x.items;
    return [];
}

export function withQuery(currentSearchParams, patch = {}) {
    const sp = new URLSearchParams(currentSearchParams?.toString?.() ?? currentSearchParams ?? "");
    for (const [k, v] of Object.entries(patch)) {
        if (v === undefined || v === null || v === "") sp.delete(k);
        else sp.set(k, String(v));
    }
    const qs = sp.toString();
    return qs ? `?${qs}` : "";
}

export function normalizeMeta(meta, fallbackLimit = 12) {
    const pageSize = Number(meta?.pageSize ?? meta?.limit ?? fallbackLimit) || fallbackLimit;

    const rawPageNumber = meta?.pageNumber;
    let currentPage = 1;

    if (Number.isFinite(Number(rawPageNumber))) {
        const n = Number(rawPageNumber);
        currentPage = n === 0 ? 1 : n;
        if (n >= 0 && meta?.zeroBased === true) currentPage = n + 1;
        if (n >= 0 && meta?.pageNumber === 0) currentPage = n + 1; // ако backend е 0-based
    }

    if (Number.isFinite(Number(meta?.page))) currentPage = Number(meta.page);

    const totalElements = Number(meta?.totalElements ?? meta?.total ?? meta?.count);
    const totalPages = Number(meta?.totalPages) || (Number.isFinite(totalElements) ? Math.max(1, Math.ceil(totalElements / pageSize)) : 1);

    return { currentPage, pageSize, totalElements, totalPages };
}
