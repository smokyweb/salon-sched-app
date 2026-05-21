/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    domains: ['images.unsplash.com', 'api.dicebear.com'],
  },
}
module.exports = nextConfig
