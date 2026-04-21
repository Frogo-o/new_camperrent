import Link from "next/link";

const navItems = [
  { href: "/store", label: "Онлайн магазин" },
  { href: "/rent", label: "Наеми кемпер" },
  { href: "/buy", label: "Купи кемпер" },
  { href: "/about", label: "За нас" },
  { href: "/contacts", label: "Контакти" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#dcecff] bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4 lg:px-8">
        <div className="flex items-center gap-8 lg:gap-10">
          <Link href="/" className="flex items-center gap-3 text-[#2f658e]">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#eef8ff] text-lg font-semibold text-[#00A6F4]">
              CR
            </div>
            <div>
              <div className="text-lg font-semibold leading-none">Camper Rent</div>
              <div className="mt-1 text-xs uppercase tracking-[0.2em] text-slate-400">магазин · наеми · кемпери</div>
            </div>
          </Link>

          <nav className="hidden items-center gap-7 text-sm font-medium text-slate-700 lg:flex">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="transition hover:text-[#00A6F4]">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <a className="hidden text-sm font-medium text-slate-600 transition hover:text-[#00A6F4] sm:inline-flex" href="tel:+359886316112">
            +359 886 316 112
          </a>
          <Link href="/cart" className="inline-flex h-10 min-w-10 items-center justify-center rounded-full border border-[#dcecff] bg-white px-3 text-sm text-slate-600 transition hover:border-[#00A6F4] hover:text-[#00A6F4]">
            Количка
          </Link>
        </div>
      </div>
    </header>
  );
}
