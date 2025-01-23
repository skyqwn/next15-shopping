import React, { Suspense } from "react";
import { ServerFetchBoundary } from "@/components/prefetch-boundary";
import EditProductForm from "@/components/product/edit-product-form";
import { productDetilaQueryOptions } from "@/hooks/queries/products/useProductDetailQuery";
import { getMyProfileQueryOptions } from "@/hooks/queries/userInfo/useUser";

const EditProductPage = async ({ params }: { params: { id: number } }) => {
  const serverFetchOptions = [
    productDetilaQueryOptions(params.id),
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
