import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn-media.sforum.vn'
      },
      // You can add more domains here as needed
    ],
  },
  /* config options here */
};

export default nextConfig;
