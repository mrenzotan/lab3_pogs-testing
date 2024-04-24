/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    DATABASE_URL: process.env.DATABASE_URL,
  },
  target: 'serverless',
  experimental: {
    serverless: true,
  },
};

export default nextConfig;
