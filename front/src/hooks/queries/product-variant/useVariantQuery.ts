import {
  UseSuspenseQueryOptions,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { ApiResponse, createInit, GET } from "@/api/httpMethod";
import { END_POINTS, queryKeys } from "@/constants";
import { ProductVariantType } from "@/types/product";

export const getVariants = async (): Promise<
  ApiResponse<ProductVariantType[]>
> => {
  const response = await GET<ProductVariantType[]>(
    END_POINTS.GET_VARIANTS,
    createInit(),
  );

  return response;
};

export const getVariantsQueryOptions = (): UseSuspenseQueryOptions<
  ApiResponse<ProductVariantType[]>
> => ({
  queryKey: [queryKeys.VARIANT],
  queryFn: () => getVariants(),
});

export const useVariantsQuery = () => {
  return useSuspenseQuery(getVariantsQueryOptions());
};
