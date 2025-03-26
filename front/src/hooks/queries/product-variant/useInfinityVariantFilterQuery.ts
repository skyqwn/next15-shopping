import {
  InfiniteData,
  UseInfiniteQueryOptions,
  useInfiniteQuery,
  QueryKey,
} from "@tanstack/react-query";
import { createInit, GET } from "@/api/httpMethod";
import { END_POINTS } from "@/constants";
import { ProductVariantType } from "@/types";

interface ApiResponse<T> {
  success: boolean;
  result: T;
  message: string | null;
}

export interface VariantResponse {
  data: ProductVariantType[];
  total: number;
  hasMore: boolean;
  page?: number;
}

interface VariantParams {
  search?: string;
  sort?: string;
  productId?: number;
}

export const variantQueryKey = (params: VariantParams) =>
  ["product-variants", params.search || "", params.sort || ""] as const;

const getVariantsFilter = async (
  params: VariantParams & { page?: number },
): Promise<ApiResponse<VariantResponse>> => {
  const searchParams = new URLSearchParams();
  if (params.search) searchParams.set("q", params.search);
  if (params.sort) searchParams.set("sort", params.sort);
  if (params.productId)
    searchParams.set("productId", params.productId.toString());
  searchParams.set("page", (params.page || 1).toString());
  searchParams.set("limit", "8");

  const queryString = searchParams.toString();
  const url = `${END_POINTS.FILTER_VARIANTS}?${queryString}`;

  const response = await GET<VariantResponse>(url, createInit());

  return response;
};

export const getVariantsFilterInfiniteQueryOptions = (
  params: VariantParams,
): UseInfiniteQueryOptions<
  ApiResponse<VariantResponse>,
  Error,
  InfiniteData<ApiResponse<VariantResponse>, number>,
  ApiResponse<VariantResponse>,
  QueryKey,
  number
> => ({
  queryKey: variantQueryKey(params),
  queryFn: ({ pageParam = 1 }) =>
    getVariantsFilter({ ...params, page: pageParam as number }),
  initialPageParam: 1,
  getNextPageParam: (lastPage) =>
    lastPage.result.hasMore ? (lastPage.result.page || 1) + 1 : undefined,
});
//

export const useInfinityVariantFilterQuery = (params: VariantParams) => {
  return useInfiniteQuery(getVariantsFilterInfiniteQueryOptions(params));
};
