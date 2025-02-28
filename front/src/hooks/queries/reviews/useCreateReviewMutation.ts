import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiResponse, createInit, POST } from "@/api/httpMethod";
import { END_POINTS, queryKeys } from "@/constants";
import { ReviewType as ReviewTypeResponse } from "@/types";
import { toast } from "sonner";
import { ReviewType } from "@/schemas";

const createReview = async (
  reviewData: ReviewType,
): Promise<ApiResponse<ReviewTypeResponse>> => {
  const data = await POST<ReviewTypeResponse>(
    END_POINTS.CREATE_REVIEW,
    createInit(reviewData),
  );

  return data;
};

export const useCreateReviewMutation = () => {
  const queryClient = useQueryClient();

  const createReviewMutation = useMutation({
    mutationFn: createReview,
    onSuccess: () => {
      toast.success("리뷰가 등록되었습니다.");
      queryClient.invalidateQueries({
        queryKey: [queryKeys.REVIEWS],
      });
    },
  });

  return createReviewMutation;
};
