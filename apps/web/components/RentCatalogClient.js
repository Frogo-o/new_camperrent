"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { PriceEURWithBGN } from "../components/Price";

function SeatsSidebar({ seats, setSeats, setPage }) {
  const options = [
    { label: "Всички", value: "" },
    { label: "4 места", value: "4" },
    { label: "5 места", value: "5" },
    { label: "6 места", value: "6" },
    { label: "7 места", value: "7" },
  ];

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-3 text-sm font-semibold text-slate-900">Брой места</div>

      <div className="grid gap-1">
        {options.map((o) => {
          const active = String(seats || "") === String(o.value || "");

          return (
            <button
              key={o.label}
              type="button"
              onClick={() => {
                setPage(1);
                setSeats(o.value);
              }}
              className={[
                "rounded-lg px-3 py-2 text-left text-sm transition",
                active ? "bg-sky-500 text-white" : "text-slate-700 hover:bg-slate-50 hover:text-slate-900",
              ].join(" ")}
            >
              {o.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function RentCatalogClient() {
  const RENT_SLUG = "camper-rent";

  const [q, setQ] = useState("");
  const [seats, setSeats] = useState("");
  const [sort, setSort] = useState("newest");

  const [page, setPage] = useState(1);
  const limit = 12;

  const [products, setProducts] = useState([]);
  const [meta, setMeta] = useState({ page: 1, limit, total: 0, totalPages: 1 });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const queryKey = useMemo(() => {
    return JSON.stringify({ q, seats, sort, page, limit });
  }, [q, seats, sort, page, limit]);

  useEffect(() => {
    const t = setTimeout(async () => {
      setLoading(true);
      setErr("");

      const sp = new URLSearchParams();
      sp.set("page", String(page));
      sp.set("limit", String(limit));
      sp.set("sort", sort);
      sp.set("categorySlug", RENT_SLUG);

      const qTrim = q.trim();
      if (qTrim) sp.set("q", qTrim);

      const seatsTrim = String(seats || "").trim();
      if (seatsTrim) sp.set("seats", seatsTrim);

      const res = await fetch(`/api/catalog/products?${sp.toString()}`, { cache: "no-store" });
      const json = await res.json().catch(() => null);

      if (!res.ok) {
        const msg = json?.message || "Грешка при зареждане на кемпери";
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

  const canPrev = meta.page > 1;
  const canNext = meta.page < meta.totalPages;

  return (
    <div className="mx-auto max-w-6xl p-6">
      <h1 className="mb-2 text-2xl font-bold text-slate-900">Наеми кемпер</h1>
      <div className="mb-4 text-sm text-slate-600">Цените са в евро за ден наем</div>

      <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
        <aside className="grid gap-4">
          <SeatsSidebar seats={seats} setSeats={setSeats} setPage={setPage} />
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
                placeholder="Напр. PLA, Hymer..."
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900 shadow-sm outline-none transition focus:border-slate-300 focus:ring-4 focus:ring-slate-100"
              />
              {seats ? (
                <div className="mt-1 text-xs text-slate-500">
                  Активен филтър: {seats} места
                </div>
              ) : null}
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
                setSeats("");
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
              const articleNumber = p?.sku || p?.articleNumber || "";

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
                        className="h-full w-full object-cover transition group-hover:scale-[1.02]"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    ) : null}
                  </div>

                  <div className="grid gap-1 p-3">
                    <div className="line-clamp-2 text-sm font-semibold text-slate-900">{p.name}</div>

                    {articleNumber ? <div className="text-xs text-slate-500">Арт. № {articleNumber}</div> : null}

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
