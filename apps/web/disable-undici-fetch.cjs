// /home/camperrent/apps/web/disable-undici-fetch.cjs
const fetch = require("node-fetch");

globalThis.fetch = fetch;
globalThis.Headers = fetch.Headers;
globalThis.Request = fetch.Request;
globalThis.Response = fetch.Response;

// Next/Route handlers очакват Response.json(...) (static)
if (typeof globalThis.Response.json !== "function") {
  globalThis.Response.json = (data, init = {}) => {
    const headers = new globalThis.Headers(init.headers || {});
    if (!headers.has("content-type")) headers.set("content-type", "application/json; charset=utf-8");

    return new globalThis.Response(JSON.stringify(data), {
      ...init,
      headers,
    });
  };
}