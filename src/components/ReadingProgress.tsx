"use client";

import { useEffect, useState } from "react";
import { useThemeUtils } from "@/hooks/useThemeUtils";

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);
  const { theme } = useThemeUtils();

  useEffect(() => {
    const updateProgress = () => {
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;
      const windowHeight = scrollHeight - clientHeight;
      const percentage = (scrollTop / windowHeight) * 100;
      setProgress(percentage);
    };

    window.addEventListener("scroll", updateProgress);
    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  // 根据主题获取对应的渐变样式（由浅到深）
  const getThemeGradient = () => {
    if (!theme) return "var(--reading-progress-gradient)";

    // 反转渐变方向，使其由浅到深
    switch (theme) {
      case "dark":
        return "linear-gradient(to right, #bfdbfe, #93c5fd, #60a5fa, #3b82f6)";
      case "green":
        return "linear-gradient(to right, #a7f3d0, #6ee7b7, #34d399, #10b981, #059669)";
      case "purple":
        return "linear-gradient(to right, #ddd6fe, #c4b5fd, #a78bfa, #8b5cf6, #7c3aed)";
      case "orange":
        return "linear-gradient(to right, #fed7aa, #fdba74, #fb923c, #f97316, #ea580c)";
      case "blue":
        return "linear-gradient(to right, #bae6fd, #7dd3fc, #38bdf8, #0ea5e9, #0284c7)";
      case "pink":
        return "linear-gradient(to right, #fce7f3, #fbcfe8, #f472b6, #ec4899, #db2777)";
      case "brown":
        return "linear-gradient(to right, #fbbf24, #f59e0b, #d97706, #b45309, #92400e)";
      default:
        return "linear-gradient(to right, #bfdbfe, #93c5fd, #60a5fa, #3b82f6, #2563eb)";
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 dark:bg-gray-800 z-50">
      <div
        className="h-full transition-all duration-300 ease-out shadow-sm"
        style={{
          background: getThemeGradient(),
          width: `${progress}%`,
        }}
      />
    </div>
  );
}
