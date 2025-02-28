import {
  UseSuspenseQueryOptions,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { ApiResponse, createInit, GET } from "@/api/httpMethod";
import { END_POINTS } from "@/constants";
import { SortOption } from "@/hooks/useShopSearchParams";
import { GetProductResponseType } from "@/types";

interface ProductsParams {
  search?: string;
  sort?: string;
}

export const productsQueryKey = (params: ProductsParams) =>
  ["products", params] as const;

const getProductsFilter = async (
  params: ProductsParams,
): Promise<ApiResponse<GetProductResponseType[]>> => {
  const searchParams = new URLSearchParams();
  if (params.search) searchParams.set("q", params.search);
  if (params.sort) searchParams.set("sort", params.sort);

  const queryString = searchParams.toString();

  const url = `${END_POINTS.FILTER_PRODUCTS}?${queryString}`;

  const response = await GET<GetProductResponseType[]>(`${url}`, createInit());

  return response;
};

export const getProductsFilterQueryOptions = (
  params: ProductsParams,
): UseSuspenseQueryOptions<ApiResponse<GetProductResponseType[]>> => ({
  queryKey: productsQueryKey(params),
  queryFn: () => getProductsFilter(params),
});

export const useProductsFilterQuery = (params: ProductsParams) => {
  return useSuspenseQuery(getProductsFilterQueryOptions(params));
};
