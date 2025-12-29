"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { allPosts } from "contentlayer/generated";
import { useThemeUtils } from "@/hooks/useThemeUtils";

type NavigationProps = {
  onNavigate?: () => void;
};

export default function Navigation({ onNavigate }: NavigationProps) {
  const categories = Array.from(
    new Set(
      allPosts
        .map((post) => post.category)
        .filter((category): category is string => category !== undefined)
    )
  ).sort();
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const { theme, getThemeValue } = useThemeUtils();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const getLinkGradient = () => {
    return getThemeValue(
      {
        light: "after:from-blue-600 after:to-purple-600",
        dark: "after:from-blue-400 after:to-purple-400",
        green: "after:from-green-600 after:to-green-400",
        purple: "after:from-purple-600 after:to-purple-400",
        orange: "after:from-orange-600 after:to-orange-400",
        blue: "after:from-blue-600 after:to-blue-400",
        pink: "after:from-pink-600 after:to-pink-400",
        brown: "after:from-amber-700 after:to-amber-500",
      },
      "after:from-blue-600 after:to-purple-600"
    );
  };

  const getPanelGradient = () => {
    return getThemeValue(
      {
        light: "from-blue-500/5 via-purple-500/5 to-pink-500/5",
        dark: "from-blue-400/10 via-purple-400/10 to-pink-400/10",
        green: "from-green-500/10 via-green-400/10 to-green-300/10",
        purple: "from-purple-500/10 via-purple-400/10 to-purple-300/10",
        orange: "from-orange-500/10 via-orange-400/10 to-orange-300/10",
        blue: "from-blue-500/10 via-blue-400/10 to-blue-300/10",
        pink: "from-pink-500/10 via-pink-400/10 to-pink-300/10",
        brown: "from-amber-500/10 via-amber-400/10 to-amber-300/10",
      },
      "from-blue-500/5 via-purple-500/5 to-pink-500/5"
    );
  };

  const linkGradient = !mounted ? "after:from-blue-600 after:to-purple-600" : getLinkGradient();
  const panelGradient = !mounted ? "from-blue-500/5 via-purple-500/5 to-pink-500/5" : getPanelGradient();

  return (
    <div className="flex md:items-center md:space-x-6 flex-col md:flex-row space-y-4 md:space-y-0">
      <Link
        href="/blog"
        className={`relative py-1 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:transition-all after:duration-300 after:bg-gradient-to-r ${linkGradient}`}
        onClick={onNavigate}
      >
        博客
      </Link>
      <div className="relative group md:hover:block">
        <button
          onClick={() => setIsCategoryOpen(!isCategoryOpen)}
          className={`relative py-1 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 md:group-hover:after:w-full after:transition-all after:duration-300 flex items-center gap-1 w-full justify-center md:justify-start after:bg-gradient-to-r ${linkGradient}`}
        >
          分类
          <ChevronDownIcon className="h-4 w-4" />
        </button>
        <div
          className={`md:absolute left-1/2 -translate-x-1/2 mt-2 w-[280px] bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-xl py-4 transition-all duration-300 ease-in-out transform border border-gray-200/50 dark:border-gray-700/50 overflow-hidden md:left-1/2 md:-translate-x-1/2 left-0 translate-x-0
            md:opacity-0 md:invisible md:group-hover:opacity-100 md:group-hover:visible md:translate-y-2 md:group-hover:translate-y-0
            ${
              isCategoryOpen
                ? "opacity-100 visible translate-y-0 h-auto"
                : "opacity-0 invisible translate-y-2 h-0 md:h-auto"
            }`}
        >
          <div
            className={`absolute inset-0 bg-gradient-to-br ${panelGradient} pointer-events-none`}
          />
          <div className="grid grid-cols-2 gap-1 relative z-10">
            {categories.map((category) => (
              <Link
                key={category}
                href={`/blog/category/${category.toLowerCase()}`}
                className={`mx-2 px-4 py-2 rounded-xl transition-all duration-300 group/item hover:bg-gradient-to-r ${
                  theme === "dark"
                    ? "hover:from-blue-500/10 hover:via-purple-500/10 hover:to-pink-500/10"
                    : theme === "green"
                    ? "hover:from-green-500/10 hover:via-green-400/10 hover:to-green-300/10"
                    : theme === "purple"
                    ? "hover:from-purple-500/10 hover:via-purple-400/10 hover:to-purple-300/10"
                    : theme === "orange"
                    ? "hover:from-orange-500/10 hover:via-orange-400/10 hover:to-orange-300/10"
                    : theme === "blue"
                    ? "hover:from-blue-500/10 hover:via-blue-400/10 hover:to-blue-300/10"
                    : theme === "pink"
                    ? "hover:from-pink-500/10 hover:via-pink-400/10 hover:to-pink-300/10"
                    : theme === "brown"
                    ? "hover:from-amber-500/10 hover:via-amber-400/10 hover:to-amber-300/10"
                    : "hover:from-blue-500/10 hover:via-purple-500/10 hover:to-pink-500/10"
                }`}
                onClick={() => {
                  setIsCategoryOpen(false);
                  onNavigate?.();
                }}
              >
                <div
                  className={`font-medium text-gray-800 dark:text-gray-200 group-hover/item:bg-gradient-to-r group-hover/item:bg-clip-text group-hover/item:text-transparent transition-all duration-300 ${
                    theme === "dark"
                      ? "group-hover/item:from-blue-400 group-hover/item:via-purple-400 group-hover/item:to-pink-400"
                      : theme === "green"
                      ? "group-hover/item:from-green-600 group-hover/item:via-green-500 group-hover/item:to-green-400"
                      : theme === "purple"
                      ? "group-hover/item:from-purple-600 group-hover/item:via-purple-500 group-hover/item:to-purple-400"
                      : theme === "orange"
                      ? "group-hover/item:from-orange-600 group-hover/item:via-orange-500 group-hover/item:to-orange-400"
                      : theme === "blue"
                      ? "group-hover/item:from-blue-600 group-hover/item:via-blue-500 group-hover/item:to-blue-400"
                      : theme === "pink"
                      ? "group-hover/item:from-pink-600 group-hover/item:via-pink-500 group-hover/item:to-pink-400"
                      : theme === "brown"
                      ? "group-hover/item:from-amber-700 group-hover/item:via-amber-600 group-hover/item:to-amber-500"
                      : "group-hover/item:from-blue-600 group-hover/item:via-purple-600 group-hover/item:to-pink-600"
                  }`}
                >
                  {category}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <Link
        href="/about"
        className={`relative py-1 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:transition-all after:duration-300 after:bg-gradient-to-r ${linkGradient}`}
        onClick={onNavigate}
      >
        关于
      </Link>
    </div>
  );
}
