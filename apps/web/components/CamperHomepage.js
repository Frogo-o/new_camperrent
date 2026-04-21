import Link from "next/link";
import { getProducts } from "../lib/api";
import { PriceEURWithBGN } from "./Price";

const partnerLogos = [
  { src: "/fiamma.png", alt: "Fiamma" },
  { src: "/dometic.png", alt: "Dometic" },
  { src: "/THETFORD.png", alt: "Thetford" },
  { src: "/Reimo.jpg", alt: "Reimo" },
  { src: "/logo-aplast.png", alt: "Aplast" },
  { src: "/carbest-logo.jpg", alt: "Carbest" },
  { src: "/COMET.jpg", alt: "Comet" },
  { src: "/MAPA.png", alt: "Mapa" },
  { src: "/Plastoform.jpg", alt: "Plastoform" },
  { src: "/GIOCAMPER.png", alt: "Giocamper" },
  { src: "/habawestacc-combilogo.jpg", alt: "HabaWest" },
];

const shopCategories = [
  {
    title: "Ð¢ÐµÐ½Ñ‚Ð¸ Ð¸ Ð¼Ð°Ñ€ÐºÐ¸Ð·Ð¸",
    text: "ÐŸÑ€Ð°ÐºÑ‚Ð¸Ñ‡Ð½Ð¸ Ñ€ÐµÑˆÐµÐ½Ð¸Ñ Ð·Ð° ÑÑÐ½ÐºÐ°, ÐºÐ¾Ð¼Ñ„Ð¾Ñ€Ñ‚ Ð¸ Ð¿Ð¾Ð²ÐµÑ‡Ðµ ÑÐ²Ð¾Ð±Ð¾Ð´Ð° Ð½Ð° ÐºÑŠÐ¼Ð¿Ð¸Ð½Ð³.",
    icon: "â˜€",
  },
  {
    title: "Ð’Ð¾Ð´Ð° Ð¸ ÑÐ°Ð½Ð¸Ñ‚Ð°Ñ€Ð¸Ñ",
    text: "Ð ÐµÐ·ÐµÑ€Ð²Ð¾Ð°Ñ€Ð¸, Ð´ÑƒÑˆÐ¾Ð²Ðµ, Ñ‚Ð¾Ð°Ð»ÐµÑ‚Ð½Ð¸ Ð¸ Ð²ÑÐ¸Ñ‡ÐºÐ¾ Ð½ÑƒÐ¶Ð½Ð¾ Ð·Ð° Ð½ÐµÐ·Ð°Ð²Ð¸ÑÐ¸Ð¼Ð¾ÑÑ‚ Ð¿Ð¾ Ð¿ÑŠÑ‚Ñ.",
    icon: "ðŸ’§",
  },
  {
    title: "Ð¢Ð¾Ðº Ð¸ Ð¾ÑÐ²ÐµÑ‚Ð»ÐµÐ½Ð¸Ðµ",
    text: "Ð‘Ð°Ñ‚ÐµÑ€Ð¸Ð¸, ÐºÐ°Ð±ÐµÐ»Ð¸, Ð¾ÑÐ²ÐµÑ‚Ð»ÐµÐ½Ð¸Ðµ Ð¸ ÐµÐ½ÐµÑ€Ð³Ð¸Ð¹Ð½Ð¸ Ñ€ÐµÑˆÐµÐ½Ð¸Ñ Ð·Ð° ÐºÐµÐ¼Ð¿ÐµÑ€ Ð¶Ð¸Ð²Ð¾Ñ‚.",
    icon: "âš¡",
  },
  {
    title: "ÐšÑƒÑ…Ð½Ñ Ð¸ ÐºÑŠÐ¼Ð¿Ð¸Ð½Ð³ Ð¾Ð±Ð¾Ñ€ÑƒÐ´Ð²Ð°Ð½Ðµ",
    text: "Ð“Ð¾Ñ‚Ð²Ð°Ñ€ÑÐºÐ¸ Ð¸ Ð¿Ñ€Ð°ÐºÑ‚Ð¸Ñ‡Ð½Ð¸ Ð°ÐºÑÐµÑÐ¾Ð°Ñ€Ð¸ Ð·Ð° ÑƒÐ´Ð¾Ð±ÑÑ‚Ð²Ð¾ Ð½Ð°Ð²ÑÑÐºÑŠÐ´Ðµ.",
    icon: "ðŸ³",
  },
];

