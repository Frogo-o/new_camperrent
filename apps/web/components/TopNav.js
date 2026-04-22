"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/store", label: "Магазин" },
  { href: "/rent", label: "Наем" },
  { href: "/buy", label: "Покупка" },
  { href: "/about", label: "За нас" },
  { href: "/contacts", label: "Контакти" },
];

export default function TopNav() {
  const pathname = usePathname();

  return (
    <nav className="border-b border-[#dcecff] bg-white/95 lg:hidden" aria-label="Основна навигация">
      <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 py-3 sm:px-6 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={
                isActive
                  ? "shrink-0 rounded-full border border-[#00A6F4] bg-[#00A6F4] px-4 py-2 text-sm font-medium text-white"
                  : "shrink-0 rounded-full border border-[#dcecff] bg-[#f8fbff] px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-[#00A6F4] hover:text-[#00A6F4]"
              }
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
