import { withContentlayer } from "next-contentlayer";

/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: ".next",
  generateBuildId: () => "build",
  generateEtags: false,
  webpack: (config, { isServer }) => {
    // 处理 punycode 警告
    config.resolve = {
      ...config.resolve,
      fallback: {
        ...config.resolve?.fallback,
        punycode: false,
      },
    };

    // 优化文件监视配置
    config.watchOptions = {
      ...config.watchOptions,
      ignored: ["**/.git/**", "**/node_modules/**", "**/.next/**"],
      aggregateTimeout: 300,
      poll: 1000,
    };
    // Monaco Editor Webpack 配置
    config.resolve.alias = {
      ...config.resolve.alias,
      // 优化 Monaco Editor 的加载，只加载核心模块
      "monaco-editor": "monaco-editor/esm/vs/editor/editor.api",
    };

    // 优化 Monaco Editor 的 chunk 分割
    config.optimization = {
      ...config.optimization,
      splitChunks: {
        ...config.optimization?.splitChunks,
        cacheGroups: {
          ...config.optimization?.splitChunks?.cacheGroups,
          monacoEditor: {
            test: /[\\]node_modules[\\]monaco-editor[\\]/,
            name: "monaco-editor",
            chunks: "async",
            priority: 10,
          },
        },
      },
    };

    // 添加 Monaco Editor 的语言模块支持
    config.module = {
      ...config.module,
      rules: [
        ...config.module.rules,
        {
          test: /\.ttf$/,
          type: "asset/resource",
        },
      ],
    };

    return config;
  },
  staticPageGenerationTimeout: 300, // 增加静态页面生成超时时间以确保所有页面都能正确生成
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    formats: ["image/webp"],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  experimental: {
    largePageDataBytes: 128 * 1000000,
    optimizeCss: true,
    optimizePackageImports: [
      "@heroicons/react",
      "lucide-react",
      "@headlessui/react",
      "framer-motion",
    ],
    scrollRestoration: true,
  },
  swcMinify: true,
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,

  pageExtensions: ["js", "jsx", "ts", "tsx", "mdx"],
  onDemandEntries: {
    maxInactiveAge: 120 * 60 * 1000, // 增加页面缓存时间
    pagesBufferLength: 10, // 增加页面缓存数量
  },
};

export default withContentlayer(nextConfig);
