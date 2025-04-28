"use client";

import { Suspense, lazy, useState, useEffect, memo } from "react";
import { Post } from "contentlayer/generated";
import { useThemeUtils } from "@/hooks/useThemeUtils";
import Link from "next/link";

// 懒加载组件
const BlogStats = lazy(() => import("@/components/BlogStats"));
const Categories = lazy(() => import("@/components/Categories"));
const MobileCategories = lazy(() => import("@/components/MobileCategories"));
const BlogFilter = lazy(() => import("@/components/BlogFilter"));
const ArticleTree = lazy(() => import("@/components/ArticleTree"));
const TimelineView = lazy(() => import("@/components/TimelineView"));

interface BlogPageClientProps {
  posts: Post[];
  totalPosts: number;
  currentPage: number;
  totalPages: number;
}

const LoadingSpinner = () => (
  <div className="flex justify-center items-center p-4">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
  </div>
);

// 使用 memo 优化分页按钮组件
const PaginationButton = memo(({ 
  href, 
  disabled, 
  children, 
  className 
}: { 
  href: string; 
  disabled: boolean; 
  children: React.ReactNode;
  className: string;
}) => (
  <Link
    href={href}
    className={`px-4 py-2 rounded-lg ${
      disabled
        ? "opacity-50 cursor-not-allowed"
        : "hover:bg-opacity-10 hover:bg-current"
    } ${className}`}
    onClick={(e) => disabled && e.preventDefault()}
  >
    {children}
  </Link>
));

PaginationButton.displayName = "PaginationButton";

export default function BlogPageClient({ 
  posts, 
  totalPosts, 
  currentPage, 
  totalPages 
}: BlogPageClientProps) {
  const [isMobile, setIsMobile] = useState(true);
  const { getThemeClass } = useThemeUtils();

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  // 修改后的代码
  const containerClass = getThemeClass("bg-white/10", {
    light: "bg-white/10",
    dark: "bg-gray-80/10",
    green: "bg-emerald-50/10",
    purple: "bg-purple-50/10",
    orange: "bg-orange-50/10",
    blue: "bg-blue-50/10",
    pink: "bg-pink-50/10",
    brown: "bg-amber-50/10",
  });

  const paginationClass = getThemeClass(
    "text-gray-700 dark:text-gray-300 hover:z-10 hover:bg-opacity-100", // 新增hover样式
    {
      light: "text-gray-700 dark:text-gray-300",
      dark: "text-gray-300",
      green: "text-emerald-700 dark:text-emerald-300",
      purple: "text-purple-700 dark:text-purple-300",
      orange: "text-orange-700 dark:text-orange-300",
      blue: "text-blue-700 dark:text-blue-300",
      pink: "text-pink-700 dark:text-pink-300",
      brown: "text-amber-700 dark:text-amber-300",
    }
  );

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8" id="post-list-container">
          {!isMobile && (
            <div
              className={`${containerClass} backdrop-blur-sm rounded-lg shadow p-4`}
            >
              <Suspense fallback={<LoadingSpinner />}>
                <BlogStats />
              </Suspense>
            </div>
          )}
          {isMobile && (
            <div
              className={`${containerClass} backdrop-blur-sm rounded-lg shadow p-4 border space-y-4 w-full relative z-20`}
            >
              <Suspense fallback={<LoadingSpinner />}>
                <MobileCategories />
              </Suspense>
            </div>
          )}
          <div
            className={`${containerClass} backdrop-blur-sm rounded-lg shadow p-4`}
          >
            <Suspense fallback={<LoadingSpinner />}>
              <BlogFilter posts={posts} />
            </Suspense>
          </div>

          {/* 分页导航 */}
          {totalPages > 1 && (
            <div className={`mt-8 flex justify-center items-center space-x-4 ${paginationClass}`}>
              <PaginationButton
                href={`/blog?page=${currentPage - 1}`}
                disabled={currentPage === 1}
                className={paginationClass}
              >
                上一页
              </PaginationButton>
              <span>
                第 {currentPage} 页 / 共 {totalPages} 页
              </span>
              <PaginationButton
                href={`/blog?page=${currentPage + 1}`}
                disabled={currentPage === totalPages}
                className={paginationClass}
              >
                下一页
              </PaginationButton>
            </div>
          )}
        </div>

        {/* 文章树和时间线 */}
        {!isMobile && (
          <div className="lg:col-span-4 space-y-8">
            <div
              className={`${containerClass} backdrop-blur-sm rounded-lg shadow p-4`}
            >
              <Suspense fallback={<LoadingSpinner />}>
                <ArticleTree />
              </Suspense>
            </div>
            <div
              className={`${containerClass} backdrop-blur-sm rounded-lg shadow p-4`}
            >
              <Suspense fallback={<LoadingSpinner />}>
                <TimelineView />
              </Suspense>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
