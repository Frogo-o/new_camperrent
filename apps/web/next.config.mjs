/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.camper-rent.bg",
        pathname: "/public/**",
      },
    ],
  },
  reactCompiler: true,
  output: "standalone",
};

export default nextConfig;