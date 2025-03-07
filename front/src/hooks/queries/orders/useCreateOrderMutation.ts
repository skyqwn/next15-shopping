import { createInit, POST } from "@/api/httpMethod";
import { END_POINTS, queryKeys } from "@/constants";
import { OrderCreateType } from "@/schemas/order.schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const postCreateOrder = async (createOrderForm: OrderCreateType) => {
  const data = await POST(END_POINTS.CREATE_ORDER, createInit(createOrderForm));

  return data;
};

export const useCreateOrderMutation = () => {
  const queryClient = useQueryClient();

  const createOrderMutation = useMutation({
    mutationFn: postCreateOrder,
    onSuccess: () => {
      toast.success("주문이 성공적으로 생성되었습니다.");
      queryClient.invalidateQueries({ queryKey: [queryKeys.ORDERS] });
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        console.log(error);
        toast.error(error.message);
      } else {
        toast.error("주문 생성 중 오류가 발생했습니다.");
      }
    },
  });

  return createOrderMutation;
};
