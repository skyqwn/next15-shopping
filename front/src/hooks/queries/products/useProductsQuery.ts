import {
  UseSuspenseQueryOptions,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { GET } from "@/api/httpMethod";
import { END_POINTS } from "@/constants";
import { SortOption } from "@/hooks/useShopSearchParams";

// Product 타입 정의
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

export const productsQueryKey = (params: ProductsParams) =>
  ["products", params] as const;

const getProducts = async (
  params: ProductsParams,
): Promise<ProductsResponse> => {
  const searchParams = new URLSearchParams();
  if (params.search) searchParams.set("q", params.search);
  if (params.sort) searchParams.set("sort", params.sort);

  const response = await GET<ProductsResponse>(
    `${END_POINTS.PRODUCTS}?${searchParams.toString()}`,
  );

  if (!response) {
    throw new Error("Failed to fetch products");
  }

  return response;
};

export const getProductsQueryOptions = (
  params: ProductsParams,
): UseSuspenseQueryOptions<ProductsResponse, Error> => ({
  queryKey: productsQueryKey(params),
  queryFn: () => getProducts(params),
});

export const useProducts = (params: ProductsParams) => {
  return useSuspenseQuery<ProductsResponse, Error>(
    getProductsQueryOptions(params),
  );
};

// Product 타입도 export
export type { Product, ProductsResponse, ProductsParams };
