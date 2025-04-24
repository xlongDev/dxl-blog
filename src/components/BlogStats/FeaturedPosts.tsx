"use client";

import React, { useState } from "react";
import { Post } from "contentlayer/generated";
import { Star, ChevronDown, ChevronUp, List, Grid } from "lucide-react";
import { useThemeUtils } from "@/hooks/useThemeUtils";
import Link from "next/link";

interface FeaturedPostsProps {
  featuredPosts: Post[];
}

const FeaturedPosts = ({ featuredPosts }: FeaturedPostsProps) => {
  const { theme, getThemeValue } = useThemeUtils();
  const [expanded, setExpanded] = useState(false);
  const [viewMode, setViewMode] = useState<"list" | "card">("list");

  // 根据主题获取图标渐变色
  const getIconGradient = () => {
    const themeColors = {
      light:
        "from-amber-500 to-orange-500 hover:from-orange-500 hover:to-amber-500",
      dark: "from-amber-600 to-orange-600 hover:from-orange-600 hover:to-amber-600",
      green:
        "from-green-500 to-emerald-500 hover:from-emerald-500 hover:to-green-500",
      purple:
        "from-purple-500 to-indigo-500 hover:from-indigo-500 hover:to-purple-500",
      orange:
        "from-orange-500 to-red-500 hover:from-red-500 hover:to-orange-500",
      blue: "from-blue-500 to-cyan-500 hover:from-cyan-500 hover:to-blue-500",
      pink: "from-pink-500 to-rose-500 hover:from-rose-500 hover:to-pink-500",
      brown:
        "from-amber-600 to-orange-600 hover:from-orange-600 hover:to-amber-600",
    };

    return themeColors[theme as keyof typeof themeColors] || themeColors.light;
  };

  // 根据主题获取文字渐变色
  const getTextGradient = () => {
    const themeColors = {
      light: "from-amber-600 to-orange-600",
      dark: "from-amber-500 to-orange-500",
      green: "from-green-600 to-emerald-600",
      purple: "from-purple-600 to-indigo-600",
      orange: "from-orange-600 to-red-600",
      blue: "from-blue-600 to-cyan-600",
      pink: "from-pink-600 to-rose-600",
      brown: "from-amber-700 to-orange-600",
    };

    return themeColors[theme as keyof typeof themeColors] || themeColors.light;
  };

  // 根据主题获取卡片背景渐变色
  const getCardGradient = () => {
    const themeColors = {
      light:
        "from-white to-amber-50/30 dark:from-gray-800 dark:to-amber-900/20",
      dark: "from-gray-800 to-amber-900/20",
      green:
        "from-white to-green-50/30 dark:from-gray-800 dark:to-green-900/20",
      purple:
        "from-white to-purple-50/30 dark:from-gray-800 dark:to-purple-900/20",
      orange:
        "from-white to-orange-50/30 dark:from-gray-800 dark:to-orange-900/20",
      blue: "from-white to-blue-50/30 dark:from-gray-800 dark:to-blue-900/20",
      pink: "from-white to-pink-50/30 dark:from-gray-800 dark:to-pink-900/20",
      brown:
        "from-white to-amber-50/40 dark:from-gray-800 dark:to-amber-900/30",
    };

    return themeColors[theme as keyof typeof themeColors] || themeColors.light;
  };

  // 根据主题获取边框颜色
  const getBorderClass = () => {
    const themeColors = {
      light: "border-amber-200/50 dark:border-amber-700/50",
      dark: "border-amber-700/50",
      green: "border-green-200/50 dark:border-green-700/50",
      purple: "border-purple-200/50 dark:border-purple-700/50",
      orange: "border-orange-200/50 dark:border-orange-700/50",
      blue: "border-blue-200/50 dark:border-blue-700/50",
      pink: "border-pink-200/50 dark:border-pink-700/50",
      brown: "border-amber-300/60 dark:border-amber-700/60",
    };

    return themeColors[theme as keyof typeof themeColors] || themeColors.light;
  };

  // 根据主题获取阴影效果
  const getShadowEffect = () => {
    const themeColors = {
      light: "hover:shadow-[0_0_20px_rgba(245,158,11,0.6)]",
      dark: "hover:shadow-[0_0_20px_rgba(217,119,6,0.6)]",
      green: "hover:shadow-[0_0_20px_rgba(16,185,129,0.6)]",
      purple: "hover:shadow-[0_0_20px_rgba(139,92,246,0.6)]",
      orange: "hover:shadow-[0_0_20px_rgba(249,115,22,0.6)]",
      blue: "hover:shadow-[0_0_20px_rgba(59,130,246,0.6)]",
      pink: "hover:shadow-[0_0_20px_rgba(236,72,153,0.6)]",
      brown: "hover:shadow-[0_0_20px_rgba(180,83,9,0.5)]",
    };

    return themeColors[theme as keyof typeof themeColors] || themeColors.light;
  };

  const iconGradient = getIconGradient();
  const textGradient = getTextGradient();
  const cardGradient = getCardGradient();
  const borderClass = getBorderClass();
  const shadowEffect = getShadowEffect();

  // 获取显示的文章数量
  const getDisplayPosts = () => {
    return expanded ? featuredPosts : featuredPosts.slice(0, 3);
  };

  // 渲染列表视图的文章
  const renderListView = (post: Post) => (
    <Link
      href={post.url}
      key={post._id}
      className={`block p-3 rounded-xl border ${borderClass} bg-gradient-to-br ${cardGradient} ${shadowEffect} transition-all duration-300 hover:scale-[1.02]`}
    >
      <div className="flex items-center justify-between">
        <h4 className="font-medium line-clamp-1 flex-1">{post.title}</h4>
        <div className="text-xs opacity-70 whitespace-nowrap ml-2">
          {post.views || 0} 阅读
        </div>
      </div>
      <p className="text-xs opacity-70 mt-1 line-clamp-1">{post.description}</p>
    </Link>
  );

  // 渲染卡片视图的文章
  const renderCardView = (post: Post) => (
    <Link
      href={post.url}
      key={post._id}
      className={`block p-4 rounded-xl border ${borderClass} bg-gradient-to-br ${cardGradient} ${shadowEffect} transition-all duration-300 hover:scale-[1.02] h-full flex flex-col`}
    >
      <h4 className="font-medium text-center mb-2 line-clamp-1">
        {post.title}
      </h4>
      <p className="text-xs opacity-70 mb-auto line-clamp-2 flex-grow">
        {post.description}
      </p>
      <div className="text-xs opacity-70 mt-3 text-center">
        {post.views || 0} 阅读
      </div>
    </Link>
  );

  return (
    <div className="w-full">
      {/* 标题区域 */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div
            className={`p-2 rounded-lg bg-gradient-to-r ${iconGradient} text-white transform transition-all duration-300 hover:scale-110 hover:rotate-45`}
          >
            <Star size={20} />
          </div>
          <h3
            className={`text-xl font-bold bg-gradient-to-r ${textGradient} bg-clip-text text-transparent`}
          >
            精选文章
          </h3>
        </div>
        {/* 根据主题获取视图切换按钮颜色 */}
        {(() => {
          const getViewButtonColors = () => {
            const themeColors = {
              light: {
                active:
                  "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400",
                inactive: "text-gray-400 hover:text-amber-500",
              },
              dark: {
                active: "bg-gray-700 text-amber-400",
                inactive: "text-gray-500 hover:text-amber-400",
              },
              green: {
                active:
                  "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400",
                inactive: "text-gray-400 hover:text-green-500",
              },
              purple: {
                active:
                  "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400",
                inactive: "text-gray-400 hover:text-purple-500",
              },
              orange: {
                active:
                  "bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400",
                inactive: "text-gray-400 hover:text-orange-500",
              },
              blue: {
                active:
                  "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
                inactive: "text-gray-400 hover:text-blue-500",
              },
              pink: {
                active:
                  "bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400",
                inactive: "text-gray-400 hover:text-pink-500",
              },
              brown: {
                active:
                  "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400",
                inactive: "text-gray-400 hover:text-amber-500",
              },
            };

            return (
              themeColors[theme as keyof typeof themeColors] ||
              themeColors.light
            );
          };

          const buttonColors = getViewButtonColors();

          return (
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
                onClick={() => setViewMode("card")}
                className={`p-1.5 rounded-md transition-colors ${
                  viewMode === "card"
                    ? buttonColors.active
                    : buttonColors.inactive
                }`}
                aria-label="卡片视图"
              >
                <Grid size={18} />
              </button>
            </div>
          );
        })()}
      </div>

      {viewMode === "list" ? (
        <div className="space-y-3">
          {getDisplayPosts().map((post) => renderListView(post))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {getDisplayPosts().map((post) => renderCardView(post))}
        </div>
      )}

      {featuredPosts.length > 3 && (
        <button
          onClick={() => setExpanded(!expanded)}
          className={`mt-4 w-full flex items-center justify-center p-2 rounded-lg border ${borderClass} bg-gradient-to-br ${cardGradient} transition-all duration-300 hover:shadow-md`}
        >
          <span className="mr-2">{expanded ? "收起" : "查看更多精选"}</span>
          {expanded ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>
      )}
    </div>
  );
};

export default React.memo(FeaturedPosts);
