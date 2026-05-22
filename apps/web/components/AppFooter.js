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

function FacebookIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95"
      />
    </svg>
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
              <a
                className="inline-flex items-center gap-2 pt-2 font-medium transition hover:text-sky-600"
                href="https://www.facebook.com/p/Camper-Rent-100036783686100/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Camper Rent във Facebook"
              >
                <span className="text-xl">
                  <FacebookIcon />
                </span>
                Facebook
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
