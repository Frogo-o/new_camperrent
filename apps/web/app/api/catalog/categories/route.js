import { NextResponse } from "next/server";
import { CATALOG_CATEGORIES_TAG } from "../../../../lib/catalog-cache";

const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:4000";
const PUBLIC_CACHE_CONTROL = "public, max-age=300, s-maxage=900, stale-while-revalidate=86400";

export const revalidate = 900;

export async function GET() {
    const target = `${API_BASE_URL}/api/catalog/categories`;

    const res = await fetch(target, { next: { revalidate: 900, tags: [CATALOG_CATEGORIES_TAG] } });
    const body = await res.text();

    return new NextResponse(body, {
        status: res.status,
        headers: {
            "content-type": res.headers.get("content-type") || "application/json; charset=utf-8",
            "cache-control": res.ok ? PUBLIC_CACHE_CONTROL : "no-store",
        },
    });
}
