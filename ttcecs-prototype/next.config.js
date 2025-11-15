/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
    // Don't use unoptimized - let Netlify handle it with the plugin
  },
  // Remove trailingSlash - not needed with Netlify plugin
}

module.exports = nextConfig
