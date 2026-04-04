import Link from "next/link";

export default function BrandSidebar({ brands = [], activeBrandSlug = "" }) {
    return (
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 px-4 py-3 text-sm font-semibold text-slate-900">
                Марки
            </div>

            <div className="p-2">
                <Link
                    href="/"
                    className="block rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                >
                    Всички
                </Link>

                <div className="mt-1 space-y-1">
                    {brands.map((b) => {
                        const active = activeBrandSlug && b.slug === activeBrandSlug;

                        return (
                            <Link
                                key={b.id}
                                href={`/?brandSlug=${encodeURIComponent(b.slug)}&page=1`}
                                className={
                                    active
                                        ? "block rounded-lg bg-slate-900 px-3 py-2 text-sm text-white"
                                        : "block rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                                }
                            >
                                {b.name}
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
