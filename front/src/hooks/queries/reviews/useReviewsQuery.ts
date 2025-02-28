import {
  UseSuspenseQueryOptions,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { ApiResponse, createInit, GET } from "@/api/httpMethod";
import { END_POINTS, queryKeys } from "@/constants";
import { ReviewType } from "@/types";

const getReviewDetail = async (
  productId: number,
): Promise<ApiResponse<ReviewType[]>> => {
  const response = await GET<ReviewType[]>(
    `${END_POINTS.REVIEW_PRODUCT(productId)}`,
    createInit(),
  );

  return response;
};

export const getReviewDetailQueryOptions = (
  productId: number,
): UseSuspenseQueryOptions<ApiResponse<ReviewType[]>> => ({
  queryKey: [queryKeys.REVIEWS, productId],
  queryFn: () => getReviewDetail(productId),
});

export const useReviewDetailQuery = (productId: number) => {
  return useSuspenseQuery(getReviewDetailQueryOptions(productId));
};
