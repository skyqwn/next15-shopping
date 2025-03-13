import {
  InfiniteData,
  UseInfiniteQueryOptions,
  useInfiniteQuery,
  QueryKey,
} from "@tanstack/react-query";
import { createInit, GET } from "@/api/httpMethod";
import { END_POINTS } from "@/constants";
import { GetProductResponseType } from "@/types";

interface ApiResponse<T> {
  success: boolean;
  result: T;
  message: string | null;
}

export interface ProductResponse {
  data: GetProductResponseType[];
  total: number;
  hasMore: boolean;
  page?: number;
}

interface ProductsParams {
  search?: string;
  sort?: string;
}

export const productsQueryKey = (params: ProductsParams) =>
  ["products", params] as const;

const getProductsFilter = async (
  params: ProductsParams & { page?: number },
): Promise<ApiResponse<ProductResponse>> => {
  const searchParams = new URLSearchParams();
  if (params.search) searchParams.set("q", params.search);
  if (params.sort) searchParams.set("sort", params.sort);
  searchParams.set("page", (params.page || 1).toString());
  searchParams.set("limit", "20");

  const queryString = searchParams.toString();
  const url = `${END_POINTS.FILTER_PRODUCTS}/filter?${queryString}`;

  const response = await GET<ProductResponse>(url, createInit());
  return response;
};

export const getProductsFilterInfiniteQueryOptions = (
  params: ProductsParams,
): UseInfiniteQueryOptions<
  ApiResponse<ProductResponse>,
  Error,
  InfiniteData<ApiResponse<ProductResponse>, number>,
  ApiResponse<ProductResponse>,
  QueryKey,
  number
> => ({
  queryKey: productsQueryKey(params),
  queryFn: ({ pageParam = 1 }) =>
    getProductsFilter({ ...params, page: pageParam as number }),
  initialPageParam: 1,
  getNextPageParam: (lastPage) =>
    lastPage.result.hasMore ? (lastPage.result.page || 1) + 1 : undefined,
});

export const useProductInfinityFilterQuery = (params: ProductsParams) => {
  return useInfiniteQuery(getProductsFilterInfiniteQueryOptions(params));
};
