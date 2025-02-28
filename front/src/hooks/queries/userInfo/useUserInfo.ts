import { ApiResponse, createInit, GET } from "@/api/httpMethod";
import { END_POINTS, queryKeys } from "@/constants";
import { GetUserInfoResponseType } from "@/types";
import {
  useSuspenseQuery,
  UseSuspenseQueryOptions,
} from "@tanstack/react-query";

export type LoginType = "email" | "google" | "kakao" | "naver";
export type UserRole = "USER" | "ADMIN";

export interface UserProfileType {
  id: number;
  name: string;
  email: string;
  imageUri: string | null;
  description: string | null;
  loginType: LoginType;
  role: UserRole;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface UserProfileResponse {
  result: UserProfileType;
  isLoggedIn: boolean;
  message: string;
}

export interface UpdateProfileRequest {
  name?: string;
  imageUri?: string;
  description?: string;
}

export interface AuthStatusResponse {
  isLoggedIn: boolean;
  data: UserProfileType;
  message: string;
}
const getUserInfo = async (): Promise<AuthStatusResponse> => {
  const data = await GET<AuthStatusResponse>(
    END_POINTS.USER_PROFILE,
    createInit(),
  );

  return data as any;
};

export const getMyProfileQueryOptions = (
  id?: string,
): UseSuspenseQueryOptions<AuthStatusResponse> => ({
  queryKey: [queryKeys.USER_INFO],
  queryFn: getUserInfo,
});

export const useMyProfileQuery = () => {
  return useSuspenseQuery(getMyProfileQueryOptions());
};
