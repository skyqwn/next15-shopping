import { createInit, GET } from "@/api/httpMethod";
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

export interface ProductDetailResponse {
  success: boolean;
  result: Product;
  message: string | null;
}

const getProductDetail = async (
  productId: number,
): Promise<ProductDetailResponse | undefined> => {
  const data = await GET<ProductDetailResponse>(
    END_POINTS.PRODUCT_DETAIL(productId),
    createInit(),
  );

  return data;
};

export const productDetilaQueryOptions = (
  productId: number,
): UseSuspenseQueryOptions<ProductDetailResponse | undefined> => ({
  queryKey: [queryKeys.PRODUCT_DETAIL, productId],
  queryFn: async () => await getProductDetail(productId),
});

export function useProductDetailQuery(productId: number) {
  return useSuspenseQuery(productDetilaQueryOptions(productId));
}
