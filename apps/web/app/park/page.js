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

export default function Page() {
    const thumbs = [
        { src: asset("park/thumb-01.jpg"), alt: "Караван парк – паркинг" },
        { src: asset("park/thumb-02.jpg"), alt: "Караван парк – сграда" },
        { src: asset("park/thumb-03.jpg"), alt: "Караван парк – сервиз" },
        { src: asset("park/thumb-04.jpg"), alt: "Караван парк – магазин" },
        { src: asset("park/thumb-05.jpg"), alt: "Караван парк – оборудване" },
        { src: asset("park/thumb-06.jpg"), alt: "Караван парк – работна зона" },
    ];

    return (
        <div className="mx-auto max-w-6xl p-6">
            <div className="mb-4 text-sm text-slate-600">
                <Link className="hover:underline" href="/">
                    Начало
                </Link>
                <span className="mx-2">/</span>
                <span className="text-slate-900">Караван парк</span>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
                    <div className="grid gap-4">
                        <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
                            <div className="aspect-[4/3]">
                                <img
                                    src={asset("park/hero.jpg")}
                                    alt="Караван парк"
                                    className="block h-full w-full object-cover"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-3">
                            {thumbs.map((t) => (
                                <div
                                    key={t.src}
                                    className="overflow-hidden rounded-lg border border-slate-200 bg-slate-50"
                                >
                                    <div className="aspect-[4/3]">
                                        <img
                                            src={t.src}
                                            alt={t.alt}
                                            className="block h-full w-full object-cover"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">Караван парк</h1>

                        <div className="mt-3 grid gap-4 text-sm leading-6 text-slate-700">
                            <p>
                                Както Ви съобщихме през 2012г., бе дадено началото на най-мащабния проект на
                                нашата фирма, а именно изграждането на първия център в България за кемпери,
                                каравани и къмпинг продукти, наречен „Караван Парк“.
                            </p>

                            <p>
                                След повече от година упорита работа, с радост Ви съобщаваме, че откриването
                                на комплекса е финализирано.
                            </p>

                            <p className="font-semibold text-red-600">
                                Караван парк се намира непосредствено до транспортен възел на западния вход
                                на гр. Казанлък (околовръстен път София – Бургас срещу КАТ).
                            </p>

                            <div className="pt-2">
                                <div className="text-sm font-semibold text-slate-900">Какво има в „Караван Парк“:</div>
                                <div className="mt-2 text-sm text-slate-700">
                                    На площ от близо 15 000 м², вече са изградени:
                                </div>

                                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
                                    <li>Закрит и открит паркинг за кемпери и каравани</li>
                                    <li>Шоурум за нови кемпери</li>
                                    <li>Магазин за кемперско и къмпинг оборудване</li>
                                    <li>Сервиз за обслужване на кемпери и каравани</li>
                                </ul>
                            </div>

                            <div className="pt-2 text-sm font-semibold text-slate-900">Очакваме Ви!</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
