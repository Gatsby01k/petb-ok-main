// next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({ enabled: process.env.ANALYZE === 'true' });

module.exports = withBundleAnalyzer({
  reactStrictMode: true,
  poweredByHeader: false,
  swcMinify: true,
  images: { formats: ["image/avif", "image/webp"], domains: [] },
  experimental: { optimizeCss: true, optimizePackageImports: ["lucide-react"] },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "bitcoinpetertodd.com" }],
        destination: "https://www.bitcoinpetertodd.com/:path*",
        permanent: true,
      },
    ];
  },
});
