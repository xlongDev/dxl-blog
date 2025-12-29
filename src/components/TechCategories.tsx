"use client";

import React from "react";
import Link from "next/link";
import { allPosts } from "contentlayer/generated";
import { motion } from "framer-motion";
import { Folder, Clock } from "lucide-react";
import TechCategoryIcon from "./icons/TechCategoryIcons";
import { useThemeUtils } from "@/hooks/useThemeUtils";

interface CategoryInfo {
  name: string;
  count: number;
  lastUpdated: string;
}

const getCategoryInfo = (): CategoryInfo[] => {
  const categoryMap = new Map<string, CategoryInfo>();

  allPosts.forEach((post) => {
    if (!post.category) return;

    const info = categoryMap.get(post.category) || {
      name: post.category,
      count: 0,
      lastUpdated: post.date,
    };

    info.count++;
    if (post.date > info.lastUpdated) {
      info.lastUpdated = post.date;
    }

    categoryMap.set(post.category, info);
  });

  return Array.from(categoryMap.values()).sort((a, b) => {
    const isChineseA = /[\u4e00-\u9fa5]/.test(a.name);
    const isChineseB = /[\u4e00-\u9fa5]/.test(b.name);

    if (isChineseA === isChineseB) {
      // 明确指定 locale 来保证服务端和客户端的排序一致性
      return a.name.localeCompare(b.name, "zh-CN");
    }
    return isChineseA ? 1 : -1;
  });
};

const categories = getCategoryInfo();

