import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  images: {
    domains: ["images.unsplash.com", "ph.loremipsums.org", "localhost"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ph.loremipsums.org",
        port: "",
        pathname: "/**",
      }
    ],
  },
};

export default nextConfig;
