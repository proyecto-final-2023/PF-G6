/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  remotePatterns: [
    {
      protocol: "https",
      hostname: "example.com",
      port: "",
      pathname: "/account123/**",
    },
  ],
};

module.exports = nextConfig;
