import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  devServer: {
    host: "0.0.0.0", // 외부에서 접속할 수 있도록 설정
  },
};

export default nextConfig;
