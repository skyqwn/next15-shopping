import {
  UseSuspenseQueryOptions,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { GET } from "@/api/httpMethod";
import { END_POINTS, queryKeys } from "@/constants";
import { SortOption } from "@/hooks/useShopSearchParams";

interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  immediatePrice: number;
  imageUrl: string;
  description?: string;
  createdAt: string;
}

interface ProductsResponse {
  success: boolean;
  result: Product[];
  message: string | null;
}

interface ProductsParams {
  search?: string;
  sort?: SortOption;
}

const getProducts = async (): Promise<ProductsResponse> => {
  const response = await GET<ProductsResponse>(`${END_POINTS.PRODUCTS}`);

  if (!response) {
    throw new Error("Failed to fetch products");
  }

  return response;
};

export const getProductsQueryOptions = (): UseSuspenseQueryOptions<
  ProductsResponse,
  Error
> => ({
  queryKey: [queryKeys.PRODUCTS],
  queryFn: () => getProducts(),
});

export const useProductsQuery = () => {
  return useSuspenseQuery<ProductsResponse, Error>(getProductsQueryOptions());
};

export type { Product, ProductsResponse, ProductsParams };
