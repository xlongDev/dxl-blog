"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface ArticleActionsProps {
  slug: string;
}

interface ArticleStats {
  likes: number;
}

export default function ArticleActions({ slug }: ArticleActionsProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [stats, setStats] = useState<ArticleStats>({ likes: 0 });

  useEffect(() => {
    // 从 localStorage 加载状态
    const savedState = localStorage.getItem(`article-${slug}`);
    if (savedState) {
      const { liked, saved } = JSON.parse(savedState);
      setIsLiked(liked);
      setIsSaved(saved);
    }

    // 从 localStorage 加载统计数据
    const savedStats = localStorage.getItem(`article-stats-${slug}`);
    if (savedStats) {
      setStats(JSON.parse(savedStats));
    }
  }, [slug]);

  const handleLike = () => {
    const newLiked = !isLiked;
    setIsLiked(newLiked);

    // 更新点赞数
    const newStats = {
      likes: stats.likes + (newLiked ? 1 : -1),
    };
    setStats(newStats);

    // 保存状态到 localStorage
    localStorage.setItem(
      `article-${slug}`,
      JSON.stringify({ liked: newLiked, saved: isSaved })
    );
    localStorage.setItem(`article-stats-${slug}`, JSON.stringify(newStats));
  };

  const handleSave = () => {
    const newSaved = !isSaved;
    setIsSaved(newSaved);

    // 保存状态到 localStorage
    localStorage.setItem(
      `article-${slug}`,
      JSON.stringify({ liked: isLiked, saved: newSaved })
    );
  };

  return (
    <div className="flex items-center space-x-4 mt-8">
      <button
        onClick={handleLike}
        className="flex items-center space-x-2 text-gray-600 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-500 transition-colors"
      >
        <motion.svg
          animate={isLiked ? { scale: [1, 1.2, 1] } : {}}
          className={`w-6 h-6 ${isLiked ? "fill-red-500" : "fill-none"}`}
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
        <span>{stats.likes}</span>
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
        <span>收藏</span>
      </button>
    </div>
  );
}
