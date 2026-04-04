"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

function safeJson(res) {
  return res.json().catch(() => ({}));
}

function safeText(v) {
  return String(v ?? "").trim();
}

function formatDate(iso) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleString("bg-BG", { year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" });
}

function formatMoneyBGNFromCentsEUR(totalCents) {
  const eur = Number(totalCents || 0) / 100;
  const bgn = eur * 1.95583;
  const bgnFormatted = new Intl.NumberFormat("bg-BG", { style: "currency", currency: "BGN", minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(bgn);
  const eurFormatted = new Intl.NumberFormat("bg-BG", { style: "currency", currency: "EUR", minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(eur);
  return { eurFormatted, bgnFormatted };
}

function StatusPill({ v }) {
  const isDone = v === "COMPLETED";
  return (
    <span
      className={[
        "inline-flex items-center rounded-full border px-2 py-1 text-xs font-semibold",
        isDone ? "border-emerald-200 bg-emerald-50 text-emerald-800" : "border-sky-200 bg-sky-50 text-sky-800",
      ].join(" ")}
    >
      {isDone ? "Приключена" : "Активна"}
    </span>
  );
}

export default function AdminRequestsPage() {
  const [status, setStatus] = useState("");
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const size = 30;

  const [rows, setRows] = useState([]);
  const [meta, setMeta] = useState({ total: 0, pageNumber: 1, pageSize: size });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const queryKey = useMemo(() => JSON.stringify({ status, q, page, size }), [status, q, page, size]);

  useEffect(() => {
    const t = setTimeout(async () => {
      setLoading(true);
      setErr("");

      const sp = new URLSearchParams();
      sp.set("page", String(page));
      sp.set("size", String(size));
      if (status) sp.set("status", status);

      const res = await fetch(`/api/admin/requests?${sp.toString()}`, { cache: "no-store" });
      const json = await safeJson(res);

      if (!res.ok) {
        setErr(json?.error?.message || json?.message || "Грешка при зареждане");
        setRows([]);
        setMeta({ total: 0, pageNumber: page, pageSize: size });
        setLoading(false);
        return;
      }

      let content = Array.isArray(json?.content) ? json.content : [];
      const needle = safeText(q).toLowerCase();
      if (needle) {
        content = content.filter((x) => {
          const name = safeText(x?.customerName).toLowerCase();
          const itemName = safeText(x?.itemName).toLowerCase();
          return name.includes(needle) || itemName.includes(needle) || String(x?.id || "").includes(needle);
        });
      }

      setRows(content);
      setMeta({ total: Number(json?.total || 0), pageNumber: Number(json?.pageNumber || page), pageSize: Number(json?.pageSize || size) });
      setLoading(false);
    }, 150);

    return () => clearTimeout(t);
  }, [queryKey]);

  const canPrev = meta.pageNumber > 1;
  const canNext = meta.pageNumber * meta.pageSize < meta.total;

  return (
    <div className="mx-auto max-w-6xl p-6">
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <h1 className="text-2xl font-bold text-slate-900">Заявки</h1>
      </div>

      <div className="mb-4 grid gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="grid gap-3 lg:grid-cols-[1fr_240px_220px] lg:items-end">
          <div>
            <label className="mb-1 block text-xs text-slate-600">Търсене</label>
            <input
              value={q}
              onChange={(e) => {
                setPage(1);
                setQ(e.target.value);
              }}
              placeholder="Търси по име, артикул, №..."
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900 shadow-sm outline-none transition focus:border-slate-300 focus:ring-4 focus:ring-slate-100"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs text-slate-600">Статус</label>
            <select
              value={status}
              onChange={(e) => {
                setPage(1);
                setStatus(e.target.value);
              }}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900 shadow-sm outline-none transition focus:border-slate-300 focus:ring-4 focus:ring-slate-100"
            >
              <option value="">Всички</option>
              <option value="ACTIVE">Активни</option>
              <option value="COMPLETED">Приключени</option>
            </select>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => {
                setQ("");
                setStatus("");
                setPage(1);
              }}
              className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm transition hover:bg-slate-50"
            >
              Reset
            </button>
          </div>
        </div>

        {err ? <div className="text-sm text-red-700">{err}</div> : null}

        <div className="text-sm text-slate-600">
          {loading ? "Зареждане..." : `Общо: ${meta.total} • Страница ${meta.pageNumber}`}
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="grid grid-cols-[160px_90px_1fr_160px_140px_120px] gap-3 border-b border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-600">
          <div>Дата</div>
          <div className="text-right">№</div>
          <div>Клиент / Стока</div>
          <div className="text-right">Общо</div>
          <div className="text-right">Статус</div>
          <div className="text-right">Детайли</div>
        </div>

        <div className="divide-y divide-slate-200">
          {rows.map((r) => {
            const money = formatMoneyBGNFromCentsEUR(r.total);
            return (
              <div key={r.id} className="grid grid-cols-[160px_90px_1fr_160px_140px_120px] items-center gap-3 px-3 py-3">
                <div className="text-sm text-slate-700">{formatDate(r.createdAt)}</div>

                <div className="text-right text-sm font-semibold text-slate-900">#{r.id}</div>

                <div className="min-w-0">
                  <div className="truncate text-sm font-semibold text-slate-900">{r.customerName}</div>
                  <div className="mt-0.5 truncate text-xs text-slate-500">
                    {r.itemName || "—"} • {r.itemsCount ? `${r.itemsCount} артикула` : "Без артикули"}
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-sm font-extrabold text-slate-900">{money.eurFormatted}</div>
                  <div className="text-xs text-slate-500">{money.bgnFormatted}</div>
                </div>

                <div className="text-right">
                  <StatusPill v={r.adminStatus} />
                </div>

                <div className="text-right">
                  <Link
                    href={`/admin/requests/${r.id}`}
                    className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm transition hover:bg-slate-50"
                  >
                    Отвори
                  </Link>
                </div>
              </div>
            );
          })}

          {!rows.length && !loading ? (
            <div className="px-3 py-8 text-center text-sm text-slate-600">Няма резултати</div>
          ) : null}
        </div>
      </div>

      <div className="mt-5 flex justify-center gap-3">
        <button
          type="button"
          disabled={!canPrev || loading}
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          className={[
            "rounded-lg border px-3 py-2 text-sm shadow-sm transition",
            canPrev && !loading ? "border-slate-200 bg-white text-slate-900 hover:bg-slate-50" : "border-slate-200 bg-slate-50 text-slate-400",
          ].join(" ")}
        >
          Предишна
        </button>

        <button
          type="button"
          disabled={!canNext || loading}
          onClick={() => setPage((p) => p + 1)}
          className={[
            "rounded-lg border px-3 py-2 text-sm shadow-sm transition",
            canNext && !loading ? "border-slate-200 bg-white text-slate-900 hover:bg-slate-50" : "border-slate-200 bg-slate-50 text-slate-400",
          ].join(" ")}
        >
          Следваща
        </button>
      </div>
    </div>
  );
}
