import Link from "next/link";

const footerLinks = {
  categories: [
    { label: "Тенти и маркизи", href: "/store" },
    { label: "Вода и санитария", href: "/store" },
    { label: "Ток и осветление", href: "/store" },
    { label: "Кухня и къмпинг оборудване", href: "/store" },
    { label: "Кемпери под наем", href: "/rent" },
    { label: "Кемпери за продажба", href: "/buy" },
  ],
  company: [
    { label: "За нас", href: "/about" },
    { label: "Контакти", href: "/contacts" },
    { label: "Караван парк", href: "/park" },
    { label: "Как да си направим кемпер", href: "/kak-da-si-napravim-kemper" },
  ],
  legal: [
    { label: "Условия и договор", href: "/contracts" },
    { label: "Контакти", href: "/contacts" },
    { label: "Наеми кемпер", href: "/rent" },
    { label: "Онлайн магазин", href: "/store" },
  ],
};

function FooterLinkList({ title, items }) {
  return (
    <div>
      <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{title}</h4>
      <ul className="space-y-2.5 text-sm text-slate-600">
        {items.map((item) => (
          <li key={`${title}-${item.label}`}>
            <Link className="transition hover:text-sky-600" href={item.href}>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function AppFooter() {
  return (
    <footer className="border-t border-[#dcecff] bg-[#f4f8fd] text-slate-800">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Контакти</h4>
            <div className="space-y-2 text-sm text-slate-600">
              <p className="font-semibold text-slate-800">Camper Rent</p>
              <p>Казанлък, България 6100</p>
              <p>София, кв. Свобода, ул. Народни будители 11</p>
              <a className="block transition hover:text-sky-600" href="tel:+359886316112">
                +359 886 316 112
              </a>
              <a className="block transition hover:text-sky-600" href="tel:+35943185017">
                +359 431 85017
              </a>
              <a className="block transition hover:text-sky-600" href="mailto:info@camper-rent.bg">
                info@camper-rent.bg
              </a>
            </div>
          </div>

          <FooterLinkList title="Категории" items={footerLinks.categories} />
          <FooterLinkList title="За нас" items={footerLinks.company} />
          <FooterLinkList title="Полезно" items={footerLinks.legal} />
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-[#dcecff] pt-6 text-sm text-slate-500 md:flex-row md:justify-between">
          <p>© 2026 Camper Rent. Всички права запазени.</p>
          <p>Camper equipment, rentals and camper projects.</p>
        </div>
      </div>
    </footer>
  );
}
