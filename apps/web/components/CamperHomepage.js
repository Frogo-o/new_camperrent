import Link from "next/link";
import { getProducts } from "../lib/api";
import { PriceEURWithBGN } from "./Price";

const partnerLogos = [
  { src: "/fiamma.png", alt: "Fiamma" },
  { src: "/dometic.png", alt: "Dometic" },
  { src: "/truma.png", alt: "Truma" },
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
    title: "Тенти и маркизи",
    text: "Практични решения за сянка, комфорт и повече свобода на къмпинг.",
    icon: "☀",
  },
  {
    title: "Вода и санитария",
    text: "Резервоари, душове, тоалетни и всичко нужно за независимост по пътя.",
    icon: "💧",
  },
  {
    title: "Ток и осветление",
    text: "Батерии, кабели, осветление и енергийни решения за кемпер живот.",
    icon: "⚡",
  },
  {
    title: "Кухня и къмпинг оборудване",
    text: "Готварски и практични аксесоари за удобство навсякъде.",
    icon: "🍳",
  },
];

const steps = [
  {
    title: "Планиране",
    text: "Конфигурацията на твоя кемпер - разпределение, изолация и основни системи.",
  },
  {
    title: "Оборудване",
    text: "Електрически системи, осветление, вода, отопление, тоалетна и всички необходими уреди за комфорт и автономност.",
  },
  {
    title: "Изграждане",
    text: "Интериор, мебели и всички детайли за практични решения и уверен старт на пътя.",
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
  return product?.brand?.name || product?.articleNumber || "Напълно оборудван кемпер";
}

function getBuyMeta(product) {
  const bits = [product?.brand?.name, product?.articleNumber].filter(Boolean);
  return bits.length ? bits.join(" • ") : "Актуална оферта";
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
        <img src={getProductImage(product)} alt={product?.name || "Кемпер под наем"} className="h-72 w-full object-cover" />
        <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-[#2f658e] shadow-sm">
          Кемпер под наем
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-semibold text-[#2f658e]">{product?.name || "Кемпер под наем"}</h3>
        <p className="mt-2 text-slate-500">{getRentMeta(product)}</p>
        <div className="mt-6 flex items-end justify-between gap-4">
          <div>
            <div className="text-sm text-slate-400">Цена</div>
            <div className="text-[#00A6F4]">
              <PriceEURWithBGN cents={product?.price} />
            </div>
          </div>
          <ProductCta href={href} label="Виж детайли" kind="rent" />
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
        <img src={getProductImage(product)} alt={product?.name || "Кемпер за покупка"} className="h-72 w-full object-cover" />
        <div className="absolute left-4 top-4 rounded-full border border-[#bfe7fb] bg-[#eef9ff] px-3 py-1 text-xs font-medium text-[#00A6F4]">
          Наличен
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-semibold text-[#2f658e]">{product?.name || "Кемпер за покупка"}</h3>
        <p className="mt-3 text-slate-500">{getBuyMeta(product)}</p>
        <div className="mt-8 flex items-end justify-between gap-4">
          <div className="text-[#00A6F4]">
            <PriceEURWithBGN cents={product?.price} />
          </div>
          <ProductCta href={href} label="Виж оферта" kind="buy" />
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
                ОБОРУДВАНЕ · НАЕМИ КЕМПЕР · КУПИ КЕМПЕР
              </span>
              <h1 className="max-w-4xl text-5xl font-semibold leading-tight tracking-tight text-[#2f658e] sm:text-6xl lg:text-7xl">
                Всичко за твоето пътуване.
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600 sm:text-xl">
                Оборудвай кемпъра си или превърни буса си в дом на колела.
                <br />
                Наеми кемпър или избери от нашите модели за покупка. Всичко необходимо на едно място, за да тръгнеш уверено към следващото си приключение.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/store" className="rounded-full bg-[#00A6F4] px-6 py-3.5 font-medium text-white shadow-xl shadow-[#00A6F4]/15 transition hover:bg-[#0298df]">
                  Онлайн магазин
                </Link>
                <Link href="/rent" className="rounded-full border border-[#00A6F4] bg-white px-6 py-3.5 font-medium text-[#00A6F4] transition hover:bg-[#eef8ff]">
                  Наеми кемпер
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
                    Всичко на едно място
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
                <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Официален представител на</p>
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
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e9f7ff] text-2xl">🛒</div>
              <h3 className="text-3xl font-semibold text-[#2f658e]">Онлайн магазин за оборудване на кемпери и каравани</h3>
              <p className="mt-4 max-w-xl leading-8 text-slate-600">
                Открий оборудване за кемпери и каравани - аксесоари, системи и решения за комфорт и функционалност при всяко пътуване.
              </p>
              <Link href="/store" className="mt-8 inline-flex rounded-full bg-[#00A6F4] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#0298df]">
                Разгледай онлайн магазина
              </Link>
            </article>

            <article className="group rounded-[2rem] border border-[#dcecff] bg-white p-8 transition hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(41,89,129,0.08)]">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#eef8ff] text-2xl">🚐</div>
              <h3 className="text-2xl font-semibold text-[#2f658e]">Наеми кемпер</h3>
              <p className="mt-4 leading-7 text-slate-600">
                Наеми сигурен и напълно оборудван кемпер за следващото си пътуване. Избери от актуални модели и направи запитване бързо.
              </p>
              <Link href="/rent" className="mt-8 inline-flex text-sm font-medium text-[#00A6F4] transition group-hover:translate-x-1">
                Резервирай сега →
              </Link>
            </article>

            <article className="group rounded-[2rem] border border-[#dcecff] bg-white p-8 transition hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(41,89,129,0.08)]">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#eef8ff] text-2xl">🧰</div>
              <h3 className="text-2xl font-semibold text-[#2f658e]">Купи кемпер или каравана</h3>
              <p className="mt-4 leading-7 text-slate-600">Разгледай кемпери и каравани за продажба и избери най-подходящия за теб.</p>
              <Link href="/buy" className="mt-8 inline-flex text-sm font-medium text-[#00A6F4] transition group-hover:translate-x-1">
                Разгледай →
              </Link>
            </article>
          </div>
        </section>

        <section id="build" className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="grid gap-8 overflow-hidden rounded-[2rem] border border-[#dcecff] bg-[linear-gradient(180deg,#ffffff_0%,#f8fcff_100%)] p-8 shadow-[0_14px_50px_rgba(41,89,129,0.08)] lg:grid-cols-[0.92fr_1.08fr] lg:p-12">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-[#00A6F4]">КАК ДА СИ НАПРАВИШ КЕМПЪР</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#2f658e] sm:text-4xl">Направи си кемпър</h2>
              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
                Планирай и изгради своя кемпер с правилното оборудване. Предлагаме цялостно изграждане на кемпери - от проектиране и изолация до монтаж на електрически системи, вода, отопление и обзавеждане.
              </p>
              <p className="mt-6 max-w-xl text-base leading-7 text-slate-600">
                С опит от над 50 реализирани проекта и доказан професионализъм ще създадем напълно оборудван и готов за път кемпер, съобразен с твоите нужди.
              </p>
              <Link href="/kak-da-si-napravim-kemper" className="mt-8 inline-flex rounded-full bg-[#f0a61c] px-6 py-3 font-medium text-white transition hover:bg-[#df9918]">
                Научи повече
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
              <p className="text-sm uppercase tracking-[0.2em] text-[#00A6F4]">ОБОРУДВАНЕ / ОНЛАЙН МАГАЗИН</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#2f658e] sm:text-4xl">Оборудване за кемпери и каравани</h2>
              <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">
                Разгледай оборудване за кемпери и каравани - тенти, системи за вода, електричество, осветление и къмпинг аксесоари за комфорт и автономност за твоето пътуване.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/store" className="rounded-full border border-[#cfeaff] bg-[#f3fbff] px-6 py-3 font-medium text-[#00A6F4] transition hover:bg-[#e9f7ff]">
                  Виж всички категории
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
            <p className="text-sm uppercase tracking-[0.2em] text-[#00A6F4]">НАЕМИ КЕМПЕР</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#2f658e] sm:text-4xl">Кемпери под наем</h2>
            <p className="mt-4 max-w-3xl text-slate-600">
              Кемпери под наем в България - разнообразие от модели, напълно оборудвани и готови за следващото ти пътуване.
            </p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {rentals.length ? (
              rentals.map((product) => <RentCard key={product.id || product.slug || product.name} product={product} />)
            ) : (
              <>
                <EmptyStateCard
                  title="Очаквай нови предложения"
                  text="Когато добавиш активни кемпери под наем, те ще се покажат тук автоматично."
                  href="/rent"
                  cta="Разгледай наемите"
                />
                <EmptyStateCard
                  title="Актуални наличности"
                  text="Поддържай наличностите в admin и началната страница ще показва най-новите активни предложения."
                  href="/rent"
                  cta="Към наемите"
                />
                <EmptyStateCard
                  title="Запитване за наем"
                  text="Дори без наличен модел в момента, посетителите могат да стигнат до секцията за наеми и да се свържат с вас."
                  href="/rent"
                  cta="Виж страницата"
                />
              </>
            )}
          </div>
        </section>

        <section id="buy" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-[#00A6F4]">Купи кемпер</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#2f658e] sm:text-4xl">Купи кемпер или каравана</h2>
            </div>
            <Link href="/buy" className="w-fit rounded-full border border-[#cfeaff] bg-[#f3fbff] px-5 py-3 text-sm font-medium text-[#00A6F4] transition hover:bg-[#e9f7ff]">
              Разгледай
            </Link>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {campersForSale.length ? (
              campersForSale.map((product) => <BuyCard key={product.id || product.slug || product.name} product={product} />)
            ) : (
              <>
                <EmptyStateCard
                  title="Кемпери за покупка"
                  text="Добави активни оферти в секцията за продажба и те ще се покажат тук автоматично."
                  href="/buy"
                  cta="Към офертите"
                />
                <EmptyStateCard
                  title="Нови предложения"
                  text="Началната страница поддържа до три актуални предложения за покупка от каталога."
                  href="/buy"
                  cta="Разгледай"
                />
                <EmptyStateCard
                  title="Каталог за продажба"
                  text="Когато има активни модели, секцията ще се напълни със снимки, цени и линкове към детайлните страници."
                  href="/buy"
                  cta="Виж каталога"
                />
              </>
            )}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-8">
          <div className="overflow-hidden rounded-[2rem] border border-[#dcecff] bg-[linear-gradient(180deg,#ffffff_0%,#eef9ff_100%)] p-8 shadow-[0_14px_50px_rgba(41,89,129,0.08)] lg:p-12">
            <div className="max-w-3xl">
              <p className="text-sm uppercase tracking-[0.2em] text-[#00A6F4]">Всичко необходимо за кемпер пътуване</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#2f658e] sm:text-5xl">Кемпери под наем, оборудване и решения на едно място</h2>
              <p className="mt-4 max-w-2xl text-lg text-slate-600">
                Избери кемпер под наем в България, оборудвай своя ван или започни собствен кемпер проект с нашите решения и продукти.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
