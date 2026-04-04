import Link from "next/link";

export default function ProductCard({ p }) {
    const img = p?.images?.[0]?.url;

    return (
        <div className="rounded-md border p-3 flex flex-col gap-2">
            <div className="aspect-[4/3] rounded-md border overflow-hidden bg-white">
                {img ? (
                    <img src={img} alt={p.name} className="h-full w-full object-cover" />
                ) : (
                    <div className="h-full w-full flex items-center justify-center text-sm">
                        No image
                    </div>
                )}
            </div>

            <div className="font-medium line-clamp-2">{p.name}</div>

            <div className="text-sm text-slate-700">
                {p.price != null ? `${p.price} лв.` : "—"}
            </div>

            <div className="mt-auto">
                <Link className="text-sm underline" href={`/product/${p.slug}`}>
                    Детайли
                </Link>
            </div>
        </div>
    );
}
