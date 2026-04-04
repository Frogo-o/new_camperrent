import { NextResponse } from "next/server";

const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:6969";

export async function POST(req) {
    const body = await req.json();

    const res = await fetch(`${API_BASE_URL}/api/orders`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(body),
    });

    const text = await res.text();

    return new NextResponse(text, {
        status: res.status,
        headers: {
            "content-type":
                res.headers.get("content-type") || "application/json; charset=utf-8",
        },
    });
}
