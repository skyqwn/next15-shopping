import { ApiResponse, createInit, GET } from "@/api/httpMethod";
import { END_POINTS, queryKeys } from "@/constants";
import {
  useSuspenseQuery,
  UseSuspenseQueryOptions,
} from "@tanstack/react-query";

interface VariantImage {
  id: number;
  url: string;
  size: number;
  fileName: string;
  order: number;
}

export interface ProductVariant {
  id: number;
  color: string;
  productType: string;
  productId: number;
  createdAt: string;
  updatedAt: string;
  variantImages: VariantImage[];
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

export const getProductDetail = async (
  productId: number,
): Promise<ApiResponse<Product>> => {
  const data = await GET<Product>(
    END_POINTS.PRODUCT_DETAIL(productId),
    createInit(),
  );

  return data;
};

export const productDetailQueryOptions = (
  productId: number,
): UseSuspenseQueryOptions<ApiResponse<Product>> => ({
  queryKey: [queryKeys.PRODUCT_DETAIL, productId],
  queryFn: async () => await getProductDetail(productId),
});

export function useProductDetailQuery(productId: number) {
  return useSuspenseQuery(productDetailQueryOptions(productId));
}
