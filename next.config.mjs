/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    removeConsole: process.env.NODE_ENV === "development",
  },
  serverExternalPackages: ["mongoose"],
};

export default nextConfig;
