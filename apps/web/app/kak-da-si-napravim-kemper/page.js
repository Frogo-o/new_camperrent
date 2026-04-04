"use client";

import { useRouter } from "next/navigation";

function CatalogCategoryLink({ slug, children }) {
  const router = useRouter();

  function handleClick() {
    sessionStorage.setItem("catalogCategorySlug", slug);
    sessionStorage.removeItem("catalogBrandSlug");
    router.push("/");
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="font-medium text-sky-600 underline underline-offset-4 transition hover:text-sky-700"
    >
      {children}
    </button>
  );
}

export default function CamperBuildPage() {
  return (
    <main className="mx-auto max-w-5xl p-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
        <h1 className="mb-6 text-3xl font-bold text-slate-900 md:text-4xl">
          Как да си направим кемпер
        </h1>

        <div className="space-y-5 text-base leading-8 text-slate-700">
          <p>
            Особено популярна е идеята за ползване на кемпер ван, който е удобен
            за продължителни пътувания.
          </p>

          <p>
            След като в началото кемперизмът започна с каравани, след това се
            премина към кемпери, които са по мобилни и свързани с пътуванията на
            по многобройно семейство, към настоящия момент повечето от
            кемперистите имат желание за по дълги пътувания с възможност да
            обиколят повече места и да бъдат още по мобилни.
          </p>

          <p>
            Поради високата цена на кемпер вановете много от кемперистите
            започнаха преработване на бусове от типа на Ducato, Jumper и други
            подобни в кемпер ван.
          </p>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
        <h2 className="mb-6 text-2xl font-bold text-slate-900">
          Етапите за изработка на кемпер ван са следните:
        </h2>

        <div className="space-y-8 text-base leading-8 text-slate-700">
          <section>
            <p>
              Изрязване на отвори в ламаринната обшивка за монтаж на прозорци
              обикновено двойно акрилни, като тук възможностите са две:
            </p>

            <ul className="mt-4 list-disc space-y-3 pl-6">
              <li>
                <CatalogCategoryLink slug="prozorci">
                  акрилни прозорци с гумено уплътняващ профил - предлагани
                  продукти
                </CatalogCategoryLink>
              </li>
              <li>
                <CatalogCategoryLink slug="prozorci">
                  акрилни прозорци в пластмасова рамка комплект със
                  слънцезащитно и комарозащитно руло - предлагани продукти
                </CatalogCategoryLink>
              </li>
            </ul>

            <p className="mt-4">
              Макар и по скъпи тези прозорци водят до по нисък шум по време на
              движение, а са по добра термоизолация. Прозорците обикновено се
              поставят на плъзгащата врата, над къта за сядане, странично над
              спалнята и евентуално на задните отварящи се врати.
            </p>
          </section>

          <section>
            <p>
              Следващия етап е окабеляване, което следва да бъде съобразено с:
            </p>

            <ul className="mt-4 list-disc space-y-3 pl-6">
              <li>
                <CatalogCategoryLink slug="lighting">
                  осветление - предлагани продукти
                </CatalogCategoryLink>
              </li>
              <li>ключове и контакти</li>
              <li>
                <CatalogCategoryLink slug="pompi-vodna-sistema">
                  помпа за вода - предлагани продукти
                </CatalogCategoryLink>
              </li>
              <li>отопление</li>
              <li>бойлер</li>
              <li>
                <CatalogCategoryLink slug="refrigerators">
                  хладилник - предлагани продукти
                </CatalogCategoryLink>
              </li>
              <li>
                <CatalogCategoryLink slug="vetilacia">
                  люк с вентилатор - предлагани продукти
                </CatalogCategoryLink>
              </li>
              <li>
                <CatalogCategoryLink slug="toalet">
                  тоалетна - предлагани продукти
                </CatalogCategoryLink>
              </li>
              <li>
                <CatalogCategoryLink slug="smesiteli-i-fitingi">
                  смесители за вода, ако са с микросуичове и потопяема помпа -
                  предлагани продукти
                </CatalogCategoryLink>
              </li>
            </ul>
          </section>

          <section>
            <p>
              Поставяне на изолация на стени, таван и под -{" "}
              <CatalogCategoryLink slug="fitting">
                предлагани продукти
              </CatalogCategoryLink>
            </p>

            <p>
              Изработване на дървени ребра за захващане на плоскостите по стени и
              таван
            </p>

            <p>
              Полагане на водоустойчив фолиран шперплат върху изолацията на пода
            </p>
          </section>

          <section>
            <p>Избор на уреди:</p>

            <ul className="mt-4 list-disc space-y-3 pl-6">
              <li>
                <CatalogCategoryLink slug="refrigerators">
                  хладилник на 12V, 220V и газ или компресорен хладилник на 12V -
                  предлагани продукти
                </CatalogCategoryLink>
              </li>
              <li>
                <CatalogCategoryLink slug="fitting">
                  поддушово корито съобразено с конфигурацията на мокрото
                  помещение - предлагани продукти
                </CatalogCategoryLink>
              </li>
              <li>
                <CatalogCategoryLink slug="toalet">
                  тоалетна – касетъчна или по евтиния вариант химическа -
                  предлагани продукти
                </CatalogCategoryLink>
              </li>
              <li>
                <CatalogCategoryLink slug="gaz">
                  отопление комбинирано с бойлер на газ или нафта - предлагани
                  продукти
                </CatalogCategoryLink>
              </li>
              <li>отопление с въздуховоди</li>
              <li>
                <CatalogCategoryLink slug="electricity">
                  бойлер на 12 V, на 220 V или газ - предлагани продукти
                </CatalogCategoryLink>
              </li>
              <li>
                <CatalogCategoryLink slug="smesiteli-i-fitingi">
                  кухня – обикновено използваме комбиниран уред с газови котлони
                  и мивка - предлагани продукти
                </CatalogCategoryLink>
              </li>
            </ul>
          </section>

          <section>
            <p>
              След избор на уредите следва да се прекара газова инсталация -{" "}
              <CatalogCategoryLink slug="gaz">
                предлагани продукти
              </CatalogCategoryLink>
            </p>
          </section>

          <section>
            <p>
              Монтаж на конзола с два три точкови колана -{" "}
              <CatalogCategoryLink slug="fitting">
                предлагани продукти
              </CatalogCategoryLink>
            </p>

            <p>
              Изработване на мебели. Нашето предложение е изработването на
              мебелите да бъде извършено от 14мм тополов шперплат, който може да
              бъде фолиран с меламиново фолио с дебелина 0.4мм
            </p>

            <p>
              Изработване на тапицерия за къта за сядане и на матраците за
              спалното отделение
            </p>

            <p>
              Избор на конзола за масата -{" "}
              <CatalogCategoryLink slug="furniture">
                предлагани продукти
              </CatalogCategoryLink>
            </p>
          </section>

          <section>
            <p>
              Монтиране на таванни люкове -{" "}
              <CatalogCategoryLink slug="vetilacia">
                предлагани продукти
              </CatalogCategoryLink>
            </p>

            <p>Поставяне на електрическо стъпало под плъзгащата врата</p>

            <p>
              За осигуряване на защита от слънце и дъжд може да се монтира тента
              -{" "}
              <CatalogCategoryLink slug="tents">
                предлагани продукти
              </CatalogCategoryLink>
            </p>

            <p>
              За относителната автономност по време на вашето пътуване могат да
              се монтират соларни панели, инвертор за преобразуване на
              електричеството от 12V на 220 V
            </p>
          </section>

          <section>
            <p>
              За да си осигурите спокойствие при вашето пътуване особено зад
              граница е необходимо да преминете през DEKRA или Технотест за
              издаване на протокол за промяната на вида на превозното средство и
              промяна на броя на местата в новия кемпер.
            </p>

            <p>
              За информация кода на товарните бусове е N1, а след получаването
              на протокола категорията става M1
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}