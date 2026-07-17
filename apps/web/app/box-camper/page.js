import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Box Camper | Camper Rent",
  description:
    "Box Camper показва възможност сами да си направите кемпер според вашите идеи и начин на пътуване.",
  alternates: {
    canonical: "/box-camper",
  },
};

const gallery = [
  {
    src: "/box-camper/exterior-front.jpg",
    alt: "Box Camper външен изглед отпред",
    className: "md:col-span-2 md:row-span-2",
  },
  {
    src: "/box-camper/interior-overcab.jpg",
    alt: "Вътрешност на Box Camper с прозорци и надкабинна зона",
  },
  {
    src: "/box-camper/roof.jpg",
    alt: "Покрив на Box Camper с люкове",
  },
  {
    src: "/box-camper/exterior-long-side.jpg",
    alt: "Страничен изглед на Box Camper",
  },
  {
    src: "/box-camper/exterior-side.jpg",
    alt: "Box Camper страничен изглед при транспортиране",
  },
  {
    src: "/box-camper/rear.jpg",
    alt: "Задна част на Box Camper",
  },
  {
    src: "/box-camper/exterior-rear-angle.jpg",
    alt: "Заден ъгъл и странични прозорци на Box Camper",
  },
  {
    src: "/box-camper/exterior-front-side.jpg",
    alt: "Предна част и надкабинна зона на Box Camper",
  },
  {
    src: "/box-camper/interior-windows.jpg",
    alt: "Вътрешни панели и прозорци на Box Camper",
  },
];

const features = [
  {
    title: "Направи си сам",
    text: "Идеята е проста: имате възможност сами да си направите кемпер според това как искате да пътувате.",
  },
  {
    title: "Свобода вътре",
    text: "Може да го подредите семпло или по-пълно, с място за спане, багаж и всичко важно за вашия стил.",
  },
  {
    title: "Ваш проект",
    text: "Не е нужно да следвате готов шаблон. Започвате с идея и я развивате така, както ви е удобно.",
  },
];

export default function BoxCamperPage() {
  return (
    <div className="space-y-10 pb-8">
      <section className="overflow-hidden rounded-2xl border border-[#dcecff] bg-white shadow-[0_14px_50px_rgba(41,89,129,0.08)]">
        <div className="grid gap-0 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#00A6F4]">
              Box Camper
            </p>
            <h1 className="mt-4 max-w-2xl text-4xl font-semibold tracking-tight text-[#2f658e] sm:text-5xl">
              Опция сам да си направиш кемпер
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              Box Camper е за хора, които искат сами да си направят кемпер, вместо да вземат
              готов модел. Вие решавате как да изглежда вътре, какво да има и колко семпъл или
              завършен да бъде проектът.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/contacts"
                className="rounded-full bg-[#00A6F4] px-6 py-3 font-medium text-white shadow-lg shadow-[#00A6F4]/15 transition hover:bg-[#0298df]"
              >
                Запитване за Box Camper
              </Link>
            </div>
          </div>

          <div className="relative min-h-[320px] lg:min-h-[560px]">
            <Image
              src="/box-camper/exterior-front-side.jpg"
              alt="Box Camper външен изглед"
              fill
              priority
              sizes="(min-width: 1024px) 52vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-3">
        {features.map((feature) => (
          <article key={feature.title} className="rounded-xl border border-[#dcecff] bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-[#2f658e]">{feature.title}</h2>
            <p className="mt-3 leading-7 text-slate-600">{feature.text}</p>
          </article>
        ))}
      </section>

      <section>
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#00A6F4]">
              Галерия
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-[#2f658e]">Примерна визия</h2>
          </div>
        </div>

        <div className="grid auto-rows-[220px] gap-4 md:grid-cols-4">
          {gallery.map((image) => (
            <div
              key={image.src}
              className={`relative overflow-hidden rounded-xl border border-[#dcecff] bg-white shadow-sm ${image.className || ""}`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(min-width: 768px) 25vw, 100vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-[#dcecff] bg-[linear-gradient(180deg,#ffffff_0%,#eef9ff_100%)] p-6 shadow-sm sm:p-8">
        <div className="max-w-3xl">
          <h2 className="text-3xl font-semibold text-[#2f658e]">Искате сами да си направите кемпер?</h2>
          <p className="mt-4 leading-8 text-slate-600">
            Свържете се с нас, за да обсъдим каква възможност търсите. Идеята е да имате
            стартова точка за собствен кемпер проект, който да развиете по ваш начин.
          </p>
          <Link
            href="/contacts"
            className="mt-7 inline-flex rounded-full bg-[#f0a61c] px-6 py-3 font-medium text-white transition hover:bg-[#df9918]"
          >
            Контакти
          </Link>
        </div>
      </section>
    </div>
  );
}