const steps = [
  {
    title: "ÐŸÐ»Ð°Ð½Ð¸Ñ€Ð°Ð½Ðµ",
    text: "ÐšÐ¾Ð½Ñ„Ð¸Ð³ÑƒÑ€Ð°Ñ†Ð¸ÑÑ‚Ð° Ð½Ð° Ñ‚Ð²Ð¾Ñ ÐºÐµÐ¼Ð¿ÐµÑ€ - Ñ€Ð°Ð·Ð¿Ñ€ÐµÐ´ÐµÐ»ÐµÐ½Ð¸Ðµ, Ð¸Ð·Ð¾Ð»Ð°Ñ†Ð¸Ñ Ð¸ Ð¾ÑÐ½Ð¾Ð²Ð½Ð¸ ÑÐ¸ÑÑ‚ÐµÐ¼Ð¸.",
  },
  {
    title: "ÐžÐ±Ð¾Ñ€ÑƒÐ´Ð²Ð°Ð½Ðµ",
    text: "Ð•Ð»ÐµÐºÑ‚Ñ€Ð¸Ñ‡ÐµÑÐºÐ¸ ÑÐ¸ÑÑ‚ÐµÐ¼Ð¸, Ð¾ÑÐ²ÐµÑ‚Ð»ÐµÐ½Ð¸Ðµ, Ð²Ð¾Ð´Ð°, Ð¾Ñ‚Ð¾Ð¿Ð»ÐµÐ½Ð¸Ðµ, Ñ‚Ð¾Ð°Ð»ÐµÑ‚Ð½Ð° Ð¸ Ð²ÑÐ¸Ñ‡ÐºÐ¸ Ð½ÐµÐ¾Ð±Ñ…Ð¾Ð´Ð¸Ð¼Ð¸ ÑƒÑ€ÐµÐ´Ð¸ Ð·Ð° ÐºÐ¾Ð¼Ñ„Ð¾Ñ€Ñ‚ Ð¸ Ð°Ð²Ñ‚Ð¾Ð½Ð¾Ð¼Ð½Ð¾ÑÑ‚.",
  },
  {
    title: "Ð˜Ð·Ð³Ñ€Ð°Ð¶Ð´Ð°Ð½Ðµ",
    text: "Ð˜Ð½Ñ‚ÐµÑ€Ð¸Ð¾Ñ€, Ð¼ÐµÐ±ÐµÐ»Ð¸ Ð¸ Ð²ÑÐ¸Ñ‡ÐºÐ¸ Ð´ÐµÑ‚Ð°Ð¹Ð»Ð¸ Ð·Ð° Ð¿Ñ€Ð°ÐºÑ‚Ð¸Ñ‡Ð½Ð¸ Ñ€ÐµÑˆÐµÐ½Ð¸Ñ Ð¸ ÑƒÐ²ÐµÑ€ÐµÐ½ ÑÑ‚Ð°Ñ€Ñ‚ Ð½Ð° Ð¿ÑŠÑ‚Ñ.",
  },
];

async function safeGetProducts(params) {
  try {
    const result = await getProducts(params);
    return Array.isArray(result?.data) ? result.data : [];
  } catch {
    return [];
  }
}

function getProductImage(product) {
  return product?.images?.[0]?.url || "/beautiful-campsite-mountains-with-rv-wooden-bench.jpg";
}

function getRentMeta(product) {
  return product?.brand?.name || product?.articleNumber || "ÐÐ°Ð¿ÑŠÐ»Ð½Ð¾ Ð¾Ð±Ð¾Ñ€ÑƒÐ´Ð²Ð°Ð½ ÐºÐµÐ¼Ð¿ÐµÑ€";
}

function getBuyMeta(product) {
  const bits = [product?.brand?.name, product?.articleNumber].filter(Boolean);
  return bits.length ? bits.join(" â€¢ ") : "ÐÐºÑ‚ÑƒÐ°Ð»Ð½Ð° Ð¾Ñ„ÐµÑ€Ñ‚Ð°";
}

function ProductCta({ href, label, kind }) {
  return (
    <Link
      href={href}
      className={
        kind === "rent"
          ? "rounded-full bg-[#f0a61c] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#df9918]"
          : "rounded-full bg-[#00A6F4] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#0298df]"
      }
    >
      {label}
    </Link>
  );
}

function EmptyStateCard({ title, text, href, cta }) {
  return (
    <article className="rounded-[1.5rem] border border-[#dcecff] bg-white p-6 shadow-[0_10px_30px_rgba(41,89,129,0.06)]">
      <h3 className="text-2xl font-semibold text-[#2f658e]">{title}</h3>
      <p className="mt-4 leading-7 text-slate-600">{text}</p>
      <Link href={href} className="mt-8 inline-flex rounded-full border border-[#cfeaff] bg-[#f3fbff] px-5 py-3 text-sm font-medium text-[#00A6F4] transition hover:bg-[#e9f7ff]">
        {cta}
      </Link>
    </article>
  );
}

