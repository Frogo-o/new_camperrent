export function PriceEURWithBGN({ cents }) {
    if (!cents || Number(cents) <= 0) {
        return (
            <div className="text-lg font-extrabold text-red-600">
                Изчерпан
            </div>
        );
    }

    const EUR_TO_BGN = 1.95583;

    const eur = Number(cents) / 100;
    const bgn = eur * EUR_TO_BGN;

    const eurFormatted = new Intl.NumberFormat("bg-BG", {
        style: "currency",
        currency: "EUR",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(eur);

    const bgnFormatted = new Intl.NumberFormat("bg-BG", {
        style: "currency",
        currency: "BGN",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(bgn);

    return (
        <div>
            <div className="text-lg font-extrabold text-slate-900">
                {eurFormatted}
            </div>
            <div className="text-xs text-slate-500">
                {bgnFormatted}
            </div>
        </div>
    );
}
