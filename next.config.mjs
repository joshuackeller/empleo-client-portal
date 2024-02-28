/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["empleo-images.s3.amazonaws.com"],
  },
};

export default nextConfig;