function RentCard({ product }) {
  const href = product?.slug ? `/product/${product.slug}` : "/rent";

  return (
    <article className="overflow-hidden rounded-[2rem] border border-[#dcecff] bg-white shadow-[0_10px_30px_rgba(41,89,129,0.06)] transition hover:-translate-y-1 hover:shadow-[0_14px_40px_rgba(41,89,129,0.10)]">
      <div className="relative">
        <img src={getProductImage(product)} alt={product?.name || "ÐšÐµÐ¼Ð¿ÐµÑ€ Ð¿Ð¾Ð´ Ð½Ð°ÐµÐ¼"} className="h-72 w-full object-cover" />
        <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-[#2f658e] shadow-sm">
          ÐšÐµÐ¼Ð¿ÐµÑ€ Ð¿Ð¾Ð´ Ð½Ð°ÐµÐ¼
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-semibold text-[#2f658e]">{product?.name || "ÐšÐµÐ¼Ð¿ÐµÑ€ Ð¿Ð¾Ð´ Ð½Ð°ÐµÐ¼"}</h3>
        <p className="mt-2 text-slate-500">{getRentMeta(product)}</p>
        <div className="mt-6 flex items-end justify-between gap-4">
          <div>
            <div className="text-sm text-slate-400">Ð¦ÐµÐ½Ð°</div>
            <div className="text-[#00A6F4]">
              <PriceEURWithBGN cents={product?.price} />
            </div>
          </div>
          <ProductCta href={href} label="Ð’Ð¸Ð¶ Ð´ÐµÑ‚Ð°Ð¹Ð»Ð¸" kind="rent" />
        </div>
      </div>
    </article>
  );
}

function BuyCard({ product }) {
  const href = product?.slug ? `/product/${product.slug}` : "/buy";

  return (
    <article className="overflow-hidden rounded-[2rem] border border-[#dcecff] bg-white shadow-[0_10px_30px_rgba(41,89,129,0.06)] transition hover:-translate-y-1 hover:shadow-[0_14px_40px_rgba(41,89,129,0.10)]">
      <div className="relative">
        <img src={getProductImage(product)} alt={product?.name || "ÐšÐµÐ¼Ð¿ÐµÑ€ Ð·Ð° Ð¿Ð¾ÐºÑƒÐ¿ÐºÐ°"} className="h-72 w-full object-cover" />
        <div className="absolute left-4 top-4 rounded-full border border-[#bfe7fb] bg-[#eef9ff] px-3 py-1 text-xs font-medium text-[#00A6F4]">
          ÐÐ°Ð»Ð¸Ñ‡ÐµÐ½
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-semibold text-[#2f658e]">{product?.name || "ÐšÐµÐ¼Ð¿ÐµÑ€ Ð·Ð° Ð¿Ð¾ÐºÑƒÐ¿ÐºÐ°"}</h3>
        <p className="mt-3 text-slate-500">{getBuyMeta(product)}</p>
        <div className="mt-8 flex items-end justify-between gap-4">
          <div className="text-[#00A6F4]">
            <PriceEURWithBGN cents={product?.price} />
          </div>
          <ProductCta href={href} label="Ð’Ð¸Ð¶ Ð¾Ñ„ÐµÑ€Ñ‚Ð°" kind="buy" />
        </div>
      </div>
    </article>
  );
}

export default async function CamperHomepage() {
  const [rentals, campersForSale] = await Promise.all([
    safeGetProducts({ categorySlug: "camper-rent", limit: 3, sort: "newest" }),
    safeGetProducts({ categorySlug: "buy-camper", limit: 3, sort: "newest" }),
  ]);

  return (
    <div className="min-h-screen bg-[#f7fbff] text-slate-900">
      <style>{`
        @keyframes partner-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .partner-marquee-track {
          animation: partner-scroll 28s linear infinite;
          width: max-content;
        }
        .partner-marquee:hover .partner-marquee-track {
          animation-play-state: paused;
        }
      `}</style>

      <main>
        <section className="relative overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#f7fbff_100%)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,166,244,0.11),transparent_26%),radial-gradient(circle_at_top_right,rgba(240,166,28,0.14),transparent_24%)]" />
          <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-[1.02fr_0.98fr] lg:px-8 lg:py-24">
            <div className="relative z-10 flex flex-col justify-center">
              <span className="mb-5 inline-flex w-fit rounded-full border border-[#d9efff] bg-[#eef8ff] px-4 py-2 text-xs uppercase tracking-[0.2em] text-[#32719f]">
                ÐžÐ‘ÐžÐ Ð£Ð”Ð’ÐÐÐ• Â· ÐÐÐ•ÐœÐ˜ ÐšÐ•ÐœÐŸÐ•Ð  Â· ÐšÐ£ÐŸÐ˜ ÐšÐ•ÐœÐŸÐ•Ð 
              </span>
              <h1 className="max-w-4xl text-5xl font-semibold leading-tight tracking-tight text-[#2f658e] sm:text-6xl lg:text-7xl">
                Ð’ÑÐ¸Ñ‡ÐºÐ¾ Ð·Ð° Ñ‚Ð²Ð¾ÐµÑ‚Ð¾ Ð¿ÑŠÑ‚ÑƒÐ²Ð°Ð½Ðµ.
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600 sm:text-xl">
                ÐžÐ±Ð¾Ñ€ÑƒÐ´Ð²Ð°Ð¹ ÐºÐµÐ¼Ð¿ÐµÑ€Ð° ÑÐ¸ Ð¸Ð»Ð¸ Ð¿Ñ€ÐµÐ²ÑŠÑ€Ð½Ð¸ Ð±ÑƒÑÐ° ÑÐ¸ Ð² Ð´Ð¾Ð¼ Ð½Ð° ÐºÐ¾Ð»ÐµÐ»Ð°.
                <br />
                ÐÐ°ÐµÐ¼Ð¸ ÐºÐµÐ¼Ð¿ÐµÑ€ Ð¸Ð»Ð¸ Ð¸Ð·Ð±ÐµÑ€Ð¸ Ð¾Ñ‚ Ð½Ð°ÑˆÐ¸Ñ‚Ðµ Ð¼Ð¾Ð´ÐµÐ»Ð¸ Ð·Ð° Ð¿Ð¾ÐºÑƒÐ¿ÐºÐ°. Ð’ÑÐ¸Ñ‡ÐºÐ¾ Ð½ÐµÐ¾Ð±Ñ…Ð¾Ð´Ð¸Ð¼Ð¾ Ð½Ð° ÐµÐ´Ð½Ð¾ Ð¼ÑÑÑ‚Ð¾, Ð·Ð° Ð´Ð° Ñ‚Ñ€ÑŠÐ³Ð½ÐµÑˆ ÑƒÐ²ÐµÑ€ÐµÐ½Ð¾ ÐºÑŠÐ¼ ÑÐ»ÐµÐ´Ð²Ð°Ñ‰Ð¾Ñ‚Ð¾ ÑÐ¸ Ð¿Ñ€Ð¸ÐºÐ»ÑŽÑ‡ÐµÐ½Ð¸Ðµ.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/store" className="rounded-full bg-[#00A6F4] px-6 py-3.5 font-medium text-white shadow-xl shadow-[#00A6F4]/15 transition hover:bg-[#0298df]">
                  ÐžÐ½Ð»Ð°Ð¹Ð½ Ð¼Ð°Ð³Ð°Ð·Ð¸Ð½
                </Link>
                <Link href="/rent" className="rounded-full border border-[#00A6F4] bg-white px-6 py-3.5 font-medium text-[#00A6F4] transition hover:bg-[#eef8ff]">
                  ÐÐ°ÐµÐ¼Ð¸ ÐºÐµÐ¼Ð¿ÐµÑ€
                </Link>
              </div>
            </div>

            <div className="relative z-10">
              <div className="rounded-[2rem] border border-[#dcecff] bg-white p-4 shadow-[0_16px_60px_rgba(43,87,128,0.12)]">
                <div className="relative overflow-hidden rounded-[1.5rem] bg-[linear-gradient(180deg,#f9fcff_0%,#edf8ff_100%)] p-6">
                  <img
                    src="/beautiful-campsite-mountains-with-rv-wooden-bench.jpg"
                    alt="Camper in nature"
                    className="h-[280px] w-full rounded-[1.25rem] object-cover sm:h-[420px]"
                  />
                  <div className="absolute bottom-8 left-8 rounded-full border border-white/60 bg-white/85 px-4 py-2 text-sm font-medium text-[#2f658e] shadow-lg backdrop-blur-md">
                    Ð’ÑÐ¸Ñ‡ÐºÐ¾ Ð½Ð° ÐµÐ´Ð½Ð¾ Ð¼ÑÑÑ‚Ð¾
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-[#dcecff] bg-white">
          <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-sm">
                <p className="text-sm uppercase tracking-[0.2em] text-slate-400">ÐžÑ„Ð¸Ñ†Ð¸Ð°Ð»ÐµÐ½ Ð¿Ñ€ÐµÐ´ÑÑ‚Ð°Ð²Ð¸Ñ‚ÐµÐ» Ð½Ð°</p>
              </div>

              <div className="flex w-full items-center gap-8 overflow-hidden">
                <div className="partner-marquee relative w-full overflow-hidden">
                  <div className="partner-marquee-track flex items-center gap-4 whitespace-nowrap pr-4">
                    {[...partnerLogos, ...partnerLogos].map((logo, index) => (
                      <div
                        key={`${logo.src}-${index}`}
                        className="flex h-16 items-center justify-center rounded-full border border-[#dcecff] bg-[#f9fcff] px-5 opacity-70 transition hover:opacity-100"
                      >
                        <img src={logo.src} alt={logo.alt} className="h-8 w-auto object-contain sm:h-10" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-[1.25fr_0.85fr_0.85fr]">
            <article className="group rounded-[2rem] border border-[#cfeaff] bg-[linear-gradient(180deg,#ffffff_0%,#f4fbff_100%)] p-8 shadow-[0_12px_40px_rgba(41,89,129,0.08)] transition hover:-translate-y-1">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e9f7ff] text-2xl">ðŸ›’</div>
              <h3 className="text-3xl font-semibold text-[#2f658e]">ÐžÐ½Ð»Ð°Ð¹Ð½ Ð¼Ð°Ð³Ð°Ð·Ð¸Ð½ Ð·Ð° Ð¾Ð±Ð¾Ñ€ÑƒÐ´Ð²Ð°Ð½Ðµ Ð½Ð° ÐºÐµÐ¼Ð¿ÐµÑ€Ð¸ Ð¸ ÐºÐ°Ñ€Ð°Ð²Ð°Ð½Ð¸</h3>
              <p className="mt-4 max-w-xl leading-8 text-slate-600">
                ÐžÑ‚ÐºÑ€Ð¸Ð¹ Ð¾Ð±Ð¾Ñ€ÑƒÐ´Ð²Ð°Ð½Ðµ Ð·Ð° ÐºÐµÐ¼Ð¿ÐµÑ€Ð¸ Ð¸ ÐºÐ°Ñ€Ð°Ð²Ð°Ð½Ð¸ - Ð°ÐºÑÐµÑÐ¾Ð°Ñ€Ð¸, ÑÐ¸ÑÑ‚ÐµÐ¼Ð¸ Ð¸ Ñ€ÐµÑˆÐµÐ½Ð¸Ñ Ð·Ð° ÐºÐ¾Ð¼Ñ„Ð¾Ñ€Ñ‚ Ð¸ Ñ„ÑƒÐ½ÐºÑ†Ð¸Ð¾Ð½Ð°Ð»Ð½Ð¾ÑÑ‚ Ð¿Ñ€Ð¸ Ð²ÑÑÐºÐ¾ Ð¿ÑŠÑ‚ÑƒÐ²Ð°Ð½Ðµ.
              </p>
              <Link href="/store" className="mt-8 inline-flex rounded-full bg-[#00A6F4] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#0298df]">
                Ð Ð°Ð·Ð³Ð»ÐµÐ´Ð°Ð¹ Ð¾Ð½Ð»Ð°Ð¹Ð½ Ð¼Ð°Ð³Ð°Ð·Ð¸Ð½Ð°
              </Link>
            </article>

            <article className="group rounded-[2rem] border border-[#dcecff] bg-white p-8 transition hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(41,89,129,0.08)]">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#eef8ff] text-2xl">ðŸš</div>
              <h3 className="text-2xl font-semibold text-[#2f658e]">ÐÐ°ÐµÐ¼Ð¸ ÐºÐµÐ¼Ð¿ÐµÑ€</h3>
              <p className="mt-4 leading-7 text-slate-600">
                ÐÐ°ÐµÐ¼Ð¸ ÑÐ¸Ð³ÑƒÑ€ÐµÐ½ Ð¸ Ð½Ð°Ð¿ÑŠÐ»Ð½Ð¾ Ð¾Ð±Ð¾Ñ€ÑƒÐ´Ð²Ð°Ð½ ÐºÐµÐ¼Ð¿ÐµÑ€ Ð·Ð° ÑÐ»ÐµÐ´Ð²Ð°Ñ‰Ð¾Ñ‚Ð¾ ÑÐ¸ Ð¿ÑŠÑ‚ÑƒÐ²Ð°Ð½Ðµ. Ð˜Ð·Ð±ÐµÑ€Ð¸ Ð¾Ñ‚ Ð°ÐºÑ‚ÑƒÐ°Ð»Ð½Ð¸ Ð¼Ð¾Ð´ÐµÐ»Ð¸ Ð¸ Ð½Ð°Ð¿Ñ€Ð°Ð²Ð¸ Ð·Ð°Ð¿Ð¸Ñ‚Ð²Ð°Ð½Ðµ Ð±ÑŠÑ€Ð·Ð¾.
              </p>
              <Link href="/rent" className="mt-8 inline-flex text-sm font-medium text-[#00A6F4] transition group-hover:translate-x-1">
                Ð ÐµÐ·ÐµÑ€Ð²Ð¸Ñ€Ð°Ð¹ ÑÐµÐ³Ð° â†’
              </Link>
            </article>

            <article className="group rounded-[2rem] border border-[#dcecff] bg-white p-8 transition hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(41,89,129,0.08)]">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#eef8ff] text-2xl">ðŸ§°</div>
              <h3 className="text-2xl font-semibold text-[#2f658e]">ÐšÑƒÐ¿Ð¸ ÐºÐµÐ¼Ð¿ÐµÑ€ Ð¸Ð»Ð¸ ÐºÐ°Ñ€Ð°Ð²Ð°Ð½Ð°</h3>
              <p className="mt-4 leading-7 text-slate-600">Ð Ð°Ð·Ð³Ð»ÐµÐ´Ð°Ð¹ ÐºÐµÐ¼Ð¿ÐµÑ€Ð¸ Ð¸ ÐºÐ°Ñ€Ð°Ð²Ð°Ð½Ð¸ Ð·Ð° Ð¿Ñ€Ð¾Ð´Ð°Ð¶Ð±Ð° Ð¸ Ð¸Ð·Ð±ÐµÑ€Ð¸ Ð½Ð°Ð¹-Ð¿Ð¾Ð´Ñ…Ð¾Ð´ÑÑ‰Ð¸Ñ Ð·Ð° Ñ‚ÐµÐ±.</p>
              <Link href="/buy" className="mt-8 inline-flex text-sm font-medium text-[#00A6F4] transition group-hover:translate-x-1">
                Ð Ð°Ð·Ð³Ð»ÐµÐ´Ð°Ð¹ â†’
              </Link>
            </article>
          </div>
        </section>

        <section id="build" className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="grid gap-8 overflow-hidden rounded-[2rem] border border-[#dcecff] bg-[linear-gradient(180deg,#ffffff_0%,#f8fcff_100%)] p-8 shadow-[0_14px_50px_rgba(41,89,129,0.08)] lg:grid-cols-[0.92fr_1.08fr] lg:p-12">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-[#00A6F4]">ÐšÐÐš Ð”Ð Ð¡Ð˜ ÐÐÐŸÐ ÐÐ’Ð˜Ð¨ ÐšÐ•ÐœÐŸÐ•Ð </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#2f658e] sm:text-4xl">ÐÐ°Ð¿Ñ€Ð°Ð²Ð¸ ÑÐ¸ ÐºÐµÐ¼Ð¿ÐµÑ€</h2>
              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
                ÐŸÐ»Ð°Ð½Ð¸Ñ€Ð°Ð¹ Ð¸ Ð¸Ð·Ð³Ñ€Ð°Ð´Ð¸ ÑÐ²Ð¾Ñ ÐºÐµÐ¼Ð¿ÐµÑ€ Ñ Ð¿Ñ€Ð°Ð²Ð¸Ð»Ð½Ð¾Ñ‚Ð¾ Ð¾Ð±Ð¾Ñ€ÑƒÐ´Ð²Ð°Ð½Ðµ. ÐŸÑ€ÐµÐ´Ð»Ð°Ð³Ð°Ð¼Ðµ Ñ†ÑÐ»Ð¾ÑÑ‚Ð½Ð¾ Ð¸Ð·Ð³Ñ€Ð°Ð¶Ð´Ð°Ð½Ðµ Ð½Ð° ÐºÐµÐ¼Ð¿ÐµÑ€Ð¸ - Ð¾Ñ‚ Ð¿Ñ€Ð¾ÐµÐºÑ‚Ð¸Ñ€Ð°Ð½Ðµ Ð¸ Ð¸Ð·Ð¾Ð»Ð°Ñ†Ð¸Ñ Ð´Ð¾ Ð¼Ð¾Ð½Ñ‚Ð°Ð¶ Ð½Ð° ÐµÐ»ÐµÐºÑ‚Ñ€Ð¸Ñ‡ÐµÑÐºÐ¸ ÑÐ¸ÑÑ‚ÐµÐ¼Ð¸, Ð²Ð¾Ð´Ð°, Ð¾Ñ‚Ð¾Ð¿Ð»ÐµÐ½Ð¸Ðµ Ð¸ Ð¾Ð±Ð·Ð°Ð²ÐµÐ¶Ð´Ð°Ð½Ðµ.
              </p>
              <p className="mt-6 max-w-xl text-base leading-7 text-slate-600">
                Ð¡ Ð¾Ð¿Ð¸Ñ‚ Ð¾Ñ‚ Ð½Ð°Ð´ 50 Ñ€ÐµÐ°Ð»Ð¸Ð·Ð¸Ñ€Ð°Ð½Ð¸ Ð¿Ñ€Ð¾ÐµÐºÑ‚Ð° Ð¸ Ð´Ð¾ÐºÐ°Ð·Ð°Ð½ Ð¿Ñ€Ð¾Ñ„ÐµÑÐ¸Ð¾Ð½Ð°Ð»Ð¸Ð·ÑŠÐ¼ Ñ‰Ðµ ÑÑŠÐ·Ð´Ð°Ð´ÐµÐ¼ Ð½Ð°Ð¿ÑŠÐ»Ð½Ð¾ Ð¾Ð±Ð¾Ñ€ÑƒÐ´Ð²Ð°Ð½ Ð¸ Ð³Ð¾Ñ‚Ð¾Ð² Ð·Ð° Ð¿ÑŠÑ‚ ÐºÐµÐ¼Ð¿ÐµÑ€, ÑÑŠÐ¾Ð±Ñ€Ð°Ð·ÐµÐ½ Ñ Ñ‚Ð²Ð¾Ð¸Ñ‚Ðµ Ð½ÑƒÐ¶Ð´Ð¸.
              </p>
              <Link href="/kak-da-si-napravim-kemper" className="mt-8 inline-flex rounded-full bg-[#f0a61c] px-6 py-3 font-medium text-white transition hover:bg-[#df9918]">
                ÐÐ°ÑƒÑ‡Ð¸ Ð¿Ð¾Ð²ÐµÑ‡Ðµ
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {steps.map((step, index) => (
                <div key={step.title} className="rounded-[1.5rem] border border-[#e3f1ff] bg-white p-6">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#ecf8ff] text-lg font-semibold text-[#00A6F4]">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-semibold text-[#2f658e]">{step.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{step.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="shop" className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="grid gap-8 overflow-hidden rounded-[2rem] border border-[#dcecff] bg-white p-8 shadow-[0_14px_50px_rgba(41,89,129,0.08)] lg:grid-cols-[0.9fr_1.1fr] lg:p-12">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-[#00A6F4]">ÐžÐ‘ÐžÐ Ð£Ð”Ð’ÐÐÐ• / ÐžÐÐ›ÐÐ™Ð ÐœÐÐ“ÐÐ—Ð˜Ð</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#2f658e] sm:text-4xl">ÐžÐ±Ð¾Ñ€ÑƒÐ´Ð²Ð°Ð½Ðµ Ð·Ð° ÐºÐµÐ¼Ð¿ÐµÑ€Ð¸ Ð¸ ÐºÐ°Ñ€Ð°Ð²Ð°Ð½Ð¸</h2>
              <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">
                Ð Ð°Ð·Ð³Ð»ÐµÐ´Ð°Ð¹ Ð¾Ð±Ð¾Ñ€ÑƒÐ´Ð²Ð°Ð½Ðµ Ð·Ð° ÐºÐµÐ¼Ð¿ÐµÑ€Ð¸ Ð¸ ÐºÐ°Ñ€Ð°Ð²Ð°Ð½Ð¸ - Ñ‚ÐµÐ½Ñ‚Ð¸, ÑÐ¸ÑÑ‚ÐµÐ¼Ð¸ Ð·Ð° Ð²Ð¾Ð´Ð°, ÐµÐ»ÐµÐºÑ‚Ñ€Ð¸Ñ‡ÐµÑÑ‚Ð²Ð¾, Ð¾ÑÐ²ÐµÑ‚Ð»ÐµÐ½Ð¸Ðµ Ð¸ ÐºÑŠÐ¼Ð¿Ð¸Ð½Ð³ Ð°ÐºÑÐµÑÐ¾Ð°Ñ€Ð¸ Ð·Ð° ÐºÐ¾Ð¼Ñ„Ð¾Ñ€Ñ‚ Ð¸ Ð°Ð²Ñ‚Ð¾Ð½Ð¾Ð¼Ð½Ð¾ÑÑ‚ Ð·Ð° Ñ‚Ð²Ð¾ÐµÑ‚Ð¾ Ð¿ÑŠÑ‚ÑƒÐ²Ð°Ð½Ðµ.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/store" className="rounded-full border border-[#cfeaff] bg-[#f3fbff] px-6 py-3 font-medium text-[#00A6F4] transition hover:bg-[#e9f7ff]">
                  Ð’Ð¸Ð¶ Ð²ÑÐ¸Ñ‡ÐºÐ¸ ÐºÐ°Ñ‚ÐµÐ³Ð¾Ñ€Ð¸Ð¸
                </Link>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {shopCategories.map((item) => (
                <div key={item.title} className="rounded-[1.5rem] border border-[#e3f1ff] bg-[linear-gradient(180deg,#ffffff_0%,#f8fcff_100%)] p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#ecf8ff] text-xl">{item.icon}</div>
                  <h3 className="text-xl font-semibold text-[#2f658e]">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="rent" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-[#00A6F4]">ÐÐÐ•ÐœÐ˜ ÐšÐ•ÐœÐŸÐ•Ð </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#2f658e] sm:text-4xl">ÐšÐµÐ¼Ð¿ÐµÑ€Ð¸ Ð¿Ð¾Ð´ Ð½Ð°ÐµÐ¼</h2>
            <p className="mt-4 max-w-3xl text-slate-600">
              ÐšÐµÐ¼Ð¿ÐµÑ€Ð¸ Ð¿Ð¾Ð´ Ð½Ð°ÐµÐ¼ Ð² Ð‘ÑŠÐ»Ð³Ð°Ñ€Ð¸Ñ - Ñ€Ð°Ð·Ð½Ð¾Ð¾Ð±Ñ€Ð°Ð·Ð¸Ðµ Ð¾Ñ‚ Ð¼Ð¾Ð´ÐµÐ»Ð¸, Ð½Ð°Ð¿ÑŠÐ»Ð½Ð¾ Ð¾Ð±Ð¾Ñ€ÑƒÐ´Ð²Ð°Ð½Ð¸ Ð¸ Ð³Ð¾Ñ‚Ð¾Ð²Ð¸ Ð·Ð° ÑÐ»ÐµÐ´Ð²Ð°Ñ‰Ð¾Ñ‚Ð¾ Ñ‚Ð¸ Ð¿ÑŠÑ‚ÑƒÐ²Ð°Ð½Ðµ.
            </p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {rentals.length ? (
              rentals.map((product) => <RentCard key={product.id || product.slug || product.name} product={product} />)
            ) : (
              <>
                <EmptyStateCard
                  title="ÐžÑ‡Ð°ÐºÐ²Ð°Ð¹ Ð½Ð¾Ð²Ð¸ Ð¿Ñ€ÐµÐ´Ð»Ð¾Ð¶ÐµÐ½Ð¸Ñ"
                  text="ÐšÐ¾Ð³Ð°Ñ‚Ð¾ Ð´Ð¾Ð±Ð°Ð²Ð¸Ñˆ Ð°ÐºÑ‚Ð¸Ð²Ð½Ð¸ ÐºÐµÐ¼Ð¿ÐµÑ€Ð¸ Ð¿Ð¾Ð´ Ð½Ð°ÐµÐ¼, Ñ‚Ðµ Ñ‰Ðµ ÑÐµ Ð¿Ð¾ÐºÐ°Ð¶Ð°Ñ‚ Ñ‚ÑƒÐº Ð°Ð²Ñ‚Ð¾Ð¼Ð°Ñ‚Ð¸Ñ‡Ð½Ð¾."
                  href="/rent"
                  cta="Ð Ð°Ð·Ð³Ð»ÐµÐ´Ð°Ð¹ Ð½Ð°ÐµÐ¼Ð¸Ñ‚Ðµ"
                />
                <EmptyStateCard
                  title="ÐÐºÑ‚ÑƒÐ°Ð»Ð½Ð¸ Ð½Ð°Ð»Ð¸Ñ‡Ð½Ð¾ÑÑ‚Ð¸"
                  text="ÐŸÐ¾Ð´Ð´ÑŠÑ€Ð¶Ð°Ð¹ Ð½Ð°Ð»Ð¸Ñ‡Ð½Ð¾ÑÑ‚Ð¸Ñ‚Ðµ Ð² admin Ð¸ Ð½Ð°Ñ‡Ð°Ð»Ð½Ð°Ñ‚Ð° ÑÑ‚Ñ€Ð°Ð½Ð¸Ñ†Ð° Ñ‰Ðµ Ð¿Ð¾ÐºÐ°Ð·Ð²Ð° Ð½Ð°Ð¹-Ð½Ð¾Ð²Ð¸Ñ‚Ðµ Ð°ÐºÑ‚Ð¸Ð²Ð½Ð¸ Ð¿Ñ€ÐµÐ´Ð»Ð¾Ð¶ÐµÐ½Ð¸Ñ."
                  href="/rent"
                  cta="ÐšÑŠÐ¼ Ð½Ð°ÐµÐ¼Ð¸Ñ‚Ðµ"
                />
                <EmptyStateCard
                  title="Ð—Ð°Ð¿Ð¸Ñ‚Ð²Ð°Ð½Ðµ Ð·Ð° Ð½Ð°ÐµÐ¼"
                  text="Ð”Ð¾Ñ€Ð¸ Ð±ÐµÐ· Ð½Ð°Ð»Ð¸Ñ‡ÐµÐ½ Ð¼Ð¾Ð´ÐµÐ» Ð² Ð¼Ð¾Ð¼ÐµÐ½Ñ‚Ð°, Ð¿Ð¾ÑÐµÑ‚Ð¸Ñ‚ÐµÐ»Ð¸Ñ‚Ðµ Ð¼Ð¾Ð³Ð°Ñ‚ Ð´Ð° ÑÑ‚Ð¸Ð³Ð½Ð°Ñ‚ Ð´Ð¾ ÑÐµÐºÑ†Ð¸ÑÑ‚Ð° Ð·Ð° Ð½Ð°ÐµÐ¼Ð¸ Ð¸ Ð´Ð° ÑÐµ ÑÐ²ÑŠÑ€Ð¶Ð°Ñ‚ Ñ Ð²Ð°Ñ."
                  href="/rent"
                  cta="Ð’Ð¸Ð¶ ÑÑ‚Ñ€Ð°Ð½Ð¸Ñ†Ð°Ñ‚Ð°"
                />
              </>
            )}
          </div>
        </section>

        <section id="buy" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-[#00A6F4]">ÐšÑƒÐ¿Ð¸ ÐºÐµÐ¼Ð¿ÐµÑ€</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#2f658e] sm:text-4xl">ÐšÑƒÐ¿Ð¸ ÐºÐµÐ¼Ð¿ÐµÑ€ Ð¸Ð»Ð¸ ÐºÐ°Ñ€Ð°Ð²Ð°Ð½Ð°</h2>
            </div>
            <Link href="/buy" className="w-fit rounded-full border border-[#cfeaff] bg-[#f3fbff] px-5 py-3 text-sm font-medium text-[#00A6F4] transition hover:bg-[#e9f7ff]">
              Ð Ð°Ð·Ð³Ð»ÐµÐ´Ð°Ð¹
            </Link>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {campersForSale.length ? (
              campersForSale.map((product) => <BuyCard key={product.id || product.slug || product.name} product={product} />)
            ) : (
              <>
                <EmptyStateCard
                  title="ÐšÐµÐ¼Ð¿ÐµÑ€Ð¸ Ð·Ð° Ð¿Ð¾ÐºÑƒÐ¿ÐºÐ°"
                  text="Ð”Ð¾Ð±Ð°Ð²Ð¸ Ð°ÐºÑ‚Ð¸Ð²Ð½Ð¸ Ð¾Ñ„ÐµÑ€Ñ‚Ð¸ Ð² ÑÐµÐºÑ†Ð¸ÑÑ‚Ð° Ð·Ð° Ð¿Ñ€Ð¾Ð´Ð°Ð¶Ð±Ð° Ð¸ Ñ‚Ðµ Ñ‰Ðµ ÑÐµ Ð¿Ð¾ÐºÐ°Ð¶Ð°Ñ‚ Ñ‚ÑƒÐº Ð°Ð²Ñ‚Ð¾Ð¼Ð°Ñ‚Ð¸Ñ‡Ð½Ð¾."
                  href="/buy"
                  cta="ÐšÑŠÐ¼ Ð¾Ñ„ÐµÑ€Ñ‚Ð¸Ñ‚Ðµ"
                />
                <EmptyStateCard
                  title="ÐÐ¾Ð²Ð¸ Ð¿Ñ€ÐµÐ´Ð»Ð¾Ð¶ÐµÐ½Ð¸Ñ"
                  text="ÐÐ°Ñ‡Ð°Ð»Ð½Ð°Ñ‚Ð° ÑÑ‚Ñ€Ð°Ð½Ð¸Ñ†Ð° Ð¿Ð¾Ð´Ð´ÑŠÑ€Ð¶Ð° Ð´Ð¾ Ñ‚Ñ€Ð¸ Ð°ÐºÑ‚ÑƒÐ°Ð»Ð½Ð¸ Ð¿Ñ€ÐµÐ´Ð»Ð¾Ð¶ÐµÐ½Ð¸Ñ Ð·Ð° Ð¿Ð¾ÐºÑƒÐ¿ÐºÐ° Ð¾Ñ‚ ÐºÐ°Ñ‚Ð°Ð»Ð¾Ð³Ð°."
                  href="/buy"
                  cta="Ð Ð°Ð·Ð³Ð»ÐµÐ´Ð°Ð¹"
                />
                <EmptyStateCard
                  title="ÐšÐ°Ñ‚Ð°Ð»Ð¾Ð³ Ð·Ð° Ð¿Ñ€Ð¾Ð´Ð°Ð¶Ð±Ð°"
                  text="ÐšÐ¾Ð³Ð°Ñ‚Ð¾ Ð¸Ð¼Ð° Ð°ÐºÑ‚Ð¸Ð²Ð½Ð¸ Ð¼Ð¾Ð´ÐµÐ»Ð¸, ÑÐµÐºÑ†Ð¸ÑÑ‚Ð° Ñ‰Ðµ ÑÐµ Ð½Ð°Ð¿ÑŠÐ»Ð½Ð¸ ÑÑŠÑ ÑÐ½Ð¸Ð¼ÐºÐ¸, Ñ†ÐµÐ½Ð¸ Ð¸ Ð»Ð¸Ð½ÐºÐ¾Ð²Ðµ ÐºÑŠÐ¼ Ð´ÐµÑ‚Ð°Ð¹Ð»Ð½Ð¸Ñ‚Ðµ ÑÑ‚Ñ€Ð°Ð½Ð¸Ñ†Ð¸."
                  href="/buy"
                  cta="Ð’Ð¸Ð¶ ÐºÐ°Ñ‚Ð°Ð»Ð¾Ð³Ð°"
                />
              </>
            )}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-8">
          <div className="overflow-hidden rounded-[2rem] border border-[#dcecff] bg-[linear-gradient(180deg,#ffffff_0%,#eef9ff_100%)] p-8 shadow-[0_14px_50px_rgba(41,89,129,0.08)] lg:p-12">
            <div className="max-w-3xl">
              <p className="text-sm uppercase tracking-[0.2em] text-[#00A6F4]">Ð’ÑÐ¸Ñ‡ÐºÐ¾ Ð½ÐµÐ¾Ð±Ñ…Ð¾Ð´Ð¸Ð¼Ð¾ Ð·Ð° ÐºÐµÐ¼Ð¿ÐµÑ€ Ð¿ÑŠÑ‚ÑƒÐ²Ð°Ð½Ðµ</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#2f658e] sm:text-5xl">ÐšÐµÐ¼Ð¿ÐµÑ€Ð¸ Ð¿Ð¾Ð´ Ð½Ð°ÐµÐ¼, Ð¾Ð±Ð¾Ñ€ÑƒÐ´Ð²Ð°Ð½Ðµ Ð¸ Ñ€ÐµÑˆÐµÐ½Ð¸Ñ Ð½Ð° ÐµÐ´Ð½Ð¾ Ð¼ÑÑÑ‚Ð¾</h2>
              <p className="mt-4 max-w-2xl text-lg text-slate-600">
                Ð˜Ð·Ð±ÐµÑ€Ð¸ ÐºÐµÐ¼Ð¿ÐµÑ€ Ð¿Ð¾Ð´ Ð½Ð°ÐµÐ¼ Ð² Ð‘ÑŠÐ»Ð³Ð°Ñ€Ð¸Ñ, Ð¾Ð±Ð¾Ñ€ÑƒÐ´Ð²Ð°Ð¹ ÑÐ²Ð¾Ñ Ð²Ð°Ð½ Ð¸Ð»Ð¸ Ð·Ð°Ð¿Ð¾Ñ‡Ð½Ð¸ ÑÐ¾Ð±ÑÑ‚Ð²ÐµÐ½ ÐºÐµÐ¼Ð¿ÐµÑ€ Ð¿Ñ€Ð¾ÐµÐºÑ‚ Ñ Ð½Ð°ÑˆÐ¸Ñ‚Ðµ Ñ€ÐµÑˆÐµÐ½Ð¸Ñ Ð¸ Ð¿Ñ€Ð¾Ð´ÑƒÐºÑ‚Ð¸.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

