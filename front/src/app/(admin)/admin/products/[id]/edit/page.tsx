import React, { Suspense } from "react";
import { ServerFetchBoundary } from "@/components/prefetch-boundary";
import EditProductForm from "@/components/product/edit-product-form";
import { productDetilaQueryOptions } from "@/hooks/queries/products/useProductDetailQuery";
import { getMyProfileQueryOptions } from "@/hooks/queries/userInfo/useUserInfo";

interface PageProps {
  params: {
    id: string;
  };
}

const EditProductPage = ({ params }: PageProps) => {
  const serverFetchOptions = [
    productDetilaQueryOptions(parseInt(params.id, 10)),
    getMyProfileQueryOptions(),
  ];

  return (
    <Suspense>
      <ServerFetchBoundary fetchOptions={serverFetchOptions}>
        <EditProductForm />
      </ServerFetchBoundary>
    </Suspense>
  );
};

export default EditProductPage;
