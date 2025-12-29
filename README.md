# DXL Blog

一个使用 Next.js 构建的现代化技术博客平台，专注于前端技术分享和知识沉淀。

## 项目特点

- 🚀 基于 Next.js 14+ 构建，采用 App Router 架构
- 💎 使用 TypeScript 确保代码类型安全
- 🎨 集成 Tailwind CSS 实现现代化 UI 设计
- 📝 支持 MDX 格式博客写作
- 🔍 内置全文搜索功能
- 📊 文章数据统计和阅读进度追踪
- 🌙 支持深色模式
- 📱 响应式设计，完美适配各种设备

## 技术栈

- **框架**: Next.js 14+
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **内容**: MDX, Contentlayer
- **部署**: Vercel

## 目录结构

```
├── content/          # MDX 博客文章内容
├── public/           # 静态资源文件
├── src/
│   ├── app/         # Next.js 应用路由和页面
│   ├── components/  # React 组件
│   ├── hooks/       # 自定义 Hooks
│   ├── lib/         # 工具函数和配置
│   └── themes/      # 主题相关配置
├── types/           # TypeScript 类型定义
└── ...配置文件
```

## 本地开发

1. 克隆项目

```bash
git clone <repository-url>
cd dxl-blog
```

2. 安装依赖

```bash
pnpm install
```

3. 启动开发服务器

```bash
pnpm dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看博客。

## 写作指南

1. 在 `content` 目录下相应的分类文件夹中创建 `.mdx` 文件
2. 添加文章元数据

```mdx
---
title: "文章标题"
date: "2024-01-01"
description: "文章描述"
keywords: "关键词1, 关键词2"
author: "作者名"
image: "/images/hero/image.jpg"
tags: ["标签1", "标签2"]
category: "分类"
---

文章内容...
```

## 部署

本项目推荐使用 [Vercel](https://vercel.com) 进行部署：

1. 在 Vercel 上导入项目
2. 选择 Next.js 框架预设
3. 部署完成后即可通过分配的域名访问

## 特性开发

- 组件开发：在 `src/components` 下创建新组件
- 页面开发：在 `src/app` 下添加新路由和页面
- 样式开发：使用 Tailwind CSS 类名或在 `src/app/globals.css` 中添加全局样式

## 贡献指南

1. Fork 项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 提交 Pull Request

## 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情
