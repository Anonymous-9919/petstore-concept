import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "petstorekw.com",
      },
      {
        protocol: "https",
        hostname: "www.petstorekuwait.com",
      },
      {
        protocol: "https",
        hostname: "s3.me-south-1.amazonaws.com",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },
  sassOptions: undefined,
};

export default nextConfig;
