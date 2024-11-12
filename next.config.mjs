/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        pathname: "/images/**",
      },
      {
        protocol: "https",
        hostname: "github.com",
      },
    ],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  async rewrites() {
    return [
      // {
      //   source: "/:path*", // api 요청
      //   destination: `${API_SERVER}/:path*`, // 프록시할 서버의 주소
      // },
    ];
  },
};

export default nextConfig;
