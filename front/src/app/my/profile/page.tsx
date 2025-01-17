import { Suspense } from "react";

import ProfileForm from "@/components/my/profile/profile-form";
import { ServerFetchBoundary } from "@/components/prefetch-boundary";
import { getMyProfileQueryOptions } from "@/hooks/queries/userInfo/useUser";

const Profile = () => {
  const serverFetchOptions = [getMyProfileQueryOptions()];

  return (
    <>
      <Suspense fallback={"loading"}>
        <ServerFetchBoundary fetchOptions={serverFetchOptions}>
          <ProfileForm />
        </ServerFetchBoundary>
      </Suspense>
    </>
  );
};

export default Profile;
