import { createInit, DELETE } from "@/api/httpMethod";
import { END_POINTS, queryKeys } from "@/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const deleteVariant = async (id: number) => {
  const result = await DELETE(END_POINTS.DELETE_VARIANT(id), createInit());

  if (!result) {
    throw new Error("Failed to delete variant");
  }

  return result;
};

export const useDeleteVariantMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteVariant,
    onSuccess: () => {
      toast.success("상품 옵션이 삭제되었습니다.");
      queryClient.invalidateQueries({ queryKey: [queryKeys.PRODUCTS] });
      queryClient.invalidateQueries({ queryKey: [queryKeys.PRODUCT_DETAIL] });
    },
    onError: (error: unknown) => {
      console.error("Delete variant error:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "예기치 못한 에러가 발생했습니다.",
      );
    },
  });
};
