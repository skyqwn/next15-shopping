import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { ApiResponse, createInit, PATCH } from "@/api/httpMethod";
import { END_POINTS, queryKeys } from "@/constants";
import { PartialProductType } from "@/schemas";
import { GetProductResponseType } from "@/types";

interface PatchProductProps {
  productId: number;
  createProductForm: PartialProductType;
}

const patchProduct = async ({
  createProductForm,
  productId,
}: PatchProductProps): Promise<ApiResponse<GetProductResponseType>> => {
  const data = await PATCH<GetProductResponseType>(
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
        queryKey: [queryKeys.PRODUCTS],
      });
    },
  });

  return patchProductMutation;
};
