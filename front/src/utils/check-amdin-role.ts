"use server";

import { cookies } from "next/headers";
import { END_POINTS } from "@/constants";

export interface UserInfo {
  id: number;
  email: string;
  name: string;
  description?: string;
  imageUri?: string;
  role: "ADMIN" | "USER";
  loginType: "email" | "kakao";
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface UserResponse {
  data: UserInfo;
  isLoggedIn: boolean;
  message: string;
}

async function fetchWrapperServerSide<T>(uri: string, init?: RequestInit) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const userId = cookieStore.get("userId")?.value;

  if (!accessToken || !userId) {
    return null;
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${uri}`, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${accessToken}; userId=${userId}`,
      },
      cache: "no-cache",
      credentials: "include",
    });

    if (!response.ok) {
      return null;
    }

    const { result } = await response.json();
    return result as T;
  } catch (error) {
    console.error("Server-side fetch error:", error);
    return null;
  }
}

export async function getUserInfo() {
  return fetchWrapperServerSide<UserResponse>(END_POINTS.USER_PROFILE);
}
