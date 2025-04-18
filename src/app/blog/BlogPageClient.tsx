"use client";

import { Suspense, lazy, useState, useEffect } from "react";
import { Post } from "contentlayer/generated";
import { usePaginatedPosts } from "@/hooks/usePaginatedPosts";
import { useThemeUtils } from "@/hooks/useThemeUtils";

// 懒加载组件
const BlogStats = lazy(() => import("@/components/BlogStats"));
const Categories = lazy(() => import("@/components/Categories"));
const MobileCategories = lazy(() => import("@/components/MobileCategories"));
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
  const [isMobile, setIsMobile] = useState(true);
  const { getThemeColor, theme } = useThemeUtils();
  const {
    paginatedPosts,
    currentPage,
    totalPages,
    goToNextPage,
    goToPreviousPage,
    goToPage,
  } = usePaginatedPosts({ posts, postsPerPage: isMobile ? 10 : 24 });

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  // 根据主题获取背景色和边框色
  const getBgClass = () => {
    const themeColors = {
      light: "bg-white/80 dark:bg-gray-800/80",
      dark: "bg-gray-800/80",
      green:
        "bg-green-50/80 dark:bg-green-900/20 hover:bg-green-50/90 dark:hover:bg-green-900/30",
      purple:
        "bg-purple-50/80 dark:bg-purple-900/20 hover:bg-purple-50/90 dark:hover:bg-purple-900/30",
      orange:
        "bg-orange-50/80 dark:bg-orange-900/20 hover:bg-orange-50/90 dark:hover:bg-orange-900/30",
      blue: "bg-blue-50/80 dark:bg-blue-900/20 hover:bg-blue-50/90 dark:hover:bg-blue-900/30",
      pink: "bg-pink-50/80 dark:bg-pink-900/20 hover:bg-pink-50/90 dark:hover:bg-pink-900/30",
      brown:
        "bg-amber-50/80 dark:bg-amber-900/20 hover:bg-amber-50/90 dark:hover:bg-amber-900/30",
    };

    return themeColors[theme as keyof typeof themeColors] || themeColors.light;
  };

  const getBorderClass = () => {
    const themeColors = {
      light: "border-gray-200/50 dark:border-gray-700/50",
      dark: "border-gray-700/50",
      green:
        "border-green-200/50 dark:border-green-700/50 hover:border-green-300/70 dark:hover:border-green-600/70",
      purple:
        "border-purple-200/50 dark:border-purple-700/50 hover:border-purple-300/70 dark:hover:border-purple-600/70",
      orange:
        "border-orange-200/50 dark:border-orange-700/50 hover:border-orange-300/70 dark:hover:border-orange-600/70",
      blue: "border-blue-200/50 dark:border-blue-700/50 hover:border-blue-300/70 dark:hover:border-blue-600/70",
      pink: "border-pink-200/50 dark:border-pink-700/50 hover:border-pink-300/70 dark:hover:border-pink-600/70",
      brown:
        "border-amber-200/50 dark:border-amber-700/50 hover:border-amber-300/70 dark:hover:border-amber-600/70",
    };

    return themeColors[theme as keyof typeof themeColors] || themeColors.light;
  };

  const getButtonClass = () => {
    const themeColors = {
      light: "bg-blue-500 hover:bg-blue-600 shadow hover:shadow-md",
      dark: "bg-blue-500 hover:bg-blue-600 shadow hover:shadow-md",
      green: "bg-green-500 hover:bg-green-600 shadow hover:shadow-md",
      purple: "bg-purple-500 hover:bg-purple-600 shadow hover:shadow-md",
      orange: "bg-orange-500 hover:bg-orange-600 shadow hover:shadow-md",
      blue: "bg-blue-500 hover:bg-blue-600 shadow hover:shadow-md",
      pink: "bg-pink-500 hover:bg-pink-600 shadow hover:shadow-md",
      brown: "bg-amber-500 hover:bg-amber-600 shadow hover:shadow-md",
    };

    return themeColors[theme as keyof typeof themeColors] || themeColors.light;
  };

  const bgClass = getBgClass();
  const borderClass = getBorderClass();
  const buttonClass = getButtonClass();

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-background text-foreground">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8" id="post-list-container">
          {!isMobile && (
            <div
              className={`${bgClass} backdrop-blur-sm rounded-lg shadow p-4 border ${borderClass}`}
            >
              <Suspense fallback={<LoadingSpinner />}>
                <BlogStats posts={posts} />
              </Suspense>
            </div>
          )}
          {isMobile && (
            <div
              className={`${bgClass} backdrop-blur-sm rounded-lg shadow p-4 border ${borderClass} space-y-4 w-full relative z-20`}
            >
              <Suspense fallback={<LoadingSpinner />}>
                <MobileCategories posts={posts} />
              </Suspense>
            </div>
          )}
          <div
            className={`${bgClass} backdrop-blur-sm rounded-lg shadow p-4 border ${borderClass}`}
          >
            <Suspense fallback={<LoadingSpinner />}>
              <BlogFilter posts={paginatedPosts} />
            </Suspense>
            <div className="mt-8 flex justify-center items-center space-x-4">
              <button
                onClick={goToPreviousPage}
                disabled={currentPage === 1 || isLoading}
                className={`px-4 py-2 ${buttonClass} text-white rounded-lg disabled:opacity-50 transition-colors`}
              >
                上一页
              </button>
              <span className="text-sm">
                第 {currentPage} 页，共 {totalPages} 页
              </span>
              <button
                onClick={goToNextPage}
                disabled={currentPage === totalPages || isLoading}
                className={`px-4 py-2 ${buttonClass} text-white rounded-lg disabled:opacity-50 transition-colors`}
              >
                下一页
              </button>
            </div>
            {isLoading && (
              <div className="mt-4 text-center text-gray-500">加载中...</div>
            )}
          </div>
        </div>
        {!isMobile && (
          <div className="lg:col-span-4 space-y-8">
            <div
              className={`${bgClass} backdrop-blur-sm rounded-lg shadow p-4 border ${borderClass}`}
            >
              <Suspense fallback={<LoadingSpinner />}>
                <ArticleTree posts={posts} />
              </Suspense>
            </div>
            <div
              className={`${bgClass} backdrop-blur-sm rounded-lg shadow p-4 border ${borderClass}`}
            >
              <Suspense fallback={<LoadingSpinner />}>
                <TimelineView posts={posts} />
              </Suspense>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
