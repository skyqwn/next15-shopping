// app/dashboard/page.tsx
"use client";

import axiosInstance from "@/api/axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

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
    <div className="">
      <h1>대시보드</h1>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <p>쿠키 확인: {document.cookie}</p>
    </div>
  );
}
