import { createInit, GET } from "@/api/httpMethod";
import { END_POINTS, queryKeys } from "@/constants";
import {
  useSuspenseQuery,
  UseSuspenseQueryOptions,
} from "@tanstack/react-query";

const getProductDetail = async (productId: number) => {
  const data = await GET(END_POINTS.PRODUCT_DETAIL(productId), createInit());

  return data;
};

export const productDetilaQueryOptions = (
  productId: number,
): UseSuspenseQueryOptions<any> => ({
  queryKey: [queryKeys.PRODUCT_DETAIL, productId],
  queryFn: async () => await getProductDetail(productId),
});

export function useProductDetailQuery(productId: number) {
  return useSuspenseQuery(productDetilaQueryOptions(productId));
}
