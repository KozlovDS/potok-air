import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "mdv-aircond.ru",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
