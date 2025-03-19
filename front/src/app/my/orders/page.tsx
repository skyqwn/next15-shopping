import { Suspense } from "react";

import MyOrdersTable from "@/components/orders/my-orders-table";
import { ServerFetchBoundary } from "@/components/prefetch-boundary";
import { getMyProfileQueryOptions } from "@/hooks/queries/userInfo/useUserInfo";
import { Skeleton } from "@/components/ui/skeleton";

const Orders = () => {
  const serverFetchOptions = [getMyProfileQueryOptions()];

  return (
    <>
      <Suspense
        fallback={
          <div className="space-y-4">
            <h2 className="text-xl font-bold">내 주문 내역</h2>
            <div className="space-y-2">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-20 w-full" />
              ))}
            </div>
          </div>
        }
      >
        <ServerFetchBoundary fetchOptions={serverFetchOptions}>
          <MyOrdersTable />
        </ServerFetchBoundary>
      </Suspense>
    </>
  );
};

export default Orders;
