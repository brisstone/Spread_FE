/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    return config;
  }, 
  images: {
    remotePatterns: [{ protocol: "https", hostname: "s3.eu-west-3.amazonaws.com" }],
  },
};

module.exports = nextConfig;
