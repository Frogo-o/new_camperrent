import Link from "next/link";

export default function Page() {
    return (
        <div className="mx-auto max-w-6xl p-6">
            {/* Breadcrumb */}
            <div className="mb-4 text-sm text-slate-600">
                <Link href="/" className="hover:underline">
                    Начало
                </Link>
                <span className="mx-2">/</span>
                <span className="text-slate-900">Контакти</span>
            </div>

            <h1 className="mb-6 text-2xl font-bold text-slate-900">Контакти</h1>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="max-w-3xl space-y-6 text-sm text-slate-700">
                    <div>
                        <h2 className="text-lg font-semibold text-slate-900">
                            ВОЛОДЯ ИГНАТОВ - В ЕНД В ЕТ
                        </h2>
                    </div>

                    <div>
                        <div className="font-semibold text-slate-900">Офис Казанлък</div>
                        <div className="mt-1">
                            Адрес: Казанлък, България 6100
                        </div>
                        <div>
                            Google map Kazanlak Caravan Park: 42°36'45.3"N 25°22'02.1"E
                        </div>
                        <div>
                            GPS координати: 42.612583, 25.367250
                        </div>

                        <div className="mt-2">
                            Телефон: +359 431 85017
                        </div>
                        <div>
                            GSM: +359 886 316 112
                        </div>
                        <div>
                            Имейл:{" "}
                            <a
                                href="mailto:info@camper-rent.bg"
                                className="text-sky-600 hover:underline"
                            >
                                info@camper-rent.bg
                            </a>
                        </div>
                        <div>
                            Уеб адрес:{" "}
                            <a
                                href="https://www.camper-rent.bg"
                                target="_blank"
                                className="text-sky-600 hover:underline"
                            >
                                www.camper-rent.bg
                            </a>
                        </div>
                    </div>

                    <div>
                        <div className="font-semibold text-slate-900">Офис София</div>
                        <div className="mt-1">
                            София, България, 1231
                        </div>
                        <div>
                            Адрес: кв. Свобода, ул. Народни будители 11
                            <br />
                            (между блок 10 и блок 37)
                        </div>
                        <div className="mt-2">
                            GSM: +359 893 395 305
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
