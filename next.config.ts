import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "oplust-content-0370aace.s3.ap-northeast-2.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "cdn.openthetaste.cloud",
      },
    ],
  },
};

export default nextConfig;
