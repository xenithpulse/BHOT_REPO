/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ['localhost'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'bhotaala.s3.amazonaws.com',
        pathname: '/**', // Adjust pathname as needed
      },
    ],
  },
}

module.exports = nextConfig;
