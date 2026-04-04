"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { PriceEURWithBGN } from "../../../components/Price";
import PillToggle from "./_components/pill-toggle";
import TaxonomyModal from "./_components/taxonomy-modal";
import TaxonomyPanel from "./_components/taxonomy-panel";
import { normalizeList, safeJson, toBoolParam } from "./_components/utils";

export default function AdminProductsPage() {
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  const [q, setQ] = useState("");
  const [categorySlug, setCategorySlug] = useState("");
  const [brandSlug, setBrandSlug] = useState("");
  const [hasBrand, setHasBrand] = useState("");
  const [sort, setSort] = useState("newest");

  const [includeInactiveProducts, setIncludeInactiveProducts] = useState(false);

  const [showInactiveTaxonomy, setShowInactiveTaxonomy] = useState(true);
  const [compactView, setCompactView] = useState(true);

  const [page, setPage] = useState(1);
  const limit = 20;

  const [products, setProducts] = useState([]);
  const [meta, setMeta] = useState({ page: 1, limit, total: 0, totalPages: 1 });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const [taxBusy, setTaxBusy] = useState(false);
  const [taxErr, setTaxErr] = useState("");

  const [taxModalOpen, setTaxModalOpen] = useState(false);
  const [taxModalKind, setTaxModalKind] = useState("category");
  const [taxModalMode, setTaxModalMode] = useState("create");
  const [taxInitial, setTaxInitial] = useState({ name: "", slug: "", isActive: true });
  const [taxModalBusy, setTaxModalBusy] = useState(false);
  const [taxModalErr, setTaxModalErr] = useState("");

  async function loadTaxonomy() {
    setTaxErr("");
    setTaxBusy(true);

    const qs = showInactiveTaxonomy ? "" : "?onlyActive=true";

    const [cRes, bRes] = await Promise.all([
      fetch(`/api/admin/catalog/categories${qs}`, { cache: "no-store" }),
      fetch(`/api/admin/catalog/brands${qs}`, { cache: "no-store" }),
    ]);

    const cJson = await safeJson(cRes);
    const bJson = await safeJson(bRes);

    if (!cRes.ok) setTaxErr(cJson?.error?.message || cJson?.message || "Грешка при зареждане на категории");
    if (!bRes.ok) setTaxErr(bJson?.error?.message || bJson?.message || "Грешка при зареждане на брандове");

    setCategories(normalizeList(cJson));
    setBrands(normalizeList(bJson));
    setTaxBusy(false);
  }

  useEffect(() => {
    loadTaxonomy();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showInactiveTaxonomy]);

  const queryKey = useMemo(() => {
    return JSON.stringify({
      q,
      categorySlug,
      brandSlug,
      hasBrand,
      sort,
      page,
      limit,
      includeInactiveProducts,
    });
  }, [q, categorySlug, brandSlug, hasBrand, sort, page, limit, includeInactiveProducts]);

  useEffect(() => {
    const t = setTimeout(async () => {
      setLoading(true);
      setErr("");

      const sp = new URLSearchParams();
      sp.set("page", String(page));
      sp.set("limit", String(limit));
      sp.set("sort", sort);

      if (q.trim()) sp.set("q", q.trim());
      if (categorySlug) sp.set("categorySlug", categorySlug);

      if (hasBrand === "true") sp.set("hasBrand", "true");
      if (hasBrand === "false") sp.set("hasBrand", "false");
      if (brandSlug && hasBrand !== "false") sp.set("brandSlug", brandSlug);

      if (includeInactiveProducts) sp.set("includeInactive", "true");
      else sp.set("includeInactive", "false");

      const res = await fetch(`/api/admin/catalog/products?${sp.toString()}`, { cache: "no-store" });
      const json = await safeJson(res);

      if (!res.ok) {
        const msg = json?.error?.message || json?.message || "Грешка при зареждане на продукти";
        setErr(msg);
        setProducts([]);
        setMeta({ page, limit, total: 0, totalPages: 1 });
        setLoading(false);
        return;
      }

      setProducts(Array.isArray(json?.data) ? json.data : []);
      setMeta(json?.meta || { page, limit, total: 0, totalPages: 1 });
      setLoading(false);
    }, 200);

    return () => clearTimeout(t);
  }, [queryKey]);

  useEffect(() => {
    if (hasBrand === "false") setBrandSlug("");
  }, [hasBrand]);

  const canPrev = meta.page > 1;
  const canNext = meta.page < meta.totalPages;

  function resetFilters() {
    setQ("");
    setCategorySlug("");
    setBrandSlug("");
    setHasBrand("");
    setSort("newest");
    setIncludeInactiveProducts(false);
    setPage(1);
  }

  function openCreate(kind) {
    setTaxModalErr("");
    setTaxModalKind(kind);
    setTaxModalMode("create");
    setTaxInitial({ name: "", slug: "", isActive: true });
    setTaxModalOpen(true);
  }

  function openEdit(kind, item) {
    setTaxModalErr("");
    setTaxModalKind(kind);
    setTaxModalMode("edit");
    setTaxInitial({ name: item?.name || "", slug: item?.slug || "", isActive: item?.isActive !== false });
    setTaxModalOpen(true);
  }

  function closeTaxModal() {
    setTaxModalOpen(false);
    setTaxModalBusy(false);
    setTaxModalErr("");
  }

  async function createTaxonomy(kind, payload) {
    setTaxModalErr("");
    setTaxModalBusy(true);

    const url = kind === "category" ? "/api/admin/catalog/categories" : "/api/admin/catalog/brands";

    const res = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ name: payload.name, slug: payload.slug }),
    });

    const json = await safeJson(res);

    if (!res.ok) {
      setTaxModalErr(json?.error?.message || json?.message || "Грешка при създаване");
      setTaxModalBusy(false);
      return;
    }

    if (payload.isActive === false) {
      const slug = json?.data?.slug;
      if (slug) {
        const patchUrl =
          kind === "category"
            ? `/api/admin/catalog/categories/${encodeURIComponent(slug)}`
            : `/api/admin/catalog/brands/${encodeURIComponent(slug)}`;

        await fetch(patchUrl, {
          method: "PATCH",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ isActive: false }),
        });
      }
    }

    await loadTaxonomy();
    setTaxModalBusy(false);
    closeTaxModal();
  }

  async function patchTaxonomy(kind, originalSlug, payload) {
    setTaxModalErr("");
    setTaxModalBusy(true);

    const url =
      kind === "category"
        ? `/api/admin/catalog/categories/${encodeURIComponent(originalSlug)}`
        : `/api/admin/catalog/brands/${encodeURIComponent(originalSlug)}`;

    const res = await fetch(url, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        name: payload.name,
        slug: payload.slug,
        isActive: payload.isActive,
      }),
    });

    const json = await safeJson(res);

    if (!res.ok) {
      setTaxModalErr(json?.error?.message || json?.message || "Грешка при промяна");
      setTaxModalBusy(false);
      return;
    }

    const newSlug = json?.data?.slug;
    if (kind === "category" && categorySlug && categorySlug === originalSlug && newSlug && newSlug !== originalSlug) {
      setCategorySlug(newSlug);
    }
    if (kind === "brand" && brandSlug && brandSlug === originalSlug && newSlug && newSlug !== originalSlug) {
      setBrandSlug(newSlug);
    }

    await loadTaxonomy();
    setTaxModalBusy(false);
    closeTaxModal();
  }

  function submitTaxonomy(payload) {
    if (taxModalMode === "create") return createTaxonomy(taxModalKind, payload);
    return patchTaxonomy(taxModalKind, taxInitial.slug, payload);
  }

  return (
    <div className="mx-auto max-w-6xl p-6">
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <h1 className="text-2xl font-bold text-slate-900">Админ каталог</h1>

        <div className="ml-auto flex flex-wrap gap-2">
          <Link
            href="/admin/requests"
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50"
          >
            Към поръчки
          </Link>
        
          <Link
            href="/admin/products/new"
            className="rounded-lg bg-sky-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-700"
          >
            + Продукт
          </Link>

          <button
            type="button"
            onClick={() => openCreate("category")}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm transition hover:bg-slate-50"
          >
            + Категория
          </button>

          <button
            type="button"
            onClick={() => openCreate("brand")}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm transition hover:bg-slate-50"
          >
            + Бранд
          </button>
        </div>
      </div>

      <TaxonomyModal
        open={taxModalOpen}
        kind={taxModalKind}
        mode={taxModalMode}
        initial={taxInitial}
        busy={taxModalBusy}
        error={taxModalErr}
        onClose={closeTaxModal}
        onSubmit={submitTaxonomy}
      />

      <div className="mb-4 grid gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-wrap items-center gap-2">
          <PillToggle
            label={includeInactiveProducts ? "Показва: Неактивни продукти" : "Показва: Активни продукти"}
            checked={includeInactiveProducts}
            onChange={(v) => {
              setPage(1);
              setIncludeInactiveProducts(v);
            }}
          />

          <PillToggle
            label="Покажи неактивни категории/брандове"
            checked={showInactiveTaxonomy}
            onChange={setShowInactiveTaxonomy}
          />

          <PillToggle
            label={compactView ? "Компактен изглед" : "Нормален изглед"}
            checked={compactView}
            onChange={setCompactView}
          />

          <button
            type="button"
            onClick={resetFilters}
            className="ml-auto rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm transition hover:bg-slate-50"
          >
            Reset
          </button>
        </div>

        <div className="grid gap-3 lg:grid-cols-[1fr_240px_240px_220px] lg:items-end">
          <div>
            <label className="mb-1 block text-xs text-slate-600">Търсене</label>
            <input
              value={q}
              onChange={(e) => {
                setPage(1);
                setQ(e.target.value);
              }}
              placeholder="Търси по име, артикулен номер..."
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900 shadow-sm outline-none transition focus:border-slate-300 focus:ring-4 focus:ring-slate-100"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs text-slate-600">Категория</label>
            <select
              value={categorySlug}
              onChange={(e) => {
                setPage(1);
                setCategorySlug(e.target.value);
              }}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900 shadow-sm outline-none transition focus:border-slate-300 focus:ring-4 focus:ring-slate-100"
            >
              <option value="">Всички</option>
              {categories.map((c) => (
                <option key={c.id} value={c.slug}>
                  {c.name}
                  {c.isActive ? "" : " (inactive)"}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-xs text-slate-600">Бранд</label>
            <select
              value={brandSlug}
              onChange={(e) => {
                setPage(1);
                setBrandSlug(e.target.value);
                setHasBrand(e.target.value ? "true" : "");
              }}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900 shadow-sm outline-none transition focus:border-slate-300 focus:ring-4 focus:ring-slate-100"
            >
              <option value="">Всички</option>
              {brands.map((b) => (
                <option key={b.id} value={b.slug}>
                  {b.name}
                  {b.isActive ? "" : " (inactive)"}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-xs text-slate-600">Сортиране</label>
            <select
              value={sort}
              onChange={(e) => {
                setPage(1);
                setSort(e.target.value);
              }}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900 shadow-sm outline-none transition focus:border-slate-300 focus:ring-4 focus:ring-slate-100"
            >
              <option value="newest">Най-нови</option>
              <option value="oldest">Най-стари</option>
              <option value="price_asc">Цена (възх.)</option>
              <option value="price_desc">Цена (низх.)</option>
              <option value="name_asc">Име (A-Z)</option>
              <option value="name_desc">Име (Z-A)</option>
            </select>
          </div>
        </div>

        {taxErr ? <div className="text-sm text-red-700">{taxErr}</div> : null}
        {err ? <div className="text-sm text-red-700">{err}</div> : null}

        <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600">
          <div>{loading ? "Зареждане..." : `Общо: ${meta.total} • Страница ${meta.page}/${meta.totalPages}`}</div>
        </div>
      </div>

      {compactView ? (
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="grid grid-cols-[96px_1fr_160px_140px] gap-3 border-b border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-600">
            <div>Снимка</div>
            <div>Име</div>
            <div className="text-right">Цена</div>
            <div className="text-right">Статус</div>
          </div>

          <div className="divide-y divide-slate-200">
            {products.map((p) => {
              const img = p?.images?.[0]?.url || "";
              const inactive = p?.isActive === false;

              const articleNumber = String(p?.articleNumber || "").trim();
              const articleLabel = articleNumber ? articleNumber : String(p?.id || "");

              return (
                <Link
                  key={p.id}
                  href={`/admin/edit-product/${p.slug}`}
                  className={[
                    "grid grid-cols-[96px_1fr_160px_140px] items-center gap-3 px-3 py-3 transition hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-slate-100",
                    inactive ? "bg-amber-50/40" : "",
                  ].join(" ")}
                >
                  <div className="h-16 w-24 overflow-hidden rounded-lg border border-slate-200 bg-slate-50">
                    {img ? (
                      <img
                        src={img}
                        alt={p.name}
                        className="h-full w-full object-contain p-1"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                        draggable={false}
                      />
                    ) : null}
                  </div>

                  <div className="min-w-0">
                    <div className="truncate text-sm font-semibold text-slate-900">{p.name}</div>
                    <div className="mt-0.5 text-xs text-slate-500">
                      Арт. № {articleLabel} • {p?.category?.name || "—"} • {p?.brand?.name || "Без марка"}
                    </div>
                  </div>

                  <div className="text-right">
                    <PriceEURWithBGN cents={p.price} />
                  </div>

                  <div className="text-right">
                    <span
                      className={[
                        "inline-flex items-center rounded-full border px-2 py-1 text-xs",
                        inactive
                          ? "border-amber-300 bg-amber-50 text-amber-800"
                          : "border-emerald-200 bg-emerald-50 text-emerald-800",
                      ].join(" ")}
                    >
                      {inactive ? "Inactive" : "Active"}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((p) => {
            const img = p?.images?.[0]?.url || "";
            const inactive = p?.isActive === false;

            const articleNumber = String(p?.articleNumber || "").trim();
            const articleLabel = articleNumber ? articleNumber : String(p?.id || "");

            return (
              <Link
                key={p.id}
                href={`/admin/edit-product/${p.slug}`}
                className={[
                  "group block overflow-hidden rounded-xl border bg-white shadow-sm transition focus:outline-none focus:ring-4 focus:ring-slate-100",
                  inactive ? "border-amber-200" : "border-slate-200 hover:-translate-y-0.5 hover:shadow-md",
                ].join(" ")}
              >
                <div className="aspect-[4/3] bg-slate-50">
                  {img ? (
                    <img
                      src={img}
                      alt={p.name}
                      className="h-full w-full object-cover transition group-hover:scale-[1.02]"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                      draggable={false}
                    />
                  ) : null}
                </div>

                <div className="grid gap-1 p-3">
                  <div className="line-clamp-2 text-sm font-semibold text-slate-900">{p.name}</div>
                  <div className="text-xs text-slate-500">Арт. № {articleLabel}</div>
                  <PriceEURWithBGN cents={p.price} />
                </div>
              </Link>
            );
          })}
        </div>
      )}

      <div className="mt-5 flex justify-center gap-3">
        <button
          type="button"
          disabled={!canPrev || loading}
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          className={[
            "rounded-lg border px-3 py-2 text-sm shadow-sm transition",
            canPrev && !loading
              ? "border-slate-200 bg-white text-slate-900 hover:bg-slate-50"
              : "border-slate-200 bg-slate-50 text-slate-400",
          ].join(" ")}
        >
          Предишна
        </button>

        <button
          type="button"
          disabled={!canNext || loading}
          onClick={() => setPage((p) => Math.min(meta.totalPages || 1, p + 1))}
          className={[
            "rounded-lg border px-3 py-2 text-sm shadow-sm transition",
            canNext && !loading
              ? "border-slate-200 bg-white text-slate-900 hover:bg-slate-50"
              : "border-slate-200 bg-slate-50 text-slate-400",
          ].join(" ")}
        >
          Следваща
        </button>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <TaxonomyPanel title="Категории" items={categories} busy={taxBusy} onEdit={(item) => openEdit("category", item)} />
        <TaxonomyPanel title="Брандове" items={brands} busy={taxBusy} onEdit={(item) => openEdit("brand", item)} />
      </div>
    </div>
  );
}
