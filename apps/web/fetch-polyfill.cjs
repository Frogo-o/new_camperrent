const w = require("@whatwg-node/fetch");

delete globalThis.fetch;
delete globalThis.Headers;
delete globalThis.Request;
delete globalThis.Response;
delete globalThis.FormData;

globalThis.fetch = w.fetch;
globalThis.Headers = w.Headers;
globalThis.Request = w.Request;
globalThis.Response = w.Response;
globalThis.FormData = w.FormData;

if (w.Blob) globalThis.Blob = w.Blob;
if (w.File) globalThis.File = w.File;
