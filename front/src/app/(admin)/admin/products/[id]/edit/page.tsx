import React, { Suspense } from "react";
import { ServerFetchBoundary } from "@/components/prefetch-boundary";
import EditProductForm from "@/components/product/edit-product-form";
import { productDetailQueryOptions } from "@/hooks/queries/products/useProductDetailQuery";
import { getMyProfileQueryOptions } from "@/hooks/queries/userInfo/useUserInfo";

// 타입 정의: params 자체가 Promise로 래핑되지 않음
interface PageProps {
  params: Promise<{ id: string }>; // params가 Promise로 반환됨
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>; // 선택적
}

const EditProductPage = async ({ params }: PageProps) => {
  const resolvedParams = await params; // Promise를 풀어서 사용
  const productId = parseInt(resolvedParams.id, 10);

  const serverFetchOptions = [
    productDetailQueryOptions(productId),
    getMyProfileQueryOptions(),
  ];

  return (
    <Suspense fallback={"loading..."}>
      <ServerFetchBoundary fetchOptions={serverFetchOptions}>
        <EditProductForm />
      </ServerFetchBoundary>
    </Suspense>
  );
};

export default EditProductPage;
