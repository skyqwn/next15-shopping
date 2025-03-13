import ProductDetail from "@/components/product/product-detail";
import { getVariantDetail } from "@/hooks/queries/product-variant/useVariantDetailQuery";
import { getVariants } from "@/hooks/queries/product-variant/useVariantQuery";

import { ProductVariantType } from "@/types";
import { getUserInfo } from "@/utils/check-amdin-role";

export const revalidate = 3600;

export async function generateStaticParams() {
  const variants = await getVariants();

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
  return (
    <>
      <ProductDetail productVariant={productVariant} />
    </>
  );
};

export default ShopDetail;
