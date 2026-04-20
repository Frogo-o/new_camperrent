import { NextResponse } from "next/server";

const DEFAULT_BLOCKED_BOT_PATTERNS = [
  "TikTokSpider",
  "Bytespider",
  "AhrefsBot",
  "SemrushBot",
  "MJ12bot",
  "DotBot",
  "PetalBot",
  "BLEXBot",
  "DataForSeoBot",
  "ClaudeBot",
  "GPTBot",
  "CCBot",
  "Amazonbot",
];

function hasAdminTokenCookie(req) {
  const cookie = req.headers.get("cookie") || "";
  return /(?:^|;\s*)admin_token=/.test(cookie);
}

function isPublicFile(pathname) {
  return /\.[a-zA-Z0-9]+$/.test(pathname);
}

const extraBlockedBotPatterns = String(process.env.BLOCKED_BOT_UA_PATTERNS || "")
  .split(",")
  .map((x) => x.trim())
  .filter(Boolean);
const blockedBotPatterns = [...DEFAULT_BLOCKED_BOT_PATTERNS, ...extraBlockedBotPatterns].map(
  (pattern) => new RegExp(pattern.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i")
);

function isBlockedRequest(req) {
  const ua = req.headers.get("user-agent") || "";
  return blockedBotPatterns.some((pattern) => pattern.test(ua));
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

  if (isBlockedRequest(req)) {
    return new NextResponse("Forbidden", {
      status: 403,
      headers: { "cache-control": "public, max-age=3600" },
    });
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
