/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
      };
    }
    return config;
  },
  async redirects() {
    return [
      {
        source: '/teams',
        destination: '/fellowship/teams',
        permanent: true,
      },
      {
        source: '/teams/:path*',
        destination: '/fellowship/teams/:path*',
        permanent: true,
      },
      {
        source: '/friends',
        destination: '/fellowship/friends',
        permanent: true,
      },
      {
        source: '/practice/together',
        destination: '/fellowship/practice',
        permanent: true,
      },
    ];
  },
}

module.exports = nextConfig
