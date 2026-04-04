import Link from "next/link";

function makeHref(page) {
    const sp =
        typeof window === "undefined"
            ? null
            : new URLSearchParams(window.location.search);

    if (!sp) return `?page=${page}`;

    sp.set("page", String(page));
    return `?${sp.toString()}`;
}

export default function Pagination({ meta }) {
    const page = meta?.page || 1;
    const totalPages = meta?.totalPages || 1;

    if (totalPages <= 1) return null;

    const prev = Math.max(1, page - 1);
    const next = Math.min(totalPages, page + 1);

    return (
        <div className="flex items-center gap-2 text-sm">
            <Link className="rounded-md border px-2 py-1" href={makeHref(prev)}>
                Prev
            </Link>
            <span>
                {page} / {totalPages}
            </span>
            <Link className="rounded-md border px-2 py-1" href={makeHref(next)}>
                Next
            </Link>
        </div>
    );
}
