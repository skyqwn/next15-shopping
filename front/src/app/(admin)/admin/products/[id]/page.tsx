import { Suspense } from "react";
import { ServerFetchBoundary } from "@/components/prefetch-boundary";
import { getMyProfileQueryOptions } from "@/hooks/queries/userInfo/useUserInfo";

const ProductDetailPage = () => {
  const serverFetchOptions = [getMyProfileQueryOptions()];
  return (
    <Suspense>
      <ServerFetchBoundary fetchOptions={serverFetchOptions}>
        <div></div>
      </ServerFetchBoundary>
    </Suspense>
  );
};

export default ProductDetailPage;
