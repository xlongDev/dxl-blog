import { allPosts } from "contentlayer/generated";
import { compareDesc } from "date-fns";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import FadeIn from "@/components/FadeIn";

// 使用 dynamic 导入所有组件，并设置 ssr: false 来减少服务端渲染的内容
const BlogStats = dynamic(() => import("@/components/BlogStats"), {
  ssr: false,
  loading: () => (
    <div className="h-12 animate-pulse bg-gray-200 dark:bg-gray-700 rounded-lg" />
  ),
});

const CategoryFilter = dynamic(() => import("@/components/CategoryFilter"), {
  ssr: false,
  loading: () => (
    <div className="h-12 animate-pulse bg-gray-200 dark:bg-gray-700 rounded-lg" />
  ),
});

const ArticleTree = dynamic(() => import("@/components/ArticleTree"), {
  ssr: false,
  loading: () => (
    <div className="h-12 animate-pulse bg-gray-200 dark:bg-gray-700 rounded-lg" />
  ),
});

const TimelineView = dynamic(() => import("@/components/TimelineView"), {
  ssr: false,
  loading: () => (
    <div className="h-12 animate-pulse bg-gray-200 dark:bg-gray-700 rounded-lg" />
  ),
});

// 优化预加载策略
const preloadComponents = () => {
  if (typeof window === "undefined") return;

  requestIdleCallback(() => {
    const components = [
      () => import("@/components/BlogStats"),
      () => import("@/components/CategoryFilter"),
      () => import("@/components/ArticleTree"),
      () => import("@/components/TimelineView"),
    ];

    components.forEach((importFn) => {
      importFn();
    });
  });
};

export default function BlogPage() {
  // 只在客户端进行文章排序
  const posts = allPosts.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date))
  );

  // 在客户端执行预加载
  if (typeof window !== "undefined") {
    preloadComponents();
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <FadeIn>
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            所有文章
          </h1>
        </div>
      </FadeIn>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 space-y-6">
          <Suspense
            fallback={
              <div className="h-12 animate-pulse bg-gray-200 dark:bg-gray-700 rounded-lg" />
            }
          >
            <FadeIn>
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg shadow p-4 border border-gray-200/50 dark:border-gray-700/50">
                <BlogStats posts={posts} />
              </div>
            </FadeIn>
          </Suspense>

          <Suspense
            fallback={
              <div className="h-12 animate-pulse bg-gray-200 dark:bg-gray-700 rounded-lg" />
            }
          >
            <FadeIn>
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg shadow p-4 border border-gray-200/50 dark:border-gray-700/50">
                <CategoryFilter posts={posts} />
              </div>
            </FadeIn>
          </Suspense>

          <Suspense
            fallback={
              <div className="h-12 animate-pulse bg-gray-200 dark:bg-gray-700 rounded-lg" />
            }
          >
            <FadeIn>
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg shadow p-4 border border-gray-200/50 dark:border-gray-700/50">
                <ArticleTree posts={posts} />
              </div>
            </FadeIn>
          </Suspense>

          <Suspense
            fallback={
              <div className="h-12 animate-pulse bg-gray-200 dark:bg-gray-700 rounded-lg" />
            }
          >
            <FadeIn>
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg shadow p-4 border border-gray-200/50 dark:border-gray-700/50">
                <TimelineView posts={posts} />
              </div>
            </FadeIn>
          </Suspense>
        </div>
      </div>
    </div>
  );
}
