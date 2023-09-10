/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  module: {
    rules: [
      {
        test: /\.tsx$/,
        use: 'file-loader',
      },
    ],
  },
}

module.exports = nextConfig
