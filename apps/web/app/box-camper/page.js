import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Box Camper | Camper Rent",
  description:
    "Box Camper е основа за кемпер, която може да бъде оборудвана според нуждите ви - прозорци, покривни люкове, електричество, вода, мебели и спални зони.",
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
    title: "Готова здрава основа",
    text: "Получавате изолирана и затворена конструкция, върху която може да се изгради практичен кемпер без да започвате от нулата.",
  },
  {
    title: "Свобода в разпределението",
    text: "Мястото вътре може да се планира за легла, кухня, багаж, техника или работна зона според начина, по който пътувате.",
  },
  {
    title: "Оборудване по избор",
    text: "Прозорци, люкове, осветление, електрическа система, вода, отопление и мебели могат да се добавят поетапно.",
  },
];

const steps = [
  "Избирате основна конфигурация и предназначение на кемпера.",
  "Планираме прозорци, люкове, инсталации и вътрешно разпределение.",
  "Оборудваме кутията с нужните системи и подготвяме интериора.",
  "Получавате персонален кемпер, готов за довършване или път.",
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
              Кемпер кутия, която изграждате по свой начин
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              Box Camper е практична основа за хора, които искат собствен кемпер с индивидуално
              разпределение. Получавате здрава конструкция с прозорци, врата и покривни отвори,
              а вътрешността може да бъде оборудвана според вашия стил на пътуване.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/contacts"
                className="rounded-full bg-[#00A6F4] px-6 py-3 font-medium text-white shadow-lg shadow-[#00A6F4]/15 transition hover:bg-[#0298df]"
              >
                Запитване за Box Camper
              </Link>
              <Link
                href="/store"
                className="rounded-full border border-[#cfeaff] bg-[#f3fbff] px-6 py-3 font-medium text-[#0078b6] transition hover:bg-[#e9f7ff]"
              >
                Оборудване
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
            Започвате с готова кутия, завършвате със свой кемпер
          </h2>
          <p className="mt-5 leading-8 text-slate-600">
            Вместо да търсите готов модел, който почти отговаря на нуждите ви, Box Camper дава
            възможност да изградите интериора около реалните си навици: повече място за багаж,
            по-голяма спална зона, компактна кухня, автономно електричество или семпла база за
            уикенд пътувания.
          </p>
          <p className="mt-4 leading-8 text-slate-600">
            Подходящ е за хора, които искат контрол върху бюджета и оборудването, но предпочитат
            основната конструкция да бъде подготвена професионално.
          </p>
        </div>

        <div className="rounded-xl border border-[#e3f1ff] bg-[#f7fbff] p-5">
          <h3 className="text-lg font-semibold text-[#2f658e]">Как протича проектът</h3>
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
          <h2 className="text-3xl font-semibold text-[#2f658e]">Искате собствен Box Camper?</h2>
          <p className="mt-4 leading-8 text-slate-600">
            Свържете се с нас, за да обсъдим размер, разпределение, оборудване и етапи на
            изграждане. Можем да помогнем както с основната концепция, така и с конкретни
            компоненти за довършване.
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
