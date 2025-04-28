"use client";

import React from "react";
import { Calendar, Clock } from "lucide-react";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";
import { useThemeUtils } from "@/hooks/useThemeUtils";

interface TimeStatsProps {
  latestUpdate: string;
  avgReadingTime: number;
}

const TimeStats = ({ latestUpdate, avgReadingTime }: TimeStatsProps) => {
  const { theme, getThemeValue } = useThemeUtils();

  // 根据主题获取图标渐变色
  const getIconGradient = () => {
    const themeColors = {
      light:
        "from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500",
      dark: "from-purple-600 to-pink-600 hover:from-pink-600 hover:to-purple-600",
      green:
        "from-green-500 to-emerald-500 hover:from-emerald-500 hover:to-green-500",
      purple:
        "from-purple-500 to-fuchsia-500 hover:from-fuchsia-500 hover:to-purple-500",
      orange:
        "from-orange-500 to-red-500 hover:from-red-500 hover:to-orange-500",
      blue: "from-blue-500 to-sky-500 hover:from-sky-500 hover:to-blue-500",
      pink: "from-pink-500 to-purple-500 hover:from-purple-500 hover:to-pink-500",
      brown:
        "from-amber-600 to-yellow-700 hover:from-yellow-700 hover:to-amber-600",
    };

    return themeColors[theme as keyof typeof themeColors] || themeColors.light;
  };

  // 根据主题获取文字渐变色
  const getTextGradient = () => {
    const themeColors = {
      light: "from-purple-600 to-pink-600",
      dark: "from-purple-500 to-pink-500",
      green: "from-green-600 to-emerald-600",
      purple: "from-purple-600 to-fuchsia-600",
      orange: "from-orange-600 to-red-600",
      blue: "from-blue-600 to-sky-600",
      pink: "from-pink-600 to-purple-600",
      brown: "from-amber-700 to-yellow-600",
    };

    return themeColors[theme as keyof typeof themeColors] || themeColors.light;
  };

  // 根据主题获取图标颜色
  const getIconColor = () => {
    const themeColors = {
      light: "text-purple-500 group-hover/item:text-pink-500",
      dark: "text-purple-400 group-hover/item:text-pink-400",
      green: "text-green-500 group-hover/item:text-emerald-500",
      purple: "text-purple-500 group-hover/item:text-fuchsia-500",
      orange: "text-orange-500 group-hover/item:text-red-500",
      blue: "text-blue-500 group-hover/item:text-sky-500",
      pink: "text-pink-500 group-hover/item:text-purple-500",
      brown: "text-amber-600 group-hover/item:text-yellow-700",
    };

    return themeColors[theme as keyof typeof themeColors] || themeColors.light;
  };

  // 根据主题获取卡片背景渐变色
  const getCardGradient = () => {
    const themeColors = {
      light:
        "from-white to-purple-50/30 dark:from-gray-800 dark:to-purple-900/20",
      dark: "from-gray-800 to-purple-900/20",
      green:
        "from-white to-green-50/30 dark:from-gray-800 dark:to-green-900/20",
      purple:
        "from-white to-fuchsia-50/30 dark:from-gray-800 dark:to-fuchsia-900/20",
      orange: "from-white to-red-50/30 dark:from-gray-800 dark:to-red-900/20",
      blue: "from-white to-sky-50/30 dark:from-gray-800 dark:to-sky-900/20",
      pink: "from-white to-purple-50/30 dark:from-gray-800 dark:to-purple-900/20",
      brown:
        "from-white to-amber-50/40 dark:from-gray-800 dark:to-amber-900/30",
    };

    return themeColors[theme as keyof typeof themeColors] || themeColors.light;
  };

  // 根据主题获取悬停背景色
  const getHoverBgClass = () => {
    const themeColors = {
      light: "hover:bg-gray-50/80 dark:hover:bg-gray-800/50",
      dark: "hover:bg-gray-800/50",
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
      light: "hover:shadow-[0_0_15px_rgba(219,39,119,0.5)]",
      dark: "hover:shadow-[0_0_15px_rgba(192,38,211,0.5)]",
      green: "hover:shadow-[0_0_15px_rgba(16,185,129,0.5)]",
      purple: "hover:shadow-[0_0_15px_rgba(192,38,211,0.5)]",
      orange: "hover:shadow-[0_0_15px_rgba(239,68,68,0.5)]",
      blue: "hover:shadow-[0_0_15px_rgba(14,165,233,0.5)]",
      pink: "hover:shadow-[0_0_15px_rgba(168,85,247,0.5)]",
      brown: "hover:shadow-[0_0_15px_rgba(180,83,9,0.5)]",
    };

    return themeColors[theme as keyof typeof themeColors] || themeColors.light;
  };

  const iconGradient = getIconGradient();
  const textGradient = getTextGradient();
  const iconColor = getIconColor();
  const cardGradient = getCardGradient();
  const hoverBgClass = getHoverBgClass();
  const shadowEffect = getShadowEffect();

  const safeDate = (date?: string) => {
    if (!date) return null;
    const d = new Date(date);
    return isNaN(d.getTime()) ? null : d;
  };

  return (
    <div className="w-full">
      {/* 标题区域 */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div
            className={`p-2 rounded-lg bg-gradient-to-r ${iconGradient} text-white transform transition-all duration-300 hover:rotate-45`}
          >
            <Clock size={20} />
          </div>
          <h3
            className={`text-xl font-bold bg-gradient-to-r ${textGradient} bg-clip-text text-transparent`}
          >
            时间统计
          </h3>
        </div>
      </div>
      <div className="space-y-8">
        <div
          className={`group/item hover:transform hover:translate-x-3 transition-all duration-300 p-6 rounded-xl ${hoverBgClass} hover:shadow-md bg-gradient-to-br ${cardGradient}`}
        >
          <div className="flex items-center gap-4 mb-3">
            <Calendar
              size={24}
              className={`${iconColor} transition-all duration-300 transform group-hover/item:rotate-12 group-hover/item:scale-110`}
            />
            <span className="text-lg text-gray-700 dark:text-gray-300 font-medium">
              最近更新
            </span>
          </div>
          <span
            className={`text-xl font-medium bg-gradient-to-r ${textGradient} bg-clip-text text-transparent`}
          >
            {(() => {
              const d = safeDate(latestUpdate);
              return d ? format(d, "yyyy年MM月dd日", { locale: zhCN }) : "无日期";
            })()}
          </span>
        </div>
        <div
          className={`group/item hover:transform hover:translate-x-3 transition-all duration-300 p-6 rounded-xl ${hoverBgClass} hover:shadow-md bg-gradient-to-br ${cardGradient}`}
        >
          <div className="flex items-center gap-4 mb-3">
            <Clock
              size={24}
              className={`${iconColor} transition-all duration-300 transform group-hover/item:rotate-45`}
            />
            <span className="text-lg text-gray-700 dark:text-gray-300 font-medium">
              平均阅读时长
            </span>
          </div>
          <span
            className={`text-xl font-medium bg-gradient-to-r ${textGradient} bg-clip-text text-transparent`}
          >
            {avgReadingTime} 分钟
          </span>
        </div>
      </div>
    </div>
  );
};

export default React.memo(TimeStats);
