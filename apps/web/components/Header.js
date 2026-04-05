import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-lg font-bold">
            CamperRent
          </Link>

          <div className="hidden items-center gap-2 text-sm opacity-80 sm:flex">
            <a href="tel:+359886316112" className="hover:underline">
              +359 886 316 112
            </a>
            <span>•</span>
            <a href="tel:+35943185017" className="hover:underline">
              +359 431 85017
            </a>
          </div>
        </div>

        <div className="flex items-center gap-3 text-sm">
          <div className="flex items-center gap-2">
            <Link href="/" className="hover:underline">
              BG
            </Link>
          </div>

          <span className="opacity-30">|</span>

          <Link href="/store" className="hover:underline">
            Магазин
          </Link>

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
