// apps/web/app/api/admin/info-files/route.js
export const runtime = "nodejs";

function getApiBaseUrl() {
  const v = process.env.API_BASE_URL;
  return v && String(v).trim() ? String(v).trim().replace(/\/+$/, "") : "http://localhost:4000";
}

function pickForwardHeaders(req) {
  const h = {};
  const cookie = req.headers.get("cookie");
  if (cookie) h.cookie = cookie;

  const ua = req.headers.get("user-agent");
  if (ua) h["user-agent"] = ua;

  const accept = req.headers.get("accept");
  if (accept) h.accept = accept;

  const contentType = req.headers.get("content-type");
  if (contentType) h["content-type"] = contentType;

  return h;
}

export async function POST(req) {
  const api = getApiBaseUrl();

  const upstream = await fetch(`${api}/api/admin/info-files`, {
    method: "POST",
    headers: pickForwardHeaders(req),
    body: req.body,
    duplex: "half",
    cache: "no-store",
  });

  const text = await upstream.text();
  return new Response(text, {
    status: upstream.status,
    headers: {
      "content-type": upstream.headers.get("content-type") || "application/json; charset=utf-8",
    },
  });
}
