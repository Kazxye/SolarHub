import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.valorant-api.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "shared.cloudflare.steamstatic.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
