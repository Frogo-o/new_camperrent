import { NextResponse } from "next/server";
import { collectProductSlugs, parseJsonSafe, revalidatePublicCatalog } from "../../../lib/catalog-cache";

const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:4000";

export async function POST(req) {
    const target = `${API_BASE_URL}/api/admin/products`;

    const cookie = req.headers.get("cookie") || "";

    let payload;
    try {
        payload = await req.json();
    } catch {
        return NextResponse.json(
            { message: "Invalid JSON body" },
            { status: 400 }
        );
    }

    const res = await fetch(target, {
        method: "POST",
        headers: {
            cookie,
            "content-type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(payload),
        cache: "no-store",
    });

    const bodyText = await res.text();
    const bodyJson = parseJsonSafe(bodyText);

    if (res.ok) {
        revalidatePublicCatalog({ productSlugs: collectProductSlugs(bodyJson) });
    }

    const nextRes = new NextResponse(bodyText, {
        status: res.status,
        headers: {
            "content-type": res.headers.get("content-type") || "application/json; charset=utf-8",
        },
    });

    const setCookie = res.headers.get("set-cookie");
    if (setCookie) nextRes.headers.set("set-cookie", setCookie);

    return nextRes;
}
