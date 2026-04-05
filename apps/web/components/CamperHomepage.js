import Link from "next/link";
import { getProducts } from "../lib/api";
import { PriceEURWithBGN } from "./Price";

const partnerLogos = [
  "Thule",
  "Fiamma",
  "Dometic",
  "Truma",
  "Thetford",
  "Reimo",
  "Berger",
  "Reich",
  "Carbest",
];

const shopCategories = [
  {
    title: "Тенти и маркизи",
    text: "Практични решения за сянка, комфорт и повече свобода на къмпинг.",
    icon: "01",
  },
  {
    title: "Вода и санитария",
    text: "Резервоари, душове, тоалетни и всичко нужно за независимост по пътя.",
    icon: "02",
  },
  {
    title: "Ток и осветление",
    text: "Батерии, кабели, осветление и енергийни решения за кемпер живот.",
    icon: "03",
  },
  {
    title: "Кухня и къмпинг оборудване",
    text: "Готварски и практични аксесоари за удобство навсякъде.",
    icon: "04",
  },
];

const steps = [
  {
    title: "Планиране",
    text: "Разпределение, изолация и основни системи според нуждите на твоя проект.",
  },
  {
    title: "Оборудване",
    text: "Електричество, вода, отопление, санитария и всички системи за автономност.",
  },
  {
    title: "Изграждане",
    text: "Интериор, мебели и практични детайли за комфортно пътуване и ежедневна употреба.",
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
  return product?.images?.[0]?.url || "";
}

function getProductMeta(product, fallback) {
  const bits = [product?.brand?.name, product?.articleNumber].filter(Boolean);
  return bits.length ? bits.join(" • ") : fallback;
}

function ProductShowcaseCard({ product, kind }) {
  const image = getProductImage(product);
  const href = product?.slug ? `/product/${product.slug}` : kind === "rent" ? "/rent" : "/buy";
  const meta = getProductMeta(
    product,
    kind === "rent" ? "Напълно оборудван кемпер" : "Наличен за запитване"
  );
  const badge = kind === "rent" ? "Под наем" : "За покупка";
  const cta = kind === "rent" ? "Виж кемпера" : "Виж офертата";

  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <Link href={href} className="block">
        <div className="aspect-[4/3] bg-slate-100">
          {image ? (
            <img src={image} alt={product?.name || badge} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full items-center justify-center bg-[linear-gradient(180deg,#f8fbff_0%,#eef6fb_100%)] text-sm text-slate-400">
              Няма изображение
            </div>
          )}
        </div>
      </Link>

      <div className="space-y-4 p-5">
        <div className="flex items-start justify-between gap-3">
          <span className="rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs font-medium text-sky-700">
            {badge}
          </span>
          <span className="text-xs text-slate-400">{meta}</span>
        </div>

        <div>
          <Link href={href} className="text-xl font-semibold text-slate-900 transition hover:text-sky-600">
            {product?.name || (kind === "rent" ? "Кемпер под наем" : "Кемпер за покупка")}
          </Link>
        </div>

        <div className="flex items-end justify-between gap-4">
          <PriceEURWithBGN cents={product?.price} />
          <Link
            href={href}
            className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-900 transition hover:border-slate-300 hover:bg-slate-50"
          >
            {cta}
          </Link>
        </div>
      </div>
    </article>
  );
}

function EmptyProductCard({ title, href }) {
  return (
    <article className="rounded-2xl border border-dashed border-slate-300 bg-white p-6 text-center text-slate-500">
      <div className="text-base font-medium text-slate-700">{title}</div>
      <p className="mt-2 text-sm">Добави активни продукти в тази категория, за да се покажат тук.</p>
      <Link
        href={href}
        className="mt-4 inline-flex rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-900 transition hover:bg-slate-50"
      >
        Отвори секцията
      </Link>
    </article>
  );
}

export default async function CamperHomepage() {
  const [rentals, campersForSale] = await Promise.all([
    safeGetProducts({ categorySlug: "camper-rent", limit: 3, sort: "newest" }),
    safeGetProducts({ categorySlug: "buy-camper", limit: 3, sort: "newest" }),
  ]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <style>{`
        @keyframes partner-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .partner-marquee-track {
          animation: partner-scroll 26s linear infinite;
          width: max-content;
        }
        .partner-marquee:hover .partner-marquee-track {
          animation-play-state: paused;
        }
      `}</style>

      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <div className="flex items-center gap-8">
            <Link href="/" className="text-2xl font-semibold tracking-tight text-slate-900">
              Camper<span className="text-sky-500">Rent</span>
            </Link>

            <nav className="hidden items-center gap-6 text-sm text-slate-600 lg:flex">
              <Link href="/store" className="transition hover:text-slate-900">
                Магазин
              </Link>
              <Link href="/rent" className="transition hover:text-slate-900">
                Наеми
              </Link>
              <Link href="/buy" className="transition hover:text-slate-900">
                Покупка
              </Link>
              <Link href="/kak-da-si-napravim-kemper" className="transition hover:text-slate-900">
                Направи си кемпер
              </Link>
              <Link href="/contacts" className="transition hover:text-slate-900">
                Контакти
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-3 text-sm">
            <Link
              href="/store"
              className="rounded-full border border-slate-200 px-4 py-2 font-medium text-slate-700 transition hover:bg-slate-50"
            >
              Търсене
            </Link>
            <Link
              href="/cart"
              className="rounded-full bg-sky-500 px-4 py-2 font-medium text-white transition hover:bg-sky-600"
            >
              Количка
            </Link>
          </div>
        </div>
      </header>

      <main>
        <section className="border-b border-slate-200 bg-white">
          <div className="mx-auto grid max-w-7xl gap-8 px-6 py-12 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-16">
            <div className="flex flex-col justify-center">
              <span className="inline-flex w-fit rounded-full border border-sky-200 bg-sky-50 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.22em] text-sky-700">
                Магазин · Наеми · Покупка
              </span>

              <h1 className="mt-6 max-w-3xl text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                Всичко за кемпери, каравани и пътуване на едно място
              </h1>

              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
                Онлайн магазин за оборудване, реални оферти за кемпери под наем и предложения за
                покупка, подредени така, че да стигаш бързо до правилното решение.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/store"
                  className="rounded-full bg-slate-900 px-6 py-3 font-medium text-white transition hover:bg-slate-800"
                >
                  Към магазина
                </Link>
                <Link
                  href="/rent"
                  className="rounded-full border border-slate-200 px-6 py-3 font-medium text-slate-900 transition hover:bg-slate-50"
                >
                  Виж наеми
                </Link>
                <Link
                  href="/buy"
                  className="rounded-full border border-slate-200 px-6 py-3 font-medium text-slate-900 transition hover:bg-slate-50"
                >
                  Виж кемпери
                </Link>
              </div>
            </div>

            <div className="grid gap-4">
              <div className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-100 shadow-sm">
                <img
                  src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1400&q=80"
                  alt="Camper in nature"
                  className="h-[320px] w-full object-cover sm:h-[420px]"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                  <div className="text-sm text-slate-500">Асортимент</div>
                  <div className="mt-2 text-2xl font-semibold text-slate-900">Магазин</div>
                  <div className="mt-1 text-sm text-slate-600">Категории за оборудване и аксесоари</div>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                  <div className="text-sm text-slate-500">Услуга</div>
                  <div className="mt-2 text-2xl font-semibold text-slate-900">Наеми</div>
                  <div className="mt-1 text-sm text-slate-600">Готови кемпери за пътуване</div>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                  <div className="text-sm text-slate-500">Оферти</div>
                  <div className="mt-2 text-2xl font-semibold text-slate-900">Покупка</div>
                  <div className="mt-1 text-sm text-slate-600">Избрани предложения от каталога</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-6 py-6 lg:px-8">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Официални партньори</p>

              <div className="partner-marquee relative overflow-hidden">
                <div className="partner-marquee-track flex items-center gap-3 whitespace-nowrap pr-8">
                  {[...partnerLogos, ...partnerLogos].map((logo, index) => (
                    <span
                      key={`${logo}-${index}`}
                      className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-600"
                    >
                      {logo}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
          <div className="grid gap-5 lg:grid-cols-3">
            <article className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <div className="text-sm font-medium uppercase tracking-[0.18em] text-sky-700">01</div>
              <h2 className="mt-4 text-2xl font-semibold text-slate-900">Онлайн магазин</h2>
              <p className="mt-3 leading-7 text-slate-600">
                Оборудване, аксесоари и практични решения за кемпери и каравани, подредени по
                категории и готови за поръчка.
              </p>
              <Link
                href="/store"
                className="mt-6 inline-flex rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-900 transition hover:bg-slate-50"
              >
                Към магазина
              </Link>
            </article>

            <article className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <div className="text-sm font-medium uppercase tracking-[0.18em] text-sky-700">02</div>
              <h2 className="mt-4 text-2xl font-semibold text-slate-900">Наеми кемпер</h2>
              <p className="mt-3 leading-7 text-slate-600">
                Разгледай активните предложения за наем и избери модел според маршрута, сезона и
                начина ти на пътуване.
              </p>
              <Link
                href="/rent"
                className="mt-6 inline-flex rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-900 transition hover:bg-slate-50"
              >
                Към наемите
              </Link>
            </article>

            <article className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <div className="text-sm font-medium uppercase tracking-[0.18em] text-sky-700">03</div>
              <h2 className="mt-4 text-2xl font-semibold text-slate-900">Купи кемпер</h2>
              <p className="mt-3 leading-7 text-slate-600">
                Подбрани оферти за покупка, които могат да бъдат разгледани директно през каталога
                и продуктовите страници.
              </p>
              <Link
                href="/buy"
                className="mt-6 inline-flex rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-900 transition hover:bg-slate-50"
              >
                Към офертите
              </Link>
            </article>
          </div>
        </section>

        <section id="build" className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
          <div className="grid gap-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm lg:grid-cols-[0.95fr_1.05fr] lg:p-10">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-sky-700">
                Направи си кемпер
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                От идея до готов за път проект
              </h2>
              <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">
                Изграждаме кемпери с цялостен подход: планиране, избор на оборудване и реално
                изпълнение според начина, по който ще се използва превозното средство.
              </p>
              <p className="mt-4 max-w-xl leading-7 text-slate-600">
                Ако вече имаш база или тепърва планираш проект, тук можеш да започнеш и после да
                преминеш към конкретните категории в магазина.
              </p>
              <Link
                href="/kak-da-si-napravim-kemper"
                className="mt-7 inline-flex rounded-full bg-sky-500 px-6 py-3 font-medium text-white transition hover:bg-sky-600"
              >
                Научи повече
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {steps.map((step, index) => (
                <div key={step.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-sm font-semibold text-sky-700 shadow-sm">
                    {index + 1}
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-slate-900">{step.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{step.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="shop" className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm lg:p-10">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-sky-700">Магазин</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                  Основни категории за оборудване
                </h2>
                <p className="mt-4 max-w-3xl text-slate-600">
                  Започни от най-търсените категории и стигни бързо до продукти за вода,
                  електричество, тенти и къмпинг оборудване.
                </p>
              </div>

              <Link
                href="/store"
                className="w-fit rounded-full border border-slate-200 px-5 py-3 text-sm font-medium text-slate-900 transition hover:bg-slate-50"
              >
                Виж всички категории
              </Link>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {shopCategories.map((item) => (
                <div key={item.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-sm font-semibold text-sky-700 shadow-sm">
                    {item.icon}
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="rent" className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-sky-700">Наеми</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                Актуални предложения за кемпери под наем
              </h2>
              <p className="mt-4 max-w-3xl text-slate-600">
                Картите по-долу се зареждат директно от backend каталога за наем.
              </p>
            </div>

            <Link
              href="/rent"
              className="w-fit rounded-full border border-slate-200 px-5 py-3 text-sm font-medium text-slate-900 transition hover:bg-slate-50"
            >
              Виж всички наеми
            </Link>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {rentals.length
              ? rentals.map((product) => (
                  <ProductShowcaseCard key={product.id} product={product} kind="rent" />
                ))
              : [
                  <EmptyProductCard key="rent-empty-1" title="Няма активни предложения под наем" href="/rent" />,
                  <EmptyProductCard key="rent-empty-2" title="Няма активни предложения под наем" href="/rent" />,
                  <EmptyProductCard key="rent-empty-3" title="Няма активни предложения под наем" href="/rent" />,
                ]}
          </div>
        </section>

        <section id="buy" className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-sky-700">Покупка</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                Кемпери и каравани за покупка
              </h2>
              <p className="mt-4 max-w-3xl text-slate-600">
                Същият каталог захранва и тази секция, така че homepage-ът показва актуални оферти.
              </p>
            </div>

            <Link
              href="/buy"
              className="w-fit rounded-full border border-slate-200 px-5 py-3 text-sm font-medium text-slate-900 transition hover:bg-slate-50"
            >
              Виж всички оферти
            </Link>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {campersForSale.length
              ? campersForSale.map((product) => (
                  <ProductShowcaseCard key={product.id} product={product} kind="buy" />
                ))
              : [
                  <EmptyProductCard key="buy-empty-1" title="Няма активни оферти за покупка" href="/buy" />,
                  <EmptyProductCard key="buy-empty-2" title="Няма активни оферти за покупка" href="/buy" />,
                  <EmptyProductCard key="buy-empty-3" title="Няма активни оферти за покупка" href="/buy" />,
                ]}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 pb-20 pt-6 lg:px-8">
          <div className="rounded-3xl border border-slate-200 bg-slate-900 p-8 text-white shadow-sm lg:p-10">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-sky-300">
              Всичко за пътя на едно място
            </p>
            <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight sm:text-5xl">
              Избери посоката, а ние ще ти помогнем с оборудване, наем или покупка
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-slate-300">
              От единичен продукт до цял кемпер проект, каталогът и услугите вече са подредени така,
              че да стигаш по-бързо до това, което ти трябва.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/store"
                className="rounded-full bg-white px-6 py-3 font-medium text-slate-900 transition hover:bg-slate-100"
              >
                Магазин
              </Link>
              <Link
                href="/rent"
                className="rounded-full border border-slate-700 px-6 py-3 font-medium text-white transition hover:bg-slate-800"
              >
                Наеми кемпер
              </Link>
              <Link
                href="/buy"
                className="rounded-full border border-slate-700 px-6 py-3 font-medium text-white transition hover:bg-slate-800"
              >
                Купи кемпер
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
