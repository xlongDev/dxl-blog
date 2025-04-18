"use client";

import React from "react";
import { Post } from "contentlayer/generated";
import { BarChart3, FileText, Folder, Hash } from "lucide-react";
import { useThemeUtils } from "@/hooks/useThemeUtils";

interface BasicStatsProps {
  totalPosts: number;
  totalCategories: number;
  totalTags: number;
}

const BasicStats = ({
  totalPosts,
  totalCategories,
  totalTags,
}: BasicStatsProps) => {
  const { theme, getThemeValue } = useThemeUtils();

  // 根据主题获取图标渐变色
  const getIconGradient = () => {
    const themeColors = {
      light:
        "from-blue-500 to-purple-500 hover:from-purple-500 hover:to-blue-500",
      dark: "from-blue-600 to-purple-600 hover:from-purple-600 hover:to-blue-600",
      green:
        "from-green-500 to-lime-500 hover:from-lime-500 hover:to-green-500",
      purple:
        "from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500",
      orange:
        "from-orange-500 to-red-500 hover:from-red-500 hover:to-orange-500",
      blue: "from-blue-500 to-indigo-500 hover:from-indigo-500 hover:to-blue-500",
      pink: "from-pink-500 to-purple-500 hover:from-purple-500 hover:to-pink-500",
      brown:
        "from-amber-600 to-yellow-700 hover:from-yellow-700 hover:to-amber-600",
    };

    return themeColors[theme as keyof typeof themeColors] || themeColors.light;
  };

  // 根据主题获取文字渐变色
  const getTextGradient = () => {
    const themeColors = {
      light: "from-blue-600 to-purple-600",
      dark: "from-blue-500 to-purple-500",
      green: "from-green-600 to-lime-600",
      purple: "from-purple-600 to-pink-600",
      orange: "from-orange-600 to-red-600",
      blue: "from-blue-600 to-indigo-600",
      pink: "from-pink-600 to-purple-600",
      brown: "from-amber-700 to-yellow-600",
    };

    return themeColors[theme as keyof typeof themeColors] || themeColors.light;
  };

  // 根据主题获取图标颜色
  const getIconColor = () => {
    const themeColors = {
      light: "text-blue-500 group-hover/item:text-purple-500",
      dark: "text-blue-400 group-hover/item:text-purple-400",
      green: "text-green-500 group-hover/item:text-lime-500",
      purple: "text-purple-500 group-hover/item:text-pink-500",
      orange: "text-orange-500 group-hover/item:text-red-500",
      blue: "text-blue-500 group-hover/item:text-indigo-500",
      pink: "text-pink-500 group-hover/item:text-purple-500",
      brown: "text-amber-600 group-hover/item:text-yellow-700",
    };

    return themeColors[theme as keyof typeof themeColors] || themeColors.light;
  };

  // 根据主题获取悬停背景色
  const getHoverBgClass = () => {
    const themeColors = {
      light: "hover:bg-blue-50/50 dark:hover:bg-blue-900/20",
      dark: "hover:bg-blue-900/20",
      green: "hover:bg-green-50/50 dark:hover:bg-green-900/20",
      purple: "hover:bg-purple-50/50 dark:hover:bg-purple-900/20",
      orange: "hover:bg-orange-50/50 dark:hover:bg-orange-900/20",
      blue: "hover:bg-blue-50/50 dark:hover:bg-blue-900/20",
      pink: "hover:bg-pink-50/50 dark:hover:bg-pink-900/20",
      brown: "hover:bg-amber-50/60 dark:hover:bg-amber-900/30",
    };

    return themeColors[theme as keyof typeof themeColors] || themeColors.light;
  };

  // 根据主题获取阴影效果
  const getShadowEffect = () => {
    const themeColors = {
      light: "hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]",
      dark: "hover:shadow-[0_0_15px_rgba(79,70,229,0.5)]",
      green: "hover:shadow-[0_0_15px_rgba(132,204,22,0.5)]",
      purple: "hover:shadow-[0_0_15px_rgba(219,39,119,0.5)]",
      orange: "hover:shadow-[0_0_15px_rgba(239,68,68,0.5)]",
      blue: "hover:shadow-[0_0_15px_rgba(79,70,229,0.5)]",
      pink: "hover:shadow-[0_0_15px_rgba(168,85,247,0.5)]",
      brown: "hover:shadow-[0_0_15px_rgba(180,83,9,0.5)]",
    };

    return themeColors[theme as keyof typeof themeColors] || themeColors.light;
  };

  const iconGradient = getIconGradient();
  const textGradient = getTextGradient();
  const iconColor = getIconColor();
  const hoverBgClass = getHoverBgClass();
  const shadowEffect = getShadowEffect();
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4 mb-8">
        <div
          className={`p-3 rounded-xl bg-gradient-to-r ${iconGradient} text-white shadow-lg transform transition-all duration-500 hover:scale-125 hover:rotate-12 ${shadowEffect}`}
        >
          <BarChart3 className="w-6 h-6" />
        </div>
        <h3
          className={`text-2xl font-bold bg-gradient-to-r ${textGradient} bg-clip-text text-transparent`}
        >
          博客统计
        </h3>
      </div>
      <div className="space-y-8">
        <div
          className={`flex items-center justify-between group/item hover:transform hover:translate-x-3 transition-all duration-300 p-4 rounded-xl ${hoverBgClass}`}
        >
          <div className="flex items-center gap-3">
            <FileText
              size={20}
              className={`${iconColor} transition-colors duration-300`}
            />
            <span className="text-base text-gray-700 dark:text-gray-300 font-medium">
              文章总数
            </span>
          </div>
          <span
            className={`text-2xl font-bold bg-gradient-to-r ${textGradient} bg-clip-text text-transparent`}
          >
            {totalPosts}
          </span>
        </div>
        <div
          className={`flex items-center justify-between group/item hover:transform hover:translate-x-3 transition-all duration-300 p-3 rounded-xl ${hoverBgClass}`}
        >
          <div className="flex items-center gap-3">
            <Folder
              size={20}
              className={`${iconColor} transition-colors duration-300`}
            />
            <span className="text-base text-gray-700 dark:text-gray-300 font-medium">
              文章分类
            </span>
          </div>
          <span
            className={`text-2xl font-bold bg-gradient-to-r ${textGradient} bg-clip-text text-transparent`}
          >
            {totalCategories}
          </span>
        </div>
        <div
          className={`flex items-center justify-between group/item hover:transform hover:translate-x-3 transition-all duration-300 p-3 rounded-xl ${hoverBgClass}`}
        >
          <div className="flex items-center gap-3">
            <Hash
              size={20}
              className={`${iconColor} transition-colors duration-300`}
            />
            <span className="text-base text-gray-700 dark:text-gray-300 font-medium">
              文章标签
            </span>
          </div>
          <span
            className={`text-2xl font-bold bg-gradient-to-r ${textGradient} bg-clip-text text-transparent`}
          >
            {totalTags}
          </span>
        </div>
      </div>
    </div>
  );
};

export default React.memo(BasicStats);
