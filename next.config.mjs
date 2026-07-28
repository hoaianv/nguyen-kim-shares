/** @type {import('next').NextConfig} */
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();
const nextConfig = {
  poweredByHeader: false,

  reactStrictMode: false,
  swcMinify: true,
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
  images: {
    formats: ["image/webp"],
    unoptimized: true,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24,
    remotePatterns: [
      {
        protocol: "http",
        hostname: "192.168.245.190",
        port: "8020",
        pathname: "/uploads/**",
      },
      {
        protocol: "http",
        hostname: "192.168.245.174",
        port: "8020",
        pathname: "/uploads/**",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "8000",
        pathname: "/uploads/**",
      },

      {
        protocol: "https",
        hostname: "media.vitinhnguyenkim.com.vn",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "media.vitinhnguyenkim.vn",
        pathname: "/uploads/**",
      },
    ],
  },

  async headers() {
    return [
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow",
          },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
