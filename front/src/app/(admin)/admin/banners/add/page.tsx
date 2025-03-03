// app/admin/banners/add/page.tsx
import { Suspense } from "react";
import { ServerFetchBoundary } from "@/components/prefetch-boundary";
import { getMyProfileQueryOptions } from "@/hooks/queries/userInfo/useUserInfo";
import BannerForm from "@/components/banner/banner-form";

const AddBanner = () => {
  const serverFetchOptions = [getMyProfileQueryOptions()];
  return (
    <>
      <Suspense fallback={"loading"}>
        {/* <Suspense fallback={<BannerFormSkeleton />}> */}
        <ServerFetchBoundary fetchOptions={serverFetchOptions}>
          <BannerForm />
        </ServerFetchBoundary>
      </Suspense>
    </>
  );
};

export default AddBanner;
