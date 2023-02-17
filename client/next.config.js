// @type {import('next').NextConfig} //

const nextConfig = {
  reactStrictMode: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "graph.facebook.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },

  i18n: {
    locales: ["en-US", "es-ES"],
    defaultLocale: "en-US",
  },
};

module.exports = nextConfig;
