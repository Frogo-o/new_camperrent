import { NextResponse } from "next/server";

const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:4000";

function forwardHeaders(req) {
  const h = new Headers();
  const cookie = req.headers.get("cookie");
  if (cookie) h.set("cookie", cookie);
  return h;
}

export async function POST(req, ctx) {
  const { slug } = await ctx.params;

  const target = `${API_BASE_URL}/api/admin/product-editor/${encodeURIComponent(slug)}/images`;

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
    },
  });
}
