/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  // logging: false,
  //  pwa: {
  //   disabled: process.env.NODE_ENV === 'development',
  // },
})

const nextConfig = {
  // dest: 'public',
  // devIndicators: {
  //   autoPrerender: false,
  // },
  // swcMinify: true,
  transpilePackages: ['components', 'shared', 'shiki'],
  // pwa: {
  //   disabled: process.env.NODE_ENV === 'development',
  // },
  compiler: {
    // removeConsole: process.env.NODE_ENV === 'development',
  },
  // logging: false,
  typescript: {
    ignoreBuildErrors: true,
  },
}

// module.exports = nextConfig
module.exports =
  process.env.NODE_ENV === 'development' ? nextConfig : withPWA(nextConfig)
