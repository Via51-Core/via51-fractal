/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "frame-ancestors 'self' http://localhost:3001 https://hub.via51.org http://localhost:3000",
          },
          {
            key: 'X-Frame-Options',
            value: 'ALLOW-FROM http://localhost:3001',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig