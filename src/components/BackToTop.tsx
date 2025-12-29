"use client";

import { useState, useEffect } from "react";
import { ArrowUpIcon } from "@heroicons/react/24/outline";
import { useThemeUtils } from "@/hooks/useThemeUtils";
import { THEME_COLORS } from "@/hooks/themeConstants";

export default function BackToTop() {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const { theme, getThemeColor, getThemeValue } = useThemeUtils();

  useEffect(() => {
    const updateProgress = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress =
        totalHeight > 0 ? Math.round((window.scrollY / totalHeight) * 100) : 0;
      setProgress(progress);
      setIsVisible(window.scrollY >= 300);
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress);
    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const circumference = 2 * Math.PI * 20; // 缩小环形尺寸

  // 根据主题获取对应的渐变ID
  const getThemeGradientId = () => {
    return `backToTopGradient-${theme || "light"}`;
  };

  // 根据主题获取对应的文本颜色
  const getThemeTextColor = () => {
    return getThemeValue(
      {
        light: "text-blue-500",
        dark: "text-blue-400",
        green: "text-green-500",
        purple: "text-purple-500",
        orange: "text-orange-500",
        blue: "text-blue-500",
        pink: "text-pink-500",
        brown: "text-amber-500",
      },
      "text-blue-500"
    );
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-16 right-4 group flex items-center justify-center p-1 rounded-full bg-transparent shadow-sm hover:shadow-md transition-all duration-300 sm:bottom-8 sm:right-8 ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-10 pointer-events-none"
      }`}
      aria-label="返回顶部"
    >
      {/* 渐变环形进度条 */}
      <svg className="w-12 h-12 transform -rotate-90">
        <defs>
          {/* 默认主题渐变 */}
          <linearGradient
            id="backToTopGradient-light"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#2563eb" />
            <stop offset="100%" stopColor="#60A5FA" />
          </linearGradient>

          {/* 暗黑主题渐变 */}
          <linearGradient
            id="backToTopGradient-dark"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#60a5fa" />
          </linearGradient>

          {/* 绿色主题渐变 */}
          <linearGradient
            id="backToTopGradient-green"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#059669" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>

          {/* 紫色主题渐变 */}
          <linearGradient
            id="backToTopGradient-purple"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#7c3aed" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>

          {/* 橙色主题渐变 */}
          <linearGradient
            id="backToTopGradient-orange"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#ea580c" />
            <stop offset="100%" stopColor="#f97316" />
          </linearGradient>

          {/* 蓝色主题渐变 */}
          <linearGradient
            id="backToTopGradient-blue"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#0284c7" />
            <stop offset="100%" stopColor="#0ea5e9" />
          </linearGradient>

          {/* 粉色主题渐变 */}
          <linearGradient
            id="backToTopGradient-pink"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#db2777" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>

          {/* 棕色主题渐变 */}
          <linearGradient
            id="backToTopGradient-brown"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#92400e" />
            <stop offset="100%" stopColor="#b45309" />
          </linearGradient>
        </defs>

        {/* 背景轨道 */}
        <circle
          cx="24"
          cy="24"
          r="20"
          className="text-gray-100/30 dark:text-gray-700/30"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />

        {/* 动态进度条 */}
        <circle
          cx="24"
          cy="24"
          r="20"
          fill="none"
          stroke={`url(#${getThemeGradientId()})`}
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - progress / 100)}
          className="transition-[stroke-dashoffset] duration-200 ease-out"
        />
      </svg>

      {/* 简约箭头图标 */}
      <div className="absolute flex items-center justify-center w-full h-full">
        <svg
          className={`w-5 h-5 ${getThemeTextColor()} transition-all duration-300 ${
            progress > 50 ? "opacity-100" : "opacity-60"
          } group-hover:translate-y-[-2px]`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      </div>
    </button>
  );
}
