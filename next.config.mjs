import { withContentlayer } from "next-contentlayer";

/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: ".next",
  generateBuildId: () => "build",
  generateEtags: true,
  // 启用增量静态再生成
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/blog/:path*",
          has: [
            {
              type: "query",
              key: "revalidate",
              value: "true",
            },
          ],
          destination: "/api/revalidate?path=/blog/:path*",
        },
      ],
    };
  },
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

    // 配置 Web Worker
    if (!isServer) {
      config.output.globalObject = "typeof self !== 'undefined' ? self : this";
      config.module.rules.unshift({
        test: /\.worker\.js$/,
        use: {
          loader: "worker-loader",
          options: {
            filename: "static/[hash].worker.js",
            publicPath: "/_next/",
            inline: "no-fallback",
          },
        },
      });
    }

    return config;
  },
};

export default withContentlayer(nextConfig);
