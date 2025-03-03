import { ServerFetchBoundary } from "@/components/prefetch-boundary";
import ProductForm from "@/components/product/add-product-form";
import ProductCardFormSkeleton from "@/components/product/product-card-form-skeleton";
import { getMyProfileQueryOptions } from "@/hooks/queries/userInfo/useUserInfo";
import React, { Suspense } from "react";

const AddProduct = () => {
  const serverFetchOptions = [getMyProfileQueryOptions()];
  return (
    <>
      <Suspense fallback={<ProductCardFormSkeleton />}>
        <ServerFetchBoundary fetchOptions={serverFetchOptions}>
          <ProductForm />
        </ServerFetchBoundary>
      </Suspense>
    </>
  );
};

export default AddProduct;
