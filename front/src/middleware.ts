import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { createInit, GET, POST } from "./api/httpMethod";
import { END_POINTS } from "./constants";
interface Routes {
  [key: string]: boolean;
}

const publicUrls: Routes = {
  "/auth/login": true,
  "/auth/register": true,
  "/auth/email-verify": true,
  "/auth/email-login": true,
  "/auth/email-register": true,
};

export async function middleware(request: NextRequest) {
  const userId = request.cookies.get("userId")?.value;
  const accessToken = request.cookies.get("accessToken")?.value;
  const { pathname, searchParams } = request.nextUrl;
  const exists = publicUrls[pathname];

  if (userId && accessToken) {
    if (exists) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  console.log("[Middleware Detail]", {
    pathname,
    fullUrl: request.url,
    token: searchParams.get("token"),
    hasAccessToken: !!accessToken,
    hasUserId: !!userId,
    isPublicUrl: exists,
  });

  // if (pathname.startsWith("/admin")) {
  //   if (!accessToken || !userId) {
  //     return NextResponse.redirect(new URL("/auth/login", request.url));
  //   }

  //   try {
  //     const response = await POST(
  //       END_POINTS.CHECK_ISADMIN,
  //       createInit({ userId }),
  //     );

  //     if (!response.success) {
  //       return NextResponse.redirect(new URL("/", request.url));
  //     }

  //     return NextResponse.next();
  //   } catch (error) {
  //     console.error("Role verification error:", error);
  //     return NextResponse.redirect(new URL("/auth/login", request.url));
  //   }
  // }

  if (!exists && !accessToken && userId) {
    try {
      // 리프레시 토큰 요청
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
      if (!response.ok) {
        NextResponse.redirect(new URL("/auth/login"));
      }
      if (response.ok) {
        const newAccessToken = await response.json();
        console.log(newAccessToken);

        const res = NextResponse.redirect(request.url);

        res.cookies.set("accessToken", newAccessToken.result, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          maxAge: 60 * 60 * 1000, // 1시간
          path: "/",
        });

        return res;
      }

      return NextResponse.redirect(new URL("/", request.url));
    } catch (error) {
      console.error("Refresh token error:", error);
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
  }

  if (pathname === "/" || pathname === "/community") {
    if ((!accessToken && userId) || (accessToken && !userId)) {
      try {
        // 리프레시 토큰 요청
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
        if (!response.ok) {
          NextResponse.redirect(new URL("/auth/login"));
        }

        if (response.ok) {
          const newAccessToken = await response.json();

          console.log("새로운토큰:", newAccessToken);
          const res = NextResponse.redirect(new URL("/", request.url));

          res.cookies.set("accessToken", newAccessToken.result, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 1000, // 1시간
            path: "/",
          });

          return res;
        }

        return NextResponse.redirect(new URL("/", request.url));
      } catch (error) {
        console.error("Refresh token error:", error);
        return NextResponse.redirect(new URL("/auth/login", request.url));
      }
    }
    return NextResponse.next();
  }

  if (!accessToken && !userId && !exists) {
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
