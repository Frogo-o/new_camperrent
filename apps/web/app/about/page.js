import Image from "next/image";
import Link from "next/link";

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

export default function AboutPage() {
    return (
        <main className="bg-slate-100">
            <div className="mx-auto max-w-6xl p-6">
                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                    <h1 className="mb-3 text-2xl font-bold text-slate-900">За нас</h1>
                    <p className="mb-6 font-semibold text-slate-700">Подарете си незабравими преживявания!</p>

                    <div className="grid gap-6 lg:grid-cols-[440px_1fr]">
                        <div className="overflow-hidden rounded-lg border border-slate-200 bg-slate-50 shadow-sm">
                            <div className="relative aspect-[4/3] w-full">
                                <Image
                                    src={asset("about/camper.jpg")}
                                    alt="Кемпер"
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>
                        </div>

                        <div className="space-y-4 text-sm leading-7 text-slate-800">
                            <p>
                                ЕТ &quot;Володя Игнатов В&amp;В&quot; стартира дейност в предлагане на кемпери и
                                кемперско оборудване през 2009 година. В самото начало услугите включват кемпери под
                                наем. В последните години популярността да отидеш на почивка с кемпер или каравана в
                                България и в чужбина нараства драстично.
                            </p>

                            <p>
                                Ето защо г-н Игнатов решава да приложи идеите си, да инвестира и да изгради цялостна
                                концепция за развитието на този бранш в България. Благодарение на това фирмата вече
                                предлага много нови услуги и възможности на кемперското общество.
                            </p>

                            <p>
                                През 2011 година компанията става първия официален вносител на кемпери от Италия, сред
                                които са P.L.A и Giotti Line, а също и официален представител на световно признати фирми
                                за кемперско оборудване:{" "}
                                <span className="font-semibold">
                                    Fiamma, Reimo, Reich, Thetford, Unipart, Royal, Airva, Plastform
                                </span>{" "}
                                и други.
                            </p>
                        </div>
                    </div>

                    <div className="mt-6 space-y-3 text-sm leading-7 text-slate-800">
                        <p>
                            През 2014 година ЕТ Володя Игнатов В &amp; В получи права на оторизиран сервиз център на{" "}
                            <span className="font-semibold">Dometic</span> с обучени специалисти, извършващи специфично
                            техническо обслужване на оборудвани кемпери и каравани с уреди на{" "}
                            <span className="font-semibold">Dometic</span>, намиращи се{" "}
                            <Link className="font-bold text-sky-600 hover:underline" href="/contacts">
                                ТУК
                            </Link>
                        </p>

                        <p>
                            Официален дилър и сервиз център на <span className="font-semibold">Thetford</span>, намиращ се{" "}
                            <Link className="font-bold text-sky-600 hover:underline" href="/contacts">
                                ТУК
                            </Link>
                        </p>
                    </div>

                    <div className="mt-6 space-y-4 text-sm leading-7 text-slate-800">
                        <p>
                            В момента компанията предлага <span className="font-semibold">15</span> модела кемпери под наем,
                            които са напълно оборудвани. С кемперите се стремим да съчетаваме всички удобства на модерния Ви
                            дом. Те са оборудвани с телевизор, климатик, соларни панели за зареждане на акумулаторите,
                            инвентори и други удобства, което Ви прави абсолютно независими.
                        </p>

                        <p>
                            През 2012 година се дава началото, а през април 2014 е открит най-мащабния проект на фирмата —
                            първият център в България за кемпери и каравани, наречен{" "}
                            <Link className="font-bold text-sky-600 hover:underline" href="/park">
                                “Караван Парк”
                            </Link>
                            . На площ от близо 15 000 m2 вече са изградени: закрит и открит паркинг за кемпери и каравани,
                            шоурум за нови кемпери, магазин за кемперско и къмпинг оборудване и сервиз за обслужване на кемпери
                            и каравани.
                        </p>

                        <p className="pt-2 font-semibold">Очакваме Ви!</p>
                        <p className="font-semibold">Благодарим Ви, нямаше да успеем без вас!</p>
                    </div>
                </div>
            </div>
        </main>
    );
}
