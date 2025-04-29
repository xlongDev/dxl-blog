"use client";

import { Suspense, lazy, useState, useEffect, useRef, memo } from "react";
import { useThemeUtils } from "@/hooks/useThemeUtils";
import Link from "next/link";
import PaginationBar from "@/components/PaginationBar";

const BlogStats = lazy(() => import("@/components/BlogStats"));
const Categories = lazy(() => import("@/components/Categories"));
const MobileCategories = lazy(() => import("@/components/MobileCategories"));
const BlogFilter = lazy(() => import("@/components/BlogFilter"));
const ArticleTree = lazy(() => import("@/components/ArticleTree"));
const TimelineView = lazy(() => import("@/components/TimelineView"));

interface BlogPageClientProps {
  initialPosts: any[];
  totalPosts: number;
  totalPages: number;
  currentPage: number;
  postsPerPage: number;
}

const LoadingSpinner = () => (
  <div className="flex justify-center items-center p-4">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
  </div>
);

export default function BlogPageClient({ initialPosts, totalPosts, totalPages, currentPage, postsPerPage }: BlogPageClientProps) {
  const [posts, setPosts] = useState<any[]>(initialPosts);
  const [allPosts, setAllPosts] = useState<any[]>([]);
  const [page, setPage] = useState(currentPage);
  const [loading, setLoading] = useState(false);
  const blogFilterRef = useRef<HTMLDivElement>(null);
  const { getThemeClass } = useThemeUtils();
  const [isMobile, setIsMobile] = useState(true);

  // 获取全部文章
  useEffect(() => {
    fetch('/api/posts-simple?all=1', { cache: 'no-store' })
      .then(res => res.json())
      .then(data => setAllPosts(data.posts));
  }, []);

  useEffect(() => {
    setPage(currentPage);
    setPosts(initialPosts);
  }, [currentPage, initialPosts]);

  useEffect(() => {
    if (page === currentPage && posts === initialPosts) return; // SSR 首屏
    setLoading(true);
    fetch(`/api/posts-simple?page=${page}&pageSize=${postsPerPage}`)
      .then(res => res.json())
      .then(data => {
        setPosts(data.posts);
        setLoading(false);
      });
  }, [page, postsPerPage]);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  // 分页切换后自动滚动到 BlogFilter 区域
  const handlePageChange = (p: number) => {
    setPage(p);
    setTimeout(() => {
      blogFilterRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  // 统一暗夜模式背景色
  const containerClass = getThemeClass("bg-white/10", {
    light: "bg-white/10",
    dark: "bg-gray-900/80",
    green: "bg-emerald-50/10",
    purple: "bg-purple-50/10",
    orange: "bg-orange-50/10",
    blue: "bg-blue-50/10",
    pink: "bg-pink-50/10",
    brown: "bg-amber-50/10",
  });

  const paginationClass = getThemeClass(
    "text-gray-700 dark:text-gray-300",
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
            <div className={`${containerClass} backdrop-blur-sm rounded-lg shadow p-4`}>
              <Suspense fallback={<LoadingSpinner />}>
                <BlogStats />
              </Suspense>
            </div>
          )}
          {isMobile && (
            <div className={`${containerClass} backdrop-blur-sm rounded-lg shadow p-4 border space-y-4 w-full relative z-20`}>
              <Suspense fallback={<LoadingSpinner />}>
                <MobileCategories />
              </Suspense>
            </div>
          )}
          <div ref={blogFilterRef} className={`${containerClass} backdrop-blur-sm rounded-lg shadow p-4`}>
            <Suspense fallback={<LoadingSpinner />}>
              <BlogFilter posts={posts} allPosts={allPosts} />
            </Suspense>
          </div>
          {/* 分页导航 */}
          {totalPages > 1 && (
            <PaginationBar
              currentPage={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              className={paginationClass}
            />
          )}
        </div>
        {/* 文章树和时间线 */}
        {!isMobile && (
          <div className="lg:col-span-4 space-y-8">
            <div className={`${containerClass} backdrop-blur-sm rounded-lg shadow p-4`}>
              <Suspense fallback={<LoadingSpinner />}>
                <ArticleTree />
              </Suspense>
            </div>
            <div className={`${containerClass} backdrop-blur-sm rounded-lg shadow p-4`}>
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
