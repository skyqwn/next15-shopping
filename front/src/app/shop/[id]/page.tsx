import { ApiResponse, createInit, GET } from "@/api/httpMethod";
import { ServerFetchBoundary } from "@/components/prefetch-boundary";
import ProductDetail from "@/components/product/product-detail";
import { END_POINTS } from "@/constants";
import {
  getVariantDetail,
  variantDetailQueryOptions,
} from "@/hooks/queries/product-variant/useVariantDetailQuery";
import { getVariants } from "@/hooks/queries/product-variant/useVariantQuery";
import {
  getProductDetail,
  ProductDetailResponse,
  productDetilaQueryOptions,
} from "@/hooks/queries/products/useProductDetailQuery";
import { ProductVariantType } from "@/types";
import { Suspense } from "react";

export const revalidate = 3600;

export async function generateStaticParams() {
  const variants = await getVariants();

  console.log("variants", variants);

  if (variants) {
    return variants.result.map((variant: ProductVariantType) => ({
      id: variant.id.toString(),
    }));
  }
  return [];
}
interface PageProps {
  params: {
    id: string;
  };
}

const ShopDetail = async ({ params }: PageProps) => {
  const productId = +params.id;
  const productVariantResponse = await getVariantDetail(productId);
  const productVariant = productVariantResponse.result;

  console.log("[id]", productVariant);

  return (
    <>
      <ProductDetail productVariant={productVariant} />
    </>
  );
};

export default ShopDetail;
