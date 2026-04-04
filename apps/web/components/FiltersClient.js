"use client";

import { useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function FiltersClient({ categories = [], brands = [] }) {
    const router = useRouter();
    const pathname = usePathname();
    const sp = useSearchParams();

    const initial = useMemo(() => {
        return {
            q: sp.get("q") || "",
            categorySlug: sp.get("categorySlug") || "",
            brandSlug: sp.get("brandSlug") || "",
            sort: sp.get("sort") || "newest",
            hasBrand: sp.get("hasBrand") || "",
            limit: sp.get("limit") || "12",
        };
    }, [sp]);

    const [q, setQ] = useState(initial.q);
    const [categorySlug, setCategorySlug] = useState(initial.categorySlug);
    const [brandSlug, setBrandSlug] = useState(initial.brandSlug);
    const [sort, setSort] = useState(initial.sort);
    const [hasBrand, setHasBrand] = useState(initial.hasBrand);
    const [limit, setLimit] = useState(initial.limit);

    function apply(next) {
        const usp = new URLSearchParams(sp.toString());

        usp.set("page", "1");

        const setOrDelete = (k, v) => {
            if (!v) usp.delete(k);
            else usp.set(k, v);
        };

        setOrDelete("q", next.q);
        setOrDelete("categorySlug", next.categorySlug);
        setOrDelete("brandSlug", next.brandSlug);
        setOrDelete("hasBrand", next.hasBrand);
        setOrDelete("sort", next.sort && next.sort !== "newest" ? next.sort : "");
        setOrDelete("limit", next.limit && next.limit !== "12" ? next.limit : "");

        router.push(`${pathname}?${usp.toString()}`);
    }

    function onSubmit(e) {
        e.preventDefault();
        apply({ q, categorySlug, brandSlug, sort, hasBrand, limit });
    }

    return (
        <form onSubmit={onSubmit} className="rounded-md border p-3 flex flex-col gap-3">
            <div className="grid grid-cols-1 md:grid-cols-6 gap-2">
                <input
                    className="md:col-span-2 rounded-md border px-3 py-2"
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder="Търси продукт…"
                />

                <select
                    className="rounded-md border px-3 py-2"
                    value={categorySlug}
                    onChange={(e) => setCategorySlug(e.target.value)}
                >
                    <option value="">Категория</option>
                    {categories.map((c) => (
                        <option key={c.id} value={c.slug}>
                            {c.name}
                        </option>
                    ))}
                </select>

                <select
                    className="rounded-md border px-3 py-2"
                    value={brandSlug}
                    onChange={(e) => setBrandSlug(e.target.value)}
                >
                    <option value="">Марка</option>
                    {brands.map((b) => (
                        <option key={b.id} value={b.slug}>
                            {b.name}
                        </option>
                    ))}
                </select>

                <select
                    className="rounded-md border px-3 py-2"
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                >
                    <option value="newest">Най-нови</option>
                    <option value="price_asc">Цена (възх.)</option>
                    <option value="price_desc">Цена (низх.)</option>
                    <option value="name_asc">Име (A→Z)</option>
                    <option value="name_desc">Име (Z→A)</option>
                </select>

                <select
                    className="rounded-md border px-3 py-2"
                    value={hasBrand}
                    onChange={(e) => setHasBrand(e.target.value)}
                >
                    <option value="">Brand: всички</option>
                    <option value="true">Само с марка</option>
                    <option value="false">Само без марка</option>
                </select>
            </div>

            <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                    <span className="text-sm">На страница</span>
                    <select
                        className="rounded-md border px-2 py-1"
                        value={limit}
                        onChange={(e) => setLimit(e.target.value)}
                    >
                        <option value="12">12</option>
                        <option value="24">24</option>
                        <option value="36">36</option>
                        <option value="48">48</option>
                        <option value="60">60</option>
                    </select>
                </div>

                <div className="flex gap-2">
                    <button type="submit" className="rounded-md border px-3 py-2">
                        Търси
                    </button>
                    <button
                        type="button"
                        className="rounded-md border px-3 py-2"
                        onClick={() => {
                            setQ("");
                            setCategorySlug("");
                            setBrandSlug("");
                            setSort("newest");
                            setHasBrand("");
                            setLimit("12");
                            router.push(pathname);
                        }}
                    >
                        Reset
                    </button>
                </div>
            </div>
        </form>
    );
}
