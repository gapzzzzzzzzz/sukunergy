/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove appDir from experimental as it's now default in Next.js 14
  images: {
    domains: ['utfs.io', 'res.cloudinary.com', 'localhost'],
  },
  async rewrites() {
    return [
      {
        source: '/sitemap.xml',
        destination: '/api/sitemap',
      },
      {
        source: '/robots.txt',
        destination: '/api/robots',
      },
    ];
  },
  // Disable SWC completely for 32-bit compatibility
  swcMinify: false,
  experimental: {
    forceSwcTransforms: false,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
};

module.exports = nextConfig;
