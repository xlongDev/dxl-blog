"use client";

import React, { useState, useEffect } from "react";
import { Post } from "contentlayer/generated";
import {
  Briefcase,
  ChevronDown,
  ChevronUp,
  List,
  Grid,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import { useThemeUtils } from "@/hooks/useThemeUtils";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface InterviewPostsProps {
  interviewPosts: Post[];
}

const InterviewPosts = ({ interviewPosts }: InterviewPostsProps) => {
  const { theme, getThemeValue } = useThemeUtils();
  const [expanded, setExpanded] = useState(false);
  const [viewMode, setViewMode] = useState<"list" | "grid">("grid");
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  // 根据主题获取图标渐变色
  const getIconGradient = () => {
    const themeColors = {
      light: "from-cyan-500 to-blue-500 hover:from-blue-500 hover:to-cyan-500",
      dark: "from-cyan-600 to-blue-600 hover:from-blue-600 hover:to-cyan-600",
      green:
        "from-emerald-500 to-teal-500 hover:from-teal-500 hover:to-emerald-500",
      purple:
        "from-fuchsia-500 to-violet-500 hover:from-violet-500 hover:to-fuchsia-500",
      orange:
        "from-amber-500 to-yellow-500 hover:from-yellow-500 hover:to-amber-500",
      blue: "from-indigo-500 to-blue-500 hover:from-blue-500 hover:to-indigo-500",
      pink: "from-rose-500 to-pink-500 hover:from-pink-500 hover:to-rose-500",
      brown:
        "from-stone-500 to-amber-500 hover:from-amber-500 hover:to-stone-500",
    };

    return themeColors[theme as keyof typeof themeColors] || themeColors.light;
  };

  // 根据主题获取文字渐变色
  const getTextGradient = () => {
    const themeColors = {
      light: "from-cyan-600 to-blue-600",
      dark: "from-cyan-500 to-blue-500",
      green: "from-emerald-600 to-teal-600",
      purple: "from-fuchsia-600 to-violet-600",
      orange: "from-amber-600 to-yellow-600",
      blue: "from-indigo-600 to-blue-600",
      pink: "from-rose-600 to-pink-600",
      brown: "from-stone-600 to-amber-600",
    };

    return themeColors[theme as keyof typeof themeColors] || themeColors.light;
  };

  // 根据主题获取卡片背景渐变色
  const getCardGradient = () => {
    const themeColors = {
      light: "from-white to-cyan-50/30 dark:from-gray-800 dark:to-cyan-900/20",
      dark: "from-gray-800 to-cyan-900/20",
      green:
        "from-white to-emerald-50/30 dark:from-gray-800 dark:to-emerald-900/20",
      purple:
        "from-white to-fuchsia-50/30 dark:from-gray-800 dark:to-fuchsia-900/20",
      orange:
        "from-white to-amber-50/30 dark:from-gray-800 dark:to-amber-900/20",
      blue: "from-white to-indigo-50/30 dark:from-gray-800 dark:to-indigo-900/20",
      pink: "from-white to-rose-50/30 dark:from-gray-800 dark:to-rose-900/20",
      brown:
        "from-white to-stone-50/40 dark:from-gray-800 dark:to-stone-900/30",
    };

    return themeColors[theme as keyof typeof themeColors] || themeColors.light;
  };

  // 根据主题获取边框颜色
  const getBorderClass = () => {
    const themeColors = {
      light: "border-cyan-200/50 dark:border-cyan-700/50",
      dark: "border-cyan-700/50",
      green: "border-emerald-200/50 dark:border-emerald-700/50",
      purple: "border-fuchsia-200/50 dark:border-fuchsia-700/50",
      orange: "border-amber-200/50 dark:border-amber-700/50",
      blue: "border-indigo-200/50 dark:border-indigo-700/50",
      pink: "border-rose-200/50 dark:border-rose-700/50",
      brown: "border-stone-300/60 dark:border-stone-700/60",
    };

    return themeColors[theme as keyof typeof themeColors] || themeColors.light;
  };

  // 根据主题获取阴影效果
  const getShadowEffect = () => {
    const themeColors = {
      light: "hover:shadow-[0_0_20px_rgba(6,182,212,0.6)]",
      dark: "hover:shadow-[0_0_20px_rgba(8,145,178,0.6)]",
      green: "hover:shadow-[0_0_20px_rgba(16,185,129,0.6)]",
      purple: "hover:shadow-[0_0_20px_rgba(192,38,211,0.6)]",
      orange: "hover:shadow-[0_0_20px_rgba(245,158,11,0.6)]",
      blue: "hover:shadow-[0_0_20px_rgba(79,70,229,0.6)]",
      pink: "hover:shadow-[0_0_20px_rgba(219,39,119,0.6)]",
      brown: "hover:shadow-[0_0_20px_rgba(120,53,15,0.5)]",
    };

    return themeColors[theme as keyof typeof themeColors] || themeColors.light;
  };

  // 根据主题获取标签颜色
  const getTagClass = () => {
    const themeColors = {
      light: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/40 dark:text-cyan-300",
      dark: "bg-cyan-900/40 text-cyan-300",
      green:
        "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300",
      purple:
        "bg-fuchsia-100 text-fuchsia-800 dark:bg-fuchsia-900/40 dark:text-fuchsia-300",
      orange:
        "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300",
      blue: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-300",
      pink: "bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300",
      brown:
        "bg-stone-100 text-stone-800 dark:bg-stone-900/40 dark:text-stone-300",
    };

    return themeColors[theme as keyof typeof themeColors] || themeColors.light;
  };

  // 根据主题获取视图切换按钮颜色
  const getViewButtonColors = () => {
    const themeColors = {
      light: {
        active:
          "bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400",
        inactive: "text-gray-400 hover:text-cyan-500",
      },
      dark: {
        active: "bg-gray-700 text-cyan-400",
        inactive: "text-gray-500 hover:text-cyan-400",
      },
      green: {
        active:
          "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400",
        inactive: "text-gray-400 hover:text-emerald-500",
      },
      purple: {
        active:
          "bg-fuchsia-100 dark:bg-fuchsia-900/30 text-fuchsia-600 dark:text-fuchsia-400",
        inactive: "text-gray-400 hover:text-fuchsia-500",
      },
      orange: {
        active:
          "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400",
        inactive: "text-gray-400 hover:text-amber-500",
      },
      blue: {
        active:
          "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400",
        inactive: "text-gray-400 hover:text-indigo-500",
      },
      pink: {
        active:
          "bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400",
        inactive: "text-gray-400 hover:text-rose-500",
      },
      brown: {
        active:
          "bg-stone-100 dark:bg-stone-900/30 text-stone-600 dark:text-stone-400",
        inactive: "text-gray-400 hover:text-stone-500",
      },
    };

    return themeColors[theme as keyof typeof themeColors] || themeColors.light;
  };

  const iconGradient = getIconGradient();
  const textGradient = getTextGradient();
  const cardGradient = getCardGradient();
  const borderClass = getBorderClass();
  const shadowEffect = getShadowEffect();
  const tagClass = getTagClass();
  const buttonColors = getViewButtonColors();

  // 获取显示的文章数量
  const getDisplayPosts = () => {
    return expanded ? interviewPosts : interviewPosts.slice(0, 3);
  };

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

  // 渲染列表视图的文章
  const renderListView = (post: Post, index: number) => (
    <motion.div
      key={post._id}
      custom={index}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      whileTap="tap"
      variants={cardVariants}
      onHoverStart={() => setHoveredCard(post._id)}
      onHoverEnd={() => setHoveredCard(null)}
    >
      <Link
        href={post.url}
        className={`block p-4 rounded-xl border ${borderClass} bg-gradient-to-br ${cardGradient} ${shadowEffect} transition-all duration-300 relative overflow-hidden`}
      >
        {/* 背景动画效果 */}
        {hoveredCard === post._id && (
          <motion.div
            className="absolute inset-0 opacity-10"
            initial={{ opacity: 0 }}
            animate={{
              opacity: 0.05,
              background: [
                "radial-gradient(circle at 20% 50%, rgba(6, 182, 212, 0.5) 0%, transparent 50%)",
                "radial-gradient(circle at 80% 70%, rgba(6, 182, 212, 0.5) 0%, transparent 50%)",
                "radial-gradient(circle at 40% 20%, rgba(6, 182, 212, 0.5) 0%, transparent 50%)",
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
                className={`text-xs px-2 py-1 rounded-full ${tagClass} flex items-center gap-1`}
                whileHover={{ scale: 1.05 }}
              >
                {tag === "面试" && <Briefcase size={12} />}
                {tag}
              </motion.span>
            ))}
          </div>
        )}
      </Link>
    </motion.div>
  );

  // 渲染网格视图的文章
  const renderGridView = (post: Post, index: number) => (
    <motion.div
      key={post._id}
      custom={index}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      whileTap="tap"
      variants={cardVariants}
      onHoverStart={() => setHoveredCard(post._id)}
      onHoverEnd={() => setHoveredCard(null)}
    >
      <Link
        href={post.url}
        className={`block p-5 rounded-xl border ${borderClass} bg-gradient-to-br ${cardGradient} ${shadowEffect} transition-all duration-300 h-full flex flex-col relative overflow-hidden`}
      >
        {/* 背景动画效果 */}
        {hoveredCard === post._id && (
          <motion.div
            className="absolute inset-0 opacity-10"
            initial={{ opacity: 0 }}
            animate={{
              opacity: 0.05,
              background: [
                "radial-gradient(circle at 20% 50%, rgba(6, 182, 212, 0.5) 0%, transparent 50%)",
                "radial-gradient(circle at 80% 70%, rgba(6, 182, 212, 0.5) 0%, transparent 50%)",
                "radial-gradient(circle at 40% 20%, rgba(6, 182, 212, 0.5) 0%, transparent 50%)",
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
            <Briefcase size={14} />
          </motion.div>
        </div>

        <p className="text-sm opacity-70 mb-auto line-clamp-3 flex-grow relative z-10">
          {post.description}
        </p>

        <div className="mt-4 pt-3 border-t border-gray-200/30 dark:border-gray-700/30 flex items-center relative z-10">
          <div className="flex items-center gap-2 overflow-hidden whitespace-nowrap">
            {post.tags &&
              post.tags.length > 0 &&
              post.tags.slice(0, 2).map((tag) => (
                <motion.span
                  key={tag}
                  className={`text-xs px-2 py-1 rounded-full ${tagClass} flex items-center gap-1 shrink-0`}
                  whileHover={{ scale: 1.05 }}
                >
                  {tag === "面试" && <Briefcase size={12} />}
                  {tag}
                </motion.span>
              ))}
            {post.tags && post.tags.length > 2 && (
              <span className="text-xs opacity-70">
                +{post.tags.length - 2}
              </span>
            )}
          </div>
        </div>

        {/* 悬停时显示的闪光效果 */}
        {hoveredCard === post._id && (
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

  return (
    <div className="w-full">
      {/* 标题区域 */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <motion.div
            className={`p-2 rounded-lg bg-gradient-to-r ${iconGradient} text-white transform transition-all duration-300`}
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            initial={{ rotate: 0 }}
          >
            <Briefcase size={20} />
          </motion.div>
          <motion.h3
            className={`text-xl font-bold bg-gradient-to-r ${textGradient} bg-clip-text text-transparent flex items-center gap-2`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            面试精华
            <motion.span
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <Sparkles
                size={16}
                className="text-cyan-500 dark:text-cyan-400"
              />
            </motion.span>
          </motion.h3>
        </div>
        <div className="flex items-center gap-2">
          <motion.button
            onClick={() => setViewMode("list")}
            className={`p-1.5 rounded-md transition-colors ${
              viewMode === "list" ? buttonColors.active : buttonColors.inactive
            }`}
            aria-label="列表视图"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <List size={18} />
          </motion.button>
          <motion.button
            onClick={() => setViewMode("grid")}
            className={`p-1.5 rounded-md transition-colors ${
              viewMode === "grid" ? buttonColors.active : buttonColors.inactive
            }`}
            aria-label="网格视图"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Grid size={18} />
          </motion.button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={viewMode}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {viewMode === "list" ? (
            <div className="space-y-4">
              {getDisplayPosts().map((post, index) =>
                renderListView(post, index)
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {getDisplayPosts().map((post, index) =>
                renderGridView(post, index)
              )}
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {interviewPosts.length > 3 && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
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
                "radial-gradient(circle at 20% 50%, rgba(6, 182, 212, 0.5) 0%, transparent 50%)",
                "radial-gradient(circle at 80% 70%, rgba(6, 182, 212, 0.5) 0%, transparent 50%)",
                "radial-gradient(circle at 40% 20%, rgba(6, 182, 212, 0.5) 0%, transparent 50%)",
              ],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />

          <span className="mr-2 relative z-10">
            {expanded ? "收起" : "查看更多面试题"}
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

export default React.memo(InterviewPosts);
