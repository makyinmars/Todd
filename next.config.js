/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["static.wikia.nocookie.net", "static1.srcdn.com"]
  }
}

module.exports = nextConfig
