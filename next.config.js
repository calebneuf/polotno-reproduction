/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    turbo: {
      resolveAlias: {
        canvas: { browser: './empty.js' },
      },
    },
  },
}

module.exports = nextConfig

