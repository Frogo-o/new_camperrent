import Link from "next/link";

export default function TopNav() {
    return (
        <div className="border-b">
            <div className="mx-auto max-w-6xl px-4 py-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <nav className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
                    <Link href="/" className="hover:underline">Магазин</Link>
                    <Link href="/rent" className="hover:underline">Наеми кемпер</Link>
                    <Link href="/buy" className="hover:underline">Купи кемпер</Link>
                    <Link href="/park" className="hover:underline">Караван парк</Link>
                    <Link href="/contracts" className="hover:underline">Условия / Договор</Link>
                    <Link href="/about" className="hover:underline">За нас</Link>
                    <Link href="/kak-da-si-napravim-kemper" className="hover:underline">Как да си направим кемпер</Link>
                    <Link href="/contacts" className="hover:underline">Контакти</Link>
                </nav>
            </div>
        </div>
    );
}
