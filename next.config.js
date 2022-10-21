import withNextBundleAnalyzer from 'next-bundle-analyzer';

/** @type {import('next').NextConfig} */
let nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    remotePatterns: [
      {
        hostname: '**.anilist.co',
      },
    ],
  },
};

const shouldAnalyzeBundles = process.env.ANALYZE === 'true';

export default withNextBundleAnalyzer({
  enabled: shouldAnalyzeBundles,
})(nextConfig);
