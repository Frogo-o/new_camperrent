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
        <div className="flex flex-wrap items-center gap-2 text-[15px] font-semibold">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={[
                  "inline-flex items-center rounded-lg border px-3 py-2 transition",
                  isActive
                    ? "border-[#00A6F4] bg-[#e8f7ff] text-[#0078b6] shadow-sm"
                    : "border-[#dcecff] bg-white text-slate-700 hover:border-[#00A6F4] hover:bg-slate-50 hover:text-[#0078b6]",
                ].join(" ")}
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
