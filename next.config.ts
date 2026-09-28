import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 85],
    formats: ["image/avif", "image/webp"],
  },
  // Prima Sky briefly lived at /prima-sky; it is now the home page.
  async redirects() {
    return [
      { source: "/prima-sky", destination: "/", permanent: true },
      { source: "/gu/prima-sky", destination: "/gu", permanent: true },
    ];
  },
};

export default nextConfig;
