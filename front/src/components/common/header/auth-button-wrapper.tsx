import { Suspense } from "react";

import { ServerFetchBoundary } from "@/components/prefetch-boundary";
import { getMyProfileQueryOptions } from "@/hooks/queries/userInfo/useUserInfo";
import AuthButton from "./auth-button";

export default function AuthButtonsWrapper() {
  return (
    <ServerFetchBoundary fetchOptions={getMyProfileQueryOptions()}>
      <Suspense fallback={<div className="size-16 rounded-full" />}>
        <AuthButton />
      </Suspense>
    </ServerFetchBoundary>
  );
}
