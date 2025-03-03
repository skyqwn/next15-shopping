import BannerList from "@/components/banner/banner-list";
import BannerListSkeleton from "@/components/banner/banner-skeleton";
import { ServerFetchBoundary } from "@/components/prefetch-boundary";
import { getBannersQueryOptions } from "@/hooks/queries/banners/useBannersQuery";
import React, { Suspense } from "react";

const BannersPage = () => {
  const serverFetchOptions = [getBannersQueryOptions()];
  return (
    <>
      <Suspense fallback={<BannerListSkeleton />}>
        <ServerFetchBoundary fetchOptions={serverFetchOptions}>
          <BannerList />
        </ServerFetchBoundary>
      </Suspense>
    </>
  );
};

export default BannersPage;
