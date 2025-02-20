import { Suspense } from "react";

import { ServerFetchBoundary } from "@/components/prefetch-boundary";
import { getMyProfileQueryOptions } from "@/hooks/queries/userInfo/useUserInfo";
import AuthButton from "./auth-button";

export default function AuthButtonsWrapper() {
  return (
    <ServerFetchBoundary fetchOptions={getMyProfileQueryOptions()}>
      <Suspense fallback={<div>Loading...</div>}>
        <AuthButton />
      </Suspense>
    </ServerFetchBoundary>
  );
}
