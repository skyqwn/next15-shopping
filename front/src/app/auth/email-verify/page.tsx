"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const EmailVerify = () => {
  const searchParams = useSearchParams();
  const [verificationStatus, setVerificationStatus] = useState<
    "loading" | "success" | "error"
  >("loading");
  const [message, setMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    const verifyEmail = async () => {
      const token = searchParams.get("token");
      const email = searchParams.get("email");

      if (!token && !email) {
        setVerificationStatus("error");
        setMessage("잘못된 접근입니다.");
        return router.push("/auth/register");
      }

      try {
        const response = await fetch(
          `http://localhost:4000/api/mail/verify-email?token=${token}&email=${email}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          },
        );

        const data = await response.json();

        if (!response.ok) {
          const error = await response.json();
          throw error;
        }
        setVerificationStatus("success");
        setMessage(data.message);
        toast.success("이메일 인증이 완료되었습니다.");
      } catch (error: any) {
        setVerificationStatus("error");
        setMessage(error.message || "인증 중 오류가 발생했습니다.");
        toast.error(
          error.response?.data?.message || "인증 중 오류가 발생했습니다.",
        );
      }
    };

    verifyEmail();
  }, [searchParams]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        {verificationStatus === "loading" && (
          <div className="text-center">
            <h2 className="mb-4 text-2xl font-bold">이메일 인증 중...</h2>
            <div className="mx-auto h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
          </div>
        )}

        {verificationStatus === "success" && (
          <div className="text-center">
            <h2 className="mb-4 text-2xl font-bold text-green-600">
              인증 성공!
            </h2>
            <p className="mb-4 text-gray-600">{message}</p>
            <button
              onClick={() => (window.location.href = "/auth/login")}
              className="rounded bg-primary px-4 py-2 text-white hover:bg-primary/90"
            >
              로그인하러 가기
            </button>
          </div>
        )}

        {verificationStatus === "error" && (
          <div className="text-center">
            <h2 className="mb-4 text-2xl font-bold text-red-600">인증 실패</h2>
            <p className="mb-4 text-gray-600">{message}</p>
            <button
              onClick={() => window.location.reload()}
              className="rounded bg-primary px-4 py-2 text-white hover:bg-primary/90"
            >
              다시 시도
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmailVerify;
