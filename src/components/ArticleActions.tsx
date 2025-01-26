"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useArticleStats } from "@/hooks/useArticleStats";

interface ArticleActionsProps {
  slug: string;
}

export default function ArticleActions({ slug }: ArticleActionsProps) {
  const [isSaved, setIsSaved] = useState(() => {
    if (typeof window !== "undefined") {
      const savedState = localStorage.getItem(`article-${slug}`);
      return savedState ? JSON.parse(savedState).saved : false;
    }
    return false;
  });
  const { stats, handleLike } = useArticleStats(slug);

  const handleSave = () => {
    const newSaved = !isSaved;
    setIsSaved(newSaved);

    // 保存状态到 localStorage
    localStorage.setItem(
      `article-${slug}`,
      JSON.stringify({ saved: newSaved })
    );
  };

  return (
    <div className="flex items-center space-x-4 mt-8">
      <button
        onClick={handleLike}
        className="flex items-center space-x-2 text-gray-600 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-500 transition-colors"
      >
        <motion.svg
          animate={(stats?.likes ?? 0) > 0 ? { scale: [1, 1.2, 1] } : {}}
          className={`w-6 h-6 ${
            (stats?.likes ?? 0) > 0 ? "fill-red-500" : "fill-none"
          }`}
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </motion.svg>
        <span>{stats?.likes || 0}</span>
      </button>
      <button
        onClick={handleSave}
        className="flex items-center space-x-2 text-gray-600 hover:text-yellow-500 dark:text-gray-400 dark:hover:text-yellow-500 transition-colors"
      >
        <motion.svg
          animate={isSaved ? { scale: [1, 1.2, 1] } : {}}
          className={`w-6 h-6 ${isSaved ? "fill-yellow-500" : "fill-none"}`}
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
          />
        </motion.svg>
      </button>
    </div>
  );
}
