import { GET, createInit, ApiResponse } from "@/api/httpMethod";
import { END_POINTS, queryKeys } from "@/constants";
import { ProductVariantType } from "@/types";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";

export const getViewedProducts = async (): Promise<
  ApiResponse<ProductVariantType[]>
> => {
  const response = await GET<ProductVariantType[]>(
    END_POINTS.VIEWED_PRODUCTS,
    createInit(),
  );

  return response;
};

export const getViewedProductsQueryOptions = (): UseQueryOptions<
  ApiResponse<ProductVariantType[]>
> => ({
  queryKey: [queryKeys.VIEWED_PRODUCTS],
  queryFn: () => getViewedProducts(),
  staleTime: 5 * 60 * 1000,
  retry: false,
  refetchOnWindowFocus: false,
});

export const useViewedProductsQuery = () => {
  return useQuery(getViewedProductsQueryOptions());
};
