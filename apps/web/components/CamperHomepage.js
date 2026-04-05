import Link from "next/link";
import { getProducts } from "../lib/api";
import { PriceEURWithBGN } from "./Price";

const partnerLogos = ["Thule", "Fiamma", "Dometic", "Truma", "Thetford", "Reimo", "Berger", "Reich", "Carbest"];

const shopCategories = [
  {
    title: "Тенти и маркизи",
    text: "Решения за сянка, комфорт и повече свобода при престой и пътуване.",
  },
  {
    title: "Вода и санитария",
    text: "Резервоари, душове, тоалетни и системи за по-независим кемпер живот.",
  },
  {
    title: "Ток и осветление",
    text: "Батерии, осветление, зарядни и практични електрически решения.",
  },
  {
    title: "Кухня и оборудване",
    text: "Практични аксесоари за готвене, съхранение и удобство навсякъде.",
  },
];

const steps = [
  {
    title: "Планиране",
    text: "Разпределение, изолация и основни системи според начина, по който ще се използва кемперът.",
  },
  {
    title: "Оборудване",
    text: "Електричество, вода, отопление и санитария, подбрани така, че проектът да е практичен и надежден.",
  },
  {
    title: "Изграждане",
    text: "Интериор, мебели и довършителни детайли за завършен и готов за път проект.",
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

function SectionHeading({ eyebrow, title, href, linkLabel }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <div className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-600">{eyebrow}</div>
        <h2 className="mt-2 text-2xl font-bold text-slate-900">{title}</h2>
      </div>

      {href && linkLabel ? (
        <Link className="text-sm font-medium text-sky-700 underline-offset-4 hover:underline" href={href}>
          {linkLabel}
        </Link>
      ) : null}
    </div>
  );
}

function ProductShowcaseCard({ product, kind }) {
  const image = getProductImage(product);
  const href = product?.slug ? `/product/${product.slug}` : kind === "rent" ? "/rent" : "/buy";
  const title = product?.name || (kind === "rent" ? "Кемпер под наем" : "Кемпер за покупка");
  const meta = getProductMeta(product, kind === "rent" ? "Актуално предложение под наем" : "Актуална оферта");
  const linkText = kind === "rent" ? "Виж детайли" : "Виж оферта";

  return (
    <Link
      href={href}
      className="group block overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="aspect-[4/3] overflow-hidden bg-slate-50">
        {image ? (
          <img src={image} alt={title} className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]" />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-slate-400">Няма снимка</div>
        )}
      </div>

      <div className="grid gap-2 p-4">
        <div className="text-xs uppercase tracking-[0.16em] text-slate-500">{meta}</div>
        <div className="line-clamp-2 min-h-[3.25rem] text-lg font-semibold leading-6 text-slate-900">{title}</div>

        <div className="flex items-end justify-between gap-3 pt-1">
          <PriceEURWithBGN cents={product?.price} />
          <span className="text-sm font-medium text-sky-700">{linkText}</span>
        </div>
      </div>
    </Link>
  );
}

function EmptyProductCard({ title, href }) {
  return (
    <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center">
      <div className="text-base font-semibold text-slate-900">{title}</div>
      <p className="mt-2 text-sm leading-7 text-slate-600">Когато добавиш активни продукти в тази категория, те ще се покажат тук автоматично.</p>
      <Link className="mt-4 inline-flex text-sm font-medium text-sky-700 underline-offset-4 hover:underline" href={href}>
        Отвори секцията
      </Link>
    </div>
  );
}

function ServiceCard({ title, text, href, linkLabel }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="h-1 w-14 rounded-full bg-sky-500" />
      <h3 className="mt-5 text-xl font-semibold text-slate-900">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-slate-600">{text}</p>
      <Link className="mt-5 inline-flex text-sm font-medium text-sky-700 underline-offset-4 hover:underline" href={href}>
        {linkLabel}
      </Link>
    </div>
  );
}

