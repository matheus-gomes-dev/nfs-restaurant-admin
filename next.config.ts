import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'natal-free-surf.s3.sa-east-1.amazonaws.com',
      },
    ],
  },
};

export default nextConfig;
