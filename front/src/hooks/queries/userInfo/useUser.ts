import { createInit, GET } from "@/api/httpMethod";
import { END_POINTS, queryKeys } from "@/constants";
import { GetUserInfoResponseType } from "@/types";
import {
  useSuspenseQuery,
  UseSuspenseQueryOptions,
} from "@tanstack/react-query";

const getUserInfo = async (): Promise<GetUserInfoResponseType> => {
  const url = END_POINTS.USER_PROFILE;
  //ToDo id가 있을 경우 id를 넣어줘야함
  //if(id) url = `${url}/${id}`;
  const data = await GET<GetUserInfoResponseType>(url, createInit());

  return data;
};

export const getMyProfileQueryOptions = (
  id?: string,
): UseSuspenseQueryOptions<GetUserInfoResponseType> => ({
  queryKey: [queryKeys.USER_INFO, id ? id : queryKeys.OWNER_USER],
  queryFn: () => getUserInfo(),
});

export const useMyProfileQuery = () => {
  return useSuspenseQuery(getMyProfileQueryOptions());
};
