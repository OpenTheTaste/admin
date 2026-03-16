import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_PATHS = ["/auth/login"];

function isPublicPath(pathname: string) {
  return PUBLIC_PATHS.some((p) => pathname.startsWith(p));
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isDev = process.env.NODE_ENV === "development";

  if (pathname === "/") {
    return NextResponse.redirect(new URL("/series", request.url));
  }

  if (pathname === "/auth") {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  if (isPublicPath(pathname)) {
    return NextResponse.next();
  }
  // 개발 환경에서는 토큰 체크 스킵
  if (isDev) {
    return NextResponse.next();
  }
  // const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  if (!refreshToken) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
  return NextResponse.next();
}
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
