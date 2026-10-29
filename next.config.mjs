/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Warning instead of build failure for ESLint during production builds
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
