"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

const STORAGE_KEY = "cart";

function safeParse(json) {
    try {
        const v = JSON.parse(json);
        return Array.isArray(v) ? v : [];
    } catch {
        return [];
    }
}

function readCart() {
    if (typeof window === "undefined") return [];
    return safeParse(window.localStorage.getItem(STORAGE_KEY) || "[]");
}

function writeCart(items) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    window.dispatchEvent(new Event("cart:changed"));
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

export default function Page() {
    const [items, setItems] = useState([]);

    const [openOrder, setOpenOrder] = useState(false);
    const [loadingOrder, setLoadingOrder] = useState(false);
    const [successOpen, setSuccessOpen] = useState(false);

    const [form, setForm] = useState({
        customerName: "",
        email: "",
        phone: "",
        address: "",
        deliveryMethod: "COURIER",
        note: "",
    });

    useEffect(() => {
        const sync = () => setItems(readCart());
        sync();
        window.addEventListener("storage", sync);
        window.addEventListener("cart:changed", sync);
        return () => {
            window.removeEventListener("storage", sync);
            window.removeEventListener("cart:changed", sync);
        };
    }, []);

    const totals = useMemo(() => {
        const qty = items.reduce((a, x) => a + Number(x.qty || 1), 0);
        const sum = items.reduce((a, x) => a + Number(x.price || 0) * Number(x.qty || 1), 0);
        return { qty, sum };
    }, [items]);

    function setQty(id, nextQty) {
        const q = Math.max(1, Number(nextQty || 1));
        const next = items.map((x) => (x.id === id ? { ...x, qty: q } : x));
        setItems(next);
        writeCart(next);
    }

    function removeItem(id) {
        const next = items.filter((x) => x.id !== id);
        setItems(next);
        writeCart(next);
    }

    function clearCart() {
        setItems([]);
        writeCart([]);
    }

    async function submitOrder() {
        if (!items.length) {
            toast.error("Количката е празна");
            return;
        }

        const customerName = String(form.customerName || "").trim();
        const email = String(form.email || "").trim();
        const phone = String(form.phone || "").trim();
        const address = String(form.address || "").trim();
        const deliveryMethod = String(form.deliveryMethod || "COURIER");
        const note = String(form.note || "").trim();

        if (!customerName) {
            toast.error("Моля, въведи име");
            return;
        }

        if (!phone) {
            toast.error("Моля, въведи телефон");
            return;
        }

        if (!address && deliveryMethod === "COURIER") {
            toast.error("Моля, въведи адрес за доставка");
            return;
        }

        const payload = {
            items: items.map((x) => ({
                productId: x.id,
                qty: Number(x.qty || 1),
            })),
            customerName,
            email,
            phone,
            address,
            deliveryMethod,
            note,
        };

        setLoadingOrder(true);
        try {
            const res = await fetch("/api/orders", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const json = await res.json().catch(() => null);

            if (!res.ok) {
                toast.error(json?.message || "Грешка при създаване на поръчка");
                return;
            }

            clearCart();
            setOpenOrder(false);
            setSuccessOpen(true);
            setForm({
                customerName: "",
                email: "",
                phone: "",
                address: "",
                deliveryMethod: "COURIER",
                note: "",
            });
        } catch {
            toast.error("Мрежова грешка. Опитай пак");
        } finally {
            setLoadingOrder(false);
        }
    }

    return (
        <div className="mx-auto max-w-6xl p-6">
            <div className="mb-4 text-sm text-slate-600">
                <Link className="hover:underline" href="/">
                    Начало
                </Link>
                <span className="mx-2">/</span>
                <span className="text-slate-900">Количка</span>
            </div>

            <div className="mb-5 flex items-end justify-between gap-4">
                <h1 className="text-2xl font-bold text-slate-900">Количка</h1>

                {items.length ? (
                    <button
                        type="button"
                        onClick={clearCart}
                        className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm transition hover:bg-slate-50"
                    >
                        Изчисти количката
                    </button>
                ) : null}
            </div>

            {items.length === 0 ? (
                <div className="rounded-xl border border-slate-200 bg-white p-6 text-slate-700 shadow-sm">
                    Количката е празна.
                    <div className="mt-3">
                        <Link
                            href="/"
                            className="inline-flex rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-700"
                        >
                            Към каталога
                        </Link>
                    </div>
                </div>
            ) : (
                <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
                    <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
                        <div className="border-b border-slate-200 p-4 text-sm font-semibold text-slate-900">
                            Продукти ({items.length})
                        </div>

                        <div className="divide-y divide-slate-200">
                            {items.map((x) => {
                                const qty = Number(x.qty || 1);
                                const line = Number(x.price || 0) * qty;

                                return (
                                    <div key={x.id} className="grid gap-4 p-4 sm:grid-cols-[120px_1fr]">
                                        <img src={x.imageUrl} alt={x.name} className="block w-full object-contain" />

                                        <div className="flex flex-col gap-2">
                                            <div className="flex items-start justify-between gap-3">
                                                <div>
                                                    <Link href={`/product/${x.slug}`} className="font-semibold text-slate-900 hover:underline">
                                                        {x.name}
                                                    </Link>
                                                    <div className="mt-1 flex flex-wrap gap-2 text-xs text-slate-600">
                                                        {x.brandName ? <span>{x.brandName}</span> : null}
                                                        {x.categoryName ? (
                                                            <>
                                                                <span>•</span>
                                                                <span>{x.categoryName}</span>
                                                            </>
                                                        ) : null}
                                                    </div>
                                                </div>

                                                <button
                                                    type="button"
                                                    onClick={() => removeItem(x.id)}
                                                    className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-900 shadow-sm transition hover:bg-slate-50"
                                                >
                                                    Премахни
                                                </button>
                                            </div>

                                            <div className="flex flex-wrap items-center justify-between gap-3">
                                                <div className="text-sm text-slate-600">Ед. цена</div>
                                                <div className="text-sm font-semibold text-slate-900">{formatEUR(x.price)}</div>
                                            </div>

                                            <div className="flex flex-wrap items-center justify-between gap-3">
                                                <div className="text-sm text-slate-600">Количество</div>

                                                <div className="inline-flex items-center gap-2">
                                                    <button
                                                        type="button"
                                                        onClick={() => setQty(x.id, qty - 1)}
                                                        className="h-9 w-9 rounded-lg border border-slate-200 bg-white text-slate-900 shadow-sm transition hover:bg-slate-50"
                                                    >
                                                        -
                                                    </button>

                                                    <input
                                                        value={qty}
                                                        onChange={(e) => setQty(x.id, e.target.value)}
                                                        inputMode="numeric"
                                                        className="h-9 w-16 rounded-lg border border-slate-200 bg-white px-2 text-center text-slate-900 shadow-sm outline-none transition focus:border-slate-300 focus:ring-4 focus:ring-slate-100"
                                                    />

                                                    <button
                                                        type="button"
                                                        onClick={() => setQty(x.id, qty + 1)}
                                                        className="h-9 w-9 rounded-lg border border-slate-200 bg-white text-slate-900 shadow-sm transition hover:bg-slate-50"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="flex flex-wrap items-center justify-between gap-3">
                                                <div className="text-sm text-slate-600">Общо</div>
                                                <div className="text-base font-extrabold text-slate-900">{formatEUR(line)}</div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <aside className="h-fit rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                        <div className="text-sm font-semibold text-slate-900">Обобщение</div>

                        <div className="mt-4 grid gap-2 text-sm text-slate-700">
                            <div className="flex items-center justify-between">
                                <span>Брой артикули</span>
                                <span className="font-semibold text-slate-900">{totals.qty}</span>
                            </div>

                            <div className="flex items-center justify-between border-t border-slate-200 pt-3">
                                <span className="text-slate-600">Крайна сума</span>
                                <span className="text-lg font-extrabold text-slate-900">{formatEUR(totals.sum)}</span>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={() => setOpenOrder(true)}
                            className="mt-4 w-full rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-700"
                        >
                            Поръчай
                        </button>

                        <div className="mt-3 text-xs text-slate-500">
                            Засега това е UI. Следващата стъпка е checkout + запис на поръчка в бекенда.
                        </div>
                    </aside>
                </div>
            )}

            {openOrder ? (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
                    onMouseDown={(e) => {
                        if (e.target === e.currentTarget) setOpenOrder(false);
                    }}
                >
                    <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-lg">
                        <h2 className="text-xl font-bold text-slate-900">Данни за поръчка</h2>
                        <p className="mt-1 text-sm text-slate-600">Попълни данните и потвърди</p>

                        <div className="mt-5 grid gap-3">
                            <div>
                                <label className="mb-1 block text-xs text-slate-600">Име и фамилия</label>
                                <input
                                    value={form.customerName}
                                    onChange={(e) => setForm((f) => ({ ...f, customerName: e.target.value }))}
                                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900 shadow-sm outline-none transition focus:border-slate-300 focus:ring-4 focus:ring-slate-100"
                                />
                            </div>

                            <div className="grid gap-3 sm:grid-cols-2">
                                <div>
                                    <label className="mb-1 block text-xs text-slate-600">Имейл</label>
                                    <input
                                        value={form.email}
                                        onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                                        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900 shadow-sm outline-none transition focus:border-slate-300 focus:ring-4 focus:ring-slate-100"
                                    />
                                </div>

                                <div>
                                    <label className="mb-1 block text-xs text-slate-600">Телефон</label>
                                    <input
                                        value={form.phone}
                                        onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                                        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900 shadow-sm outline-none transition focus:border-slate-300 focus:ring-4 focus:ring-slate-100"
                                    />
                                </div>
                            </div>

                            <div className="grid gap-3 sm:grid-cols-2">
                                <div>
                                    <label className="mb-1 block text-xs text-slate-600">Доставка</label>
                                    <select
                                        value={form.deliveryMethod}
                                        onChange={(e) => setForm((f) => ({ ...f, deliveryMethod: e.target.value }))}
                                        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900 shadow-sm outline-none transition focus:border-slate-300 focus:ring-4 focus:ring-slate-100"
                                    >
                                        <option value="COURIER">Доставяне по Еконт</option>
                                        <option value="PICKUP">Офис на Еконт</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="mb-1 block text-xs text-slate-600">Адрес</label>
                                    <input
                                        value={form.address}
                                        onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))}
                                        placeholder={form.deliveryMethod === "PICKUP" ? "По избор" : "Напр. Sofia, bul. Vitosha 1"}
                                        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900 shadow-sm outline-none transition focus:border-slate-300 focus:ring-4 focus:ring-slate-100"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="mb-1 block text-xs text-slate-600">Бележка</label>
                                <textarea
                                    value={form.note}
                                    onChange={(e) => setForm((f) => ({ ...f, note: e.target.value }))}
                                    rows={3}
                                    className="w-full resize-none rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900 shadow-sm outline-none transition focus:border-slate-300 focus:ring-4 focus:ring-slate-100"
                                />
                            </div>
                        </div>

                        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                            <button
                                type="button"
                                onClick={() => setOpenOrder(false)}
                                className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50"
                            >
                                Отказ
                            </button>

                            <button
                                type="button"
                                disabled={loadingOrder}
                                onClick={submitOrder}
                                className={[
                                    "rounded-lg px-4 py-2 text-sm font-semibold text-white shadow-sm transition",
                                    loadingOrder ? "bg-sky-400" : "bg-sky-600 hover:bg-sky-700",
                                ].join(" ")}
                            >
                                {loadingOrder ? "Изпращане..." : "Потвърди поръчка"}
                            </button>
                        </div>
                    </div>
                </div>
            ) : null}

            {successOpen ? (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
                    onMouseDown={(e) => {
                        if (e.target === e.currentTarget) setSuccessOpen(false);
                    }}
                >
                    <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-lg">
                        <h2 className="text-xl font-bold text-slate-900">Поръчката е изпратена</h2>
                        <p className="mt-2 text-sm text-slate-700">
                            Получихме заявката ти и е изпратен имейл с потвърждение.
                            <br />
                            Очаквай обаждане до <span className="font-semibold text-slate-900">2 работни дни</span>.
                        </p>

                        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
                            <Link
                                href="/"
                                onClick={() => setSuccessOpen(false)}
                                className="inline-flex items-center justify-center rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-700"
                            >
                                Към каталога
                            </Link>

                            <button
                                type="button"
                                onClick={() => setSuccessOpen(false)}
                                className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50"
                            >
                                Затвори
                            </button>
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    );
}
