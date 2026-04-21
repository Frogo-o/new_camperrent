import { NextResponse } from "next/server";
import { revalidatePublicCatalog } from "../../../../../../lib/catalog-cache";

export const runtime = "nodejs";

const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:4000";

function forwardHeaders(req) {
  const h = new Headers();
  const cookie = req.headers.get("cookie");
  if (cookie) h.set("cookie", cookie);
  const ua = req.headers.get("user-agent");
  if (ua) h.set("user-agent", ua);
  return h;
}

export async function GET(req, ctx) {
  const { slug } = await ctx.params;

  const target = `${API_BASE_URL}/api/admin/product-editor/${encodeURIComponent(slug)}/info-files`;

  const res = await fetch(target, {
    method: "GET",
    headers: forwardHeaders(req),
    cache: "no-store",
  });

  const body = await res.text();

  if (res.ok) {
    revalidatePublicCatalog({ productSlugs: [slug] });
  }

  return new NextResponse(body, {
    status: res.status,
    headers: {
      "content-type": res.headers.get("content-type") || "application/json; charset=utf-8",
      "x-debug-target": target,
    },
  });
}

export async function POST(req, ctx) {
  const { slug } = await ctx.params;

  const target = `${API_BASE_URL}/api/admin/product-editor/${encodeURIComponent(slug)}/info-files`;

  const res = await fetch(target, {
    method: "POST",
    headers: (() => {
      const h = forwardHeaders(req);
      h.set("content-type", "application/json; charset=utf-8");
      return h;
    })(),
    body: await req.text(),
    cache: "no-store",
  });

  const body = await res.text();

  return new NextResponse(body, {
    status: res.status,
    headers: {
      "content-type": res.headers.get("content-type") || "application/json; charset=utf-8",
      "x-debug-target": target,
    },
  });
}
