import { Metadata } from "next";

import { getVariantDetail } from "@/hooks/queries/product-variant/useVariantDetailQuery";
import { getVariants } from "@/hooks/queries/product-variant/useVariantQuery";
import ProductDetail from "@/components/product/product-detail";
import { ProductVariantType } from "@/types";

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

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const productId = parseInt(resolvedParams.id, 10);

  let productVariant;
  try {
    const productVariantResponse = await getVariantDetail(productId);
    productVariant = productVariantResponse.result;
  } catch (error) {
    console.error("메타데이터 생성 중 오류:", error);
    return {
      title: "제품을 찾을 수 없습니다 | 시카디",
      description: "시카디에서 이쁜 옷들을 구매해보세요.",
    };
  }

  if (!productVariant) {
    return {
      title: "제품을 찾을 수 없습니다 | 시카디",
      description: "시카디에서 이쁜 옷들을 구매해보세요.",
    };
  }

  return {
    title: `${productVariant.product.title} | 시카디`,
    description:
      productVariant.product.description ||
      "시카디에서 이쁜 옷들을 구매해보세요.",
    openGraph: {
      title: `${productVariant.product.title} | 시카디`,
      description:
        productVariant.product.description ||
        "시카디에서 이쁜 옷들을 구매해보세요.",
      url: `/shop/${productId}`,
      images: [
        {
          url: productVariant.variantImages[0].url || "/cicardi-meta.png",
          width: 1200,
          height: 628,
          alt: productVariant.product.title,
          type: "image/png",
        },
      ],
      type: "website",
      siteName: "시카디 | cicadi",
      locale: "ko_KR",
    },
    twitter: {
      card: "summary_large_image",
      title: `${productVariant.product.title} | 시카디`,
      description:
        productVariant.product.description ||
        "시카디에서 이쁜 옷들을 구매해보세요.",
      images: [
        productVariant.variantImages[0].url ||
          "https://www.cicardi.store/cicardi-meta.png",
      ],
    },
  };
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
