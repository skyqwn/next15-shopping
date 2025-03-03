import {
  UseSuspenseQueryOptions,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { ApiResponse, createInit, GET } from "@/api/httpMethod";
import { END_POINTS, queryKeys } from "@/constants";
import { GetBannerResponseType } from "@/types/banners";

const getBanners = async (): Promise<ApiResponse<GetBannerResponseType[]>> => {
  const response = await GET<GetBannerResponseType[]>(
    `${END_POINTS.GET_BANNERS}`,
    createInit(),
  );

  return response;
};

export const getBannersQueryOptions = (): UseSuspenseQueryOptions<
  ApiResponse<GetBannerResponseType[]>
> => ({
  queryKey: [queryKeys.BANNER],
  queryFn: () => getBanners(),
});

export const useBannersQuery = () => {
  return useSuspenseQuery(getBannersQueryOptions());
};
