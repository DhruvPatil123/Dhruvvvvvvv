/** @type {import('next').NextConfig} */
const nextConfig = {
  // Use standalone only when explicitly requested (e.g. Docker), native serverless on Vercel
  output: process.env.BUILD_STANDALONE === 'true' ? 'standalone' : undefined,
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei', 'framer-motion', 'lucide-react'],
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: 'avatars.githubusercontent.com' },
      { protocol: 'https', hostname: 'github.com' },
      { protocol: 'https', hostname: 'assets.leetcode.com' },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack: (config) => {
    config.externals = [...(config.externals || []), { canvas: 'canvas' }];
    return config;
  },
};

module.exports = nextConfig;

