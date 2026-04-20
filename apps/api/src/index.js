require("../load-env");

// KILL undici / llhttp wasm
delete globalThis.fetch;
delete globalThis.Headers;
delete globalThis.Request;
delete globalThis.Response;

globalThis.fetch = require("node-fetch");

process.env.PRISMA_CLIENT_ENGINE_TYPE = "binary"
process.env.PRISMA_QUERY_ENGINE_TYPE = "binary"

const app = require("./app");
const { shutdownDb } = require("./db/prisma");
const { validateEnv } = require("./config/env.validator");
const { processPendingOrderEmails } = require("./modules/orders/emails/orderEmail.service");

validateEnv();

const port = Number(process.env.PORT) || 4000;

const server = app.listen(port, "127.0.0.1", () => {
  console.log(`API running on http://localhost:${port}`);
});

const emailWorkerInterval = setInterval(() => {
  processPendingOrderEmails(10).catch((e) => console.log("[EMAIL WORKER]", e));
}, 30000);


async function shutdown() {
  console.log("Shutting down...");
  clearInterval(emailWorkerInterval);

  server.close(async () => {
    await shutdownDb();
    process.exit(0);
  });
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
