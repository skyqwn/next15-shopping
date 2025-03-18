import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  images: {
    domains: ["www.cicardi.store"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "next15-project.s3.ap-northeast-2.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "nest-shopping.s3.ap-northeast-2.amazonaws.com",
      },
      {
        protocol: "http",
        hostname: "k.kakaocdn.net",
        pathname: "/dn/**",
      },
      {
        protocol: "https",
        hostname: "loremflickr.com*",
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
