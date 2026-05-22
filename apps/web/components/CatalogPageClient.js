"use client";

import dynamic from "next/dynamic";

const CatalogClient = dynamic(() => import("./CatalogClient"), { ssr: false });

export default function CatalogPageClient({ initialCategorySlug = "" }) {
    return <CatalogClient initialCategorySlug={initialCategorySlug} />;
}
