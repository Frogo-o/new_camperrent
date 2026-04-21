import { NextResponse } from "next/server";
import { collectProductSlugs, parseJsonSafe, revalidateProductDetail, revalidateProductListings } from "../../../../../lib/catalog-cache";

const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:4000";

export async function GET(req, ctx) {
    const { slug } = await ctx.params;

    const target = `${API_BASE_URL}/api/admin/product-editor/${encodeURIComponent(slug)}`;
    const cookie = req.headers.get("cookie") || "";

    const res = await fetch(target, {
        method: "GET",
        headers: { cookie },
        cache: "no-store",
    });

    const body = await res.text();
    const bodyJson = parseJsonSafe(body);

    if (res.ok) {
        const productSlugs = collectProductSlugs(slug, bodyJson);
        revalidateProductListings();
        revalidateProductDetail(productSlugs);
    }

    return new NextResponse(body, {
        status: res.status,
        headers: {
            "content-type": res.headers.get("content-type") || "application/json; charset=utf-8",
        },
    });
}

export async function PATCH(req, ctx) {
    const { slug } = await ctx.params;

    const target = `${API_BASE_URL}/api/admin/product-editor/${encodeURIComponent(slug)}`;
    const cookie = req.headers.get("cookie") || "";

    const res = await fetch(target, {
        method: "PATCH",
        headers: {
            cookie,
            "content-type": "application/json; charset=utf-8",
        },
        body: await req.text(),
        cache: "no-store",
    });

    const body = await res.text();

    return new NextResponse(body, {
        status: res.status,
        headers: {
            "content-type": res.headers.get("content-type") || "application/json; charset=utf-8",
        },
    });
}