export default async function CamperHomepage() {
  const [rentals, campersForSale] = await Promise.all([
    safeGetProducts({ categorySlug: "camper-rent", limit: 3, sort: "newest" }),
    safeGetProducts({ categorySlug: "buy-camper", limit: 3, sort: "newest" }),
  ]);

  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
          <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
            <div className="mb-4 inline-flex w-fit rounded-full bg-sky-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">
              Магазин • Наеми • Покупка
            </div>

            <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              Всичко за кемпери, каравани и пътуване на едно място
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
              Разгледай оборудване, актуални кемпери под наем и предложения за покупка в същия стил и структура като останалата част от сайта.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link className="rounded-lg bg-sky-500 px-5 py-3 text-sm font-medium text-white transition hover:bg-sky-600" href="/store">
                Към магазина
              </Link>
              <Link className="rounded-lg border border-slate-300 px-5 py-3 text-sm font-medium text-slate-800 transition hover:bg-slate-50" href="/rent">
                Виж наеми
              </Link>
              <Link className="rounded-lg border border-slate-300 px-5 py-3 text-sm font-medium text-slate-800 transition hover:bg-slate-50" href="/buy">
                Виж оферти
              </Link>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="text-xs font-semibold uppercase tracking-[0.16em] text-sky-700">Store</div>
                <div className="mt-2 text-base font-semibold text-slate-900">Оборудване и аксесоари</div>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="text-xs font-semibold uppercase tracking-[0.16em] text-sky-700">Rent</div>
                <div className="mt-2 text-base font-semibold text-slate-900">Готови кемпери за път</div>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="text-xs font-semibold uppercase tracking-[0.16em] text-sky-700">Buy</div>
                <div className="mt-2 text-base font-semibold text-slate-900">Оферти от каталога</div>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-200 bg-slate-50 p-4 sm:p-6 lg:border-l lg:border-t-0">
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1400&q=80"
                alt="Кемпер сред природа"
                className="h-[260px] w-full object-cover sm:h-[340px] lg:h-[420px]"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-sky-50/70 p-5 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">Официални партньори</div>
            <p className="mt-2 text-sm text-slate-600">Марки и производители, които вече присъстват в каталога и сервизните решения.</p>
          </div>

          <div className="flex flex-wrap gap-2">
            {partnerLogos.map((logo) => (
              <span key={logo} className="rounded-full border border-sky-200 bg-white px-3 py-1.5 text-sm text-slate-700">
                {logo}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <ServiceCard
          title="Онлайн магазин"
          text="Категории, марки и продукти, подредени по същата логика като каталога, за да стигаш по-бързо до правилното оборудване."
          href="/store"
          linkLabel="Към магазина"
        />
        <ServiceCard
          title="Кемпери под наем"
          text="Актуални предложения, взети директно от backend каталога, за да не поддържаме отделно съдържание само за началната страница."
          href="/rent"
          linkLabel="Към наемите"
        />
        <ServiceCard
          title="Кемпери и каравани за покупка"
          text="Офертите се зареждат по същия модел и можеш да продължиш към detail страниците без отделен маркетингов слой."
          href="/buy"
          linkLabel="Към офертите"
        />
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <SectionHeading eyebrow="Магазин" title="Основни категории" href="/store" linkLabel="Виж всички категории" />

        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {shopCategories.map((item) => (
            <div key={item.title} className="rounded-xl border border-slate-200 bg-slate-50 p-5 transition hover:border-sky-200 hover:bg-sky-50/50">
              <div className="text-base font-semibold text-slate-900">{item.title}</div>
              <p className="mt-3 text-sm leading-7 text-slate-600">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <SectionHeading eyebrow="Наеми" title="Актуални предложения под наем" href="/rent" linkLabel="Виж всички наеми" />

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {rentals.length
            ? rentals.map((product) => <ProductShowcaseCard key={product.id} product={product} kind="rent" />)
            : [
                <EmptyProductCard key="rent-empty-1" title="Няма активни предложения под наем" href="/rent" />,
                <EmptyProductCard key="rent-empty-2" title="Няма активни предложения под наем" href="/rent" />,
                <EmptyProductCard key="rent-empty-3" title="Няма активни предложения под наем" href="/rent" />,
              ]}
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <SectionHeading eyebrow="Покупка" title="Оферти за покупка" href="/buy" linkLabel="Виж всички оферти" />

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {campersForSale.length
            ? campersForSale.map((product) => <ProductShowcaseCard key={product.id} product={product} kind="buy" />)
            : [
                <EmptyProductCard key="buy-empty-1" title="Няма активни оферти за покупка" href="/buy" />,
                <EmptyProductCard key="buy-empty-2" title="Няма активни оферти за покупка" href="/buy" />,
                <EmptyProductCard key="buy-empty-3" title="Няма активни оферти за покупка" href="/buy" />,
              ]}
        </div>
      </section>

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="border-b border-slate-200 bg-slate-50 p-6 lg:border-b-0 lg:border-r">
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">Направи си кемпер</div>
            <h2 className="mt-2 text-2xl font-bold text-slate-900">От идея до готов проект</h2>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              За хората, които не търсят само готов продукт, а искат да минат през целия процес по изграждане с правилното оборудване и ясно планиране.
            </p>
            <Link className="mt-5 inline-flex rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-800 transition hover:bg-white" href="/kak-da-si-napravim-kemper">
              Научи повече
            </Link>
          </div>

          <div className="grid gap-4 p-6 sm:grid-cols-3">
            {steps.map((step) => (
              <div key={step.title} className="rounded-xl border border-slate-200 bg-white p-5">
                <div className="text-sm font-semibold uppercase tracking-[0.16em] text-sky-700">{step.title}</div>
                <p className="mt-3 text-sm leading-7 text-slate-600">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
