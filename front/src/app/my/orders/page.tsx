import { Suspense } from "react";

import MyOrdersTable from "@/components/orders/my-orders-table";
import { ServerFetchBoundary } from "@/components/prefetch-boundary";
import { getMyProfileQueryOptions } from "@/hooks/queries/userInfo/useUserInfo";
import { getUserOrdersQueryOptions } from "@/hooks/queries/orders/useUserOrdersQuery";

const Orders = () => {
  const serverFetchOptions = [getMyProfileQueryOptions()];

  return (
    <>
      <Suspense fallback={"loading"}>
        <ServerFetchBoundary fetchOptions={serverFetchOptions}>
          <MyOrdersTable />
        </ServerFetchBoundary>
      </Suspense>
    </>
  );
};

export default Orders;
