import { ServerFetchBoundary } from "@/components/prefetch-boundary";
import ProductDetail from "@/components/product/product-detail";
import { productDetilaQueryOptions } from "@/hooks/queries/products/useProductDetailQuery";
import { Suspense } from "react";

const ShopDetail = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const productId = parseInt(id);
  return (
    <Suspense fallback={"loading"}>
      <ServerFetchBoundary fetchOptions={productDetilaQueryOptions(productId)}>
        <ProductDetail productId={productId} />
      </ServerFetchBoundary>
    </Suspense>
  );
};

export default ShopDetail;
