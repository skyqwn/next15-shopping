import {
  UseSuspenseQueryOptions,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { ApiResponse, createInit, GET } from "@/api/httpMethod";
import { END_POINTS, queryKeys } from "@/constants";
import { ProductVariantType } from "@/types";

interface GetVariantsParams {
  search?: string;
  sort?: string;
}

export const getFilteredVariants = async ({
  search,
  sort,
}: GetVariantsParams): Promise<ApiResponse<ProductVariantType[]>> => {
  const searchParams = new URLSearchParams();
  if (search) searchParams.append("q", search);
  if (sort) searchParams.append("sort", sort);

  const queryString = searchParams.toString();
  const endpoint = `${END_POINTS.GET_VARIANTS}/filter${
    queryString ? `?${queryString}` : ""
  }`;

  return GET<ProductVariantType[]>(endpoint, createInit());
};

export const getVariantsFilterQueryOptions = (
  params: GetVariantsParams,
): UseSuspenseQueryOptions<ApiResponse<ProductVariantType[]>, Error> => ({
  queryKey: [queryKeys.VARIANT, params],
  queryFn: () => getFilteredVariants(params),
});

export const useVariantsFilterQuery = (params: GetVariantsParams) => {
  return useSuspenseQuery(getVariantsFilterQueryOptions(params));
};
