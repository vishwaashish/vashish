/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa')

const nextConfig = {
  dest: 'public',
  devIndicators: {
    autoPrerender: false,
  },
  // pwa: {
  //   disabled: process.env.NODE_ENV === 'development',
  // },
  // compiler: {
  //   removeConsole: process.env.NODE_ENV === 'development',
  // },
  // logging: false,
}

module.exports = nextConfig
// module.exports = withPWA(nextConfig)
