import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Box Camper | Camper Rent",
  description:
    "Box Camper е готова кутия за кемпер проект, която взимате като основа и довършвате сами според идеите си.",
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
    title: "Вземате готова кутия",
    text: "Основната форма е подготвена, за да не започвате проекта от празен лист или гола рамка.",
  },
  {
    title: "Правите го по ваш вкус",
    text: "Вътре решавате сами какво да има - легло, шкафове, място за багаж, малка кухня или съвсем семпла къмпинг база.",
  },
  {
    title: "Довършвате поетапно",
    text: "Може да започнете с най-важното и постепенно да добавяте детайли, когато решите, че са ви нужни.",
  },
];

const steps = [
  "Взимате готовата кемпер кутия като база.",
  "Решавате как искате да изглежда вътре.",
  "Довършвате интериора сами или с помощ, когато ви трябва.",
  "Получавате кемпер, който носи вашата идея, а не готов шаблон.",
];

export default function BoxCamperPage() {
  return (
    <div className="space-y-12 pb-8">
      <section className="overflow-hidden rounded-2xl border border-[#dcecff] bg-white shadow-[0_14px_50px_rgba(41,89,129,0.08)]">
        <div className="grid gap-0 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#00A6F4]">
              Box Camper
            </p>
            <h1 className="mt-4 max-w-2xl text-4xl font-semibold tracking-tight text-[#2f658e] sm:text-5xl">
              Кемпер кутия, която си правите сами
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              Box Camper е готова основа за хора, които искат сами да си направят кемпер.
              Получавате кутията, а вътре решавате как да я подредите - просто, практично и
              според вашия начин на пътуване.
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

      <section className="grid gap-8 rounded-2xl border border-[#dcecff] bg-white p-6 shadow-sm lg:grid-cols-[0.9fr_1.1fr] lg:p-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#00A6F4]">
            Идеята
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-[#2f658e]">
            Взимате основата, идеята вътре е ваша
          </h2>
          <p className="mt-5 leading-8 text-slate-600">
            Box Camper не е готов кемпер с фиксирано разпределение. Идеята е да получите здрава
            база, която после да направите сами така, както ви е удобно. Може да бъде семпъл
            проект за уикенд пътувания или по-завършен кемпер, който постепенно надграждате.
          </p>
          <p className="mt-4 leading-8 text-slate-600">
            Подходящ е за хора, които обичат сами да планират, да пробват идеи и да не плащат за
            готови решения, които няма да използват.
          </p>
        </div>

        <div className="rounded-xl border border-[#e3f1ff] bg-[#f7fbff] p-5">
          <h3 className="text-lg font-semibold text-[#2f658e]">Каква е идеята</h3>
          <ol className="mt-5 space-y-4">
            {steps.map((step, index) => (
              <li key={step} className="flex gap-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#00A6F4] text-sm font-semibold text-white">
                  {index + 1}
                </span>
                <span className="pt-1 leading-7 text-slate-700">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section>
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#00A6F4]">
              Галерия
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-[#2f658e]">Външен вид и вътрешна основа</h2>
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
          <h2 className="text-3xl font-semibold text-[#2f658e]">Искате да започнете собствен Box Camper?</h2>
          <p className="mt-4 leading-8 text-slate-600">
            Свържете се с нас, за да обсъдим основата и какъв тип проект искате да започнете.
            Оттам нататък може да го развивате сами, със собствено темпо и собствена идея.
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
