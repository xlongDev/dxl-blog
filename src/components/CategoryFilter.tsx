"use client";

import { useState, useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer"; // 用于检测滚动到底部
import PostCard from "./PostCard";
import FadeIn from "@/components/FadeIn";
import Categories from "./Categories";
import { useThemeUtils } from "@/hooks/useThemeUtils";
import { MinimalPost } from "@/types"; // 导入公共类型

interface CategoryFilterProps {
  posts: MinimalPost[];
  totalPosts: number;
  currentCategory: string;
  categories: string[];
  postsByCategory: Record<string, number>;
}

export default function CategoryFilter({
  posts,
  totalPosts,
  currentCategory,
  categories,
  postsByCategory,
}: CategoryFilterProps) {
  const { getThemeClass } = useThemeUtils();
  const [visiblePosts, setVisiblePosts] = useState<MinimalPost[]>([]);
  const postsPerPage = 9;
  const isLoadingRef = useRef(false); // 避免重复加载

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
          {visiblePosts.map((post, index) => (
            <FadeIn key={post.url} delay={index < 9 ? 0.1 * (index % 9) : 0}>
              <PostCard post={post} />
            </FadeIn>
          ))}
        </div>
        {/* 添加一个用于检测滚动的元素 */}
        {visiblePosts.length < posts.length && (
          <div ref={loadMoreRef} className="mt-8 text-center">
            <p className="text-gray-500">加载中...</p>
          </div>
        )}
      </div>
    </div>
  );
}
