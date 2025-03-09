/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    // Environment variables used in server without NEXT_PUBLIC_ prefix
  },
  experimental: {
    staleTimes: {
      dynamic: 30,
      static: 180,
    },
  },
};

export default nextConfig;
