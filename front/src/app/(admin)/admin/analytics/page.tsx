import { Suspense } from "react";

import { ServerFetchBoundary } from "@/components/prefetch-boundary";
import { getOrderProductsQueryOptions } from "@/hooks/queries/orders/useOrderProductQuery";
import OrderProductsList from "@/components/orders/order-products-list";

const AnalyticsPage = () => {
  const serverFetchOptions = [getOrderProductsQueryOptions()];
  return (
    <>
      <Suspense fallback={"loading..."}>
        <ServerFetchBoundary fetchOptions={serverFetchOptions}>
          <OrderProductsList />
        </ServerFetchBoundary>
      </Suspense>
    </>
  );
};

export default AnalyticsPage;
