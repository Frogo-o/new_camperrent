"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { PriceEURWithBGN } from "@/components/Price";

function normalizeList(x) {
  if (Array.isArray(x)) return x;
  if (x && Array.isArray(x.data)) return x.data;
  return [];
}

function BrandSidebar({ brands = [], brandSlug, setBrandSlug, setHasBrand, setPage }) {
  const activeAll = !brandSlug;

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-3 text-sm font-semibold text-slate-900">Марки</div>

      <div className="grid gap-1">
        <button
          type="button"
          onClick={() => {
            setPage(1);
            setBrandSlug("");
            setHasBrand("");
          }}
          className={[
            "rounded-lg px-3 py-2 text-left text-sm transition",
            activeAll
              ? "bg-sky-500 text-white"
              : "text-slate-700 hover:bg-slate-50 hover:text-slate-900",
          ].join(" ")}
        >
          Всички
        </button>

        {brands.map((b) => {
          const active = brandSlug === b.slug;

          return (
            <button
              key={b.id}
              type="button"
              onClick={() => {
                setPage(1);
                setBrandSlug(b.slug);
                setHasBrand("true");
              }}
              className={[
                "rounded-lg px-3 py-2 text-left text-sm transition",
                active
                  ? "bg-sky-500 text-white"
                  : "text-slate-700 hover:bg-slate-50 hover:text-slate-900",
              ].join(" ")}
            >
              {b.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function CategoryTopBar({ categories, categorySlug, setCategorySlug, setPage }) {
  return (
    <div className="mb-6 rounded-xl bg-sky-500 p-3 shadow-sm">
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => {
            setPage(1);
            setCategorySlug("");
          }}
          className={[
            "rounded-lg px-4 py-2 text-sm font-medium transition",
            !categorySlug
              ? "bg-white text-sky-600"
              : "text-white hover:bg-sky-600",
          ].join(" ")}
        >
          Всички
        </button>

        {categories.map((c) => {
          const active = categorySlug === c.slug;

          return (
            <button
              key={c.id}
              type="button"
              onClick={() => {
                setPage(1);
                setCategorySlug(c.slug);
              }}
              className={[
                "rounded-lg px-4 py-2 text-sm font-medium transition",
                active
                  ? "bg-white text-sky-600"
                  : "text-white hover:bg-sky-600",
              ].join(" ")}
            >
              {c.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function CatalogClient() {
  const searchInputRef = useRef(null);

  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  const [q, setQ] = useState("");
  const [categorySlug, setCategorySlug] = useState("");
  const [hasBrand, setHasBrand] = useState("");
  const [brandSlug, setBrandSlug] = useState("");
  const [sort, setSort] = useState("newest");

  const [page, setPage] = useState(1);
  const limit = 20;

  const [products, setProducts] = useState([]);
  const [meta, setMeta] = useState({ page: 1, limit, total: 0, totalPages: 1 });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    function focusSearchInput() {
      const timer = window.setTimeout(() => {
        searchInputRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
        searchInputRef.current?.focus({ preventScroll: true });
      }, 100);

      return timer;
    }

    let timer = null;

    if (sessionStorage.getItem("catalogFocusSearch") === "true") {
      sessionStorage.removeItem("catalogFocusSearch");
      timer = focusSearchInput();
    }

    function handleFocusSearch() {
      sessionStorage.removeItem("catalogFocusSearch");
      if (timer) window.clearTimeout(timer);
      timer = focusSearchInput();
    }

    window.addEventListener("catalog:focus-search", handleFocusSearch);

    return () => {
      if (timer) window.clearTimeout(timer);
      window.removeEventListener("catalog:focus-search", handleFocusSearch);
    };
  }, []);

  useEffect(() => {
    const pendingCategory = sessionStorage.getItem("catalogCategorySlug");
    const pendingBrand = sessionStorage.getItem("catalogBrandSlug");

    if (pendingCategory) {
      setCategorySlug(pendingCategory);
      setBrandSlug("");
      setHasBrand("");
      setPage(1);
      sessionStorage.removeItem("catalogCategorySlug");
    }

    if (pendingBrand) {
      setBrandSlug(pendingBrand);
      setHasBrand("true");
      setPage(1);
      sessionStorage.removeItem("catalogBrandSlug");
    }
  }, []);

  useEffect(() => {
    (async () => {
      const [cRes, bRes] = await Promise.all([
        fetch("/api/catalog/categories", { cache: "no-store" }),
        fetch("/api/catalog/brands", { cache: "no-store" }),
      ]);

      const cJson = await cRes.json().catch(() => null);
      const bJson = await bRes.json().catch(() => null);

      setCategories(normalizeList(cJson));
      setBrands(normalizeList(bJson));
    })();
  }, []);

  const queryKey = useMemo(() => {
    return JSON.stringify({ q, categorySlug, hasBrand, brandSlug, sort, page, limit });
  }, [q, categorySlug, hasBrand, brandSlug, sort, page, limit]);

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

      const res = await fetch(`/api/catalog/products?${sp.toString()}`, {
        cache: "no-store",
      });
      const json = await res.json().catch(() => null);

      if (!res.ok) {
        setErr(json?.message || "Грешка при зареждане на продукти");
        setProducts([]);
        setMeta({ page, limit, total: 0, totalPages: 1 });
        setLoading(false);
        return;
      }

      setProducts(Array.isArray(json?.data) ? json.data : []);
      setMeta(json?.meta || { page, limit, total: 0, totalPages: 1 });
      setLoading(false);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, 250);

    return () => clearTimeout(t);
  }, [queryKey, page, limit, sort, q, categorySlug, hasBrand, brandSlug]);

  const canPrev = meta.page > 1;
  const canNext = meta.page < meta.totalPages;

  return (
    <div className="mx-auto max-w-7xl p-6">
      <h1 className="mb-4 text-2xl font-bold text-slate-900">Каталог</h1>

      <CategoryTopBar
        categories={categories}
        categorySlug={categorySlug}
        setCategorySlug={setCategorySlug}
        setPage={setPage}
      />

      <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
        <aside>
          <BrandSidebar
            brands={brands}
            brandSlug={brandSlug}
            setBrandSlug={setBrandSlug}
            setHasBrand={setHasBrand}
            setPage={setPage}
          />
        </aside>

        <main>
          <div className="mb-4 grid gap-3 md:grid-cols-2 xl:grid-cols-[1fr_220px]">
            <input
              ref={searchInputRef}
              value={q}
              onChange={(e) => {
                setPage(1);
                setQ(e.target.value);
              }}
              placeholder="Търсене (име или арт. номер)..."
              className="w-full rounded-lg border border-slate-200 px-3 py-2 shadow-sm outline-none focus:border-sky-400"
            />

            <select
              value={sort}
              onChange={(e) => {
                setPage(1);
                setSort(e.target.value);
              }}
              className="rounded-lg border border-slate-200 px-3 py-2 shadow-sm outline-none focus:border-sky-400"
            >
              <option value="newest">Най-нови</option>
              <option value="price_asc">Цена ↑</option>
              <option value="price_desc">Цена ↓</option>
            </select>
          </div>

          {loading ? (
            <div className="py-16 text-center text-sm text-slate-500">Зареждане...</div>
          ) : products.length === 0 ? (
            <div className="py-16 text-center text-sm text-slate-500">
              Няма намерени продукти
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((p) => {
                const img = p?.images?.[0]?.url || "";
                const articleNumber = p?.articleNumber || "";

                return (
                  <Link
                    key={p.id}
                    href={`/product/${p.slug}`}
                    className="group block overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <div className="aspect-[4/3] bg-slate-50">
                      {img ? (
                        <img
                          src={img}
                          alt={p.name}
                          className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-sm text-slate-400">
                          Няма снимка
                        </div>
                      )}
                    </div>

                    <div className="grid gap-1 p-3">
                      <div className="line-clamp-2 min-h-[40px] text-sm font-semibold text-slate-900">
                        {p.name}
                      </div>

                      <div className="text-xs text-slate-500">Арт. № {articleNumber}</div>

                      <div className="pt-1">
                        <PriceEURWithBGN cents={p.price} />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}

          <div className="mt-6 flex items-center justify-center gap-3">
            <button
              disabled={!canPrev}
              onClick={() => setPage((prev) => prev - 1)}
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Предишна
            </button>

            <div className="text-sm text-slate-600">
              Страница {meta.page} от {meta.totalPages || 1}
            </div>

            <button
              disabled={!canNext}
              onClick={() => setPage((prev) => prev + 1)}
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Следваща
            </button>
          </div>

          {err && <div className="mt-4 text-center text-sm text-red-700">{err}</div>}
        </main>
      </div>
    </div>
  );
}
