import Link from "next/link";
import { formatPriceTextFromCents } from "../../components/PriceText";

function getAssetBase() {
    const raw =
        process.env.NEXT_PUBLIC_ASSET_BASE ||
        process.env.NEXT_PUBLIC_API_URL ||
        "https://api.camper-rent.bg";

    const normalized = raw.replace(/\/+$/, "");
    return normalized.endsWith("/public") ? normalized : `${normalized}/public`;
}

const ASSET_BASE = getAssetBase();

function asset(p) {
    const clean = String(p || "").replace(/^\/+/, "");
    return `${ASSET_BASE}/${clean}`;
}

const EUR_TO_BGN = 1.95583;

function bgnToEurCents(bgn) {
    const n = Number(bgn || 0);
    const eur = n / EUR_TO_BGN;
    return Math.round(eur * 100);
}

export default function Page() {
    const pdfUrl = asset("agreements/DogovorBG.pdf");

    return (
        <div className="mx-auto max-w-6xl p-6">
            <div className="mb-4 text-sm text-slate-600">
                <Link className="hover:underline" href="/">
                    Начало
                </Link>
                <span className="mx-2">/</span>
                <span className="text-slate-900">Условия / Договор</span>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">Условия / Договор</h1>
                        <p className="mt-2 text-sm text-slate-700">
                            Изтегли договор за наемане:
                            <a
                                href={pdfUrl}
                                className="ml-2 font-semibold text-sky-700 hover:underline"
                                target="_blank"
                                rel="noreferrer"
                            >
                                ТУК
                            </a>
                        </p>
                    </div>

                    <a
                        href={pdfUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex w-full items-center justify-center rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-700 sm:w-auto"
                    >
                        Изтегли договор
                    </a>
                </div>

                <div className="mt-6 border-t border-slate-200 pt-6">
                    <h2 className="text-lg font-bold text-slate-900">Условия за наемане на кемпер</h2>

                    <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm font-semibold text-amber-900">
                        РЕЗЕРВАЦИЯТА Е ВАЛИДНА САМО СЛЕД ПОПЪЛНЕНА И ИЗПРАТЕНА РЕЗЕРВАЦИОННА ФОРМА ОТ САЙТА И СЛЕД
                        ПОТВЪРЖДЕНИЕ ОТ НАШ СЛУЖИТЕЛ! РЕЗЕРВАЦИЯ ПО ТЕЛЕФОН НЕ СЕ ПРИЕМА!
                    </div>

                    <div className="mt-6 space-y-6 text-sm leading-6 text-slate-700">
                        <section>
                            <h3 className="text-base font-semibold text-slate-900">1. Резервация</h3>
                            <div className="mt-2 space-y-3">
                                <p>Резервацията може да се направи:</p>

                                <div>
                                    <p className="font-semibold text-slate-900">
                                        А/ До 4 седмици преди започването на наемния период – трябва да бъдат внесени:
                                    </p>
                                    <ul className="mt-2 list-disc space-y-1 pl-5">
                                        <li>
                                            Депозит за резервация – от{" "}
                                            <span className="font-semibold text-slate-900">
                                                {formatPriceTextFromCents(bgnToEurCents(500))}
                                            </span>
                                            , който е част от бъдещия наем – внесен в срок указан в примерната сметка.
                                        </li>
                                        <li>Копие от шофьорска книжка</li>
                                        <li>
                                            Копие от лична карта или международен паспорт (за държави извън ЕС със срок на валидност не по-малко
                                            от 6 месеца от определената дата за връщане)
                                        </li>
                                    </ul>
                                </div>

                                <div>
                                    <p className="font-semibold text-slate-900">
                                        Б/ До 2 седмици или по-малко преди започването на наемния период – трябва да бъдат внесени:
                                    </p>
                                    <ul className="mt-2 list-disc space-y-1 pl-5">
                                        <li>Цялата сума за наема за договорения период на ползване на караваната</li>
                                        <li>Копие от шофьорска книжка</li>
                                        <li>Копие от лична карта или международен паспорт</li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h3 className="text-base font-semibold text-slate-900">2. Гаранционен депозит</h3>
                            <p className="mt-2">
                                При наемане на мотокараваната се внася депозит в размер на{" "}
                                <span className="font-semibold text-slate-900">
                                    {formatPriceTextFromCents(bgnToEurCents(750))}
                                </span>
                                . При наемане на новите мотокаравани: Катамарано1Light (2012), Катамарано Саунд (2012), PLA HP75 (2015), Plasy
                                P72 (2016), Plasy P70G (2016) и Mister 435 (2016) се внася депозит в размер на{" "}
                                <span className="font-semibold text-slate-900">
                                    {formatPriceTextFromCents(bgnToEurCents(1200))}
                                </span>
                                . Той се възстановява изцяло при завръщане, когато:
                            </p>
                            <ul className="mt-2 list-disc space-y-1 pl-5">
                                <li>Няма повреди върху караваната и оборудването</li>
                                <li>
                                    Кемперът се освободи в определеното време и място, чиста и заредена с гориво, с почистена тоалетна, налични
                                    ключове, без липси по кухненско и хотелско обзавеждане, отразено в двустранен протокол (опис), заредени бутилки
                                    с пропан бутан
                                </li>
                            </ul>
                        </section>

                        <section>
                            <h3 className="text-base font-semibold text-slate-900">3. Плащания</h3>
                            <p className="mt-2">ЕТ &quot;Володя Игнатов - В &amp; В&quot; приема следните форми на плащания:</p>
                            <ul className="mt-2 list-disc space-y-1 pl-5">
                                <li>В брой</li>
                                <li>По банков път (всички банкови такси по превода се заплащат от наредителя)</li>
                            </ul>
                        </section>

                        <section>
                            <h3 className="text-base font-semibold text-slate-900">4. Шофьори</h3>
                            <p className="mt-2">
                                Трябва да са на възраст между 30–70 години и да имат шофьорска книжка от поне 2 години. Последните не трябва да са с
                                текущи нарушения. Всеки шофьор с медицински или законови ограничения трябва да информира предварително. Шофьорската
                                книжка и талонът се представят за проверка при оформяне на документите.
                            </p>
                        </section>

                        <section>
                            <h3 className="text-base font-semibold text-slate-900">5. Съхраняване на багажа и личния автомобил</h3>
                            <p className="mt-2">
                                Предоставяме на наемателя безплатен охраняем паркинг за времето, през което той ползва караваната. ЕТ &quot;Володя
                                Игнатов - В &amp; В&quot; носи отговорност за целостта им след съставяне на приемо-предавателен протокол.
                            </p>
                        </section>

                        <section>
                            <h3 className="text-base font-semibold text-slate-900">6. Наличност</h3>
                            <p className="mt-2">
                                ЕТ &quot;Володя Игнатов - В &amp; В&quot; ще направи всичко възможно да Ви предостави караваната, която сте резервирали. Ако по
                                причина (катастрофа, кражба и др.) не е налична, ще се постараем да подсигурим друго возило със същото или близко
                                оборудване без допълнителни разходи. Ако това не може да стане – възстановяваме внесената сума.
                            </p>

                            <p className="mt-3 font-semibold text-slate-900">Срещу допълнително заплащане може да се подсигури:</p>
                            <ol className="mt-2 list-decimal space-y-1 pl-5">
                                <li>
                                    Спално бельо за 1 лице –{" "}
                                    <span className="font-semibold text-slate-900">
                                        {formatPriceTextFromCents(bgnToEurCents(20))}
                                    </span>{" "}
                                    за целия период
                                </li>
                                <li>
                                    Стойка за велосипеди (2 бр.) –{" "}
                                    <span className="font-semibold text-slate-900">
                                        {formatPriceTextFromCents(bgnToEurCents(30))}
                                    </span>{" "}
                                    за целия период
                                </li>
                                <li>
                                    Велосипед –{" "}
                                    <span className="font-semibold text-slate-900">
                                        {formatPriceTextFromCents(bgnToEurCents(30))}
                                    </span>{" "}
                                    за целия период
                                </li>
                                <li>
                                    Маса + 4 седящи места –{" "}
                                    <span className="font-semibold text-slate-900">
                                        {formatPriceTextFromCents(bgnToEurCents(40))}
                                    </span>{" "}
                                    за целия период
                                </li>
                                <li>
                                    Детско столче –{" "}
                                    <span className="font-semibold text-slate-900">
                                        {formatPriceTextFromCents(bgnToEurCents(20))}
                                    </span>{" "}
                                    за целия период
                                </li>
                                <li>
                                    Комплект хавлии за 1 лице –{" "}
                                    <span className="font-semibold text-slate-900">
                                        {formatPriceTextFromCents(bgnToEurCents(15))}
                                    </span>
                                </li>
                                <li>
                                    Кухненско оборудване –{" "}
                                    <span className="font-semibold text-slate-900">
                                        {formatPriceTextFromCents(bgnToEurCents(30))}
                                    </span>
                                </li>
                                <li>
                                    Навигация –{" "}
                                    <span className="font-semibold text-slate-900">
                                        {formatPriceTextFromCents(bgnToEurCents(30))}
                                    </span>{" "}
                                    за целия период
                                </li>
                            </ol>
                        </section>

                        <section>
                            <h3 className="text-base font-semibold text-slate-900">7. Наемен период</h3>
                            <div className="mt-2 space-y-2">
                                <p>Наемането става в работен ден от 08:00 до 14:00 ч. от базата в гр. Казанлък.</p>
                                <p>София – най-рано в 11:00 часа.</p>
                                <p>
                                    При наемане и връщане от София –{" "}
                                    <span className="font-semibold text-slate-900">
                                        {formatPriceTextFromCents(bgnToEurCents(200))}
                                    </span>{" "}
                                    на посока.
                                </p>
                                <p>При наемане и връщане от Казанлък – не се заплаща такса.</p>
                                <p>Кемперът се връща с пълен резервоар гориво.</p>
                                <p>Освобождаването става не по-късно от 15:00 ч.</p>
                                <ul className="mt-2 list-disc space-y-1 pl-5">
                                    <li>
                                        В почивен ден – доп. такса{" "}
                                        <span className="font-semibold text-slate-900">
                                            {formatPriceTextFromCents(bgnToEurCents(20))}
                                        </span>
                                    </li>
                                    <li>
                                        Национален празник –{" "}
                                        <span className="font-semibold text-slate-900">
                                            {formatPriceTextFromCents(bgnToEurCents(50))}
                                        </span>
                                    </li>
                                </ul>
                                <p className="font-semibold text-slate-900">
                                    ВАЖНО: Не се връщат пари за по-ранно освобождаване. При връщане след 15:00 ч. се таксува още един ден наем.
                                </p>
                            </div>
                        </section>

                        <section>
                            <h3 className="text-base font-semibold text-slate-900">8. Санкции</h3>
                            <div className="mt-2 space-y-3">
                                <div>
                                    <p className="font-semibold text-slate-900">1) За просрочени дни:</p>
                                    <ul className="mt-2 list-disc space-y-1 pl-5">
                                        <li>Дневната такса по ценоразпис</li>
                                        <li>
                                            +{" "}
                                            <span className="font-semibold text-slate-900">
                                                {formatPriceTextFromCents(bgnToEurCents(20))}
                                            </span>{" "}
                                            неустойка за всеки просрочен ден (освен с изрично разрешение)
                                        </li>
                                    </ul>
                                </div>

                                <div>
                                    <p className="font-semibold text-slate-900">2) Допълнително се заплаща:</p>
                                    <ul className="mt-2 list-disc space-y-1 pl-5">
                                        <li>
                                            Непочистена тоалетна касета –{" "}
                                            <span className="font-semibold text-slate-900">
                                                {formatPriceTextFromCents(bgnToEurCents(50))}
                                            </span>
                                        </li>
                                        <li>
                                            Неизмита външно каравана –{" "}
                                            <span className="font-semibold text-slate-900">
                                                {formatPriceTextFromCents(bgnToEurCents(20))}
                                            </span>
                                        </li>
                                        <li>
                                            Неизмита вътрешно каравана –{" "}
                                            <span className="font-semibold text-slate-900">
                                                {formatPriceTextFromCents(bgnToEurCents(20))}
                                            </span>
                                        </li>
                                        <li>
                                            Непочистен резервоар за отпадни води –{" "}
                                            <span className="font-semibold text-slate-900">
                                                {formatPriceTextFromCents(bgnToEurCents(20))}
                                            </span>
                                        </li>
                                        <li>При непълен резервоар гориво – заплаща се допълване</li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h3 className="text-base font-semibold text-slate-900">9. Наем</h3>
                            <p className="mt-2">В цената за наем се включват:</p>
                            <ul className="mt-2 list-disc space-y-1 pl-5">
                                <li>Пълно автокаско</li>
                                <li>Застраховка гражданска отговорност</li>
                                <li>Пълен резервоар гориво</li>
                                <li>Пълен резервоар чиста вода</li>
                                <li>Почистена тоалетна касета</li>
                                <li>Бутилка пропан бутан</li>
                                <li>Нотариално заверено пълномощно (BG/EN)</li>
                            </ul>
                            <p className="mt-3 font-semibold text-red-600">ВОДАТА В РЕЗЕРВОАРА НЕ Е ГОДНА ЗА ПИЕНЕ!!!</p>
                        </section>

                        <section>
                            <h3 className="text-base font-semibold text-slate-900">10. Застраховки</h3>
                            <p className="mt-2">
                                ЕТ &quot;Володя Игнатов - В &amp; В&quot; осигурява гражданска отговорност и пълно каско. Личната собственост не се покрива,
                                ако е оставена без надзор. Препоръчваме на наемателя да сключи допълнителни застраховки според нуждите.
                            </p>
                        </section>

                        <section>
                            <h3 className="text-base font-semibold text-slate-900">11. Неизправности, повреди, злополуки и ремонт</h3>
                            <p className="mt-2">
                                При неизправности/повреди след започване на наема – наемателят уведомява незабавно по телефона. Наемателят отговаря
                                за разходи при нарушения на закона. Забранява се кемперът да тегли или да бъде теглен. При злополука се уведомяват
                                местните органи и ЕТ &quot;Володя Игнатов - В &amp; В&quot;.
                            </p>
                            <p className="mt-2">
                                При доказана вина на трета страна (с протокол), ако кемперът не може да се използва пълноценно и не може да се осигури
                                заместител – възстановяват се само неизползваните дни (след получаване на обезщетение по застраховка).
                            </p>
                        </section>

                        <section>
                            <h3 className="text-base font-semibold text-slate-900">12. Анулиране на резервация и неустойки</h3>
                            <p className="mt-2">
                                ЕТ &quot;Володя Игнатов - В &amp; В&quot; си запазва правото да анулира резервацията при изтекли документи, липса на депозит,
                                неспазване на срокове или неверни документи. В тези случаи платените суми не се връщат. При прекратяване по желание на
                                наемателя не се дължи възстановяване.
                            </p>
                            <p className="mt-3 font-semibold text-slate-900">
                                Спазването на условията по този договор гарантира една незабравима ваканция на Вас и Вашето семейство.
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}
