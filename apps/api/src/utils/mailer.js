const nodemailer = require("nodemailer");

let transporter = null;

function getTransporter() {
  if (transporter) return transporter;

  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: String(process.env.SMTP_SECURE) === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  return transporter;
}

function htmlToText(html) {
  return String(html || "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

async function verifyMailer() {
  const t = getTransporter();
  await t.verify();
}

async function sendMail({ to, subject, html }) {
  const t = getTransporter();

  const fromAddr = process.env.ORDERS_EMAIL_FROM || process.env.SMTP_USER;
  const fromName = process.env.ORDERS_EMAIL_FROM_NAME || "CamperRent";

  const cleanHtml = `
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width" />
      </head>
      <body style="margin:0;padding:0;font-family:Arial,sans-serif;font-size:14px;line-height:1.45">
        ${html || ""}
      </body>
    </html>
  `.trim();

  const text = htmlToText(cleanHtml) || " ";

  return await t.sendMail({
    from: { name: fromName, address: fromAddr },
    to,
    subject,
    text,
    html: cleanHtml,
  });
}

module.exports = { verifyMailer, sendMail };
