"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";

function safeJson(res) {
  return res.json().catch(() => ({}));
}

function safeText(v) {
  return String(v ?? "").trim();
}

function formatDate(iso) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleString("bg-BG", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatEUR(cents) {
  const eur = Number(cents || 0) / 100;
  return new Intl.NumberFormat("bg-BG", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(eur);
}

function Field({ label, value }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-3">
      <div className="text-xs font-semibold text-slate-600">{label}</div>
      <div className="mt-1 break-words text-sm text-slate-900">{value || "—"}</div>
    </div>
  );
}

function StatusPill({ v }) {
  const isDone = v === "COMPLETED";
  return (
    <span
      className={[
        "inline-flex items-center rounded-full border px-2 py-1 text-xs font-semibold",
        isDone
          ? "border-emerald-200 bg-emerald-50 text-emerald-800"
          : "border-sky-200 bg-sky-50 text-sky-800",
      ].join(" ")}
    >
      {isDone ? "Приключена" : "Активна"}
    </span>
  );
}

export default function AdminRequestDetailsPage() {
  const params = useParams();
  const id = params?.id ? String(params.id) : "";

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const [busy, setBusy] = useState(false);
  const [actionErr, setActionErr] = useState("");

  const key = useMemo(() => id, [id]);

  async function load() {
    if (!id) return;

    setLoading(true);
    setErr("");

    const res = await fetch(`/api/admin/requests/${encodeURIComponent(id)}`, { cache: "no-store" });
    const json = await safeJson(res);

    if (!res.ok) {
      setErr(json?.error?.message || json?.message || "Грешка при зареждане");
      setData(null);
      setLoading(false);
      return;
    }

    setData(json?.data || null);
    setLoading(false);
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  async function setAdminStatus(next) {
    if (!id) return;

    setActionErr("");
    setBusy(true);

    const res = await fetch(`/api/admin/requests/${encodeURIComponent(id)}/status`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ adminStatus: next }),
    });

    const json = await safeJson(res);

    if (!res.ok) {
      setActionErr(json?.error?.message || json?.message || "Грешка при промяна на статус");
      setBusy(false);
      return;
    }

    await load();
    setBusy(false);
  }

  const items = Array.isArray(data?.items) ? data.items : [];

  return (
    <div className="mx-auto max-w-6xl p-6">
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <h1 className="text-2xl font-bold text-slate-900">Заявка #{id || "—"}</h1>

        <div className="ml-auto flex flex-wrap gap-2">
          <Link
            href="/admin/requests"
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm transition hover:bg-slate-50"
          >
            ← Назад
          </Link>

          {data ? (
            <div className="flex items-center gap-2">
              <StatusPill v={data.adminStatus} />
              <button
                type="button"
                disabled={busy}
                onClick={() => setAdminStatus(data.adminStatus === "COMPLETED" ? "ACTIVE" : "COMPLETED")}
                className={[
                  "rounded-lg px-3 py-2 text-sm font-semibold text-white shadow-sm transition",
                  busy ? "bg-slate-400" : "bg-sky-600 hover:bg-sky-700",
                ].join(" ")}
              >
                {data.adminStatus === "COMPLETED" ? "Направи активна" : "Приключи"}
              </button>
            </div>
          ) : null}
        </div>
      </div>

      {err ? (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">{err}</div>
      ) : null}

      {actionErr ? (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">{actionErr}</div>
      ) : null}

      {loading ? (
        <div className="rounded-xl border border-slate-200 bg-white p-6 text-sm text-slate-600">Зареждане...</div>
      ) : !data ? (
        <div className="rounded-xl border border-slate-200 bg-white p-6 text-sm text-slate-600">Няма данни</div>
      ) : (
        <div className="grid gap-4">
          <div className="grid gap-3 md:grid-cols-3">
            <Field label="Дата" value={formatDate(data.createdAt)} />
            <Field label="Клиент" value={data.customerName} />
            <Field label="Телефон" value={data.phone} />
            <Field label="Имейл" value={data.email} />
            <Field label="Доставка" value={data.deliveryMethod === "PICKUP" ? "Вземане от място" : "Куриер"} />
            <Field label="Адрес" value={data.address} />
          </div>

          <div className="grid gap-3 md:grid-cols-3">
            <Field label="Общо (EUR)" value={formatEUR(data.total)} />
            <Field label="Статус (Order)" value={data.status} />
            <Field label="Бележка" value={safeText(data.note) || "—"} />
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="mb-3 text-sm font-semibold text-slate-900">Артикули</div>

            <div className="overflow-hidden rounded-lg border border-slate-200">
              <div className="grid grid-cols-[1fr_90px_140px_140px] gap-3 border-b border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-600">
                <div>Продукт</div>
                <div className="text-right">Qty</div>
                <div className="text-right">Ед. цена</div>
                <div className="text-right">Общо</div>
              </div>

              <div className="divide-y divide-slate-200">
                {items.map((it) => (
                  <div key={it.id} className="grid grid-cols-[1fr_90px_140px_140px] items-center gap-3 px-3 py-3">
                    <div className="min-w-0">
                      <div className="truncate text-sm font-semibold text-slate-900">{it?.product?.name || "—"}</div>
                      <div className="mt-0.5 truncate text-xs text-slate-500">
                        {it?.product?.articleNumber ? `Арт. № ${it.product.articleNumber}` : "—"}
                        {it?.product?.slug ? ` • /${it.product.slug}` : ""}
                      </div>
                    </div>
                    <div className="text-right text-sm text-slate-700">{it.qty}</div>
                    <div className="text-right text-sm text-slate-700">{formatEUR(it.unitPrice)}</div>
                    <div className="text-right text-sm font-semibold text-slate-900">{formatEUR(it.lineTotal)}</div>
                  </div>
                ))}

                {!items.length ? <div className="px-3 py-6 text-center text-sm text-slate-600">Няма артикули</div> : null}
              </div>
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <Field label="Период (от)" value={data.rentalFrom ? formatDate(data.rentalFrom) : "—"} />
            <Field label="Период (до)" value={data.rentalTo ? formatDate(data.rentalTo) : "—"} />
            <Field label="Място" value={data.rentalPlace || "—"} />
            <Field label="Държави" value={data.visitCountries || "—"} />
            <Field label="Очакван пробег (км)" value={data.expectedMileageKm != null ? String(data.expectedMileageKm) : "—"} />
            <Field label="Аксесоари" value={data.rentalAccessories || "—"} />
          </div>
        </div>
      )}
    </div>
  );
}
