"use client";

import axiosInstance from "@/api/axios";
import ConfirmModal from "@/components/common/confirmModal/confirmModal";
import { Button } from "@/components/ui/button";
import { useOverlay } from "@/hooks/common/useOverlay";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { handleClose, handleOpen, handleToggle, isOpen } = useOverlay();

  const handleKakaoSignout = () => {
    axiosInstance.delete(`/auth/signout`);
    router.push("/auth/register");
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axiosInstance.get("/auth/me");
        setUser(response.data);
        console.log("현재 로그인된 사용자:", response.data);
      } catch (error) {
        console.error("인증 에러:", error);
        router.push("/auth/login");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) return <div>로딩 중...</div>;
  if (!user) return <div>로그인이 필요합니다</div>;

  return (
    <div className="h-full">
      <h1>대시보드</h1>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <Button
        type="button"
        onClick={handleKakaoSignout}
        className={cn("my-2 w-full")}
      >
        {"로그아웃"}
      </Button>

      <Button type="button" onClick={handleOpen} className={cn("my-2 w-full")}>
        {"모달 열기"}
      </Button>

      <ConfirmModal
        isOpen={isOpen}
        handleClose={handleClose}
        handleConfirm={() => {}}
        description="COnfirm"
        title="Test Modal"
      />
    </div>
  );
}
