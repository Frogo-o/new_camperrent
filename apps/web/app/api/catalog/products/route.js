import { NextResponse } from "next/server";

const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:4000";

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const target = `${API_BASE_URL}/api/catalog/products${url.search}`;

    const res = await fetch(target, { cache: "no-store" });
    const body = await res.text();

    return new NextResponse(body, {
      status: res.status,
      headers: {
        "content-type": res.headers.get("content-type") || "application/json; charset=utf-8",
      },
    });
  } catch (e) {
    return NextResponse.json(
      { message: "Proxy error", details: String(e?.message || e) },
      { status: 502 }
    );
  }
}
