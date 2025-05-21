/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: [
      'uploadthing.com',
      'utfs.io',
      'vimeo.com',
      'i.vimeocdn.com',
    ],
    unoptimized: true,
  },
}

module.exports = nextConfig 