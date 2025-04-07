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
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    domains: ['localhost', 'pursuit-of-factfulness-blog.vercel.app'],
  },
  experimental: {
    webpackBuildWorker: true,
    parallelServerCompiles: true,
    parallelServerBuildTraces: true,
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
  basePath: '',
  assetPrefix: '',
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
