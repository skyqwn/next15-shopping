import EmailVerifyContent from "@/components/email/email-verify-content";
import { Suspense } from "react";

const EmailVerify = () => {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
          <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
            <div className="text-center">
              <h2 className="mb-4 text-2xl font-bold">이메일 인증 중...</h2>
              <div className="mx-auto h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
            </div>
          </div>
        </div>
      }
    >
      <EmailVerifyContent />
    </Suspense>
  );
};

export default EmailVerify;
