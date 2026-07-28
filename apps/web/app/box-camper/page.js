import Image from "next/image";
import Link from "next/link";
import BoxCamperGallery from "./BoxCamperGallery";

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
    src: "/box-camper/box-camper-rear-angle.png",
    alt: "Box Camper страничен изглед с прозорци",
    className: "md:col-span-2 md:row-span-2",
  },
  {
    src: "/box-camper/box-camper-side-long.png",
    alt: "Box Camper дълъг страничен изглед",
  },
  {
    src: "/box-camper/box-camper-side-clean.png",
    alt: "Box Camper страничен изглед с три прозореца",
  },
  {
    src: "/box-camper/box-camper-side-framed.png",
    alt: "Box Camper страничен изглед в рамка",
  },
  {
    src: "/box-camper/box-camper-rear-angle-wheels.png",
    alt: "Box Camper заден ъгъл с колела за преместване",
  },
  {
    src: "/box-camper/exterior-front.jpg",
    alt: "Box Camper външен изглед отпред",
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
    title: "Пътуване по ваш начин",
    text: "Идеята е проста - вие избирате как искате да пътувате, а оттам започва изграждането на вашия кемпер.",
  },
  {
    title: "Конфигурация според целта",
    text: "Всеки box camper може да бъде конфигуриран за градско придвижване, пътувания, автономни приключения или expedition маршрути в труднодостъпни райони.",
  },
  {
    title: "Подходяща основа",
    text: "Според товароносимостта и терена може да изберете шаси-кабина MAN, VW, Mercedes-Benz Sprinter, Iveco или Fiat, както и междуосие и тип задвижване.",
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
              Box camper по ваша конфигурация
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              Идеята е проста - вие избирате как искате да пътувате, а оттам започва
              изграждането на вашия кемпер.
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
              src="/box-camper/box-camper-rear-angle.png"
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
          </div>
        </div>

        <BoxCamperGallery images={gallery} />
      </section>

      <section className="rounded-2xl border border-[#dcecff] bg-[linear-gradient(180deg,#ffffff_0%,#eef9ff_100%)] p-6 shadow-sm sm:p-8">
        <div className="max-w-3xl">
          <h2 className="text-3xl font-semibold text-[#2f658e]">Искате сами да си направите кемпер?</h2>
          <p className="mt-4 leading-8 text-slate-600">
            Така не сте ограничени до готова фабрична конфигурация. Получавате здрава и
            надеждна основа, върху която можете да изградите кемпер според собствените си
            представи - с желаното вътрешно разпределение, оборудване, степен на автономност
            и функционалност.
          </p>
          <Link
            href="/contacts"
            className="mt-7 inline-flex rounded-full bg-[#f0a61c] px-6 py-3 font-medium text-white transition hover:bg-[#df9918]"
          >
            Контакти
          </Link>
          <p className="mt-4 text-sm leading-6 text-slate-600">
            За повече информация може да ни потърсите и във{" "}
            <a
              href="https://www.facebook.com/p/Camper-Rent-100036783686100/"
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-[#00A6F4] hover:underline"
            >
              Facebook
            </a>
            .
          </p>
        </div>
      </section>
    </div>
  );
}
