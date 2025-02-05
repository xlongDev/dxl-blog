import { allPosts } from "contentlayer/generated";
import { compareDesc } from "date-fns";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import FadeIn from "@/components/FadeIn";
import InfiniteArticleList from "@/components/InfiniteArticleList";

// 优化动态导入策略，预加载关键组件
const BlogStats = dynamic(() => import("@/components/BlogStats"), {
  loading: () => (
    <div className="h-12 animate-pulse bg-gray-200 dark:bg-gray-700 rounded-lg" />
  ),
});

const CategoryFilter = dynamic(() => import("@/components/CategoryFilter"), {
  loading: () => (
    <div className="h-12 animate-pulse bg-gray-200 dark:bg-gray-700 rounded-lg" />
  ),
});

const ArticleTree = dynamic(() => import("@/components/ArticleTree"), {
  loading: () => (
    <div className="h-12 animate-pulse bg-gray-200 dark:bg-gray-700 rounded-lg" />
  ),
});

const TimelineView = dynamic(() => import("@/components/TimelineView"), {
  loading: () => (
    <div className="h-12 animate-pulse bg-gray-200 dark:bg-gray-700 rounded-lg" />
  ),
});

// 移除revalidate配置，改为按需更新

export default function BlogPage() {
  const posts = allPosts.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date))
  );

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

        </div>
        <div className="lg:col-span-4 space-y-6">
          <Suspense
            fallback={
              <div className="h-12 animate-pulse bg-gray-200 dark:bg-gray-700 rounded-lg" />
            }
          >
            <FadeIn>
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg shadow p-4 border border-gray-200/50 dark:border-gray-700/50 sticky top-20">
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
