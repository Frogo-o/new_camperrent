import Link from "next/link";

export default function BrandsStrip({ brands = [] }) {
    return (
        <div className="rounded-lg border p-4">
            <div className="font-semibold mb-3">Марки</div>
            <div className="flex gap-3 overflow-x-auto pb-2">
                {brands.map((b) => (
                    <Link
                        key={b.id}
                        href={`/?brandId=${b.id}`}
                        className="shrink-0 rounded border px-3 py-2 text-sm hover:bg-black/5"
                    >
                        {b.name}
                    </Link>
                ))}
            </div>
        </div>
    );
}
