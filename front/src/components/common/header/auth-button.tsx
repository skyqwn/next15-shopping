"use client";

import useAuth from "@/hooks/queries/useAuth";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useMyProfileQuery } from "@/hooks/queries/userInfo/useUserInfo";

const AuthButton = () => {
  const { data: userInfo } = useMyProfileQuery();
  const { logoutMutation } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return "Loading...";
  }

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  if (typeof userInfo === "undefined") {
    return null;
  }

  return userInfo?.isLoggedIn ? (
    <div className="flex items-center gap-4">
      <Link href="/my" className="cursor-pointer">
        <span>마이페이지</span>
      </Link>
      {userInfo.data.role === "ADMIN" && (
        <Link href="/admin" className="cursor-pointer">
          <span>어드민 페이지</span>
        </Link>
      )}
      <button type="button" onClick={handleLogout} className="cursor-pointer">
        로그아웃
      </button>
      {userInfo.data.imageUri ? (
        <Image
          width={32}
          height={32}
          src={userInfo.data?.imageUri}
          className="size-8 rounded-full"
          alt="avatar"
        />
      ) : (
        <div className="size-8 rounded-full bg-slate-500" />
      )}
    </div>
  ) : (
    <Link href="/auth/login" className="cursor-pointer">
      <span>로그인</span>
    </Link>
  );
};
export default AuthButton;
