"use client";

import { useState, useMemo, useCallback } from "react";
import { Post } from "contentlayer/generated";
import PostCard from "./PostCard";
import { motion } from "framer-motion";
import { useThemeUtils } from "@/hooks/useThemeUtils";

interface BlogFilterProps {
  posts: Post[];
}

export default function BlogFilter({ posts }: BlogFilterProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const { theme } = useThemeUtils();

  const allTags = useMemo(
    () => Array.from(new Set(posts.flatMap((post) => post.tags || []))).sort(),
    [posts]
  );

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTag = !selectedTag || post.tags?.includes(selectedTag);
      return matchesSearch && matchesTag;
    });
  }, [posts, searchTerm, selectedTag]);

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value);
    },
    []
  );

  const handleTagChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedTag(e.target.value || null);
    },
    []
  );

  const getBorderClass = () => {
    const themeColors = {
      light: "border-gray-200 dark:border-gray-800",
      dark: "border-gray-800",
      green: "border-green-200 dark:border-green-800",
      purple: "border-purple-200 dark:border-purple-800",
      orange: "border-orange-200 dark:border-orange-800",
      blue: "border-blue-200 dark:border-blue-800",
      pink: "border-pink-200 dark:border-pink-800",
      brown: "border-amber-200 dark:border-amber-800",
    };
    return themeColors[theme as keyof typeof themeColors] || themeColors.light;
  };

  const getTextClass = () => {
    const themeColors = {
      light: "text-gray-500 dark:text-gray-400",
      dark: "text-gray-400",
      green: "text-green-500 dark:text-green-400",
      purple: "text-purple-500 dark:text-purple-400",
      orange: "text-orange-500 dark:text-orange-400",
      blue: "text-blue-500 dark:text-blue-400",
      pink: "text-pink-500 dark:text-pink-400",
      brown: "text-amber-500 dark:text-amber-400",
    };
    return themeColors[theme as keyof typeof themeColors] || themeColors.light;
  };

  const borderClass = getBorderClass();
  const textClass = getTextClass();

  // 卡片动画变体
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="搜索文章..."
          className={`flex-1 px-4 py-2 rounded-lg border ${borderClass} bg-transparent focus:ring-2 focus:ring-opacity-50 focus:outline-none ${
            theme && theme !== "light" && theme !== "dark"
              ? `focus:ring-${theme}-500/50`
              : "focus:ring-blue-500/50"
          } transition-all duration-300`}
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <select
          className={`px-4 py-2 rounded-lg border ${borderClass} bg-transparent focus:ring-2 focus:ring-opacity-50 focus:outline-none ${
            theme && theme !== "light" && theme !== "dark"
              ? `focus:ring-${theme}-500/50`
              : "focus:ring-blue-500/50"
          } transition-all duration-300`}
          value={selectedTag || ""}
          onChange={handleTagChange}
        >
          <option value="">所有标签</option>
          {allTags.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </div>
      <div className="grid gap-8 md:grid-cols-2">
        {filteredPosts.map((post, index) => (
          <motion.div
            key={post._id}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: index * 0.1 }}
          >
            <PostCard post={post} />
          </motion.div>
        ))}
      </div>
      {filteredPosts.length === 0 && (
        <p className={`text-center ${textClass}`}>未找到匹配的文章</p>
      )}
    </div>
  );
}
