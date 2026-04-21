import { NextResponse } from "next/server";
import { revalidatePublicCatalog } from "../../../../../lib/catalog-cache";

const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:4000";

export async function PATCH(req, { params }) {
  try {
    const { slug } = await params;

    if (!slug) {
      return NextResponse.json({ message: "Missing slug" }, { status: 400 });
    }

    const safe = encodeURIComponent(slug);
    const target = `${API_BASE_URL}/api/admin/catalog/categories/${safe}`;

    const payload = await req.text();

    const res = await fetch(target, {
      method: "PATCH",
      cache: "no-store",
      headers: {
        cookie: req.headers.get("cookie") || "",
        "content-type": req.headers.get("content-type") || "application/json",
      },
      body: payload,
    });

    const body = await res.text();

    if (res.ok) {
      revalidatePublicCatalog();
    }

    return new NextResponse(body, {
      status: res.status,
      headers: { "content-type": res.headers.get("content-type") || "application/json; charset=utf-8" },
    });
  } catch (e) {
    return NextResponse.json({ message: "Proxy error", details: String(e?.message || e) }, { status: 502 });
  }
}
