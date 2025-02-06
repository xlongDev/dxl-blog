"use client";

import { Suspense, lazy, useState } from "react";
import { Post } from "contentlayer/generated";
import { usePaginatedPosts } from "@/hooks/usePaginatedPosts";

// 懒加载组件
const BlogStats = lazy(() => import("@/components/BlogStats"));
const Categories = lazy(() => import("@/components/Categories"));
const BlogFilter = lazy(() => import("@/components/BlogFilter"));
const ArticleTree = lazy(() => import("@/components/ArticleTree"));
const TimelineView = lazy(() => import("@/components/TimelineView"));

interface BlogPageClientProps {
  posts: Post[];
}

const LoadingSpinner = () => (
  <div className="flex justify-center items-center p-4">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
  </div>
);

export default function BlogPageClient({ posts }: BlogPageClientProps) {
  const [isLoading, setIsLoading] = useState(false);
  const {
    paginatedPosts,
    currentPage,
    totalPages,
    goToNextPage,
    goToPreviousPage,
    goToPage,
  } = usePaginatedPosts({ posts });

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8" id="post-list-container">
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg shadow p-4 border border-gray-200/50 dark:border-gray-700/50">
            <Suspense fallback={<LoadingSpinner />}>
              <BlogStats posts={posts} />
            </Suspense>
          </div>
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg shadow p-4 border border-gray-200/50 dark:border-gray-700/50">
            <Suspense fallback={<LoadingSpinner />}>
              <Categories posts={posts} />
            </Suspense>
          </div>
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg shadow p-4 border border-gray-200/50 dark:border-gray-700/50">
            <Suspense fallback={<LoadingSpinner />}>
              <BlogFilter posts={paginatedPosts} />
            </Suspense>
            <div className="mt-8 flex justify-center items-center space-x-4">
              <button
                onClick={goToPreviousPage}
                disabled={currentPage === 1 || isLoading}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50 hover:bg-blue-600 transition-colors"
              >
                上一页
              </button>
              <span className="text-sm">
                第 {currentPage} 页，共 {totalPages} 页
              </span>
              <button
                onClick={goToNextPage}
                disabled={currentPage === totalPages || isLoading}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50 hover:bg-blue-600 transition-colors"
              >
                下一页
              </button>
            </div>
            {isLoading && (
              <div className="mt-4 text-center text-gray-500">加载中...</div>
            )}
          </div>
        </div>
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg shadow p-4 border border-gray-200/50 dark:border-gray-700/50 sticky top-20">
            <Suspense fallback={<LoadingSpinner />}>
              <ArticleTree posts={posts} />
            </Suspense>
          </div>
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg shadow p-4 border border-gray-200/50 dark:border-gray-700/50">
            <Suspense fallback={<LoadingSpinner />}>
              <TimelineView posts={posts} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
