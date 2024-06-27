/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'imgs.search.brave.com',
          port: '',
          pathname: '/**',
        },
        {
          protocol: 'https',
          hostname: 'files.edgestore.dev',
          port: '',
          pathname: '/**',
        }
      ],
    },
  };

export default nextConfig;
