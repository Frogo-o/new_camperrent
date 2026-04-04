import { NextResponse } from "next/server";

const API_BASE_URL = (process.env.API_BASE_URL || "http://localhost:4000").replace(/\/+$/, "");

export async function GET(req, ctx) {
  const { slug } = await ctx.params; // <- ключовото

  const target = `${API_BASE_URL}/api/catalog/products/${encodeURIComponent(String(slug))}`;

  const cookie = req.headers.get("cookie") || "";

  const res = await fetch(target, {
    headers: { cookie, accept: "application/json" },
    cache: "no-store",
  });

  const bodyText = await res.text();

  const nextRes = new NextResponse(bodyText, {
    status: res.status,
    headers: {
      "content-type": res.headers.get("content-type") || "application/json; charset=utf-8",
      "cache-control": "no-store",
    },
  });

  const setCookie = res.headers.get("set-cookie");
  if (setCookie) nextRes.headers.set("set-cookie", setCookie);

  return nextRes;
}