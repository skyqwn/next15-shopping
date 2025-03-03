import { ServerFetchBoundary } from "@/components/prefetch-boundary";
import ProductList from "@/components/product/product-list";
import ProductListSkeleton from "@/components/product/product-list-skeleton";
import { getProductsQueryOptions } from "@/hooks/queries/products/useProductsQuery";
import { getMyProfileQueryOptions } from "@/hooks/queries/userInfo/useUserInfo";
import { Suspense } from "react";

const Product = () => {
  const serverFetchOptions = [
    getMyProfileQueryOptions(),
    getProductsQueryOptions(),
  ];
  return (
    <>
      <Suspense fallback={<ProductListSkeleton />}>
        <ServerFetchBoundary fetchOptions={serverFetchOptions}>
          <ProductList />
        </ServerFetchBoundary>
      </Suspense>
    </>
  );
};

export default Product;
