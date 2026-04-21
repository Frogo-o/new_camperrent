import { NextResponse } from "next/server";
import { revalidatePublicCatalog } from "../../../../../../../lib/catalog-cache";

const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:4000";

function forwardHeaders(req) {
  const h = new Headers();
  const cookie = req.headers.get("cookie");
  if (cookie) h.set("cookie", cookie);
  return h;
}

export async function PATCH(req, ctx) {
  const { slug, imageId } = await ctx.params;

  const target = `${API_BASE_URL}/api/admin/product-editor/${encodeURIComponent(slug)}/images/${encodeURIComponent(imageId)}`;

  const res = await fetch(target, {
    method: "PATCH",
    headers: (() => {
      const h = forwardHeaders(req);
      h.set("content-type", "application/json; charset=utf-8");
      return h;
    })(),
    body: await req.text(),
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
    },
  });
}

export async function DELETE(req, ctx) {
  const { slug, imageId } = await ctx.params;

  const target = `${API_BASE_URL}/api/admin/product-editor/${encodeURIComponent(slug)}/images/${encodeURIComponent(imageId)}`;

  const res = await fetch(target, {
    method: "DELETE",
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
    },
  });
}
