/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    removeConsole: process.env.NODE_ENV === "development",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.steamstatic.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  serverExternalPackages: ["mongoose"],
};

export default nextConfig;
