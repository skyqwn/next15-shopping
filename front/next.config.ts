import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "next15-project.s3.ap-northeast-2.amazonaws.com",
      },
      {
        protocol: "http",
        hostname: "k.kakaocdn.net",
        pathname: "/dn/**",
      },
    ],
  },
};

export default nextConfig;
