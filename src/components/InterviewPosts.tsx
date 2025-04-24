"use client";

import React, { useState, useEffect } from "react";
import { Post } from "contentlayer/generated";
import { Briefcase, ChevronDown, ChevronUp, List, Grid, ExternalLink, Zap, Award } from "lucide-react";
import { useThemeUtils } from "@/hooks/useThemeUtils";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface InterviewPostsProps {
  interviewPosts: Post[];
}

const InterviewPosts = ({ interviewPosts }: InterviewPostsProps) => {
  const { theme, getThemeValue } = useThemeUtils();
  const [expanded, setExpanded] = useState(false);
  const [viewMode, setViewMode] = useState<"list" | "grid" | "card">("card");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [isHovering, setIsHovering] = useState<string | null>(null);

  // 提取所有面试文章的分类
  const categories = React.useMemo(() => {
    const allCategories = interviewPosts
      .flatMap(post => post.tags || [])
      .filter(tag => tag.includes("面试") || tag.includes("算法") || tag.includes("编程题"));
    
    return Array.from(new Set(allCategories));
  }, [interviewPosts]);

  // 根据主题获取图标渐变色
  const getIconGradient = () => {
    const themeColors = {
      light:
        "from-cyan-500 to-blue-500 hover:from-blue-500 hover:to-cyan-500",
      dark: "from-cyan-600 to-blue-600 hover:from-blue-600 hover:to-cyan-600",
      green:
        "from-emerald-500 to-green-500 hover:from-green-500 hover:to-emerald-500",
      purple:
        "from-fuchsia-500 to-purple-500 hover:from-purple-500 hover:to-fuchsia-500",
      orange:
        "from-yellow-500 to-orange-500 hover:from-orange-500 hover:to-yellow-500",
      blue: "from-cyan-500 to-blue-500 hover:from-blue-500 hover:to-cyan-500",
      pink: "from-fuchsia-500 to-pink-500 hover:from-pink-500 hover:to-fuchsia-500",
      brown:
        "from-yellow-500 to-amber-500 hover:from-amber-500 hover:to-yellow-500",
    };

    return themeColors[theme as keyof typeof themeColors] || themeColors.light;
  };

  // 根据主题获取文字渐变色
  const getTextGradient = () => {
    const themeColors = {
      light: "from-cyan-600 to-blue-600",
      dark: "from-cyan-500 to-blue-500",
      green: "from-emerald-600 to-green-600",
      purple: "from-fuchsia-600 to-purple-600",
      orange: "from-yellow-600 to-orange-600",
      blue: "from-cyan-600 to-blue-600",
      pink: "from-fuchsia-600 to-pink-600",
      brown: "from-yellow-700 to-amber-600",
    };

    return themeColors[theme as keyof typeof themeColors] || themeColors.light;
  };

  // 根据主题获取卡片背景渐变色
  const getCardGradient = () => {
    const themeColors = {
      light:
        "from-white to-cyan-50/30 dark:from-gray-800 dark:to-blue-900/20",
      dark: "from-gray-800 to-blue-900/20",
      green:
        "from-white to-green-50/30 dark:from-gray-800 dark:to-green-900/20",
      purple:
        "from-white to-fuchsia-50/30 dark:from-gray-800 dark:to-purple-900/20",
      orange:
        "from-white to-yellow-50/30 dark:from-gray-800 dark:to-orange-900/20",
      blue: "from-white to-cyan-50/30 dark:from-gray-800 dark:to-blue-900/20",
      pink: "from-white to-fuchsia-50/30 dark:from-gray-800 dark:to-pink-900/20",
      brown:
        "from-white to-yellow-50/40 dark:from-gray-800 dark:to-amber-900/30",
    };

    return themeColors[theme as keyof typeof themeColors] || themeColors.light;
  };

  // 根据主题获取边框颜色
  const getBorderClass = () => {
    const themeColors = {
      light: "border-cyan-200/50 dark:border-blue-700/50",
      dark: "border-blue-700/50",
      green: "border-green-200/50 dark:border-green-700/50",
      purple: "border-fuchsia-200/50 dark:border-purple-700/50",
      orange: "border-yellow-200/50 dark:border-orange-700/50",
      blue: "border-cyan-200/50 dark:border-blue-700/50",
      pink: "border-fuchsia-200/50 dark:border-pink-700/50",
      brown: "border-yellow-300/60 dark:border-amber-700/60",
    };

    return themeColors[theme as keyof typeof themeColors] || themeColors.light;
  };

  // 根据主题获取阴影效果
  const getShadowEffect = () => {
    const themeColors = {
      light: "hover:shadow-[0_0_20px_rgba(6,182,212,0.6)]",
      dark: "hover:shadow-[0_0_20px_rgba(2,132,199,0.6)]",
      green: "hover:shadow-[0_0_20px_rgba(16,185,129,0.6)]",
      purple: "hover:shadow-[0_0_20px_rgba(192,38,211,0.6)]",
      orange: "hover:shadow-[0_0_20px_rgba(245,158,11,0.6)]",
      blue: "hover:shadow-[0_0_20px_rgba(6,182,212,0.6)]",
      pink: "hover:shadow-[0_0_20px_rgba(219,39,119,0.6)]",
      brown: "hover:shadow-[0_0_20px_rgba(217,119,6,0.5)]",
    };

    return themeColors[theme as keyof typeof themeColors] || themeColors.light;
  };

  // 根据主题获取标签颜色
  const getTagClass = () => {
    const themeColors = {
      light: "bg-cyan-100 text-cyan-800 dark:bg-blue-900/40 dark:text-blue-300",
      dark: "bg-blue-900/40 text-blue-300",
      green: "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300",
      purple: "bg-fuchsia-100 text-fuchsia-800 dark:bg-purple-900/40 dark:text-purple-300",
      orange: "bg-yellow-100 text-yellow-800 dark:bg-orange-900/40 dark:text-orange-300",
      blue: "bg-cyan-100 text-cyan-800 dark:bg-blue-900/40 dark:text-blue-300",
      pink: "bg-fuchsia-100 text-fuchsia-800 dark:bg-pink-900/40 dark:text-pink-300",
      brown: "bg-yellow-100 text-yellow-800 dark:bg-amber-900/40 dark:text-amber-300",
    };

    return themeColors[theme as keyof typeof themeColors] || themeColors.light;
  };

  // 根据主题获取难度标签颜色
  const getDifficultyClass = (difficulty: string) => {
    if (difficulty.includes("简单") || difficulty.includes("初级")) {
      return "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300";
    } else if (difficulty.includes("中等") || difficulty.includes("中级")) {
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300";
    } else if (difficulty.includes("困难") || difficulty.includes("高级")) {
      return "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300";
    }
    return "bg-gray-100 text-gray-800 dark:bg-gray-900/40 dark:text-gray-300";
  };

  const iconGradient = getIconGradient();
  const textGradient = getTextGradient();
  const cardGradient = getCardGradient();
  const borderClass = getBorderClass();
  const shadowEffect = getShadowEffect();
  const tagClass = getTagClass();

  // 获取显示的文章数量
  const getDisplayPosts = () => {
    let filteredPosts = interviewPosts;
    
    if (activeCategory) {
      filteredPosts = interviewPosts.filter(post => 
        post.tags?.includes(activeCategory)
      );
    }
    
    return expanded ? filteredPosts : filteredPosts.slice(0, 3);
  };

  // 获取文章难度
  const getPostDifficulty = (post: Post) => {
    const difficultyTags = post.tags?.filter(tag => 
      tag.includes("简单") || tag.includes("中等") || tag.includes("困难") ||
      tag.includes("初级") || tag.includes("中级") || tag.includes("高级")
    );
    
    return difficultyTags && difficultyTags.length > 0 ? difficultyTags[0] : "未标记";
  };

  // 渲染列表视图的文章
  const renderListView = (post: Post, index: number) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      key={post._id}
    >
      <Link
        href={post.url}
        className={`block p-4 rounded-xl border ${borderClass} bg-gradient-to-br ${cardGradient} ${shadowEffect} transition-all duration-300 hover:scale-[1.02]`}
      >
        <div className="flex items-center justify-between">
          <h4 className="font-medium line-clamp-1 flex-1">{post.title}</h4>
          <div className="flex items-center gap-2">
            <span className="text-xs opacity-70 whitespace-nowrap">
              {post.views || 0} 阅读
            </span>
            <ExternalLink size={14} className="opacity-70" />
          </div>
        </div>
        <p className="text-sm opacity-70 mt-2 line-clamp-2">{post.description}</p>
        <div className="flex flex-wrap gap-2 mt-3 justify-between">
          <div className="flex flex-wrap gap-2">
            {post.tags && post.tags.length > 0 && post.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className={`text-xs px-2 py-1 rounded-full ${
                  tag.includes("简单") || tag.includes("中等") || tag.includes("困难") ||
                  tag.includes("初级") || tag.includes("中级") || tag.includes("高级")
                    ? getDifficultyClass(tag)
                    : tagClass
                }`}
              >
                {tag}
              </span>
            ))}
            {post.tags && post.tags.length > 2 && (
              <span className="text-xs opacity-70">+{post.tags.length - 2}</span>
            )}
          </div>
          <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyClass(getPostDifficulty(post))}`}>
            {getPostDifficulty(post)}
          </span>
        </div>
      </Link>
    </motion.div>
  );

  // 渲染网格视图的文章
  const renderGridView = (post: Post, index: number) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      key={post._id}
    >
      <Link
        href={post.url}
        className={`block p-5 rounded-xl border ${borderClass} bg-gradient-to-br ${cardGradient} ${shadowEffect} transition-all duration-300 hover:scale-[1.02] h-full flex flex-col`}
      >
        <div className="flex justify-between items-start mb-3">
          <h4 className="font-medium text-lg line-clamp-2 flex-1">{post.title}</h4>
          <div className={`p-1.5 rounded-lg bg-gradient-to-r ${iconGradient} text-white transform transition-all duration-300 hover:rotate-12`}>
            <Briefcase size={14} />
          </div>
        </div>
        <p className="text-sm opacity-70 mb-auto line-clamp-3 flex-grow">
          {post.description}
        </p>
        <div className="mt-4 pt-3 border-t border-gray-200/30 dark:border-gray-700/30 flex justify-between items-center">
          <div className="flex flex-wrap gap-2">
            {post.tags && post.tags.length > 0 && post.tags.slice(0, 1).map((tag) => (
              <span
                key={tag}
                className={`text-xs px-2 py-1 rounded-full ${
                  tag.includes("简单") || tag.includes("中等") || tag.includes("困难") ||
                  tag.includes("初级") || tag.includes("中级") || tag.includes("高级")
                    ? getDifficultyClass(tag)
                    : tagClass
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="text-xs opacity-70 flex items-center gap-1">
            <span>{post.views || 0}</span>
            <span>阅读</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );

  // 渲染卡片视图的文章
  const renderCardView = (post: Post, index: number) => {
    const difficulty = getPostDifficulty(post);
    const difficultyClass = getDifficultyClass(difficulty);
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4, delay: index * 0.1 }}
        key={post._id}
        onMouseEnter={() => setIsHovering(post._id)}
        onMouseLeave={() => setIsHovering(null)}
        className="relative"
      >
        <Link
          href={post.url}
          className={`block p-6 rounded-xl border ${borderClass} bg-gradient-to-br ${cardGradient} ${shadowEffect} transition-all duration-500 hover:scale-[1.03] h-full flex flex-col relative overflow-hidden`}
        >
          {/* 背景装饰 */}
          <div className="absolute -right-12 -top-12 w-24 h-24 rounded-full bg-gradient-to-br from-cyan-500/10 to-blue-500/10 dark:from-cyan-500/20 dark:to-blue-500/20 blur-xl transform transition-all duration-500 group-hover:scale-150"></div>
          
          {/* 难度标签 */}
          <div className="absolute top-4 right-4">
            <span className={`text-xs px-2 py-1 rounded-full ${difficultyClass} flex items-center gap-1`}>
              {difficulty.includes("简单") || difficulty.includes("初级") ? (
                <Award size={12} />
              ) : difficulty.includes("中等") || difficulty.includes("中级") ? (
                <Award size={12} />
              ) : (
                <Zap size={12} />
              )}
              {difficulty}
            </span>
          </div>
          
          <div className="flex flex-col h-full">
            <h4 className="font-medium text-lg mb-3 pr-16">{post.title}</h4>
            
            <p className="text-sm opacity-70 mb-4 line-clamp-3 flex-grow">
              {post.description}
            </p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags && post.tags
                .filter(tag => 
                  !tag.includes("简单") && !tag.includes("中等") && !tag.includes("困难") &&
                  !tag.includes("初级") && !tag.includes("中级") && !tag.includes("高级")
                )
                .slice(0, 3)
                .map((tag) => (
                  <span
                    key={tag}
                    className={`text-xs px-2 py-1 rounded-full ${tagClass}`}
                  >
                    {tag}
                  </span>
                ))}
            </div>
            
            <div className="flex justify-between items-center pt-3 border-t border-gray-200/30 dark:border-gray-700/30">
              <div className="text-xs opacity-70">
                {new Date(post.date).toLocaleDateString('zh-CN', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </div>
              <div className="text-xs opacity-70 flex items-center gap-1">
                <span>{post.views || 0}</span>
                <span>阅读</span>
              </div>
            </div>
            
            {/* 悬浮时显示的阅读按钮 */}
            <AnimatePresence>
              {isHovering === post._id && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-0 bg-gradient-to-br from-cyan-500/80 to-blue-500/80 dark:from-cyan-600/90 dark:to-blue-600/90 flex items-center justify-center"
                >
                  <div className="text-white font-medium flex flex-col items-center gap-2">
                    <span className="text-lg">阅读文章</span>
                    <ExternalLink size={24} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Link>
      </motion.div>
    );
  };

  // 根据主题获取视图切换按钮颜色
  const getViewButtonColors = () => {
    const themeColors = {
      light: {
        active:
          "bg-cyan-100 dark:bg-blue-900/30 text-cyan-600 dark:text-blue-400",
        inactive: "text-gray-400 hover:text-cyan-500",
      },
      dark: {
        active: "bg-gray-700 text-blue-400",
        inactive: "text-gray-500 hover:text-blue-400",
      },
      green: {
        active:
          "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400",
        inactive: "text-gray-400 hover:text-green-500",
      },
      purple: {
        active:
          "bg-fuchsia-100 dark:bg-purple-900/30 text-fuchsia-600 dark:text-purple-400",
        inactive: "text-gray-400 hover:text-fuchsia-500",
      },
      orange: {
        active:
          "bg-yellow-100 dark:bg-orange-900/30 text-yellow-600 dark:text-orange-400",
        inactive: "text-gray-400 hover:text-yellow-500",
      },
      blue: {
        active:
          "bg-cyan-100 dark:bg-blue-900/30 text-cyan-600 dark:text-blue-400",
        inactive: "text-gray-400 hover:text-cyan-500",
      },
      pink: {
        active:
          "bg-fuchsia-100 dark:bg-pink-900/30 text-fuchsia-600 dark:text-pink-400",
        inactive: "text-gray-400 hover:text-fuchsia-500",
      },
      brown: {
        active:
          "bg-yellow-100 dark:bg-amber-900/30 text-yellow-600 dark:text-amber-400",
        inactive: "text-gray-400 hover:text-yellow-500",
      },
    };

    return (
      themeColors[theme as keyof typeof themeColors] ||
      themeColors.light
    );
  };

  const buttonColors = getViewButtonColors();

  // 分类标签动画
  const categoryVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.3
      }
    })
  };

  return (
    <div className="w-full">
      {/* 标题区域 */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 12 }}
            whileTap={{ scale: 0.9 }}
            className={`p-2 rounded-lg bg-gradient-to-r ${iconGradient} text-white transform transition-all duration-300`}
          >
            <Briefcase size={20} />
          </motion.div>
          <h3
            className={`text-xl font-bold bg-gradient-to-r ${textGradient} bg-clip-text text-transparent`}
          >
            面试题库
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode("list")}
            className={`p-1.5 rounded-md transition-colors ${
              viewMode === "list"
                ? buttonColors.active
                : buttonColors.inactive
            }`}
            aria-label="列表视图"
          >
            <List size={18} />
          </button>
          <button
            onClick={() => setViewMode("grid")}
            className={`p-1.5 rounded-md transition-colors ${
              viewMode === "grid"
                ? buttonColors.active
                : buttonColors.inactive
            }`}
            aria-label="网格视图"
          >
            <Grid size={18} />
          </button>
          <button
            onClick={() => setViewMode("card")}
            className={`p-1.5 rounded-md transition-colors ${
              viewMode === "card"
                ? buttonColors.active
                : buttonColors.inactive
            }`}
            aria-label="卡片视图"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <rect x="7" y="7" width="10" height="10" rx="2" ry="2"></rect>
            </svg>
          </button>
        </div>
      </div>

      {/* 分类标签 */}
      {categories.length > 0 && (
        <div className="mb-6 flex flex-wrap gap-2">
          <motion.button
            custom={0}
            variants={categoryVariants}
            initial="hidden"
            animate="visible"
            onClick={() => setActiveCategory(null)}
            className={`px-3 py-1.5 rounded-full text-sm transition-all duration-300 ${
              activeCategory === null
                ? `bg-gradient-to-r ${iconGradient} text-white`
                : `bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700`
            }`}
          >
            全部
          </motion.button>
          {categories.map((category, index) => (
            <motion.button
              key={category}
              custom={index + 1}
              variants={categoryVariants}
              initial="hidden"
              animate="visible"
              onClick={() => setActiveCategory(category)}
              className={`px-3 py-1.5 rounded-full text-sm transition-all duration-300 ${
                activeCategory === category
                  ? `bg-gradient-to-r ${iconGradient} text-white`
                  : `bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700`
              }`}
            >
              {category}
            </motion.button>
          ))}
        </div>
      )}

      {/* 文章列表 */}
      <AnimatePresence mode="wait">
        <motion.div
          key={viewMode}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {viewMode === "list" ? (
            <div className="space-y-4">
              {getDisplayPosts().map((post, index) => renderListView(post, index))}
            </div>
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {getDisplayPosts().map((post, index) => renderGridView(post, index))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {getDisplayPosts().map((post, index) => renderCardView(post, index))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* 展开/收起按钮 */}
      {interviewPosts.length > 3 && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          onClick={() => setExpanded(!expanded)}
          className={`mt-5 w-full flex items-center justify-center p-2 rounded-lg border ${borderClass} bg-gradient-to-br ${cardGradient} transition-all duration-300 hover:shadow-md group`}
        >
          <span className="mr-2">{expanded ? "收起" : "查看更多面试题"}</span>
          <motion.div
            animate={{ y: expanded ? 0 : 3 }}
            transition={{ 
              repeat: expanded ? 0 : Infinity, 
              repeatType: "reverse", 
              duration: 0.6 
            }}
          >
            {expanded ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </motion.div>
        </motion.button>
      )}
    </div>
  );
};

export default React.memo(InterviewPosts);