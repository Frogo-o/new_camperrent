// components/Price.js (или където ти е файла)

const EUR_TO_BGN = 1.95583;

export function formatPriceTextFromCents(cents, opts) {
  const options = opts && typeof opts === "object" ? opts : {};
  const allowZero = Boolean(options.allowZero);

  const n = Number(cents || 0);

  if (!Number.isFinite(n) || n < 0) {
    return allowZero ? "0.00 EUR (0.00 BGN)" : "Изчерпан";
  }

  if (n <= 0) {
    if (!allowZero) return "Изчерпан";

    const eurFormatted = new Intl.NumberFormat("bg-BG", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(0);

    const bgnFormatted = new Intl.NumberFormat("bg-BG", {
      style: "currency",
      currency: "BGN",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(0);

    return `${eurFormatted} (${bgnFormatted})`;
  }

  const eur = n / 100;
  const bgn = eur * EUR_TO_BGN;

  const eurFormatted = new Intl.NumberFormat("bg-BG", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(eur);

  const bgnFormatted = new Intl.NumberFormat("bg-BG", {
    style: "currency",
    currency: "BGN",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(bgn);

  return `${eurFormatted} (${bgnFormatted})`;
}
