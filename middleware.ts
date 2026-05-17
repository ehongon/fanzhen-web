import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// 公开路径（无需登录）
const PUBLIC_PATHS = [
  "/",
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
  "/schools",
  "/system",
  "/dianji",
  "/gongfa",
  "/community",
  "/ai",
];

// 公开路径前缀
const PUBLIC_PREFIXES = [
  "/api/auth",
  "/api/contents",
  "/_next",
  "/images",
  "/favicon",
];

// 需要登录的路径
const PROTECTED_PATHS = [
  "/teams",
  "/friends",
  "/practice/together",
  "/practice/record",
  "/practice/history",
  "/practice/stats",
  "/profile",
  "/level",
  "/leaderboard",
  "/badges",
  "/achievements",
  "/daily",
];

function isPublicPath(pathname: string): boolean {
  if (PUBLIC_PATHS.includes(pathname)) return true;
  if (PUBLIC_PATHS.some((p) => pathname.startsWith(p + "/"))) return true;
  if (PUBLIC_PREFIXES.some((p) => pathname.startsWith(p))) return true;
  return false;
}

function isProtectedPath(pathname: string): boolean {
  return PROTECTED_PATHS.some((p) => pathname === p || pathname.startsWith(p + "/"));
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 公开路径直接放行
  if (isPublicPath(pathname)) {
    return NextResponse.next();
  }

  // 检查是否需要登录
  if (isProtectedPath(pathname)) {
    const token = request.cookies.get("fanzhen_auth_token")?.value;

    if (!token) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
