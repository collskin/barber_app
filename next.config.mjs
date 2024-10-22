/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        missingSuspenseWithCSRBailout: false,
      },
      reactStrictMode: false,
      async headers() {
        return [
          {
            source: '/api/socket',
            headers: [
              {
                key: 'Cache-Control',
                value: 'no-store, no-cache, must-revalidate, proxy-revalidate',
              },
            ],
          },
        ];
      },
};
export default nextConfig;
