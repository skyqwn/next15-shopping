import { createInit, GET } from "@/api/httpMethod";
import { END_POINTS, queryKeys } from "@/constants";
import { GetProductResponseType } from "@/types";
import {
  useSuspenseQuery,
  UseSuspenseQueryOptions,
} from "@tanstack/react-query";

const getProducts = async () => {
  const data = await GET<GetProductResponseType>(
    END_POINTS.PRODUCTS,
    createInit(),
  );

  console.log("query: ", data);

  return data;
};

export const getProductsQueryOptions = () => ({
  queryKey: [queryKeys.PRODUCTS],
  queryFn: getProducts,
});

export const useProductsQuery = () => {
  return useSuspenseQuery(getProductsQueryOptions());
};
