import { NextResponse } from "next/server";

const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:4000";

export async function POST(req) {
    const body = await req.text();

    const res = await fetch(`${API_BASE_URL}/api/admin/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body,
    });

    const responseBody = await res.text();

    const nextRes = new NextResponse(responseBody, {
        status: res.status,
        headers: {
            "Content-Type": res.headers.get("content-type") || "application/json",
        },
    });

    const setCookie = res.headers.get("set-cookie");
    if (setCookie) {
        nextRes.headers.set("set-cookie", setCookie);
    }

    return nextRes;
}
