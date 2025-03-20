import { ApiResponse, createInit, GET } from "@/api/httpMethod";
import { END_POINTS, queryKeys } from "@/constants";
import { ProductVariantType } from "@/types";
import {
  useSuspenseQuery,
  UseSuspenseQueryOptions,
} from "@tanstack/react-query";

export const getVariantDetail = async (
  variantId: number,
): Promise<ApiResponse<ProductVariantType>> => {
  const data = await GET<ProductVariantType>(
    END_POINTS.VARIANT_DETAIL(variantId),
    createInit(undefined, "force-cache"),
  );

  return data;
};

export const variantDetailQueryOptions = (
  variantId: number,
): UseSuspenseQueryOptions<ApiResponse<ProductVariantType>> => ({
  queryKey: [queryKeys.VARIANT_DETAIL, variantId],
  queryFn: () => getVariantDetail(variantId),
});

export function useVariantDetailQuery(variantId: number) {
  return useSuspenseQuery(variantDetailQueryOptions(variantId));
}
