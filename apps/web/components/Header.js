import Link from "next/link";

export default function Header() {
    return (
        <header className="border-b">
            <div className="mx-auto max-w-6xl px-4 py-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/" className="font-bold text-lg">
                        CamperRent
                    </Link>

                    <div className="hidden sm:flex items-center gap-2 text-sm opacity-80">
                        <a href="tel:+359886316112" className="hover:underline">+359 886 316 112</a>
                        <span>•</span>
                        <a href="tel:+35943185017" className="hover:underline">+359 431 85017</a>
                    </div>
                </div>

                <div className="flex items-center gap-3 text-sm">
                    <div className="flex items-center gap-2">
                        <Link href="/" className="hover:underline">BG</Link>
                    </div>

                    <span className="opacity-30">|</span>

                    <Link href="/cart" className="hover:underline">
                        Количка
                    </Link>

                    <Link href="/rent" className="rounded border px-3 py-1 hover:bg-black/5">
                        Кемпери под наем
                    </Link>
                </div>
            </div>
        </header>
    );
}
