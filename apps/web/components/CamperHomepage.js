import Link from "next/link";
import { getProducts } from "../lib/api";
import { PriceEURWithBGN } from "./Price";

const partnerLogos = ["Thule", "Fiamma", "Dometic", "Truma", "Thetford", "Reimo", "Berger", "Reich", "Carbest"];

const shopCategories = [
  {
    title: "Тенти и маркизи",
    text: "Практични решения за сянка, комфорт и повече свобода на къмпинг.",
  },
  {
    title: "Вода и санитария",
    text: "Резервоари, душове, тоалетни и всичко нужно за независимост по пътя.",
  },
  {
    title: "Ток и осветление",
    text: "Батерии, кабели, осветление и енергийни решения за кемпер живот.",
  },
  {
    title: "Кухня и къмпинг оборудване",
    text: "Готварски и практични аксесоари за удобство навсякъде.",
  },
];

const steps = [
  {
    title: "Планиране",
    text: "Разпределение, изолация и основни системи според нуждите на проекта.",
  },
  {
    title: "Оборудване",
    text: "Електричество, вода, отопление, санитария и системи за автономност.",
  },
  {
    title: "Изграждане",
    text: "Интериор, мебели и практични детайли за реална ежедневна употреба.",
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
  const title = product?.name || (kind === "rent" ? "Кемпер под наем" : "Кемпер за покупка");
  const meta = getProductMeta(product, kind === "rent" ? "Актуално предложение под наем" : "Актуална оферта");
  const linkText = kind === "rent" ? "Детайли" : "Оферта";

  return (
    <div className="rounded-md border bg-white p-3 shadow-sm">
      <div className="aspect-[4/3] overflow-hidden rounded-md border bg-white">
        {image ? (
          <img src={image} alt={title} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-slate-400">No image</div>
        )}
      </div>

      <div className="mt-3 text-xs text-slate-500">{meta}</div>
      <div className="mt-2 line-clamp-2 text-sm font-semibold text-slate-900">{title}</div>

      <div className="mt-3 flex items-end justify-between gap-3">
        <PriceEURWithBGN cents={product?.price} />
        <Link className="text-sm underline" href={href}>
          {linkText}
        </Link>
      </div>
    </div>
  );
}

function EmptyProductCard({ title, href }) {
  return (
    <div className="rounded-md border border-dashed bg-white p-5 text-center text-slate-500">
      <div className="text-base font-medium text-slate-700">{title}</div>
      <p className="mt-2 text-sm">Добави активни продукти в тази категория, за да се покажат тук.</p>
      <Link className="mt-4 inline-flex text-sm underline" href={href}>
        Отвори секцията
      </Link>
    </div>
  );
}

function HubCard({ title, text, href, linkLabel }) {
  return (
    <div className="rounded-md border bg-white p-5 shadow-sm">
      <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
      <p className="mt-3 text-sm leading-7 text-slate-600">{text}</p>
      <Link className="mt-4 inline-flex text-sm underline" href={href}>
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
      <section>
        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="flex flex-col justify-center">
            <div className="mb-3 text-xs uppercase tracking-[0.18em] text-slate-500">
              Магазин • Наеми • Покупка
            </div>
            <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-slate-900">
              Всичко за кемпери, каравани и пътуване на едно място
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
              Началната страница вече служи като ясен вход към каталога, наемите и офертите за
              покупка, без да излиза извън темата на останалите екрани в приложението.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link className="rounded border px-4 py-2 text-sm font-medium hover:bg-black/5" href="/store">
                Към магазина
              </Link>
              <Link className="rounded border px-4 py-2 text-sm font-medium hover:bg-black/5" href="/rent">
                Виж наеми
              </Link>
              <Link className="rounded border px-4 py-2 text-sm font-medium hover:bg-black/5" href="/buy">
                Виж оферти
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <div className="overflow-hidden rounded-md border bg-white shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1400&q=80"
                alt="Camper in nature"
                className="h-[260px] w-full object-cover sm:h-[320px]"
              />
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-md border bg-white p-4 shadow-sm">
                <div className="text-xs uppercase tracking-[0.14em] text-slate-500">Store</div>
                <div className="mt-2 font-medium">Оборудване</div>
              </div>
              <div className="rounded-md border bg-white p-4 shadow-sm">
                <div className="text-xs uppercase tracking-[0.14em] text-slate-500">Rent</div>
                <div className="mt-2 font-medium">Кемпери под наем</div>
              </div>
              <div className="rounded-md border bg-white p-4 shadow-sm">
                <div className="text-xs uppercase tracking-[0.14em] text-slate-500">Buy</div>
                <div className="mt-2 font-medium">Оферти за покупка</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-md border bg-white p-4 shadow-sm">
        <div className="text-xs uppercase tracking-[0.18em] text-slate-500">Официални партньори</div>
        <div className="mt-3 flex flex-wrap gap-2 text-sm">
          {partnerLogos.map((logo) => (
            <span key={logo} className="rounded-full border bg-slate-50 px-3 py-1.5 text-slate-600">
              {logo}
            </span>
          ))}
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <HubCard
          title="Онлайн магазин"
          text="Оборудване, аксесоари и практични решения за кемпери и каравани, подредени по категории."
          href="/store"
          linkLabel="Към магазина"
        />
        <HubCard
          title="Кемпери под наем"
          text="Актуални предложения за наем, които се зареждат от каталога и могат да се разгледат в детайл."
          href="/rent"
          linkLabel="Към наемите"
        />
        <HubCard
          title="Кемпери и каравани за покупка"
          text="Активни оферти за покупка, показани по същия модел като останалите продуктови страници."
          href="/buy"
          linkLabel="Към офертите"
        />
      </section>

      <section className="rounded-md border bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="text-xs uppercase tracking-[0.18em] text-slate-500">Магазин</div>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900">Основни категории</h2>
          </div>
          <Link className="text-sm underline" href="/store">
            Виж всички категории
          </Link>
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {shopCategories.map((item) => (
            <div key={item.title} className="rounded-md border bg-slate-50 p-5">
              <h3 className="text-base font-semibold text-slate-900">{item.title}</h3>
              <p className="mt-2 text-sm leading-7 text-slate-600">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="text-xs uppercase tracking-[0.18em] text-slate-500">Наеми</div>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900">Актуални предложения под наем</h2>
          </div>
          <Link className="text-sm underline" href="/rent">
            Виж всички наеми
          </Link>
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {rentals.length
            ? rentals.map((product) => <ProductShowcaseCard key={product.id} product={product} kind="rent" />)
            : [
                <EmptyProductCard key="rent-empty-1" title="Няма активни предложения под наем" href="/rent" />,
                <EmptyProductCard key="rent-empty-2" title="Няма активни предложения под наем" href="/rent" />,
                <EmptyProductCard key="rent-empty-3" title="Няма активни предложения под наем" href="/rent" />,
              ]}
        </div>
      </section>

      <section>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="text-xs uppercase tracking-[0.18em] text-slate-500">Покупка</div>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900">Оферти за покупка</h2>
          </div>
          <Link className="text-sm underline" href="/buy">
            Виж всички оферти
          </Link>
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {campersForSale.length
            ? campersForSale.map((product) => <ProductShowcaseCard key={product.id} product={product} kind="buy" />)
            : [
                <EmptyProductCard key="buy-empty-1" title="Няма активни оферти за покупка" href="/buy" />,
                <EmptyProductCard key="buy-empty-2" title="Няма активни оферти за покупка" href="/buy" />,
                <EmptyProductCard key="buy-empty-3" title="Няма активни оферти за покупка" href="/buy" />,
              ]}
        </div>
      </section>

      <section className="rounded-md border bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="text-xs uppercase tracking-[0.18em] text-slate-500">Направи си кемпер</div>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900">От идея до готов проект</h2>
          </div>
          <Link className="text-sm underline" href="/kak-da-si-napravim-kemper">
            Научи повече
          </Link>
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          {steps.map((step) => (
            <div key={step.title} className="rounded-md border bg-slate-50 p-5">
              <h3 className="text-base font-semibold text-slate-900">{step.title}</h3>
              <p className="mt-2 text-sm leading-7 text-slate-600">{step.text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
