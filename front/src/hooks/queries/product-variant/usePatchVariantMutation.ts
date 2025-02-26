import { createInit, PATCH } from "@/api/httpMethod";
import { END_POINTS, queryKeys } from "@/constants";
import { VariantType } from "@/schemas";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const patchVariant = async (updateData: VariantType) => {
  if (!updateData.id) throw new Error("Variant ID is required");

  const result = await PATCH(
    END_POINTS.UPDATE_VARIANT(updateData.id),
    createInit(updateData),
  );

  if (!result) {
    throw new Error("Failed to update variant");
  }

  return result;
};

export const usePatchVariantMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: patchVariant,
    onSuccess: (data) => {
      toast.success("상품 옵션이 수정되었습니다.");
      queryClient.invalidateQueries({ queryKey: [queryKeys.PRODUCTS] });
      queryClient.invalidateQueries({ queryKey: [queryKeys.PRODUCT_DETAIL] });
    },
    onError: (error: unknown) => {
      console.error("Patch variant error:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "예기치 못한 에러가 발생했습니다.",
      );
    },
  });
};
