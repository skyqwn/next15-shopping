import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
interface Routes {
  [key: string]: boolean;
}

const publicUrls: Routes = {
  "/": true,
  "/auth/login": true,
  "/auth/register": true,
};

export async function middleware(request: NextRequest) {
  const userId = request.cookies.get("userId")?.value;
  const accessToken = request.cookies.get("accessToken");
  const { pathname } = request.nextUrl;
  const exists = publicUrls[pathname];

  console.log("[Middleware]", {
    pathname,
    hasAccessToken: !!accessToken,
    hasUserId: !!userId,
  });

  if (accessToken && userId && exists) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // accessToken이 없고 userId가 있는 경우에만 리프레시 시도
  if (!accessToken && userId && !exists) {
    try {
      const response = await fetch(
        "http://localhost:4000/api/auth/refreshToken",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId }),
        },
      );

      if (response.ok) {
        // 원래 요청한 URL로 리다이렉트
        const res = NextResponse.redirect(request.url);

        // 응답 헤더에서 Set-Cookie 복사
        const setCookie = response.headers.get("set-cookie");
        if (setCookie) {
          res.headers.set("Set-Cookie", setCookie);
        }

        return res;
      }

      // 리프레시 실패시 로그인으로
      return NextResponse.redirect(new URL("/auth/login", request.url));
    } catch (error) {
      console.error("Refresh token error:", error);
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
  }

  if (!accessToken && !userId && !exists) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
