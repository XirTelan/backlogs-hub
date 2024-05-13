/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    removeConsole: !process.env.NODE_ENV === "development",
  },
  experimental: {
    esmExternals: "loose",
    serverComponentsExternalPackages: ["mongoose"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "howlongtobeat.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
