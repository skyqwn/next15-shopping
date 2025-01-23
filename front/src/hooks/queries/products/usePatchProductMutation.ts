import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createInit, PATCH } from "@/api/httpMethod";
import { END_POINTS, queryKeys } from "@/constants";
import { PartialProductType } from "@/schemas";

interface PatchProductProps {
  productId: number;
  createProductForm: PartialProductType;
}

const patchProduct = async ({
  createProductForm,
  productId,
}: PatchProductProps) => {
  const data = await PATCH(
    END_POINTS.PATCH_PRODUCT(productId),
    createInit(createProductForm),
  );

  return data;
};

export const usePatchProductMutation = (productId: number) => {
  const queryClient = useQueryClient();

  const patchProductMutation = useMutation({
    mutationFn: patchProduct,
    onSuccess: (data: { message: string }) => {
      toast.success(data.message);
      queryClient.invalidateQueries({
        queryKey: [queryKeys.PRODUCTS, productId],
      });
    },
  });

  return patchProductMutation;
};
