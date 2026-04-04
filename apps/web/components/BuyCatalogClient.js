"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { PriceEURWithBGN } from "../components/Price";

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
                        activeAll ? "bg-sky-500 text-white" : "text-slate-700 hover:bg-slate-50 hover:text-slate-900",
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
                                active ? "bg-sky-500 text-white" : "text-slate-700 hover:bg-slate-50 hover:text-slate-900",
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

export default function BuyCatalogClient() {
    const BUY_SLUG = "buy-camper";

    const [brands, setBrands] = useState([]);

    const [q, setQ] = useState("");
    const [hasBrand, setHasBrand] = useState("");
    const [brandSlug, setBrandSlug] = useState("");
    const [sort, setSort] = useState("newest");

    const [page, setPage] = useState(1);
    const limit = 12;

    const [products, setProducts] = useState([]);
    const [meta, setMeta] = useState({ page: 1, limit, total: 0, totalPages: 1 });
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState("");

    useEffect(() => {
        (async () => {
            const bRes = await fetch("/api/catalog/brands", { cache: "no-store" });
            const bJson = await bRes.json().catch(() => null);
            setBrands(normalizeList(bJson));
        })();
    }, []);

    const queryKey = useMemo(() => {
        return JSON.stringify({ q, hasBrand, brandSlug, sort, page, limit });
    }, [q, hasBrand, brandSlug, sort, page, limit]);

    useEffect(() => {
        const t = setTimeout(async () => {
            setLoading(true);
            setErr("");

            const sp = new URLSearchParams();
            sp.set("page", String(page));
            sp.set("limit", String(limit));
            sp.set("sort", sort);

            sp.set("categorySlug", BUY_SLUG);

            if (q.trim()) sp.set("q", q.trim());

            if (hasBrand === "true") sp.set("hasBrand", "true");
            if (hasBrand === "false") sp.set("hasBrand", "false");

            if (brandSlug && hasBrand !== "false") sp.set("brandSlug", brandSlug);

            const res = await fetch(`/api/catalog/products?${sp.toString()}`, { cache: "no-store" });
            const json = await res.json().catch(() => null);

            if (!res.ok) {
                const msg = json?.message || "Грешка при зареждане на кемпери за покупка";
                setErr(msg);
                setProducts([]);
                setMeta({ page, limit, total: 0, totalPages: 1 });
                setLoading(false);
                return;
            }

            setProducts(Array.isArray(json?.data) ? json.data : []);
            setMeta(json?.meta || { page, limit, total: 0, totalPages: 1 });
            setLoading(false);
        }, 250);

        return () => clearTimeout(t);
    }, [queryKey]);

    useEffect(() => {
        if (hasBrand === "false") setBrandSlug("");
    }, [hasBrand]);

    const canPrev = meta.page > 1;
    const canNext = meta.page < meta.totalPages;

    return (
        <div className="mx-auto max-w-6xl p-6">
            <h1 className="mb-4 text-2xl font-bold text-slate-900">Купи кемпер</h1>

            <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
                <aside className="grid gap-4">
                    <BrandSidebar
                        brands={brands}
                        brandSlug={brandSlug}
                        setBrandSlug={setBrandSlug}
                        setHasBrand={setHasBrand}
                        setPage={setPage}
                    />
                </aside>

                <main>
                    <div className="mb-4 grid gap-3 lg:grid-cols-[1fr_220px] lg:items-end">
                        <div>
                            <label className="mb-1 block text-xs text-slate-600">Търсене</label>
                            <input
                                value={q}
                                onChange={(e) => {
                                    setPage(1);
                                    setQ(e.target.value);
                                }}
                                placeholder="Търсене (име или арт. номер)..."
                                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900 shadow-sm outline-none transition focus:border-slate-300 focus:ring-4 focus:ring-slate-100"
                            />
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
                                <option value="price_asc">Цена (възх.)</option>
                                <option value="price_desc">Цена (низх.)</option>
                                <option value="name_asc">Име (A-Z)</option>
                                <option value="name_desc">Име (Z-A)</option>
                            </select>
                        </div>
                    </div>

                    <div className="mb-3 flex flex-wrap items-center gap-3">
                        <button
                            type="button"
                            onClick={() => {
                                setQ("");
                                setHasBrand("");
                                setBrandSlug("");
                                setSort("newest");
                                setPage(1);
                            }}
                            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm transition hover:bg-slate-50"
                        >
                            Reset
                        </button>

                        <div className="text-sm text-slate-600">
                            {loading ? "Зареждане..." : `Общо: ${meta.total} • Страница ${meta.page}/${meta.totalPages}`}
                        </div>

                        {err ? <div className="ml-auto text-sm text-red-700">{err}</div> : null}
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {products.map((p) => {
                            const img = p?.images?.[0]?.url || "";
                            const articleNumber = p?.articleNumber || "";

                            return (
                                <Link
                                    key={p.id}
                                    href={`/product/${p.slug}`}
                                    className="group block overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-slate-100"
                                >
                                    <div className="aspect-[4/3] bg-slate-50">
                                        {img ? (
                                            <img
                                                src={img}
                                                alt={p.name}
                                                className="block h-full w-full object-cover transition group-hover:scale-[1.02]"
                                                onError={(e) => {
                                                    e.currentTarget.style.display = "none";
                                                }}
                                            />
                                        ) : null}
                                    </div>

                                    <div className="grid gap-1 p-3">
                                        <div className="line-clamp-2 text-sm font-semibold text-slate-900">
                                            {p.name}
                                        </div>

                                        <div className="text-xs text-slate-500">
                                            Арт. № {articleNumber}
                                        </div>

                                        <PriceEURWithBGN cents={p.price} />
                                    </div>
                                </Link>
                            );
                        })}
                    </div>

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
                </main>
            </div>
        </div>
    );
}
