import { withContentlayer } from "next-contentlayer";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  experimental: {
    serverComponentsExternalPackages: ["@contentlayer/core"],
  },
};

export default withContentlayer(nextConfig);
