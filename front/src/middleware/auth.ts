import { NextRequest, NextResponse } from "next/server";

export async function refreshToken(request: NextRequest, userId: string) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  try {
    const response = await fetch(`${apiUrl}/auth/refreshToken`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `userId=${userId}`,
      },
      body: JSON.stringify({ userId }),
    });

    const data = await response.json();
    console.log("[Auth] 토큰 갱신 응답:", {
      status: response.status,
      data,
    });

    if (!response.ok) {
      return {
        success: false,
        response: NextResponse.redirect(new URL("/auth/login", request.url)),
      };
    }

    const res = NextResponse.next();
    res.cookies.set("accessToken", data.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      path: "/",
    });

    return {
      success: true,
      response: res,
    };
  } catch (error) {
    console.error("[Auth] 토큰 갱신 에러:", error);
    return {
      success: false,
      response: NextResponse.redirect(new URL("/auth/login", request.url)),
    };
  }
}
