/** @type {import('next').NextConfig} */
const nextConfig = {
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
