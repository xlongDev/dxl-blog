"use client";

import { useState, useEffect } from "react";
import PostCard from "./PostCard";
import FadeIn from "@/components/FadeIn";
import Categories from "./Categories";
import { useThemeUtils } from "@/hooks/useThemeUtils";

interface MinimalPost {
  title: string;
  date: string;
  description: string;
  url: string;
  category: string;
  tags?: string[];
  image?: string;
  views?: number;
  likes?: number;
}

interface CategoryFilterProps {
  posts: MinimalPost[];
  totalPosts: number;
  currentCategory: string;
  categories: string[];
  postsByCategory: Record<string, number>;
}

export default function CategoryFilter({ posts, totalPosts, currentCategory, categories, postsByCategory }: CategoryFilterProps) {
  const { getThemeClass } = useThemeUtils();
  const [visiblePosts, setVisiblePosts] = useState<MinimalPost[]>([]);
  const postsPerPage = 9;

  useEffect(() => {
    setVisiblePosts(posts.slice(0, postsPerPage));
  }, [posts]);

  const loadMore = () => {
    setVisiblePosts((prev) => posts.slice(0, prev.length + postsPerPage));
  };

  const containerClass = getThemeClass(
    "bg-white/10",
    {
      light: "bg-white/10",
      dark: "bg-gray-800/10",
      green: "bg-emerald-50/10",
      purple: "bg-purple-50/10",
      orange: "bg-orange-50/10",
      blue: "bg-blue-50/10",
      pink: "bg-pink-50/10",
      brown: "bg-amber-50/10",
    }
  );

  return (
    <div className="space-y-8">
      <Categories 
        totalPosts={totalPosts}
        currentCategory={currentCategory} 
        categories={categories} 
        postsByCategory={postsByCategory}
      />
      <div className={`w-full ${containerClass} rounded-2xl p-6 backdrop-blur-sm mt-16`}>
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {visiblePosts.map((post, index) => (
            <FadeIn key={post.url} delay={index < 9 ? 0.1 * (index % 9) : 0}>
              <PostCard post={post} />
            </FadeIn>
          ))}
        </div>
        {visiblePosts.length < posts.length && (
          <div className="mt-8 text-center">
            <button
              onClick={loadMore}
              className="px-6 py-2 bg-indigo-500 text-white rounded-full hover:bg-indigo-600 transition-colors"
            >
              加载更多
            </button>
          </div>
        )}
      </div>
    </div>
  );
}