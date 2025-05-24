/* global require, process, module */

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    VERSION: process.env.npm_package_version,
  },
  output: 'standalone',
  basePath: '',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.builder.io',
        pathname: '**',
      },
    ],
  },
  webpack: config => {
    config.resolve.alias.canvas = false;

    // Suppress console output in production builds to reduce log size
    if (process.env.NODE_ENV === 'production') {
      config.plugins.push(
        new (require('webpack').DefinePlugin)({
          'process.env.SUPPRESS_LOGS': JSON.stringify(true),
        }),
      );
    }

    return config;
  },
  // Domain-based routing for webstacks.dev
  async rewrites() {
    return [
      // Route root path to /dev
      {
        source: '/',
        destination: '/dev',
      },
    ];
  },
};

module.exports = nextConfig;
