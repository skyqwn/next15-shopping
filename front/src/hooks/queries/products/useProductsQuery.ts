import {
  UseSuspenseQueryOptions,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { ApiResponse, createInit, GET } from "@/api/httpMethod";
import { END_POINTS, queryKeys } from "@/constants";
import { GetProductResponseType } from "@/types";

const getProducts = async (): Promise<
  ApiResponse<GetProductResponseType[]>
> => {
  const response = await GET<GetProductResponseType[]>(
    `${END_POINTS.PRODUCTS}`,
    createInit(),
  );

  return response;
};

export const getProductsQueryOptions = (): UseSuspenseQueryOptions<
  ApiResponse<GetProductResponseType[]>
> => ({
  queryKey: [queryKeys.PRODUCTS],
  queryFn: () => getProducts(),
});

export const useProductsQuery = () => {
  return useSuspenseQuery(getProductsQueryOptions());
};
