import { createInit, DELETE } from "@/api/httpMethod";
import { END_POINTS, queryKeys } from "@/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const deleteProduct = async (productId: number) => {
  return await DELETE(END_POINTS.DELETE_PRODUCT(productId), createInit());
};

export const useDeleteProductMutation = () => {
  const queryClient = useQueryClient();

  const deleteProductMutation = useMutation({
    mutationFn: (productId: number) => deleteProduct(productId),
    onSuccess: (data: { message: string }) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: [queryKeys.PRODUCTS] });
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return deleteProductMutation;
};
