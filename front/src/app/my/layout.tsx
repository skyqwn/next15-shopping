import ProfileAsideMenu from "@/components/my/profile/profile-aside";
import React, { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex gap-10 p-6">
      <ProfileAsideMenu />
      <div className="flex-1">{children}</div>
    </div>
  );
};

export default Layout;
