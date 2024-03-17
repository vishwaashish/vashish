const withPWA = require('next-pwa')({
  dest: 'public',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  pwa:{
    disabled:  process.env.NODE_ENV === "development",
  }
}

module.exports = withPWA(nextConfig)
