import ProductDetail from "@/components/product/product-detail";
import { getVariantDetail } from "@/hooks/queries/product-variant/useVariantDetailQuery";
import { getVariants } from "@/hooks/queries/product-variant/useVariantQuery";
import { ProductVariantType } from "@/types";
import { create } from "lodash";

export const revalidate = 3600;

const mockVariants = {
  result: [
    {
      id: 91,
      name: "Variant 1",
      color: "#00000",
    },
    {
      id: 90,
      name: "Variant 2",
      color: "#00000",
    },
    {
      id: 88,
      name: "Variant 3",
      color: "#00000",
    },
  ],
};

export async function generateStaticParams() {
  try {
    const variants = await getVariants();
    if (variants) {
      return variants.result.map((variant: ProductVariantType) => ({
        id: variant.id.toString(),
      }));
    }
  } catch (error) {
    console.error("빌드 시 variants를 가져오지 못했습니다:", error);
  }
  return mockVariants.result.map((variant) => ({
    id: variant.id.toString(),
  }));
}
interface PageProps {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

const ShopDetail = async ({ params }: PageProps) => {
  const resolvedParams = await params;
  const productId = parseInt(resolvedParams.id, 10);
  let productVariant;
  try {
    const productVariantResponse = await getVariantDetail(productId);
    productVariant = productVariantResponse.result;
  } catch (error) {
    console.error("제품 상세 데이터를 가져오지 못했습니다:", error);
    return <div>제품을 찾을 수 없습니다.</div>;
  }

  if (!productVariant) {
    return <div>제품을 찾을 수 없습니다.</div>;
  }
  return (
    <>
      <ProductDetail productVariant={productVariant} />
    </>
  );
};

export default ShopDetail;
