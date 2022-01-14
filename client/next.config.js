/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "static3.srcdn.com",
      "static2.srcdn.com",
      "static0.srcdn.com",
      "static1.srcdn.com",
    ],
  },
};

module.exports = nextConfig;
