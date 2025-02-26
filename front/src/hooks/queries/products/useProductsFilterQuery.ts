import {
  UseSuspenseQueryOptions,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { createInit, GET } from "@/api/httpMethod";
import { END_POINTS } from "@/constants";
import { SortOption } from "@/hooks/useShopSearchParams";

interface VariantImage {
  url: string;
  size: number;
  fileName: string;
  order: number;
}

interface VariantTag {
  id: number;
  tag: string;
  variantId: number;
}

interface ProductVariant {
  id: number;
  color: string;
  productType: string;
  createdAt: string;
  updatedAt: string;
  variantImages: VariantImage[];
  variantTags: VariantTag[];
}

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
  productVariants: ProductVariant[];
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

const getProductsFilter = async (
  params: ProductsParams,
): Promise<ProductsResponse> => {
  const searchParams = new URLSearchParams();
  if (params.search) searchParams.set("q", params.search);
  if (params.sort) searchParams.set("sort", params.sort);

  const queryString = searchParams.toString();

  const url = `${END_POINTS.FILTER_PRODUCTS}?${queryString}`;

  const response = await GET<ProductsResponse>(`${url}`, createInit());

  if (!response) {
    return { success: false, result: [], message: "Failed to fetch products" };
  }

  return response;
};

export const getProductsFilterQueryOptions = (
  params: ProductsParams,
): UseSuspenseQueryOptions<ProductsResponse, Error> => ({
  queryKey: productsQueryKey(params),
  queryFn: () => getProductsFilter(params),
});

export const useProductsFilterQuery = (params: ProductsParams) => {
  return useSuspenseQuery<ProductsResponse, Error>(
    getProductsFilterQueryOptions(params),
  );
};

export type { Product, ProductsResponse, ProductsParams };
