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
    formats: ["image/avif"],
  },
};

export default nextConfig;
