import { NextRequest, NextResponse } from "next/server";
import { refreshToken } from "./middleware/auth";
import { isPublicRoute } from "./middleware/routes";

export async function middleware(request: NextRequest) {
  const userId = request.cookies.get("userId")?.value;
  const accessToken = request.cookies.get("accessToken")?.value;
  const { pathname } = request.nextUrl;
  const isPublic = isPublicRoute(pathname);

  if (pathname === "/") {
    return NextResponse.next();
  }

  // 로그인 사용자의 공개 페이지 접근 제한
  if (userId && accessToken && isPublic) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // 토큰 갱신이 필요한 경우
  if (!isPublic && !accessToken && userId) {
    const result = await refreshToken(request, userId);
    return result.response;
  }

  // 홈페이지나 커뮤니티 페이지의 특별 처리
  if (
    (pathname === "/" || pathname === "/community") &&
    ((!accessToken && userId) || (accessToken && !userId))
  ) {
    const result = await refreshToken(request, userId!);
    return result.response;
  }

  // 비로그인 사용자의 보호된 페이지 접근 제한
  if (!accessToken && !userId && !isPublic) {
    console.log(`Redirecting to login: ${pathname}`);
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
