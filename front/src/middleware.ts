import { NextRequest, NextResponse } from "next/server";
import { isPublicRoute } from "./middleware/routes";
import { refreshToken } from "./middleware/auth";

export async function middleware(request: NextRequest) {
  const userId = request.cookies.get("userId")?.value;
  const accessToken = request.cookies.get("accessToken")?.value;
  const { pathname } = request.nextUrl;
  const isPublic = isPublicRoute(pathname);

  if (pathname === "/") {
    return NextResponse.next();
  }

  if (userId && accessToken && isPublic) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!isPublic && !accessToken && userId) {
    const result = await refreshToken(request, userId);
    return result.response;
  }

  if (
    (pathname === "/" || pathname === "/shop") &&
    ((!accessToken && userId) || (accessToken && !userId))
  ) {
    const result = await refreshToken(request, userId!);
    return result.response;
  }

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
