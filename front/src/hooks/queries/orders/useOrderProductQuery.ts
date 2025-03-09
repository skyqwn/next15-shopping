import {
  UseSuspenseQueryOptions,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { ApiResponse, createInit, GET } from "@/api/httpMethod";
import { END_POINTS, queryKeys } from "@/constants";
import { OrderProduct } from "@/types";

const getOrderProducts = async (): Promise<ApiResponse<OrderProduct[]>> => {
  const response = await GET<OrderProduct[]>(
    END_POINTS.GET_ORDER_PRODUCTS,
    createInit(),
  );

  return response;
};

export const getOrderProductsQueryOptions = (): UseSuspenseQueryOptions<
  ApiResponse<OrderProduct[]>
> => ({
  queryKey: [queryKeys.ORDER_PRODUCTS],
  queryFn: getOrderProducts,
});

export const useOrderProductsQuery = () => {
  return useSuspenseQuery(getOrderProductsQueryOptions());
};
