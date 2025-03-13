import ProductDetail from "@/components/product/product-detail";
import { getVariantDetail } from "@/hooks/queries/product-variant/useVariantDetailQuery";
import { getVariants } from "@/hooks/queries/product-variant/useVariantQuery";
import { ProductVariantType } from "@/types";

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
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

const ShopDetail = async ({ params }: PageProps) => {
  const resolvedParams = await params;
  const productId = parseInt(resolvedParams.id, 10);
  const productVariantResponse = await getVariantDetail(productId);
  const productVariant = productVariantResponse.result;
  return (
    <>
      <ProductDetail productVariant={productVariant} />
    </>
  );
};

export default ShopDetail;
