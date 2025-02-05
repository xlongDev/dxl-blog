import { allPosts } from "contentlayer/generated";
import { compareDesc } from "date-fns";
import { Suspense } from "react";
import dynamicImport from "next/dynamic";
import FadeIn from "@/components/FadeIn";

// 使用 dynamic 导入所有组件，优化加载策略
const BlogStats = dynamicImport(() => import("@/components/BlogStats"), {
  ssr: true,
  loading: () => (
    <div className="h-12 animate-pulse bg-gray-200 dark:bg-gray-700 rounded-lg" />
  ),
});

const CategoryFilter = dynamicImport(
  () => import("@/components/CategoryFilter"),
  {
    ssr: true,
    loading: () => (
      <div className="h-12 animate-pulse bg-gray-200 dark:bg-gray-700 rounded-lg" />
    ),
  }
);

const ArticleTree = dynamicImport(() => import("@/components/ArticleTree"), {
  ssr: true,
  loading: () => (
    <div className="h-12 animate-pulse bg-gray-200 dark:bg-gray-700 rounded-lg" />
  ),
});

const TimelineView = dynamicImport(() => import("@/components/TimelineView"), {
  ssr: true,
  loading: () => (
    <div className="h-12 animate-pulse bg-gray-200 dark:bg-gray-700 rounded-lg" />
  ),
});

// 优化预加载策略
const preloadComponents = () => {
  if (typeof window === "undefined") return;

  // 使用 Promise.all 立即预加载所有组件
  Promise.all([
    import("@/components/BlogStats"),
    import("@/components/CategoryFilter"),
    import("@/components/ArticleTree"),
    import("@/components/TimelineView"),
  ]).catch(console.error);
};

export const dynamic = "force-dynamic";

export default function BlogPage() {
  const posts = allPosts.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date))
  );

  // 在组件挂载时立即预加载
  preloadComponents();

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
