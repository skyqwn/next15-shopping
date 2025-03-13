import { createInit, POST } from "@/api/httpMethod";
import { END_POINTS, queryKeys } from "@/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const postViewedProduct = async (productId: number) => {
  const data = await POST(END_POINTS.VIEWED_PRODUCT, createInit({ productId }));

  return data;
};

export const useViewedProductMutation = () => {
  const queryClient = useQueryClient();

  const viewedProductMutation = useMutation({
    mutationFn: postViewedProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.VIEWED_PRODUCTS] });
    },
    onError: (error: unknown) => {
      console.error("Failed to record viewed product:", error);
    },
  });

  return viewedProductMutation;
};
