"use client";

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

export default function AddToCartButton({ product, label }) {
    const [added, setAdded] = useState(false);

    const item = useMemo(() => {
        return {
            id: product.id,
            slug: product.slug,
            name: product.name,
            price: product.price,
            imageUrl: product.imageUrl || "",
            categorySlug: product.categorySlug || "",
            categoryName: product.categoryName || "",
            brandName: product.brandName || "",
            qty: 1,
            addedAt: Date.now(),
        };
    }, [product]);

    useEffect(() => {
        const cart = readCart();
        const exists = cart.some((x) => x.id === item.id);
        setAdded(exists);
    }, [item.id]);

    function onAdd() {
        const cart = readCart();
        const idx = cart.findIndex((x) => x.id === item.id);

        if (idx >= 0) {
            const next = cart.slice();
            next[idx] = { ...next[idx], qty: Number(next[idx].qty || 1) + 1 };
            writeCart(next);
            setAdded(true);
            toast.success("Увеличихме количеството в количката");
            return;
        }

        writeCart([item, ...cart]);
        setAdded(true);
        toast.success("Добавено в количката");
    }

    return (
        <button
            type="button"
            onClick={onAdd}
            className={[
                "mt-4 w-full rounded-lg px-4 py-2 text-sm font-semibold shadow-sm transition",
                added ? "bg-emerald-600 text-white hover:bg-emerald-700" : "bg-sky-600 text-white hover:bg-sky-700",
            ].join(" ")}
        >
            {added ? "Добавено в количката" : label}
        </button>
    );
}
