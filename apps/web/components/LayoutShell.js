"use client";

import { usePathname } from "next/navigation";
import AppFooter from "./AppFooter";
import Header from "./Header";
import TopNav from "./TopNav";

export default function LayoutShell({ children }) {
  const pathname = usePathname();
  const isBare = pathname === "/maintenance" || pathname === "/admin/login";
  const isHome = pathname === "/";

  return (
    <div className="min-h-screen bg-[#f7fbff]">
      {!isBare && (
        <>
          <Header />
          <TopNav />
        </>
      )}

      {isBare ? (
        children
      ) : (
        <>
          <main className={isHome ? "" : "mx-auto max-w-6xl px-4 py-6"}>{children}</main>
          <AppFooter />
        </>
      )}
    </div>
  );
}
