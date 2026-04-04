"use client";

import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { formatPriceTextFromCents } from "@/components/PriceText";

function cn(...xs) {
  return xs.filter(Boolean).join(" ");
}

function safeText(v) {
  return String(v || "").trim();
}

function toIso(dtLocal) {
  const v = safeText(dtLocal);
  if (!v) return null;
  const d = new Date(v);
  if (Number.isNaN(d.getTime())) return null;
  return d.toISOString();
}

function intOrNull(v) {
  const s = safeText(v);
  if (!s) return null;
  const n = Number(s);
  if (!Number.isFinite(n) || !Number.isInteger(n)) return null;
  return n;
}

const RENT_PLACES = [
  { value: "", label: "Избери място" },
  { value: "Казанлък (база 1)", label: "Казанлък (база 1)" },
  { value: "София (база 2)", label: "София (база 2) — 200 лв." },
];

const RENT_ACCESSORIES = [
  { key: "bedding", label: "Спално бельо (комплект)", type: "qty", max: 4, unitPriceCents: 1000, unitLabel: "бр." },
  { key: "bikeRack", label: "Рамка за 2 велосипеда", type: "qty", max: 1, unitPriceCents: 1500, unitLabel: "бр." },
  { key: "bike", label: "Велосипед", type: "qty", max: 4, unitPriceCents: 1500, unitLabel: "бр." },
  { key: "tableSet", label: "Маса с 4 стола", type: "qty", max: 2, unitPriceCents: 2000, unitLabel: "бр." },
  { key: "childSeat", label: "Детско столче", type: "qty", max: 1, unitPriceCents: 1000, unitLabel: "бр." },
  { key: "towels", label: "Комплект хавлии", type: "qty", max: 4, unitPriceCents: 800, unitLabel: "бр." },
  { key: "kitchen", label: "Кухненско оборудване", type: "bool", unitPriceCents: 1500, unitLabel: "за периода" },
  { key: "gps", label: "GPS навигация", type: "bool", unitPriceCents: 1500, unitLabel: "на ден" },
];

