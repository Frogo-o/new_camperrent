"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { withQuery } from "@/lib/urls";

export default function CategorySelectClient({ categories = [] }) {
    const router = useRouter();
    const sp = useSearchParams();

    const current = sp.get("categoryId") ?? "";

    return (
        <select
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900 shadow-sm outline-none transition focus:border-slate-300 focus:ring-4 focus:ring-slate-100"
            value={current}
            onChange={(e) => {
                const categoryId = e.target.value || "";
                router.push(`/${withQuery(sp, { categoryId, page: 1 })}`);
            }}
        >
            <option value="">Избери категория</option>
            {categories.map((c) => (
                <option key={c.id} value={String(c.id)}>
                    {c.name}
                </option>
            ))}
        </select>
    );
}
