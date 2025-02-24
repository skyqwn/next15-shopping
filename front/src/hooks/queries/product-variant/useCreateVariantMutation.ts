import { createInit, POST } from "@/api/httpMethod";
import { END_POINTS, queryKeys } from "@/constants";
import { VariantType } from "@/schemas";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const postCreateVariant = async (createVariantForm: VariantType) => {
  const data = await POST(
    END_POINTS.CREATE_VARIANT,
    createInit(createVariantForm),
  );

  return data;
};

export const useCreateVariantMutation = () => {
  const queryClient = useQueryClient();

  const createVariantMutation = useMutation({
    mutationFn: postCreateVariant,
    onSuccess: () => {
      toast.success("상품내용이 등록되었습니다.");
      queryClient.invalidateQueries({ queryKey: [queryKeys.PRODUCTS] });
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        console.log(error);
        toast.error(error.message);
      } else {
        toast.error("예기치 못한 에러가 발생했습니다.");
      }
    },
  });

  return createVariantMutation;
};
