import { NextResponse } from "next/server";

const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:4000";

export async function GET() {
    const target = `${API_BASE_URL}/api/catalog/brands`;

    const res = await fetch(target, { cache: "no-store" });
    const body = await res.text();

    return new NextResponse(body, {
        status: res.status,
        headers: {
            "content-type": res.headers.get("content-type") || "application/json; charset=utf-8",
        },
    });
}
