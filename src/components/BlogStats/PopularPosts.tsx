"use client";

import React from "react";
import { Post } from "contentlayer/generated";
import { TrendingUp } from "lucide-react";
import { useThemeUtils } from "@/hooks/useThemeUtils";
import Link from "next/link";

interface PopularPostsProps {
  topPosts: Post[];
}

const PopularPosts = ({ topPosts }: PopularPostsProps) => {
  const { theme, getThemeValue } = useThemeUtils();

  // 根据主题获取图标渐变色
  const getIconGradient = () => {
    const themeColors = {
      light:
        "from-emerald-500 to-blue-500 hover:from-blue-500 hover:to-emerald-500",
      dark: "from-emerald-600 to-blue-600 hover:from-blue-600 hover:to-emerald-600",
      green:
        "from-green-500 to-teal-500 hover:from-teal-500 hover:to-green-500",
      purple:
        "from-purple-500 to-violet-500 hover:from-violet-500 hover:to-purple-500",
      orange:
        "from-orange-500 to-yellow-500 hover:from-yellow-500 hover:to-orange-500",
      blue: "from-blue-500 to-indigo-500 hover:from-indigo-500 hover:to-blue-500",
      pink: "from-pink-500 to-fuchsia-500 hover:from-fuchsia-500 hover:to-pink-500",
      brown:
        "from-amber-600 to-yellow-700 hover:from-yellow-700 hover:to-amber-600",
    };

    return themeColors[theme as keyof typeof themeColors] || themeColors.light;
  };

  // 根据主题获取文字渐变色
  const getTextGradient = () => {
    const themeColors = {
      light: "from-emerald-600 to-blue-600",
      dark: "from-emerald-500 to-blue-500",
      green: "from-green-600 to-teal-600",
      purple: "from-purple-600 to-violet-600",
      orange: "from-orange-600 to-yellow-600",
      blue: "from-blue-600 to-indigo-600",
      pink: "from-pink-600 to-fuchsia-600",
      brown: "from-amber-700 to-yellow-600",
    };

    return themeColors[theme as keyof typeof themeColors] || themeColors.light;
  };

  // 根据主题获取卡片背景渐变色
  const getCardGradient = () => {
    const themeColors = {
      light:
        "from-white to-emerald-50/30 dark:from-gray-800 dark:to-emerald-900/20",
      dark: "from-gray-800 to-emerald-900/20",
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
      light: "border-emerald-200/50 dark:border-emerald-700/50",
      dark: "border-emerald-700/50",
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
      light: "hover:shadow-[0_0_20px_rgba(16,185,129,0.6)]",
      dark: "hover:shadow-[0_0_20px_rgba(5,150,105,0.6)]",
      green: "hover:shadow-[0_0_20px_rgba(16,185,129,0.6)]",
      purple: "hover:shadow-[0_0_20px_rgba(139,92,246,0.6)]",
      orange: "hover:shadow-[0_0_20px_rgba(249,115,22,0.6)]",
      blue: "hover:shadow-[0_0_20px_rgba(59,130,246,0.6)]",
      pink: "hover:shadow-[0_0_20px_rgba(236,72,153,0.6)]",
      brown: "hover:shadow-[0_0_20px_rgba(180,83,9,0.5)]",
    };

    return themeColors[theme as keyof typeof themeColors] || themeColors.light;
  };

  // 根据主题获取数字序号背景色
  const getNumberBgClass = () => {
    const themeColors = {
      light:
        "bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400",
      dark: "bg-emerald-900/50 text-emerald-400",
      green:
        "bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400",
      purple:
        "bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400",
      orange:
        "bg-orange-100 dark:bg-orange-900/50 text-orange-600 dark:text-orange-400",
      blue: "bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400",
      pink: "bg-pink-100 dark:bg-pink-900/50 text-pink-600 dark:text-pink-400",
      brown:
        "bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400",
    };

    return themeColors[theme as keyof typeof themeColors] || themeColors.light;
  };

  // 根据主题获取文章标题hover状态颜色
  const getTitleHoverClass = () => {
    const themeColors = {
      light: "hover:text-emerald-600 dark:hover:text-emerald-400",
      dark: "hover:text-emerald-400",
      green: "hover:text-green-600 dark:hover:text-green-400",
      purple: "hover:text-purple-600 dark:hover:text-purple-400",
      orange: "hover:text-orange-600 dark:hover:text-orange-400",
      blue: "hover:text-blue-600 dark:hover:text-blue-400",
      pink: "hover:text-pink-600 dark:hover:text-pink-400",
      brown: "hover:text-amber-600 dark:hover:text-amber-400",
    };

    return themeColors[theme as keyof typeof themeColors] || themeColors.light;
  };

  const iconGradient = getIconGradient();
  const textGradient = getTextGradient();
  const cardGradient = getCardGradient();
  const borderClass = getBorderClass();
  const shadowEffect = getShadowEffect();
  const numberBgClass = getNumberBgClass();
  const titleHoverClass = getTitleHoverClass();
  return (
    <div className="w-full">
      {/* 标题区域 */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div
            className={`p-2 rounded-lg bg-gradient-to-r ${iconGradient} text-white transform transition-all duration-300 hover:translate-y-[-5px]`}
          >
            <TrendingUp size={20} />
          </div>
          <h3
            className={`text-xl font-bold bg-gradient-to-r ${textGradient} bg-clip-text text-transparent`}
          >
            热门文章
          </h3>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {topPosts.map((post, index) => (
          <Link
            key={post._id}
            href={post.url}
            className={`block p-4 rounded-xl bg-gradient-to-br ${cardGradient} shadow-md hover:shadow-xl transition-all duration-300 hover:transform hover:translate-y-[-0.25rem] border ${borderClass}`}
          >
            <div className="flex items-center gap-3 mb-2">
              <span
                className={`flex items-center justify-center w-6 h-6 rounded-full ${numberBgClass} text-sm font-medium`}
              >
                {index + 1}
              </span>
              <h4
                className={`font-medium text-gray-900 dark:text-gray-100 ${titleHoverClass} transition-colors line-clamp-1`}
              >
                {post.title}
              </h4>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <TrendingUp className="w-4 h-4" />
              <span>{post.views || 0} 次阅读</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default React.memo(PopularPosts);
