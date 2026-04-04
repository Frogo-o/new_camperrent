import Link from "next/link";

export default function Breadcrumbs({ items = [] }) {
    return (
        <div className="text-sm opacity-80">
            {items.map((it, idx) => (
                <span key={it.href + idx}>
                    {idx > 0 && <span className="mx-2 opacity-50">/</span>}
                    <Link href={it.href} className="hover:underline">
                        {it.label}
                    </Link>
                </span>
            ))}
        </div>
    );
}