export default function TechCategories() {
  const { theme } = useThemeUtils();

  // 根据主题获取渐变背景色
  const getGradientBgClass = () => {
    const themeColors = {
      light:
        "from-white/80 to-gray-50/80 dark:from-gray-800/80 dark:to-gray-900/80",
      dark: "from-gray-800/80 to-gray-900/80",
      green:
        "from-white/80 to-green-50/80 dark:from-gray-800/80 dark:to-green-900/80",
      purple:
        "from-white/80 to-purple-50/80 dark:from-gray-800/80 dark:to-purple-900/80",
      orange:
        "from-white/80 to-orange-50/80 dark:from-gray-800/80 dark:to-orange-900/80",
      blue: "from-white/80 to-blue-50/80 dark:from-gray-800/80 dark:to-blue-900/80",
      pink: "from-white/80 to-pink-50/80 dark:from-gray-800/80 dark:to-pink-900/80",
      brown:
        "from-white/80 to-amber-50/80 dark:from-gray-800/80 dark:to-amber-900/80",
    };

    return themeColors[theme as keyof typeof themeColors] || themeColors.light;
  };

  // 根据主题获取悬停渐变背景色
  const getHoverGradientClass = () => {
    const themeColors = {
      light: "from-blue-500/10 via-purple-500/10 to-pink-500/10",
      dark: "from-blue-500/10 via-purple-500/10 to-pink-500/10",
      green: "from-green-500/10 via-teal-500/10 to-emerald-500/10",
      purple: "from-purple-500/10 via-indigo-500/10 to-violet-500/10",
      orange: "from-orange-500/10 via-amber-500/10 to-yellow-500/10",
      blue: "from-blue-500/10 via-cyan-500/10 to-sky-500/10",
      pink: "from-pink-500/10 via-rose-500/10 to-fuchsia-500/10",
      brown: "from-amber-500/10 via-yellow-500/10 to-orange-500/10",
    };

    return themeColors[theme as keyof typeof themeColors] || themeColors.light;
  };

  // 根据主题获取边框颜色
  const getBorderClass = () => {
    const themeColors = {
      light:
        "border-gray-200/30 dark:border-gray-700/30 hover:border-blue-500/50 dark:hover:border-blue-500/50",
      dark: "border-gray-700/30 hover:border-blue-500/50",
      green:
        "border-green-200/30 dark:border-green-700/30 hover:border-green-500/50 dark:hover:border-green-500/50",
      purple:
        "border-purple-200/30 dark:border-purple-700/30 hover:border-purple-500/50 dark:hover:border-purple-500/50",
      orange:
        "border-orange-200/30 dark:border-orange-700/30 hover:border-orange-500/50 dark:hover:border-orange-500/50",
      blue: "border-blue-200/30 dark:border-blue-700/30 hover:border-blue-500/50 dark:hover:border-blue-500/50",
      pink: "border-pink-200/30 dark:border-pink-700/30 hover:border-pink-500/50 dark:hover:border-pink-500/50",
      brown:
        "border-amber-200/30 dark:border-amber-700/30 hover:border-amber-500/50 dark:hover:border-amber-500/50",
    };

    return themeColors[theme as keyof typeof themeColors] || themeColors.light;
  };

  // 根据主题获取图标颜色
  const getIconColorClass = () => {
    const themeColors = {
      light:
        "text-blue-500 dark:text-blue-400 group-hover:text-blue-600 dark:group-hover:text-blue-300",
      dark: "text-blue-400 group-hover:text-blue-300",
      green:
        "text-green-500 dark:text-green-400 group-hover:text-green-600 dark:group-hover:text-green-300",
      purple:
        "text-purple-500 dark:text-purple-400 group-hover:text-purple-600 dark:group-hover:text-purple-300",
      orange:
        "text-orange-500 dark:text-orange-400 group-hover:text-orange-600 dark:group-hover:text-orange-300",
      blue: "text-blue-500 dark:text-blue-400 group-hover:text-blue-600 dark:group-hover:text-blue-300",
      pink: "text-pink-500 dark:text-pink-400 group-hover:text-pink-600 dark:group-hover:text-pink-300",
      brown:
        "text-amber-500 dark:text-amber-400 group-hover:text-amber-600 dark:group-hover:text-amber-300",
    };

    return themeColors[theme as keyof typeof themeColors] || themeColors.light;
  };

  // 根据主题获取文本颜色
  const getTextColorClass = () => {
    const themeColors = {
      light:
        "text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-300",
      dark: "text-gray-300 group-hover:text-blue-300",
      green:
        "text-gray-700 dark:text-gray-300 group-hover:text-green-600 dark:group-hover:text-green-300",
      purple:
        "text-gray-700 dark:text-gray-300 group-hover:text-purple-600 dark:group-hover:text-purple-300",
      orange:
        "text-gray-700 dark:text-gray-300 group-hover:text-orange-600 dark:group-hover:text-orange-300",
      blue: "text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-300",
      pink: "text-gray-700 dark:text-gray-300 group-hover:text-pink-600 dark:group-hover:text-pink-300",
      brown:
        "text-gray-700 dark:text-gray-300 group-hover:text-amber-600 dark:group-hover:text-amber-300",
    };

    return themeColors[theme as keyof typeof themeColors] || themeColors.light;
  };

  // 获取所有主题相关的样式类
  const gradientBgClass = getGradientBgClass();
  const hoverGradientClass = getHoverGradientClass();
  const borderClass = getBorderClass();
  const iconColorClass = getIconColorClass();
  const textColorClass = getTextColorClass();

  // 根据主题获取标题图标背景渐变
  const getTitleIconGradient = () => {
    const themeColors = {
      light: "from-green-500 to-blue-500",
      dark: "from-green-400 to-blue-400",
      green: "from-green-500 to-teal-500",
      purple: "from-purple-500 to-indigo-500",
      orange: "from-orange-500 to-amber-500",
      blue: "from-blue-500 to-cyan-500",
      pink: "from-pink-500 to-rose-500",
      brown: "from-amber-500 to-yellow-500",
    };

    return themeColors[theme as keyof typeof themeColors] || themeColors.light;
  };

  // 根据主题获取标题文字渐变
  const getTitleGradient = () => {
    const themeColors = {
      light: "from-green-600 to-blue-600",
      dark: "from-green-400 to-blue-400",
      green: "from-green-600 to-teal-600",
      purple: "from-purple-600 to-indigo-600",
      orange: "from-orange-600 to-amber-600",
      blue: "from-blue-600 to-cyan-600",
      pink: "from-pink-600 to-rose-600",
      brown: "from-amber-600 to-yellow-600",
    };

    return themeColors[theme as keyof typeof themeColors] || themeColors.light;
  };

  return (
    <section className="space-y-8 mt-16">
      <div className="flex items-center gap-3">
        <div
          className={`p-2.5 rounded-xl bg-gradient-to-r ${getTitleIconGradient()} text-white`}
        >
          <Folder className="w-5 h-5" />
        </div>
        <h2
          className={`text-2xl font-bold bg-gradient-to-r ${getTitleGradient()} bg-clip-text text-transparent`}
        >
          技术分类
        </h2>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {categories.map((category, index) => (
          <motion.div
            key={category.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
          >
            <Link
              href={`/blog/category/${category.name.toLowerCase()}`}
              className={`block p-6 rounded-2xl bg-gradient-to-br ${gradientBgClass} hover:shadow-xl transition-all duration-300 text-center group border ${borderClass} backdrop-blur-sm relative overflow-hidden shadow-md dark:shadow-gray-900/30`}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${hoverGradientClass} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
              />
              <TechCategoryIcon
                category={category.name}
                className={`w-10 h-10 mx-auto mb-4 ${iconColorClass} transform transition-all duration-300 group-hover:scale-110`}
              />
              <span
                className={`relative z-10 font-medium text-sm ${textColorClass} transition-colors`}
              >
                {category.name}
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
