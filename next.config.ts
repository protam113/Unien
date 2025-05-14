import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  output: 'standalone',
  reactStrictMode: true,
  images: {
    domains: ['hcm03.vstorage.vngcloud.vn'],
  },
};

export default nextConfig;
