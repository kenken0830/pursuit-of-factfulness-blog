let userConfig = undefined
try {
  userConfig = await import('./v0-user-next.config')
} catch (e) {
  // ignore error
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  distDir: '.next',
  eslint: {
    ignoreDuringBuilds: false,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    unoptimized: true,
    domains: ['localhost'],
  },
  experimental: {
    webpackBuildWorker: false,
  },
  generateBuildId: () => {
    return `build-${new Date().getTime()}`
  },
  redirects: async () => {
    return [
      {
        source: '/blog/nvidia-gtc-2025-themes',
        destination: '/blog/nvidia-gtc-2025-report',
        permanent: true,
      },
    ]
  },
  env: {
    VERCEL_URL: process.env.VERCEL_URL || 'http://localhost:3000',
  },
  basePath: process.env.NODE_ENV === 'production' ? '' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? 'https://pursuit-of-factfulness-blog.vercel.app' : '',
}

mergeConfig(nextConfig, userConfig)

function mergeConfig(nextConfig, userConfig) {
  if (!userConfig) {
    return
  }

  for (const key in userConfig) {
    if (
      typeof nextConfig[key] === 'object' &&
      !Array.isArray(nextConfig[key])
    ) {
      nextConfig[key] = {
        ...nextConfig[key],
        ...userConfig[key],
      }
    } else {
      nextConfig[key] = userConfig[key]
    }
  }
}

export default nextConfig
