/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  reactStrictMode: true,
  poweredByHeader: false,
  swcMinify: true,
  images: {
    formats: ["image/avif", "image/webp"],
    domains: [],
  },
  experimental: {
    // ⚠️ убрали, чтобы Next не искал 'critters'
    // optimizeCss: true,
    optimizePackageImports: ["lucide-react"],
  },
});