function PricingBlock({ pricing }) {
  const rows = Array.isArray(pricing) ? pricing : [];
  if (rows.length === 0) return null;

  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
      <div className="text-sm font-semibold text-slate-900">Цени / за 1 ден (24ч.)</div>
      <div className="mt-3 grid gap-2">
        {rows.map((r, idx) => (
          <div key={idx} className="flex items-center justify-between gap-4 text-sm">
            <div className="text-slate-700">{r.label}</div>
            <div className="font-semibold text-slate-900">{r.price}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function OrderNowButton({ product, mode, pricing }) {
  const isRent = mode === "rent";

  const title = isRent ? "Резервация на кемпер" : "Запитване за покупка";
  const ctaOpen = isRent ? "Резервация на кемпер" : "Купи кемпер";
  const submitLabel = isRent ? "Изпращане на резервация" : "Изпращане на запитване";
  const helperText = isRent
    ? "С натискане на “Изпращане на резервация” заявката ще бъде изпратена към екипа."
    : "С натискане на “Изпращане на запитване” заявката ще бъде изпратена към екипа.";

  const [open, setOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [sending, setSending] = useState(false);

  const [form, setForm] = useState({
    customerName: "",
    email: "",
    phone: "",
    note: "",

    rentalPlace: "",
    rentalFrom: "",
    rentalTo: "",
    country: "",
    city: "",
    postalCode: "",
    street: "",
    expectedMileageKm: "",
    visitCountries: "",

    accessories: {
      bedding: 0,
      bikeRack: 0,
      bike: 0,
      tableSet: 0,
      childSeat: 0,
      towels: 0,
      kitchen: false,
      gps: false,
    },
  });

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const canSubmit = useMemo(() => {
    const customerName = safeText(form.customerName);
    const email = safeText(form.email);
    const phone = safeText(form.phone);

    if (!customerName || customerName.length < 2) return false;
    if (!email || !email.includes("@")) return false;
    if (!phone || phone.length < 6) return false;

    if (!isRent) return true;

    if (!safeText(form.rentalPlace)) return false;

    const fromIso = toIso(form.rentalFrom);
    const toIsoV = toIso(form.rentalTo);
    if (!fromIso || !toIsoV) return false;
    if (new Date(toIsoV).getTime() < new Date(fromIso).getTime()) return false;

    if (!safeText(form.country)) return false;
    if (!safeText(form.city)) return false;
    if (!safeText(form.postalCode)) return false;
    if (!safeText(form.street)) return false;

    const km = intOrNull(form.expectedMileageKm);
    if (km === null || km < 0) return false;

    return true;
  }, [form, isRent]);

  const accessoriesSummaryText = useMemo(() => {
    if (!isRent) return "";
    const lines = [];

    for (const a of RENT_ACCESSORIES) {
      if (a.type === "qty") {
        const q = Number(form.accessories?.[a.key] || 0);
        if (q > 0) lines.push(`${a.label}: желая (${q} ${a.unitLabel})`);
        else lines.push(`${a.label}: не желая`);
      } else {
        const wanted = Boolean(form.accessories?.[a.key]);
        lines.push(`${a.label}: ${wanted ? "желая" : "не желая"}`);
      }
    }

    return lines.join("\n");
  }, [form, isRent]);

  const uiExtrasCostCents = useMemo(() => {
    if (!isRent) return 0;
    let total = 0;

    for (const a of RENT_ACCESSORIES) {
      if (a.type === "qty") {
        const q = Number(form.accessories?.[a.key] || 0);
        total += q * Number(a.unitPriceCents || 0);
      } else {
        const wanted = Boolean(form.accessories?.[a.key]);
        total += wanted ? Number(a.unitPriceCents || 0) : 0;
      }
    }

    return total;
  }, [form, isRent]);

  async function submit() {
    if (sending) return;
    if (!canSubmit) {
      toast.error("Моля попълни коректно формата.");
      return;
    }

    setSending(true);
    try {
      const base = {
        items: [{ productId: product.id, qty: 1 }],
        customerName: safeText(form.customerName),
        email: safeText(form.email),
        phone: safeText(form.phone),
        note: safeText(form.note),
      };

      let payload;

      if (!isRent) {
        payload = {
          ...base,
          address: "-",
          deliveryMethod: "PICKUP",
        };
      } else {
        const country = safeText(form.country);
        const city = safeText(form.city);
        const postalCode = safeText(form.postalCode);
        const street = safeText(form.street);
        const address = `${country}, ${city}, ${postalCode}, ${street}`;

        payload = {
          ...base,
          address,
          deliveryMethod: "PICKUP",

          rentalPlace: safeText(form.rentalPlace),
          rentalFrom: safeText(form.rentalFrom) || null,
          rentalTo: safeText(form.rentalTo) || null,

          country,
          city,
          postalCode,
          street,

          expectedMileageKm: intOrNull(form.expectedMileageKm),
          visitCountries: safeText(form.visitCountries),
          rentalAccessories: accessoriesSummaryText,
        };
      }

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json().catch(() => null);

      if (!res.ok) {
        const msg = json?.message || "Грешка при изпращане на заявката.";
        toast.error(msg);
        setSending(false);
        return;
      }

      setOpen(false);
      setSuccessOpen(true);
      setSending(false);

      setForm({
        customerName: "",
        email: "",
        phone: "",
        note: "",

        rentalPlace: "",
        rentalFrom: "",
        rentalTo: "",
        country: "",
        city: "",
        postalCode: "",
        street: "",
        expectedMileageKm: "",
        visitCountries: "",

        accessories: {
          bedding: 0,
          bikeRack: 0,
          bike: 0,
          tableSet: 0,
          childSeat: 0,
          towels: 0,
          kitchen: false,
          gps: false,
        },
      });
    } catch {
      toast.error("Мрежова грешка. Опитай пак.");
      setSending(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          "mt-4 w-full rounded-lg px-4 py-2 text-sm font-semibold text-white shadow-sm transition",
          isRent ? "bg-emerald-600 hover:bg-emerald-700" : "bg-indigo-600 hover:bg-indigo-700"
        )}
      >
        {ctaOpen}
      </button>

      {open ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <button
            type="button"
            onClick={() => (!sending ? setOpen(false) : null)}
            className="absolute inset-0 bg-black/40"
            aria-label="Close"
          />

          <div className="relative flex w-full max-w-4xl max-h-[90vh] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
            <div className="flex items-start justify-between gap-4 border-b border-slate-200 p-5">
              <div>
                <div className="text-lg font-bold text-slate-900">{title}</div>
                <div className="mt-1 text-sm text-slate-600">{product.name}</div>
              </div>

              <button
                type="button"
                disabled={sending}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-lg border px-3 py-1.5 text-sm shadow-sm transition",
                  sending
                    ? "border-slate-200 bg-slate-50 text-slate-400"
                    : "border-slate-200 bg-white text-slate-900 hover:bg-slate-50"
                )}
              >
                Затвори
              </button>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto p-5">
              <div className="grid gap-5">
                {isRent ? <PricingBlock pricing={pricing} /> : null}

                <div className="grid gap-4 lg:grid-cols-2">
                  <div className="grid gap-3">
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div>
                        <label className="mb-1 block text-xs text-slate-600">Име и фамилия</label>
                        <input
                          value={form.customerName}
                          onChange={(e) => setForm((s) => ({ ...s, customerName: e.target.value }))}
                          className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900 shadow-sm outline-none transition focus:border-slate-300 focus:ring-4 focus:ring-slate-100"
                        />
                      </div>

                      <div>
                        <label className="mb-1 block text-xs text-slate-600">Телефон</label>
                        <input
                          value={form.phone}
                          onChange={(e) => setForm((s) => ({ ...s, phone: e.target.value }))}
                          className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900 shadow-sm outline-none transition focus:border-slate-300 focus:ring-4 focus:ring-slate-100"
                          placeholder="0888123456"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="mb-1 block text-xs text-slate-600">Имейл</label>
                        <input
                          value={form.email}
                          onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
                          className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900 shadow-sm outline-none transition focus:border-slate-300 focus:ring-4 focus:ring-slate-100"
                        />
                      </div>
                    </div>

                    {isRent ? (
                      <>
                        <div className="grid gap-3 sm:grid-cols-2">
                          <div>
                            <label className="mb-1 block text-xs text-slate-600">Място на наемане</label>
                            <select
                              value={form.rentalPlace}
                              onChange={(e) => setForm((s) => ({ ...s, rentalPlace: e.target.value }))}
                              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900 shadow-sm outline-none transition focus:border-slate-300 focus:ring-4 focus:ring-slate-100"
                            >
                              {RENT_PLACES.map((p) => (
                                <option key={p.value || "empty"} value={p.value}>
                                  {p.label}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label className="mb-1 block text-xs text-slate-600">Предполагаем пробег (км)</label>
                            <input
                              value={form.expectedMileageKm}
                              onChange={(e) => setForm((s) => ({ ...s, expectedMileageKm: e.target.value }))}
                              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900 shadow-sm outline-none transition focus:border-slate-300 focus:ring-4 focus:ring-slate-100"
                            />
                          </div>
                        </div>

                        <div className="grid gap-3 sm:grid-cols-2">
                          <div>
                            <label className="mb-1 block text-xs text-slate-600">От дата</label>
                            <input
                              type="date"
                              value={form.rentalFrom}
                              onChange={(e) => setForm((s) => ({ ...s, rentalFrom: e.target.value }))}
                              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900 shadow-sm outline-none transition focus:border-slate-300 focus:ring-4 focus:ring-slate-100"
                            />
                          </div>

                          <div>
                            <label className="mb-1 block text-xs text-slate-600">До дата</label>
                            <input
                              type="date"
                              value={form.rentalTo}
                              onChange={(e) => setForm((s) => ({ ...s, rentalTo: e.target.value }))}
                              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900 shadow-sm outline-none transition focus:border-slate-300 focus:ring-4 focus:ring-slate-100"
                            />
                          </div>
                        </div>

                        <div className="grid gap-3 sm:grid-cols-2">
                          <div>
                            <label className="mb-1 block text-xs text-slate-600">Държава</label>
                            <input
                              value={form.country}
                              onChange={(e) => setForm((s) => ({ ...s, country: e.target.value }))}
                              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900 shadow-sm outline-none transition focus:border-slate-300 focus:ring-4 focus:ring-slate-100"
                            />
                          </div>

                          <div>
                            <label className="mb-1 block text-xs text-slate-600">Град</label>
                            <input
                              value={form.city}
                              onChange={(e) => setForm((s) => ({ ...s, city: e.target.value }))}
                              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900 shadow-sm outline-none transition focus:border-slate-300 focus:ring-4 focus:ring-slate-100"
                            />
                          </div>

                          <div>
                            <label className="mb-1 block text-xs text-slate-600">ПК</label>
                            <input
                              value={form.postalCode}
                              onChange={(e) => setForm((s) => ({ ...s, postalCode: e.target.value }))}
                              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900 shadow-sm outline-none transition focus:border-slate-300 focus:ring-4 focus:ring-slate-100"
                            />
                          </div>

                          <div>
                            <label className="mb-1 block text-xs text-slate-600">Улица</label>
                            <input
                              value={form.street}
                              onChange={(e) => setForm((s) => ({ ...s, street: e.target.value }))}
                              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900 shadow-sm outline-none transition focus:border-slate-300 focus:ring-4 focus:ring-slate-100"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="mb-1 block text-xs text-slate-600">Кои държави ще посетите?</label>
                          <input
                            value={form.visitCountries}
                            onChange={(e) => setForm((s) => ({ ...s, visitCountries: e.target.value }))}
                            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900 shadow-sm outline-none transition focus:border-slate-300 focus:ring-4 focus:ring-slate-100"
                          />
                        </div>
                      </>
                    ) : null}

                    <div>
                      <label className="mb-1 block text-xs text-slate-600">Допълнителна информация</label>
                      <textarea
                        value={form.note}
                        onChange={(e) => setForm((s) => ({ ...s, note: e.target.value }))}
                        rows={4}
                        className="w-full resize-none rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900 shadow-sm outline-none transition focus:border-slate-300 focus:ring-4 focus:ring-slate-100"
                      />
                    </div>
                  </div>

                  {isRent ? (
                    <div className="rounded-xl border border-slate-200 bg-white p-4">
                      <div className="text-sm font-semibold text-slate-900">Аксесоари</div>
                      <div className="mt-3 grid gap-3">
                        {RENT_ACCESSORIES.map((a) => {
                          if (a.type === "qty") {
                            const q = Number(form.accessories?.[a.key] || 0);
                            return (
                              <div key={a.key} className="rounded-lg border border-slate-200 p-3">
                                <div className="flex flex-wrap items-center justify-between gap-2">
                                  <div className="text-sm font-semibold text-slate-900">{a.label}</div>
                                  <div className="text-xs text-slate-600">
                                    {formatPriceTextFromCents(a.unitPriceCents, { allowZero: true })} / {a.unitLabel} (макс. {a.max})
                                  </div>
                                </div>

                                <div className="mt-2 flex items-center gap-2">
                                  <button
                                    type="button"
                                    onClick={() =>
                                      setForm((s) => ({
                                        ...s,
                                        accessories: { ...s.accessories, [a.key]: Math.max(0, q - 1) },
                                      }))
                                    }
                                    className={cn(
                                      "rounded-lg border px-3 py-1.5 text-sm transition",
                                      q === 0
                                        ? "border-slate-200 bg-slate-50 text-slate-400"
                                        : "border-slate-200 bg-white text-slate-900 hover:bg-slate-50"
                                    )}
                                    disabled={q === 0}
                                  >
                                    -
                                  </button>

                                  <div className="min-w-10 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-center text-sm text-slate-900">
                                    {q}
                                  </div>

                                  <button
                                    type="button"
                                    onClick={() =>
                                      setForm((s) => ({
                                        ...s,
                                        accessories: { ...s.accessories, [a.key]: Math.min(a.max, q + 1) },
                                      }))
                                    }
                                    className={cn(
                                      "rounded-lg border px-3 py-1.5 text-sm transition",
                                      q >= a.max
                                        ? "border-slate-200 bg-slate-50 text-slate-400"
                                        : "border-slate-200 bg-white text-slate-900 hover:bg-slate-50"
                                    )}
                                    disabled={q >= a.max}
                                  >
                                    +
                                  </button>

                                  <div className="ml-auto text-sm font-semibold text-slate-900">
                                    {formatPriceTextFromCents(q * a.unitPriceCents, { allowZero: true })}
                                  </div>
                                </div>
                              </div>
                            );
                          }

                          const wanted = Boolean(form.accessories?.[a.key]);

                          return (
                            <div key={a.key} className="rounded-lg border border-slate-200 p-3">
                              <div className="flex items-center justify-between gap-3">
                                <div>
                                  <div className="text-sm font-semibold text-slate-900">{a.label}</div>
                                  <div className="mt-0.5 text-xs text-slate-600">
                                    {formatPriceTextFromCents(a.unitPriceCents, { allowZero: true })} {a.unitLabel ? `(${a.unitLabel})` : ""}
                                  </div>
                                </div>

                                <button
                                  type="button"
                                  onClick={() =>
                                    setForm((s) => ({
                                      ...s,
                                      accessories: { ...s.accessories, [a.key]: !wanted },
                                    }))
                                  }
                                  className={cn(
                                    "rounded-lg px-3 py-1.5 text-sm font-semibold transition",
                                    wanted
                                      ? "bg-emerald-600 text-white hover:bg-emerald-700"
                                      : "bg-slate-100 text-slate-900 hover:bg-slate-200"
                                  )}
                                >
                                  {wanted ? "Желая" : "Не желая"}
                                </button>
                              </div>
                            </div>
                          );
                        })}

                        <div className="rounded-lg bg-slate-50 p-3">
                          <div className="flex items-center justify-between gap-3 text-sm">
                            <div className="text-slate-700">Обща сума аксесоари</div>
                            <div className="font-semibold text-slate-900">
                              {formatPriceTextFromCents(uiExtrasCostCents, { allowZero: true })}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>

                <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="text-xs text-slate-500">{helperText}</div>

                  <button
                    type="button"
                    onClick={submit}
                    disabled={!canSubmit || sending}
                    className={cn(
                      "rounded-lg px-4 py-2 text-sm font-semibold text-white shadow-sm transition",
                      !canSubmit || sending
                        ? "bg-slate-300"
                        : isRent
                        ? "bg-emerald-600 hover:bg-emerald-700"
                        : "bg-indigo-600 hover:bg-indigo-700"
                    )}
                  >
                    {sending ? "Изпращане..." : submitLabel}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {successOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <button
            type="button"
            onClick={() => setSuccessOpen(false)}
            className="absolute inset-0 bg-black/40"
            aria-label="Close"
          />

          <div className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
            <div className="border-b border-slate-200 p-5">
              <div className="text-lg font-bold text-slate-900">Заявката е изпратена</div>
              <div className="mt-1 text-sm text-slate-600">
                Изпратихме потвърждение по имейл. Очаквайте обаждане до{" "}
                <span className="font-semibold">2 работни дни</span>.
              </div>
            </div>

            <div className="p-5">
              <div className="rounded-xl bg-slate-50 p-4 text-sm text-slate-700">
                Продукт: <span className="font-semibold text-slate-900">{product.name}</span>
              </div>

              <button
                type="button"
                onClick={() => setSuccessOpen(false)}
                className="mt-4 w-full rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-700"
              >
                ОК
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
