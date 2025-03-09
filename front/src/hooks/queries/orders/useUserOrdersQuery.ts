import {
  UseSuspenseQueryOptions,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { ApiResponse, createInit, GET } from "@/api/httpMethod";
import { END_POINTS, queryKeys } from "@/constants";
import { OrderType } from "@/types";

const getOrders = async (userId: number): Promise<ApiResponse<OrderType[]>> => {
  const response = await GET<OrderType[]>(
    END_POINTS.GET_USER_ORDERS(userId),
    createInit(),
  );

  return response;
};

export const getUserOrdersQueryOptions = (
  userId: number,
): UseSuspenseQueryOptions<ApiResponse<OrderType[]>> => ({
  queryKey: [queryKeys.ORDERS, userId],
  queryFn: () => getOrders(userId),
});

export const useUserOrderQuery = (userId: number) => {
  return useSuspenseQuery(getUserOrdersQueryOptions(userId));
};
