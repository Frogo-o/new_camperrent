import Link from "next/link";
import CategorySelectClient from "@/components/CategorySelectClient";

export default function CategorySidebar({ categories = [] }) {
    return (
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="mb-3 text-sm font-semibold text-slate-900">Категории</div>

            <div className="block lg:hidden">
                <CategorySelectClient categories={categories} />
            </div>

            <ul className="hidden lg:block space-y-1">
                {categories.map((c) => (
                    <li key={c.id}>
                        <Link
                            className="block rounded-lg px-2 py-2 text-sm text-slate-700 transition hover:bg-slate-50 hover:text-slate-900"
                            href={`/?categoryId=${c.id}`}
                        >
                            {c.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

