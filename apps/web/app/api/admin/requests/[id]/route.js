import { NextResponse } from "next/server";

const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:4000";

export async function GET(req, ctx) {
  const { id } = await ctx.params;

  const target = `${API_BASE_URL}/api/admin/requests/${encodeURIComponent(id)}`;
  const cookie = req.headers.get("cookie") || "";

  const res = await fetch(target, {
    method: "GET",
    headers: { cookie },
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
