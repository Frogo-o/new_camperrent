"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import TopNav from "./TopNav";

export default function LayoutShell({ children }) {
  const pathname = usePathname();
  const isBare = pathname === "/maintenance" || pathname === "/admin/login";

  return (
    <div className="min-h-screen">
      {!isBare && (
        <>
          <Header />
          <TopNav />
        </>
      )}

      {isBare ? (
        children
      ) : (
        <main className="mx-auto max-w-6xl px-4 py-6">{children}</main>
      )}
    </div>
  );
}
