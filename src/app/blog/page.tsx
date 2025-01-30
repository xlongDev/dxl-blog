import { allPosts } from "contentlayer/generated";
import { compareDesc } from "date-fns";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import FadeIn from "@/components/FadeIn";

const BlogStats = dynamic(() => import("@/components/BlogStats"), {
  ssr: false,
  loading: () => (
    <div className="h-96 animate-pulse bg-gray-200 dark:bg-gray-700 rounded-2xl" />
  ),
});

const CategoryFilter = dynamic(() => import("@/components/CategoryFilter"), {
  ssr: false,
  loading: () => (
    <div className="h-48 animate-pulse bg-gray-200 dark:bg-gray-700 rounded-2xl" />
  ),
});

const ArticleTree = dynamic(() => import("@/components/ArticleTree"), {
  ssr: false,
  loading: () => (
    <div className="h-96 animate-pulse bg-gray-200 dark:bg-gray-700 rounded-2xl" />
  ),
});

const TimelineView = dynamic(() => import("@/components/TimelineView"), {
  ssr: false,
  loading: () => (
    <div className="h-96 animate-pulse bg-gray-200 dark:bg-gray-700 rounded-2xl" />
  ),
});

// 预加载组件
const preloadComponents = () => {
  const components = [
    { import: () => import("@/components/BlogStats"), priority: true },
    { import: () => import("@/components/CategoryFilter"), priority: true },
    { import: () => import("@/components/ArticleTree"), priority: false },
    { import: () => import("@/components/TimelineView"), priority: false },
  ];

  // 使用 Promise.all 并行加载组件
  Promise.all(
    components.map(({ import: importFn, priority }) =>
      priority
        ? importFn()
        : new Promise((resolve) =>
            requestIdleCallback(() => {
              importFn().then(resolve);
            })
          )
    )
  );
};

export default function BlogPage() {
  const posts = allPosts.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date))
  );

  // 当页面加载完成后预加载组件
  if (typeof window !== "undefined") {
    preloadComponents();
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <FadeIn>
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            所有文章
          </h1>
        </div>
      </FadeIn>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          <Suspense
            fallback={
              <div className="h-96 animate-pulse bg-gray-200 dark:bg-gray-700 rounded-2xl" />
            }
          >
            <FadeIn>
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-gray-200/50 dark:border-gray-700/50 hover:shadow-xl transition-all duration-300">
                <BlogStats posts={posts} />
              </div>
            </FadeIn>
          </Suspense>
          <Suspense
            fallback={
              <div className="h-48 animate-pulse bg-gray-200 dark:bg-gray-700 rounded-2xl" />
            }
          >
            <FadeIn>
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-gray-200/50 dark:border-gray-700/50 hover:shadow-xl transition-all duration-300">
                <CategoryFilter posts={posts} />
              </div>
            </FadeIn>
          </Suspense>
        </div>
        <div className="lg:col-span-4 space-y-8">
          <Suspense
            fallback={
              <div className="h-96 animate-pulse bg-gray-200 dark:bg-gray-700 rounded-2xl" />
            }
          >
            <FadeIn>
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-gray-200/50 dark:border-gray-700/50 hover:shadow-xl transition-all duration-300">
                <ArticleTree posts={posts} />
              </div>
            </FadeIn>
          </Suspense>
          <Suspense
            fallback={
              <div className="h-96 animate-pulse bg-gray-200 dark:bg-gray-700 rounded-2xl" />
            }
          >
            <FadeIn>
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-gray-200/50 dark:border-gray-700/50 hover:shadow-xl transition-all duration-300">
                <TimelineView posts={posts} />
              </div>
            </FadeIn>
          </Suspense>
        </div>
      </div>
    </div>
  );
}
