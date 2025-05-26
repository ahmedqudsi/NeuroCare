import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
        port: '',
        pathname: '/**',
      }
    ],
  },
  i18n: {
    locales: ['en', 'te', 'hi', 'ur', 'ar', 'zh'],
    defaultLocale: 'en',
    localeDetection: false, // Recommended to start with false for explicit path-based routing
  },
};

export default nextConfig;
