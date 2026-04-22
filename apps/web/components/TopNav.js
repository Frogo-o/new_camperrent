"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/store", label: "Онлайн магазин" },
  { href: "/rent", label: "Наеми кемпер" },
  { href: "/buy", label: "Купи кемпер" },
  { href: "/about", label: "За нас" },
  { href: "/contacts", label: "Контакти" },
];

export default function TopNav() {
  const pathname = usePathname();

  return (
    <nav className="border-b border-[#dcecff] bg-white/95 lg:hidden" aria-label="Основна навигация">
      <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-[15px] font-medium text-slate-700">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={isActive ? "text-[#00A6F4]" : "transition hover:text-[#00A6F4]"}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        <a
          href="tel:+359886316112"
          className="mt-3 inline-flex text-[15px] font-medium text-slate-600 transition hover:text-[#00A6F4]"
        >
          +359 886 316 112
        </a>
      </div>
    </nav>
  );
}
