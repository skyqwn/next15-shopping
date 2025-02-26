import {
  UseSuspenseQueryOptions,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { createInit, GET } from "@/api/httpMethod";
import { END_POINTS, queryKeys } from "@/constants";
import { SortOption } from "@/hooks/useShopSearchParams";

interface VariantImage {
  id: number;
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

interface ProductVariantType {
  id: number;
  productId: number;
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
  description: string;
  price: number;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
  productVariants: ProductVariantType[];
}

interface ProductsResponse {
  success: boolean;
  result: Product[];
  message: string | null;
}

const getProducts = async (): Promise<ProductsResponse> => {
  const response = await GET<ProductsResponse>(
    `${END_POINTS.PRODUCTS}`,
    createInit(),
  );

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

export type {
  Product,
  ProductsResponse,
  ProductVariantType,
  VariantImage,
  VariantTag,
};
