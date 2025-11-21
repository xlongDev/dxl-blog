"use client";

import React, { useState } from "react";
import { Post } from "contentlayer/generated";
import {
  Bookmark,
  ChevronDown,
  ChevronUp,
  List,
  Grid,
  ExternalLink,
} from "lucide-react";
import { useThemeUtils } from "@/hooks/useThemeUtils";
import Link from "next/link";
import { motion } from "framer-motion";

interface SimplePost {
  title: string;
  date: string;
  url: string;
  category: string;
  tags?: string[];
  views?: number;
  likes?: number;
  description?: string;
}

interface RecommendedPostsProps {
  recommendedPosts: SimplePost[];
}

const RecommendedPosts = ({ recommendedPosts }: RecommendedPostsProps) => {
  const { theme, getThemeValue } = useThemeUtils();
  const [expanded, setExpanded] = useState(false);
  const [viewMode, setViewMode] = useState<"list" | "grid">("grid");
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  // 卡片动画变体
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
    hover: {
      scale: 1.03,
      transition: { duration: 0.3 },
    },
    tap: { scale: 0.98 },
  };

  // 根据主题获取图标渐变色
  const getIconGradient = () => {
    const themeColors = {
      light:
        "from-indigo-500 to-purple-500 hover:from-purple-500 hover:to-indigo-500",
      dark: "from-indigo-600 to-purple-600 hover:from-purple-600 hover:to-indigo-600",
      green:
        "from-teal-500 to-emerald-500 hover:from-emerald-500 hover:to-teal-500",
      purple:
        "from-violet-500 to-purple-500 hover:from-purple-500 hover:to-violet-500",
      orange:
        "from-red-500 to-orange-500 hover:from-orange-500 hover:to-red-500",
      blue: "from-sky-500 to-blue-500 hover:from-blue-500 hover:to-sky-500",
      pink: "from-rose-500 to-pink-500 hover:from-pink-500 hover:to-rose-500",
      brown:
        "from-yellow-600 to-amber-600 hover:from-amber-600 hover:to-yellow-600",
    };

    return themeColors[theme as keyof typeof themeColors] || themeColors.light;
  };

  // 根据主题获取文字渐变色
  const getTextGradient = () => {
    const themeColors = {
      light: "from-indigo-600 to-purple-600",
      dark: "from-indigo-500 to-purple-500",
      green: "from-teal-600 to-emerald-600",
      purple: "from-violet-600 to-purple-600",
      orange: "from-red-600 to-orange-600",
      blue: "from-sky-600 to-blue-600",
      pink: "from-rose-600 to-pink-600",
      brown: "from-yellow-700 to-amber-600",
    };

    return themeColors[theme as keyof typeof themeColors] || themeColors.light;
  };

  // 根据主题获取卡片背景渐变色
  const getCardGradient = () => {
    const themeColors = {
      light:
        "from-white to-indigo-50/30 dark:from-gray-800 dark:to-indigo-900/20",
      dark: "from-gray-800 to-indigo-900/20",
      green: "from-white to-teal-50/30 dark:from-gray-800 dark:to-teal-900/20",
      purple:
        "from-white to-violet-50/30 dark:from-gray-800 dark:to-violet-900/20",
      orange: "from-white to-red-50/30 dark:from-gray-800 dark:to-red-900/20",
      blue: "from-white to-sky-50/30 dark:from-gray-800 dark:to-sky-900/20",
      pink: "from-white to-rose-50/30 dark:from-gray-800 dark:to-rose-900/20",
      brown:
        "from-white to-yellow-50/40 dark:from-gray-800 dark:to-yellow-900/30",
    };

    return themeColors[theme as keyof typeof themeColors] || themeColors.light;
  };

  // 根据主题获取边框颜色
  const getBorderClass = () => {
    const themeColors = {
      light: "border-indigo-200/50 dark:border-indigo-700/50",
      dark: "border-indigo-700/50",
      green: "border-teal-200/50 dark:border-teal-700/50",
      purple: "border-violet-200/50 dark:border-violet-700/50",
      orange: "border-red-200/50 dark:border-red-700/50",
      blue: "border-sky-200/50 dark:border-sky-700/50",
      pink: "border-rose-200/50 dark:border-rose-700/50",
      brown: "border-yellow-300/60 dark:border-yellow-700/60",
    };

    return themeColors[theme as keyof typeof themeColors] || themeColors.light;
  };

  // 根据主题获取阴影效果
  const getShadowEffect = () => {
    const themeColors = {
      light: "hover:shadow-[0_0_20px_rgba(99,102,241,0.6)]",
      dark: "hover:shadow-[0_0_20px_rgba(79,70,229,0.6)]",
      green: "hover:shadow-[0_0_20px_rgba(20,184,166,0.6)]",
      purple: "hover:shadow-[0_0_20px_rgba(139,92,246,0.6)]",
      orange: "hover:shadow-[0_0_20px_rgba(239,68,68,0.6)]",
      blue: "hover:shadow-[0_0_20px_rgba(14,165,233,0.6)]",
      pink: "hover:shadow-[0_0_20px_rgba(219,39,119,0.6)]",
      brown: "hover:shadow-[0_0_20px_rgba(202,138,4,0.5)]",
    };

    return themeColors[theme as keyof typeof themeColors] || themeColors.light;
  };

  // 根据主题获取标签颜色
  const getTagClass = () => {
    const themeColors = {
      light:
        "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-300",
      dark: "bg-indigo-900/40 text-indigo-300",
      green: "bg-teal-100 text-teal-800 dark:bg-teal-900/40 dark:text-teal-300",
      purple:
        "bg-violet-100 text-violet-800 dark:bg-violet-900/40 dark:text-violet-300",
      orange: "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300",
      blue: "bg-sky-100 text-sky-800 dark:bg-sky-900/40 dark:text-sky-300",
      pink: "bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300",
      brown:
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300",
    };

    return themeColors[theme as keyof typeof themeColors] || themeColors.light;
  };

  const iconGradient = getIconGradient();
  const textGradient = getTextGradient();
  const cardGradient = getCardGradient();
  const borderClass = getBorderClass();
  const shadowEffect = getShadowEffect();
  const tagClass = getTagClass();

  // 获取显示的文章数量
  const getDisplayPosts = () => {
    return expanded ? recommendedPosts : recommendedPosts.slice(0, 3);
  };

  // 渲染列表视图的文章
  const renderListView = (post: SimplePost, index: number) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      key={post.title}
      onHoverStart={() => setHoveredCard(post.title)}
      onHoverEnd={() => setHoveredCard(null)}
      whileHover="hover"
      whileTap="tap"
      variants={cardVariants}
    >
      <Link
        href={post.url}
        className={`block p-4 rounded-xl border ${borderClass} bg-gradient-to-br ${cardGradient} ${shadowEffect} transition-all duration-300 relative overflow-hidden`}
      >
        {/* 背景动画效果 */}
        {hoveredCard === post.title && (
          <motion.div
            className="absolute inset-0 opacity-10"
            initial={{ opacity: 0 }}
            animate={{
              opacity: 0.05,
              background: [
                "radial-gradient(circle at 20% 50%, rgba(99, 102, 241, 0.5) 0%, transparent 50%)",
                "radial-gradient(circle at 80% 70%, rgba(99, 102, 241, 0.5) 0%, transparent 50%)",
                "radial-gradient(circle at 40% 20%, rgba(99, 102, 241, 0.5) 0%, transparent 50%)",
              ],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        )}

        <div className="flex items-center justify-between relative z-10">
          <h4 className="font-medium line-clamp-1 flex-1">{post.title}</h4>
          <div className="flex items-center gap-2">
            <ExternalLink size={14} className="opacity-70" />
          </div>
        </div>
        <p className="text-sm opacity-70 mt-2 line-clamp-2 relative z-10">
          {post.description}
        </p>
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3 relative z-10">
            {post.tags.map((tag) => (
              <motion.span
                key={tag}
                className={`text-xs px-2 py-1 rounded-full ${tagClass}`}
                whileHover={{ scale: 1.05 }}
              >
                {tag}
              </motion.span>
            ))}
          </div>
        )}

        {/* 悬停时显示的闪光效果 */}
        {hoveredCard === post.title && (
          <motion.div
            className="absolute -inset-1 opacity-0"
            animate={{
              opacity: [0, 0.2, 0],
              rotate: [0, 5],
              scale: [0.8, 1.2],
            }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "loop" }}
          >
            <div
              className={`w-full h-full rounded-xl bg-gradient-to-r ${iconGradient} blur-xl`}
            />
          </motion.div>
        )}
      </Link>
    </motion.div>
  );

  // 渲染网格视图的文章
  const renderGridView = (post: SimplePost, index: number) => (
    <motion.div
      key={post.title}
      custom={index}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      whileTap="tap"
      variants={cardVariants}
      onHoverStart={() => setHoveredCard(post.title)}
      onHoverEnd={() => setHoveredCard(null)}
    >
      <Link
        href={post.url}
        className={`block p-5 rounded-xl border ${borderClass} bg-gradient-to-br ${cardGradient} ${shadowEffect} transition-all duration-300 h-full flex flex-col relative overflow-hidden`}
      >
        {/* 背景动画效果 */}
        {hoveredCard === post.title && (
          <motion.div
            className="absolute inset-0 opacity-10"
            initial={{ opacity: 0 }}
            animate={{
              opacity: 0.05,
              background: [
                "radial-gradient(circle at 20% 50%, rgba(99, 102, 241, 0.5) 0%, transparent 50%)",
                "radial-gradient(circle at 80% 70%, rgba(99, 102, 241, 0.5) 0%, transparent 50%)",
                "radial-gradient(circle at 40% 20%, rgba(99, 102, 241, 0.5) 0%, transparent 50%)",
              ],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        )}

        <div className="flex justify-between items-start mb-3 relative z-10">
          <h4 className="font-medium text-lg line-clamp-2 flex-1">
            {post.title}
          </h4>
          <motion.div
            className={`p-1.5 rounded-lg bg-gradient-to-r ${iconGradient} text-white transform transition-all duration-300`}
            whileHover={{ rotate: 12, scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Bookmark size={14} />
          </motion.div>
        </div>
        <p className="text-sm opacity-70 mb-auto line-clamp-3 flex-grow relative z-10">
          {post.description}
        </p>
        <div className="mt-4 pt-3 border-t border-gray-200/30 dark:border-gray-700/30 flex items-center relative z-10">
          <div className="flex flex-wrap gap-2">
            {post.tags &&
              post.tags.length > 0 &&
              post.tags.map((tag) => (
                <motion.span
                  key={tag}
                  className={`text-xs px-2 py-1 rounded-full ${tagClass}`}
                  whileHover={{ scale: 1.05 }}
                >
                  {tag}
                </motion.span>
              ))}
          </div>
        </div>

        {/* 悬停时显示的闪光效果 */}
        {hoveredCard === post.title && (
          <motion.div
            className="absolute -inset-1 opacity-0"
            animate={{
              opacity: [0, 0.2, 0],
              rotate: [0, 5],
              scale: [0.8, 1.2],
            }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "loop" }}
          >
            <div
              className={`w-full h-full rounded-xl bg-gradient-to-r ${iconGradient} blur-xl`}
            />
          </motion.div>
        )}
      </Link>
    </motion.div>
  );

  // 根据主题获取视图切换按钮颜色
  const getViewButtonColors = () => {
    const themeColors = {
      light: {
        active:
          "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400",
        inactive: "text-gray-400 hover:text-indigo-500",
      },
      dark: {
        active: "bg-gray-700 text-indigo-400",
        inactive: "text-gray-500 hover:text-indigo-400",
      },
      green: {
        active:
          "bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400",
        inactive: "text-gray-400 hover:text-teal-500",
      },
      purple: {
        active:
          "bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400",
        inactive: "text-gray-400 hover:text-violet-500",
      },
      orange: {
        active: "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400",
        inactive: "text-gray-400 hover:text-red-500",
      },
      blue: {
        active: "bg-sky-100 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400",
        inactive: "text-gray-400 hover:text-sky-500",
      },
      pink: {
        active:
          "bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400",
        inactive: "text-gray-400 hover:text-rose-500",
      },
      brown: {
        active:
          "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400",
        inactive: "text-gray-400 hover:text-yellow-500",
      },
    };

    return themeColors[theme as keyof typeof themeColors] || themeColors.light;
  };

  const buttonColors = getViewButtonColors();

  return (
    <div className="w-full">
      {/* 标题区域 */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div
            className={`p-2 rounded-lg bg-gradient-to-r ${iconGradient} text-white transform transition-all duration-300 hover:scale-110 hover:rotate-12`}
          >
            <Bookmark size={20} />
          </div>
          <h3
            className={`text-xl font-bold bg-gradient-to-r ${textGradient} bg-clip-text text-transparent`}
          >
            推荐阅读
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode("list")}
            className={`p-1.5 rounded-md transition-colors ${
              viewMode === "list" ? buttonColors.active : buttonColors.inactive
            }`}
            aria-label="列表视图"
          >
            <List size={18} />
          </button>
          <button
            onClick={() => setViewMode("grid")}
            className={`p-1.5 rounded-md transition-colors ${
              viewMode === "grid" ? buttonColors.active : buttonColors.inactive
            }`}
            aria-label="网格视图"
          >
            <Grid size={18} />
          </button>
        </div>
      </div>

      {viewMode === "list" ? (
        <div className="space-y-4">
          {getDisplayPosts().map((post, index) => renderListView(post, index))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {getDisplayPosts().map((post, index) => renderGridView(post, index))}
        </div>
      )}

      {recommendedPosts.length > 3 && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          onClick={() => setExpanded(!expanded)}
          className={`mt-5 w-full flex items-center justify-center p-2 rounded-lg border ${borderClass} bg-gradient-to-br ${cardGradient} transition-all duration-300 hover:shadow-md relative overflow-hidden group`}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          {/* 按钮背景动画 */}
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-10"
            animate={{
              background: [
                "radial-gradient(circle at 20% 50%, rgba(99, 102, 241, 0.5) 0%, transparent 50%)",
                "radial-gradient(circle at 80% 70%, rgba(99, 102, 241, 0.5) 0%, transparent 50%)",
                "radial-gradient(circle at 40% 20%, rgba(99, 102, 241, 0.5) 0%, transparent 50%)",
              ],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />

          <span className="mr-2 relative z-10">
            {expanded ? "收起" : "查看更多推荐"}
          </span>
          <motion.span
            animate={{ y: expanded ? -3 : 3 }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="relative z-10"
          >
            {expanded ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </motion.span>
        </motion.button>
      )}
    </div>
  );
};

export default React.memo(RecommendedPosts);
