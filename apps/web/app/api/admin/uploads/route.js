import { NextResponse } from "next/server";

const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:4000";

export async function POST(req) {
    const target = `${API_BASE_URL}/api/admin/uploads`;

    const cookie = req.headers.get("cookie") || "";
    const contentType = req.headers.get("content-type") || "";

    const res = await fetch(target, {
        method: "POST",
        headers: {
            cookie,
            "content-type": contentType,
        },
        body: await req.arrayBuffer(),
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
