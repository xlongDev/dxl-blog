"use client";

import { useState, useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer"; // 用于检测滚动到底部
import PostCard from "./PostCard";
import FadeIn from "@/components/FadeIn";
import Categories from "./Categories";
import { useThemeUtils } from "@/hooks/useThemeUtils";
import { Post } from "contentlayer/generated";
import PaginationBar from "./PaginationBar";
import { useRouter } from "next/navigation";

interface CategoryFilterProps {
  posts: Post[];
  totalPosts: number;
  currentCategory: string;
  categories: string[];
  postsByCategory: Record<string, number>;
  currentPage: number;
  totalPages: number;
}

export default function CategoryFilter({
  posts,
  totalPosts,
  currentCategory,
  categories,
  postsByCategory,
  currentPage,
  totalPages,
}: CategoryFilterProps) {
  const router = useRouter();
  const { getThemeClass, theme } = useThemeUtils();
  const [visiblePosts, setVisiblePosts] = useState<Post[]>([]);
  const postsPerPage = 9;
  const isLoadingRef = useRef(false); // 避免重复加载
  const [shouldPrefetch, setShouldPrefetch] = useState(true);
  const idlePrefetch = (href: string) => {
    if (!shouldPrefetch) return;
    const ric = (window as any).requestIdleCallback;
    if (typeof ric === "function") {
      ric(() => router.prefetch(href));
    } else {
      setTimeout(() => router.prefetch(href), 0);
    }
  };

  // 使用 react-intersection-observer 检测滚动到底部
  const { ref: loadMoreRef, inView } = useInView({
    threshold: 0, // 当元素进入视口时触发
    triggerOnce: false, // 允许多次触发
  });

  // 初始化加载第一页
  useEffect(() => {
    setVisiblePosts(posts.slice(0, postsPerPage));
  }, [posts]);

  // 监听滚动到底部，自动加载更多
  useEffect(() => {
    if (inView && !isLoadingRef.current && visiblePosts.length < posts.length) {
      isLoadingRef.current = true;
      setTimeout(() => {
        setVisiblePosts((prev) => {
          const newPosts = posts.slice(0, prev.length + postsPerPage);
          return newPosts;
        });
        isLoadingRef.current = false;
      }, 500); // 添加一个小延迟，模拟加载效果
    }
  }, [inView, posts, visiblePosts.length]);

  useEffect(() => {
    try {
      const nav: any = typeof navigator !== "undefined" ? navigator : null;
      const conn: any = nav && nav.connection ? nav.connection : null;
      const saveData = !!(conn && conn.saveData);
      const effective = (conn && conn.effectiveType) || "4g";
      const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
      const slow = /(^2g|^slow-2g|^3g)/.test(effective);
      setShouldPrefetch(!saveData && !slow && !isMobile);
    } catch {
      setShouldPrefetch(true);
    }
  }, []);

  const containerClass = getThemeClass("bg-white/10", {
    light: "bg-white/10",
    dark: "bg-gray-800/10",
    green: "bg-emerald-50/10",
    purple: "bg-purple-50/10",
    orange: "bg-orange-50/10",
    blue: "bg-blue-50/10",
    pink: "bg-pink-50/10",
    brown: "bg-amber-50/10",
  });

  const paginationClass = getThemeClass("text-gray-700 dark:text-gray-300", {
    light: "text-gray-700 dark:text-gray-300",
    dark: "text-gray-300",
    green: "text-emerald-700 dark:text-emerald-300",
    purple: "text-purple-700 dark:text-purple-300",
    orange: "text-orange-700 dark:text-orange-300",
    blue: "text-blue-700 dark:text-blue-300",
    pink: "text-pink-700 dark:text-pink-300",
    brown: "text-amber-700 dark:text-amber-300",
  });

  const handlePageChange = (page: number) => {
    idlePrefetch(`/blog/category/${currentCategory}?page=${page}`);
    router.push(`/blog/category/${currentCategory}?page=${page}`);
  };

  useEffect(() => {
    const next = currentPage + 1;
    const prev = currentPage - 1;
    if (next <= totalPages) {
      idlePrefetch(`/blog/category/${currentCategory}?page=${next}`);
    }
    if (prev >= 1) {
      idlePrefetch(`/blog/category/${currentCategory}?page=${prev}`);
    }
  }, [router, currentCategory, currentPage, totalPages, shouldPrefetch]);

  return (
    <div className="space-y-8">
      <Categories
        totalPosts={totalPosts}
        currentCategory={currentCategory}
        categories={categories}
        postsByCategory={postsByCategory}
      />
      <div
        className={`w-full ${containerClass} rounded-2xl p-6 backdrop-blur-sm mt-16`}
      >
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {visiblePosts.map((post, index) => {
            const firstPage = index < postsPerPage;
            const card = <PostCard post={post} />;
            return firstPage ? (
              <FadeIn key={post.url} delay={0.08 * (index % postsPerPage)}>
                {card}
              </FadeIn>
            ) : (
              <div key={post.url}>{card}</div>
            );
          })}
        </div>
        {/* 添加一个用于检测滚动的元素 */}
        {visiblePosts.length < posts.length && (
          <div ref={loadMoreRef} className="mt-8 text-center">
            <p className="text-gray-500">加载中...</p>
          </div>
        )}
        
        {/* 分页导航 */}
        {totalPages > 1 && (
          <div className="mt-8 flex justify-center items-center space-x-4">
            <PaginationBar
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              className={paginationClass}
              theme={theme} // 传递当前主题到分页组件
            />
          </div>
        )}
      </div>
    </div>
  );
}
