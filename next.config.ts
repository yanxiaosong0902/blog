import type { NextConfig } from 'next'
// import RemarkHTML from 'remark-html'

const nextConfig: NextConfig = {
  /* config options here */
  webpack: (config) => {
    config.module.rules.push({
      test: /\.md$/,
      use: [
        // {
        //   loader: 'html-loader',
        // },
        // {
        //   loader: 'remark-loader',
        //   options: {
        //     remarkOptions: {
        //       plugins: [RemarkHTML],
        //     },
        //   },
        // },
        'raw-loader'
      ],
    },)
    return config
  }
}

export default nextConfig
