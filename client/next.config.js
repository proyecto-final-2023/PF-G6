// @type {import('next').NextConfig} //

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [{
      protocol: 'https',
      hostname: 'graph.facebook.com'
      
    }],
    
  }
};

module.exports = nextConfig;
