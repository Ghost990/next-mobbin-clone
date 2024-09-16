/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/browse/ios/apps',
        permanent: true,
      },
    ];
  },
  images: {
    domains: ['www.seosamba.com', 'picsum.photos'], // Add external image domains here
  },
};

module.exports = nextConfig;
