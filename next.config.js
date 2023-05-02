/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dadialstorage.blob.core.windows.net",
        port: ""
      }
    ]  
  }
}

module.exports = nextConfig
