import { createInit, POST } from "@/api/httpMethod";
import { END_POINTS, queryKeys } from "@/constants";
import { ProductType } from "@/schemas";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const postCreateProduct = async (createPostForm: ProductType) => {
  const data = await POST(
    END_POINTS.CREATE_PRODUCT,
    createInit(createPostForm),
  );

  return data;
};

export const useCreateProductMutation = () => {
  const queryClient = useQueryClient();

  const createProductMutation = useMutation({
    mutationFn: postCreateProduct,
    onSuccess: () => {
      toast.success("상품이 등록되었습니다.");
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

  return createProductMutation;
};
