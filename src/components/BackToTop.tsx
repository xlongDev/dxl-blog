"use client";

import { useEffect, useState } from "react";

export default function BackToTop() {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

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
          <linearGradient
            id="progressGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#60A5FA" />
          </linearGradient>
        </defs>

        {/* 背景轨道 */}
        <circle
          cx="24"
          cy="24"
          r="20"
          className="text-gray-100/30"
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
          stroke="url(#progressGradient)"
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
          className={`w-5 h-5 text-blue-500 transition-all duration-300 ${
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
