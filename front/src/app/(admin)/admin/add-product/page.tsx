import { ServerFetchBoundary } from "@/components/prefetch-boundary";
import ProductForm from "@/components/product/add-product-form";
import { getMyProfileQueryOptions } from "@/hooks/queries/userInfo/useUserInfo";
import React, { Suspense } from "react";

const AddProduct = () => {
  const serverFetchOptions = [getMyProfileQueryOptions()];
  return (
    <>
      <Suspense fallback={"loading"}>
        <ServerFetchBoundary fetchOptions={serverFetchOptions}>
          <ProductForm />
        </ServerFetchBoundary>
      </Suspense>
    </>
  );
};

export default AddProduct;
