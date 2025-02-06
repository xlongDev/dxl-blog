"use client";

import { useState } from "react";
import { Post } from "contentlayer/generated";
import FadeIn from "@/components/FadeIn";
import BlogFilter from "@/components/BlogFilter";
import BlogStats from "@/components/BlogStats";
import ArticleTree from "@/components/ArticleTree";
import TimelineView from "@/components/TimelineView";
import CategoryFilter from "@/components/CategoryFilter";
import { usePaginatedPosts } from "@/hooks/usePaginatedPosts";
import Categories from "@/components/Categories";

interface BlogPageClientProps {
  posts: Post[];
}

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
          <FadeIn>
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg shadow p-4 border border-gray-200/50 dark:border-gray-700/50">
              <BlogStats posts={posts} />
            </div>
          </FadeIn>
          <FadeIn>
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg shadow p-4 border border-gray-200/50 dark:border-gray-700/50">
              <Categories posts={posts} />
            </div>
          </FadeIn>
          <FadeIn>
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg shadow p-4 border border-gray-200/50 dark:border-gray-700/50">
              <BlogFilter posts={paginatedPosts} />
              {/* 分页控制 */}
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
              {/* 加载状态提示 */}
              {isLoading && (
                <div className="mt-4 text-center text-gray-500">加载中...</div>
              )}
            </div>
          </FadeIn>
        </div>
        <div className="lg:col-span-4 space-y-8">
          <FadeIn>
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg shadow p-4 border border-gray-200/50 dark:border-gray-700/50 sticky top-20">
              <ArticleTree posts={posts} />
            </div>
          </FadeIn>
          <FadeIn>
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg shadow p-4 border border-gray-200/50 dark:border-gray-700/50">
              <TimelineView posts={posts} />
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}
