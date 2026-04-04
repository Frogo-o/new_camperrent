import { NextResponse } from "next/server";

function hasAdminTokenCookie(req) {
  const cookie = req.headers.get("cookie") || "";
  return /(?:^|;\s*)admin_token=/.test(cookie);
}

function isPublicFile(pathname) {
  return /\.[a-zA-Z0-9]+$/.test(pathname);
}

const MAINTENANCE = false;

export function middleware(req) {
  const { pathname, search } = req.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/robots.txt") ||
    pathname.startsWith("/sitemap") ||
    isPublicFile(pathname)
  ) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/api")) return NextResponse.next();

  const isAdmin = hasAdminTokenCookie(req);
  const isAdminPath = pathname.startsWith("/admin");
  const isAdminLogin = pathname === "/admin/login";
  const isMaintenancePage = pathname === "/maintenance";

  if (isAdminPath) {
    if (isAdminLogin) return NextResponse.next();

    if (!isAdmin) {
      const url = req.nextUrl.clone();
      url.pathname = "/admin/login";
      url.searchParams.set("next", pathname + (search || ""));
      return NextResponse.redirect(url);
    }

    if (pathname === "/admin") {
      const url = req.nextUrl.clone();
      url.pathname = "/admin/products";
      url.search = "";
      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  }

  if (MAINTENANCE) {
    if (isAdmin) return NextResponse.next();

    if (!isMaintenancePage) {
      const url = req.nextUrl.clone();
      url.pathname = "/maintenance";
      url.search = "";
      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};
