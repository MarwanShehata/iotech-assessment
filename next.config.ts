import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Invalid src prop (https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80) on `next/image`, hostname "images.unsplash.com" is not configured under images in your `next.config.js`
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
