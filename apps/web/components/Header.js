import Link from "next/link";

function SearchIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
      <path d="M21.71,20.29,18,16.61A9,9,0,1,0,16.61,18l3.68,3.68a1,1,0,0,0,1.42,0A1,1,0,0,0,21.71,20.29ZM11,18a7,7,0,1,1,7-7A7,7,0,0,1,11,18Z" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
      <path d="M8.5,19A1.5,1.5,0,1,0,10,20.5,1.5,1.5,0,0,0,8.5,19ZM19,16H7a1,1,0,0,1,0-2h8.49121A3.0132,3.0132,0,0,0,18.376,11.82422L19.96143,6.2749A1.00009,1.00009,0,0,0,19,5H6.73907A3.00666,3.00666,0,0,0,3.92139,3H3A1,1,0,0,0,3,5h.92139a1.00459,1.00459,0,0,1,.96142.7251l.15552.54474.00024.00506L6.6792,12.01709A3.00006,3.00006,0,0,0,7,18H19a1,1,0,0,0,0-2ZM17.67432,7l-1.2212,4.27441A1.00458,1.00458,0,0,1,15.49121,12H8.75439l-.25494-.89221L7.32642,7ZM16.5,19A1.5,1.5,0,1,0,18,20.5,1.5,1.5,0,0,0,16.5,19Z" />
    </svg>
  );
}

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
            <img src="/camperLogo.png" alt="Camper Rent" className="h-12 w-auto object-contain sm:h-14" />
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
          <Link
            href="/store"
            aria-label="Търсене"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#dcecff] bg-white text-slate-600 transition hover:border-[#00A6F4] hover:text-[#00A6F4]"
          >
            <SearchIcon />
          </Link>
          <a className="hidden text-sm font-medium text-slate-600 transition hover:text-[#00A6F4] sm:inline-flex" href="tel:+359886316112">
            +359 886 316 112
          </a>
          <Link
            href="/cart"
            aria-label="Количка"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#dcecff] bg-white text-slate-600 transition hover:border-[#00A6F4] hover:text-[#00A6F4]"
          >
            <CartIcon />
          </Link>
        </div>
      </div>
    </header>
  );
}
