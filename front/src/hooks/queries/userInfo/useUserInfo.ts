import { createInit, GET } from "@/api/httpMethod";
import { END_POINTS, queryKeys } from "@/constants";
import { UserInfoProps } from "@/types";
import {
  useSuspenseQuery,
  UseSuspenseQueryOptions,
} from "@tanstack/react-query";

interface UserResponse {
  isLoggedIn: boolean;
  data: UserInfoProps;
  message: string;
}

const getUserInfo = async (): Promise<UserResponse | undefined> => {
  const data = await GET<UserResponse>(END_POINTS.USER_PROFILE, createInit());

  return data;
};

export const getMyProfileQueryOptions = (
  id?: string,
): UseSuspenseQueryOptions<UserResponse | undefined> => ({
  queryKey: [queryKeys.USER_INFO],
  queryFn: getUserInfo,
});

export const useMyProfileQuery = () => {
  return useSuspenseQuery(getMyProfileQueryOptions());
};
