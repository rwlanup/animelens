import withNextBundleAnalyzer from 'next-bundle-analyzer';

/** @type {import('next').NextConfig} */
let nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  typescript: {
    ignoreBuildErrors: false,
  },
};

const shouldAnalyzeBundles = process.env.ANALYZE === 'true';

export default withNextBundleAnalyzer({
  enabled: shouldAnalyzeBundles,
})(nextConfig);
