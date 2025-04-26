"use client";
import React from "react";
import { BarChart2, FileText, Clock, MessageCircle } from "lucide-react";

import { useBlogStats } from "@/hooks/useBlogStats";
import { useThemeUtils } from "@/hooks/useThemeUtils";

interface ExtendedStatsProps {
  totalViews: number;
  totalWords: number;
  readingTimeDistribution: Record<string, number>;
  totalLikes: number;
}

const ExtendedStats = ({
  totalWords,
  readingTimeDistribution,
  totalViews,
  totalLikes,
}: ExtendedStatsProps) => {
  const { stats, loading, error } = useBlogStats();
  const { theme } = useThemeUtils();

  // 根据主题获取背景渐变色
  const getGradientBgClass = () => {
    const themeColors = {
      light:
        "from-white via-white to-blue-50 dark:from-gray-800 dark:via-gray-800 dark:to-blue-900/20",
      dark: "from-gray-800 via-gray-800 to-blue-900/20",
      green:
        "from-white via-white to-green-50 dark:from-gray-800 dark:via-gray-800 dark:to-green-900/20",
      purple:
        "from-white via-white to-purple-50 dark:from-gray-800 dark:via-gray-800 dark:to-purple-900/20",
      orange:
        "from-white via-white to-orange-50 dark:from-gray-800 dark:via-gray-800 dark:to-orange-900/20",
      blue: "from-white via-white to-blue-50 dark:from-gray-800 dark:via-gray-800 dark:to-blue-900/20",
      pink: "from-white via-white to-pink-50 dark:from-gray-800 dark:via-gray-800 dark:to-pink-900/20",
      brown:
        "from-white via-white to-amber-50 dark:from-gray-800 dark:via-gray-800 dark:to-amber-900/20",
    };

    return themeColors[theme as keyof typeof themeColors] || themeColors.light;
  };

  // 根据主题获取悬停渐变背景色
  const getHoverGradientClass = () => {
    const themeColors = {
      light: "from-blue-500/5 via-purple-500/5 to-pink-500/5",
      dark: "from-blue-500/5 via-purple-500/5 to-pink-500/5",
      green: "from-green-500/5 via-teal-500/5 to-emerald-500/5",
      purple: "from-purple-500/5 via-indigo-500/5 to-violet-500/5",
      orange: "from-orange-500/5 via-amber-500/5 to-yellow-500/5",
      blue: "from-blue-500/5 via-cyan-500/5 to-sky-500/5",
      pink: "from-pink-500/5 via-rose-500/5 to-fuchsia-500/5",
      brown: "from-amber-500/5 via-yellow-500/5 to-orange-500/5",
    };

    return themeColors[theme as keyof typeof themeColors] || themeColors.light;
  };

  // 根据主题获取边框颜色
  const getBorderClass = () => {
    const themeColors = {
      light: "border-gray-200/50 dark:border-gray-700/50",
      dark: "border-gray-700/50",
      green: "border-green-200/50 dark:border-green-700/50",
      purple: "border-purple-200/50 dark:border-purple-700/50",
      orange: "border-orange-200/50 dark:border-orange-700/50",
      blue: "border-blue-200/50 dark:border-blue-700/50",
      pink: "border-pink-200/50 dark:border-pink-700/50",
      brown: "border-amber-200/50 dark:border-amber-700/50",
    };

    return themeColors[theme as keyof typeof themeColors] || themeColors.light;
  };

  // 根据主题获取文字渐变色
  const getTextGradientClass = () => {
    const themeColors = {
      light: "from-green-600 to-teal-600",
      dark: "from-green-500 to-teal-500",
      green: "from-green-600 to-teal-600",
      purple: "from-purple-600 to-indigo-600",
      orange: "from-orange-600 to-amber-600",
      blue: "from-blue-600 to-cyan-600",
      pink: "from-pink-600 to-rose-600",
      brown: "from-amber-600 to-yellow-600",
    };

    return themeColors[theme as keyof typeof themeColors] || themeColors.light;
  };

  // 根据主题获取图标颜色
  const getIconColorClass = () => {
    const themeColors = {
      light: "text-green-500 group-hover/item:text-teal-500",
      dark: "text-green-400 group-hover/item:text-teal-400",
      green: "text-green-500 group-hover/item:text-teal-500",
      purple: "text-purple-500 group-hover/item:text-indigo-500",
      orange: "text-orange-500 group-hover/item:text-amber-500",
      blue: "text-blue-500 group-hover/item:text-cyan-500",
      pink: "text-pink-500 group-hover/item:text-rose-500",
      brown: "text-amber-500 group-hover/item:text-yellow-500",
    };

    return themeColors[theme as keyof typeof themeColors] || themeColors.light;
  };

  // 根据主题获取标签文字颜色
  const getTagTextClass = () => {
    const themeColors = {
      light: "text-blue-600 dark:text-blue-400",
      dark: "text-blue-400",
      green: "text-green-600 dark:text-green-400",
      purple: "text-purple-600 dark:text-purple-400",
      orange: "text-orange-600 dark:text-orange-400",
      blue: "text-blue-600 dark:text-blue-400",
      pink: "text-pink-600 dark:text-pink-400",
      brown: "text-amber-600 dark:text-amber-400",
    };

    return themeColors[theme as keyof typeof themeColors] || themeColors.light;
  };

  const gradientBgClass = getGradientBgClass();
  const hoverGradientClass = getHoverGradientClass();
  const borderClass = getBorderClass();
  const textGradientClass = getTextGradientClass();
  const iconColorClass = getIconColorClass();
  const tagTextClass = getTagTextClass();

  if (loading) {
    return <div>加载中...</div>;
  }

  if (error) {
    return <div>加载失败: {error}</div>;
  }

  // 根据主题获取图标渐变色
  const getIconGradient = () => {
    const themeColors = {
      light:
        "from-green-500 to-teal-500 hover:from-teal-500 hover:to-green-500",
      dark: "from-green-600 to-teal-600 hover:from-teal-600 hover:to-green-600",
      green:
        "from-green-500 to-teal-500 hover:from-teal-500 hover:to-green-500",
      purple:
        "from-purple-500 to-indigo-500 hover:from-indigo-500 hover:to-purple-500",
      orange:
        "from-orange-500 to-amber-500 hover:from-amber-500 hover:to-orange-500",
      blue: "from-blue-500 to-cyan-500 hover:from-cyan-500 hover:to-blue-500",
      pink: "from-pink-500 to-rose-500 hover:from-rose-500 hover:to-pink-500",
      brown:
        "from-amber-600 to-yellow-600 hover:from-yellow-600 hover:to-amber-600",
    };

    return themeColors[theme as keyof typeof themeColors] || themeColors.light;
  };

  const iconGradient = getIconGradient();

  return (
    <div className="w-full">
      {/* 标题区域 */}
      <div className="flex items-center gap-3 mb-6">
        <div
          className={`p-2 rounded-lg bg-gradient-to-r ${iconGradient} text-white transform transition-all duration-300 hover:rotate-12 hover:scale-110`}
        >
          <BarChart2 size={20} />
        </div>
        <h3
          className={`text-xl font-bold bg-gradient-to-r ${textGradientClass} bg-clip-text text-transparent`}
        >
          详细统计
        </h3>
      </div>

      {/* 统计卡片网格 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 lg:gap-6">
        {/* 总阅读量卡片 */}
        <div
          className={`group/item relative overflow-hidden hover:transform hover:translate-y-[-0.5rem] transition-all duration-300 p-4 md:p-5 lg:p-6 rounded-xl bg-gradient-to-br ${gradientBgClass} shadow-md hover:shadow-xl border ${borderClass}`}
        >
          <div
            className={`absolute inset-0 bg-gradient-to-br ${hoverGradientClass} opacity-0 group-hover/item:opacity-100 transition-opacity duration-500`}
          />
          <div className="relative z-10 flex items-center gap-3 mb-3">
            <BarChart2
              size={22}
              className={`${iconColorClass} transition-all duration-300 transform group-hover/item:rotate-12 group-hover/item:scale-110`}
            />
            <span className="text-base text-gray-700 dark:text-gray-300 font-medium">
              总阅读量
            </span>
          </div>
          <span
            className={`relative z-10 text-2xl md:text-3xl font-bold bg-gradient-to-r ${textGradientClass} bg-clip-text text-transparent`}
          >
            {stats.totalViews.toLocaleString()}
          </span>
        </div>

        {/* 总字数卡片 */}
        <div
          className={`group/item relative overflow-hidden hover:transform hover:translate-y-[-0.5rem] transition-all duration-300 p-4 md:p-5 lg:p-6 rounded-xl bg-gradient-to-br ${gradientBgClass} shadow-md hover:shadow-xl border ${borderClass}`}
        >
          <div
            className={`absolute inset-0 bg-gradient-to-br ${hoverGradientClass} opacity-0 group-hover/item:opacity-100 transition-opacity duration-500`}
          />
          <div className="relative z-10 flex items-center gap-3 mb-3">
            <FileText
              size={22}
              className={`${iconColorClass} transition-all duration-300 transform group-hover/item:scale-125`}
            />
            <span className="text-base text-gray-700 dark:text-gray-300 font-medium">
              总字数
            </span>
          </div>
          <span
            className={`relative z-10 text-2xl md:text-3xl font-bold bg-gradient-to-r ${textGradientClass} bg-clip-text text-transparent`}
          >
            {totalWords.toLocaleString()}
          </span>
        </div>

        {/* 阅读时长分布卡片 */}
        <div
          className={`group/item relative overflow-hidden hover:transform hover:translate-y-[-0.5rem] transition-all duration-300 p-4 md:p-5 lg:p-6 rounded-xl bg-gradient-to-br ${gradientBgClass} shadow-md hover:shadow-xl border ${borderClass}`}
        >
          <div
            className={`absolute inset-0 bg-gradient-to-br ${hoverGradientClass} opacity-0 group-hover/item:opacity-100 transition-opacity duration-500`}
          />
          <div className="relative z-10 flex items-center gap-3 mb-3">
            <Clock
              size={22}
              className={`${iconColorClass} transition-all duration-300 transform group-hover/item:rotate-45`}
            />
            <span className="text-base text-gray-700 dark:text-gray-300 font-medium">
              阅读时长分布
            </span>
          </div>
          <div className="relative z-10 space-y-1">
            {Object.entries(readingTimeDistribution).map(
              ([category, count]) => (
                <div
                  key={category}
                  className="flex justify-between items-center py-0.5"
                >
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {category}
                  </span>
                  <span className={`text-sm font-medium ${tagTextClass}`}>
                    {count} 篇
                  </span>
                </div>
              )
            )}
          </div>
        </div>

        {/* 总点赞数卡片 */}
        <div
          className={`group/item relative overflow-hidden hover:transform hover:translate-y-[-0.5rem] transition-all duration-300 p-4 md:p-5 lg:p-6 rounded-xl bg-gradient-to-br ${gradientBgClass} shadow-md hover:shadow-xl border ${borderClass}`}
        >
          <div
            className={`absolute inset-0 bg-gradient-to-br ${hoverGradientClass} opacity-0 group-hover/item:opacity-100 transition-opacity duration-500`}
          />
          <div className="relative z-10 flex items-center gap-3 mb-3">
            <MessageCircle
              size={22}
              className={`${iconColorClass} transition-all duration-300 transform group-hover/item:translate-y-[-5px]`}
            />
            <span className="text-base text-gray-700 dark:text-gray-300 font-medium">
              总点赞数
            </span>
          </div>
          <span
            className={`relative z-10 text-2xl md:text-3xl font-bold bg-gradient-to-r ${textGradientClass} bg-clip-text text-transparent`}
          >
            {stats.totalLikes.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ExtendedStats);
