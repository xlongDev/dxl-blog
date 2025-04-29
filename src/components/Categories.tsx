"use client";

import Link from "next/link";
import { memo, useState, useEffect, useRef } from "react";
import { useThemeUtils } from "@/hooks/useThemeUtils";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

interface CategoriesProps {
  totalPosts: number;
  currentCategory: string;
  categories: string[];
  postsByCategory: Record<string, number>;
}

const CategoryLink = memo(
  ({
    href,
    category,
    count,
    isActive,
  }: {
    href: string;
    category: string;
    count: number;
    isActive: boolean;
  }) => {
    const { getThemeClass } = useThemeUtils();

    const themeStyles = {
      light: {
        bg: "bg-gradient-to-r from-blue-50/50 via-purple-50/50 to-pink-50/50",
        hoverBg:
          "hover:from-blue-100/50 hover:via-purple-100/50 hover:to-pink-100/50",
        activeBg: "from-indigo-100/70 via-purple-100/70 to-pink-100/70",
        text: "from-gray-700 to-gray-900 group-hover:from-indigo-600 group-hover:via-purple-600 group-hover:to-pink-600",
        activeText: "from-indigo-600 via-purple-600 to-pink-600",
        countBg: "from-blue-100/80 via-purple-100/80 to-pink-100/80",
        activeCountBg: "from-indigo-200/80 via-purple-200/80 to-pink-200/80",
        countText: "text-gray-600 group-hover:text-indigo-600",
        activeCountText: "text-indigo-600",
        border: "border-gray-200/50",
        activeBorder: "border-indigo-500/50",
      },
      dark: {
        bg: "bg-gradient-to-r from-blue-900/10 via-purple-900/10 to-pink-900/10",
        hoverBg:
          "hover:from-blue-800/10 hover:via-purple-800/10 hover:to-pink-800/10",
        activeBg: "from-indigo-800/30 via-purple-800/30 to-pink-800/30",
        text: "from-gray-300 to-gray-100 group-hover:from-indigo-400 group-hover:via-purple-400 group-hover:to-pink-400",
        activeText: "from-indigo-400 via-purple-400 to-pink-400",
        countBg: "from-blue-900/30 via-purple-900/30 to-pink-900/30",
        activeCountBg: "from-indigo-800/30 via-purple-800/30 to-pink-800/30",
        countText: "text-gray-300 group-hover:text-indigo-400",
        activeCountText: "text-indigo-400",
        border: "border-gray-700/50",
        activeBorder: "border-indigo-400/50",
      },
      green: {
        bg: "bg-gradient-to-r from-emerald-50/50 via-green-50/50 to-teal-50/50",
        hoverBg:
          "hover:from-emerald-100/50 hover:via-green-100/50 hover:to-teal-100/50",
        activeBg: "from-emerald-100/70 via-green-100/70 to-teal-100/70",
        text: "from-emerald-700 to-teal-900 group-hover:from-emerald-600 group-hover:via-green-600 group-hover:to-teal-600",
        activeText: "from-emerald-600 via-green-600 to-teal-600",
        countBg: "from-emerald-100/80 via-green-100/80 to-teal-100/80",
        activeCountBg: "from-emerald-200/80 via-green-200/80 to-teal-200/80",
        countText: "text-emerald-600 group-hover:text-emerald-700",
        activeCountText: "text-emerald-700",
        border: "border-emerald-200/50",
        activeBorder: "border-emerald-500/50",
      },
      purple: {
        bg: "bg-gradient-to-r from-violet-50/50 via-purple-50/50 to-fuchsia-50/50",
        hoverBg:
          "hover:from-violet-100/50 hover:via-purple-100/50 hover:to-fuchsia-100/50",
        activeBg: "from-violet-100/70 via-purple-100/70 to-fuchsia-100/70",
        text: "from-violet-700 to-fuchsia-900 group-hover:from-violet-600 group-hover:via-purple-600 group-hover:to-fuchsia-600",
        activeText: "from-violet-600 via-purple-600 to-fuchsia-600",
        countBg: "from-violet-100/80 via-purple-100/80 to-fuchsia-100/80",
        activeCountBg: "from-violet-200/80 via-purple-200/80 to-fuchsia-200/80",
        countText: "text-violet-600 group-hover:text-violet-700",
        activeCountText: "text-violet-700",
        border: "border-violet-200/50",
        activeBorder: "border-violet-500/50",
      },
      orange: {
        bg: "bg-gradient-to-r from-amber-50/50 via-orange-50/50 to-yellow-50/50",
        hoverBg:
          "hover:from-amber-100/50 hover:via-orange-100/50 hover:to-yellow-100/50",
        activeBg: "from-amber-100/70 via-orange-100/70 to-yellow-100/70",
        text: "from-amber-700 to-yellow-900 group-hover:from-amber-600 group-hover:via-orange-600 group-hover:to-yellow-600",
        activeText: "from-amber-600 via-orange-600 to-yellow-600",
        countBg: "from-amber-100/80 via-orange-100/80 to-yellow-100/80",
        activeCountBg: "from-amber-200/80 via-orange-200/80 to-yellow-200/80",
        countText: "text-amber-600 group-hover:text-amber-700",
        activeCountText: "text-amber-700",
        border: "border-amber-200/50",
        activeBorder: "border-amber-500/50",
      },
      blue: {
        bg: "bg-gradient-to-r from-sky-50/50 via-blue-50/50 to-indigo-50/50",
        hoverBg:
          "hover:from-sky-100/50 hover:via-blue-100/50 hover:to-indigo-100/50",
        activeBg: "from-sky-100/70 via-blue-100/70 to-indigo-100/70",
        text: "from-sky-700 to-indigo-900 group-hover:from-sky-600 group-hover:via-blue-600 group-hover:to-indigo-600",
        activeText: "from-sky-600 via-blue-600 to-indigo-600",
        countBg: "from-sky-100/80 via-blue-100/80 to-indigo-100/80",
        activeCountBg: "from-sky-200/80 via-blue-200/80 to-indigo-200/80",
        countText: "text-sky-600 group-hover:text-sky-700",
        activeCountText: "text-sky-700",
        border: "border-sky-200/50",
        activeBorder: "border-sky-500/50",
      },
      pink: {
        bg: "bg-gradient-to-r from-rose-50/50 via-pink-50/50 to-fuchsia-50/50",
        hoverBg:
          "hover:from-rose-100/50 hover:via-pink-100/50 hover:to-fuchsia-100/50",
        activeBg: "from-rose-100/70 via-pink-100/70 to-fuchsia-100/70",
        text: "from-rose-700 to-fuchsia-900 group-hover:from-rose-600 group-hover:via-pink-600 group-hover:to-fuchsia-600",
        activeText: "from-rose-600 via-pink-600 to-fuchsia-600",
        countBg: "from-rose-100/80 via-pink-100/80 to-fuchsia-100/80",
        activeCountBg: "from-rose-200/80 via-pink-200/80 to-fuchsia-200/80",
        countText: "text-rose-600 group-hover:text-rose-700",
        activeCountText: "text-rose-700",
        border: "border-rose-200/50",
        activeBorder: "border-rose-500/50",
      },
      brown: {
        bg: "bg-gradient-to-r from-amber-50/50 via-yellow-50/50 to-orange-50/50",
        hoverBg:
          "hover:from-amber-100/50 hover:via-yellow-100/50 hover:to-orange-100/50",
        activeBg: "from-amber-100/70 via-yellow-100/70 to-orange-100/70",
        text: "from-amber-700 to-orange-900 group-hover:from-amber-600 group-hover:via-yellow-600 group-hover:to-orange-600",
        activeText: "from-amber-600 via-yellow-600 to-orange-600",
        countBg: "from-amber-100/80 via-orange-100/80 to-yellow-100/80",
        activeCountBg: "from-amber-200/80 via-orange-200/80 to-yellow-200/80",
        countText: "text-amber-600 group-hover:text-amber-700",
        activeCountText: "text-amber-700",
        border: "border-amber-200/50",
        activeBorder: "border-amber-500/50",
      },
    };

    const baseClasses = `group flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg border shadow-sm`;

    const activeClasses = isActive
      ? getThemeClass(
          `bg-gradient-to-r ${themeStyles.light.activeBg} ${themeStyles.light.activeBorder} scale-105 shadow-md`,
          {
            light: `bg-gradient-to-r ${themeStyles.light.activeBg} ${themeStyles.light.activeBorder}`,
            dark: `bg-gradient-to-r ${themeStyles.dark.activeBg} ${themeStyles.dark.activeBorder}`,
            green: `bg-gradient-to-r ${themeStyles.green.activeBg} ${themeStyles.green.activeBorder}`,
            purple: `bg-gradient-to-r ${themeStyles.purple.activeBg} ${themeStyles.purple.activeBorder}`,
            orange: `bg-gradient-to-r ${themeStyles.orange.activeBg} ${themeStyles.orange.activeBorder}`,
            blue: `bg-gradient-to-r ${themeStyles.blue.activeBg} ${themeStyles.blue.activeBorder}`,
            pink: `bg-gradient-to-r ${themeStyles.pink.activeBg} ${themeStyles.pink.activeBorder}`,
            brown: `bg-gradient-to-r ${themeStyles.brown.activeBg} ${themeStyles.brown.activeBorder}`,
          }
        )
      : getThemeClass(
          `bg-gradient-to-r ${themeStyles.light.bg} ${themeStyles.light.border} ${themeStyles.light.hoverBg}`,
          {
            light: `bg-gradient-to-r ${themeStyles.light.bg} ${themeStyles.light.border} ${themeStyles.light.hoverBg}`,
            dark: `bg-gradient-to-r ${themeStyles.dark.bg} ${themeStyles.dark.border} ${themeStyles.dark.hoverBg}`,
            green: `bg-gradient-to-r ${themeStyles.green.bg} ${themeStyles.green.border} ${themeStyles.green.hoverBg}`,
            purple: `bg-gradient-to-r ${themeStyles.purple.bg} ${themeStyles.purple.border} ${themeStyles.purple.hoverBg}`,
            orange: `bg-gradient-to-r ${themeStyles.orange.bg} ${themeStyles.orange.border} ${themeStyles.orange.hoverBg}`,
            blue: `bg-gradient-to-r ${themeStyles.blue.bg} ${themeStyles.blue.border} ${themeStyles.blue.hoverBg}`,
            pink: `bg-gradient-to-r ${themeStyles.pink.bg} ${themeStyles.pink.border} ${themeStyles.pink.hoverBg}`,
            brown: `bg-gradient-to-r ${themeStyles.brown.bg} ${themeStyles.brown.border} ${themeStyles.brown.hoverBg}`,
          }
        );

    const textClasses = isActive
      ? getThemeClass(
          `font-bold bg-gradient-to-r ${themeStyles.light.activeText} bg-clip-text text-transparent`,
          {
            light: `font-bold bg-gradient-to-r ${themeStyles.light.activeText} bg-clip-text text-transparent`,
            dark: `font-bold bg-gradient-to-r ${themeStyles.dark.activeText} bg-clip-text text-transparent`,
            green: `font-bold bg-gradient-to-r ${themeStyles.green.activeText} bg-clip-text text-transparent`,
            purple: `font-bold bg-gradient-to-r ${themeStyles.purple.activeText} bg-clip-text text-transparent`,
            orange: `font-bold bg-gradient-to-r ${themeStyles.orange.activeText} bg-clip-text text-transparent`,
            blue: `font-bold bg-gradient-to-r ${themeStyles.blue.activeText} bg-clip-text text-transparent`,
            pink: `font-bold bg-gradient-to-r ${themeStyles.pink.activeText} bg-clip-text text-transparent`,
            brown: `font-bold bg-gradient-to-r ${themeStyles.brown.activeText} bg-clip-text text-transparent`,
          }
        )
      : getThemeClass(
          `font-medium bg-gradient-to-r ${themeStyles.light.text} bg-clip-text text-transparent`,
          {
            light: `font-medium bg-gradient-to-r ${themeStyles.light.text} bg-clip-text text-transparent`,
            dark: `font-medium bg-gradient-to-r ${themeStyles.dark.text} bg-clip-text text-transparent`,
            green: `font-medium bg-gradient-to-r ${themeStyles.green.text} bg-clip-text text-transparent`,
            purple: `font-medium bg-gradient-to-r ${themeStyles.purple.text} bg-clip-text text-transparent`,
            orange: `font-medium bg-gradient-to-r ${themeStyles.orange.text} bg-clip-text text-transparent`,
            blue: `font-medium bg-gradient-to-r ${themeStyles.blue.text} bg-clip-text text-transparent`,
            pink: `font-medium bg-gradient-to-r ${themeStyles.pink.text} bg-clip-text text-transparent`,
            brown: `font-medium bg-gradient-to-r ${themeStyles.brown.text} bg-clip-text text-transparent`,
          }
        );

    const countClasses = isActive
      ? getThemeClass(
          `text-xs font-medium bg-gradient-to-r ${themeStyles.light.activeCountBg} ${themeStyles.light.activeCountText} px-2.5 py-1 rounded-full shadow-sm border ${themeStyles.light.activeBorder}`,
          {
            light: `text-xs font-medium bg-gradient-to-r ${themeStyles.light.activeCountBg} ${themeStyles.light.activeCountText} px-2.5 py-1 rounded-full shadow-sm border ${themeStyles.light.activeBorder}`,
            dark: `text-xs font-medium bg-gradient-to-r ${themeStyles.dark.activeCountBg} ${themeStyles.dark.activeCountText} px-2.5 py-1 rounded-full shadow-sm border ${themeStyles.dark.activeBorder}`,
            green: `text-xs font-medium bg-gradient-to-r ${themeStyles.green.activeCountBg} ${themeStyles.green.activeCountText} px-2.5 py-1 rounded-full shadow-sm border ${themeStyles.green.activeBorder}`,
            purple: `text-xs font-medium bg-gradient-to-r ${themeStyles.purple.activeCountBg} ${themeStyles.purple.activeCountText} px-2.5 py-1 rounded-full shadow-sm border ${themeStyles.purple.activeBorder}`,
            orange: `text-xs font-medium bg-gradient-to-r ${themeStyles.orange.activeCountBg} ${themeStyles.orange.activeCountText} px-2.5 py-1 rounded-full shadow-sm border ${themeStyles.orange.activeBorder}`,
            blue: `text-xs font-medium bg-gradient-to-r ${themeStyles.blue.activeCountBg} ${themeStyles.blue.activeCountText} px-2.5 py-1 rounded-full shadow-sm border ${themeStyles.blue.activeBorder}`,
            pink: `text-xs font-medium bg-gradient-to-r ${themeStyles.pink.activeCountBg} ${themeStyles.pink.activeCountText} px-2.5 py-1 rounded-full shadow-sm border ${themeStyles.pink.activeBorder}`,
            brown: `text-xs font-medium bg-gradient-to-r ${themeStyles.brown.activeCountBg} ${themeStyles.brown.activeCountText} px-2.5 py-1 rounded-full shadow-sm border ${themeStyles.brown.activeBorder}`,
          }
        )
      : getThemeClass(
          `text-xs font-medium bg-gradient-to-r ${themeStyles.light.countBg} ${themeStyles.light.countText} px-2.5 py-1 rounded-full shadow-sm border ${themeStyles.light.border}`,
          {
            light: `text-xs font-medium bg-gradient-to-r ${themeStyles.light.countBg} ${themeStyles.light.countText} px-2.5 py-1 rounded-full shadow-sm border ${themeStyles.light.border}`,
            dark: `text-xs font-medium bg-gradient-to-r ${themeStyles.dark.countBg} ${themeStyles.dark.countText} px-2.5 py-1 rounded-full shadow-sm border ${themeStyles.dark.border}`,
            green: `text-xs font-medium bg-gradient-to-r ${themeStyles.green.countBg} ${themeStyles.green.countText} px-2.5 py-1 rounded-full shadow-sm border ${themeStyles.green.border}`,
            purple: `text-xs font-medium bg-gradient-to-r ${themeStyles.purple.countBg} ${themeStyles.purple.countText} px-2.5 py-1 rounded-full shadow-sm border ${themeStyles.purple.border}`,
            orange: `text-xs font-medium bg-gradient-to-r ${themeStyles.orange.countBg} ${themeStyles.orange.countText} px-2.5 py-1 rounded-full shadow-sm border ${themeStyles.orange.border}`,
            blue: `text-xs font-medium bg-gradient-to-r ${themeStyles.blue.countBg} ${themeStyles.blue.countText} px-2.5 py-1 rounded-full shadow-sm border ${themeStyles.blue.border}`,
            pink: `text-xs font-medium bg-gradient-to-r ${themeStyles.pink.countBg} ${themeStyles.pink.countText} px-2.5 py-1 rounded-full shadow-sm border ${themeStyles.pink.border}`,
            brown: `text-xs font-medium bg-gradient-to-r ${themeStyles.brown.countBg} ${themeStyles.brown.countText} px-2.5 py-1 rounded-full shadow-sm border ${themeStyles.brown.border}`,
          }
        );

    return (
      <Link href={href} className={`${baseClasses} ${activeClasses}`}>
        <span className={`transition-all duration-300 ${textClasses}`}>
          {category}
        </span>
        <span className={`transition-all duration-300 ${countClasses}`}>
          {count}
        </span>
      </Link>
    );
  }
);

CategoryLink.displayName = "CategoryLink";

function Categories({
  totalPosts,
  currentCategory,
  categories,
  postsByCategory,
}: CategoriesProps) {
  const { getThemeClass, theme } = useThemeUtils();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 确保组件挂载后再渲染，避免服务端渲染与客户端渲染不一致
  useEffect(() => {
    setMounted(true);
  }, []);

  // 点击外部关闭下拉菜单
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const navBgClass = getThemeClass(
    "bg-white hover:bg-gradient-to-r hover:from-gray-50/50 hover:via-gray-100/50 hover:to-gray-50/50",
    {
      light:
        "bg-white hover:bg-gradient-to-r hover:from-gray-50/50 hover:via-gray-100/50 hover:to-gray-50/50",
      dark: "bg-gray-800 hover:bg-gradient-to-r hover:from-gray-800/80 hover:via-gray-700/80 hover:to-gray-800/80",
      green:
        "bg-emerald-50 hover:bg-gradient-to-r hover:from-emerald-100/50 hover:via-green-100/50 hover:to-emerald-100/50",
      purple:
        "bg-purple-50 hover:bg-gradient-to-r hover:from-purple-100/50 hover:via-violet-100/50 hover:to-purple-100/50",
      orange:
        "bg-orange-50 hover:bg-gradient-to-r hover:from-orange-100/50 hover:via-amber-100/50 hover:to-orange-100/50",
      blue: "bg-blue-50 hover:bg-gradient-to-r hover:from-blue-100/50 hover:via-sky-100/50 hover:to-blue-100/50",
      pink: "bg-pink-50 hover:bg-gradient-to-r hover:from-pink-100/50 hover:via-rose-100/50 hover:to-pink-100/50",
      brown:
        "bg-amber-50 hover:bg-gradient-to-r hover:from-amber-100/50 hover:via-yellow-100/50 hover:to-amber-100/50",
    }
  );

  const dropdownButtonClass = getThemeClass(
    "bg-white text-gray-700 hover:bg-gradient-to-r hover:from-gray-50/50 hover:via-gray-100/50 hover:to-gray-50/50",
    {
      light:
        "bg-white text-gray-700 hover:bg-gradient-to-r hover:from-gray-50/50 hover:via-gray-100/50 hover:to-gray-50/50",
      dark: "bg-gray-800 text-gray-300 hover:bg-gradient-to-r hover:from-gray-800/80 hover:via-gray-700/80 hover:to-gray-800/80",
      green:
        "bg-emerald-50 text-emerald-700 hover:bg-gradient-to-r hover:from-emerald-100/50 hover:via-green-100/50 hover:to-emerald-100/50",
      purple:
        "bg-purple-50 text-purple-700 hover:bg-gradient-to-r hover:from-purple-100/50 hover:via-violet-100/50 hover:to-purple-100/50",
      orange:
        "bg-orange-50 text-orange-700 hover:bg-gradient-to-r hover:from-orange-100/50 hover:via-amber-100/50 hover:to-orange-100/50",
      blue: "bg-blue-50 text-blue-700 hover:bg-gradient-to-r hover:from-blue-100/50 hover:via-sky-100/50 hover:to-blue-100/50",
      pink: "bg-pink-50 text-pink-700 hover:bg-gradient-to-r hover:from-pink-100/50 hover:via-rose-100/50 hover:to-pink-100/50",
      brown:
        "bg-amber-50 text-amber-700 hover:bg-gradient-to-r hover:from-amber-100/50 hover:via-yellow-100/50 hover:to-amber-100/50",
    }
  );

  const dropdownMenuClass = getThemeClass("bg-white border-gray-200/50", {
    light: "bg-white border-gray-200/50",
    dark: "bg-gray-800 border-gray-700/50",
    green: "bg-emerald-50 border-emerald-200/50",
    purple: "bg-purple-50 border-purple-200/50",
    orange: "bg-orange-50 border-orange-200/50",
    blue: "bg-blue-50 border-blue-200/50",
    pink: "bg-pink-50 border-pink-200/50",
    brown: "bg-amber-50 border-amber-200/50",
  });

  const selectedCategory =
    currentCategory === "all" ? "全部文章" : currentCategory;

  // 如果组件未挂载，返回一个占位符，避免闪烁
  if (!mounted) {
    return (
      <nav className="rounded-2xl p-4 shadow-lg border hover:border-transparent transition-all duration-500 ease-in-out sticky top-0 z-10 w-full max-w-[calc(100%-2rem)] mx-auto bg-white">
        <div className="md:hidden h-10"></div>
        <div className="hidden md:flex flex-wrap gap-2"></div>
      </nav>
    );
  }

  return (
    <nav
      className={`${navBgClass} rounded-2xl p-4 shadow-lg ${theme === 'dark' ? '' : 'border'} hover:border-transparent transition-all duration-500 ease-in-out sticky top-0 z-10 w-full max-w-[calc(100%-2rem)] mx-auto`}
    >
      {/* 移动端显示下拉框（md 以下） */}
      <div className="md:hidden relative" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`${dropdownButtonClass} flex items-center justify-between w-full px-4 py-2 rounded-xl shadow-sm ${theme === 'dark' ? '' : 'border'} hover:border-transparent transition-all duration-300`}
        >
          <span>{selectedCategory}</span>
          <ChevronDownIcon
            className={`w-5 h-5 transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>
        <div
          className={`${dropdownMenuClass} absolute top-full left-0 right-0 mt-2 rounded-xl shadow-lg ${theme === 'dark' ? '' : 'border'} z-20 max-h-60 overflow-y-auto transition-all duration-300 ease-in-out ${
            isOpen
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-2 pointer-events-none"
          }`}
        >
          <div className="flex flex-col gap-1 p-2">
            <CategoryLink
              href="/blog/category/all"
              category="全部文章"
              count={totalPosts}
              isActive={currentCategory === "all"}
            />
            {categories.map((category) => (
              <CategoryLink
                key={category}
                href={`/blog/category/${category.toLowerCase()}`}
                category={category}
                count={postsByCategory[category] || 0}
                isActive={
                  category.toLowerCase() === currentCategory.toLowerCase()
                }
              />
            ))}
          </div>
        </div>
      </div>

      {/* PC 端显示横向导航（md 及以上） */}
      <div className="hidden md:flex flex-wrap gap-2">
        <CategoryLink
          href="/blog/category/all"
          category="全部文章"
          count={totalPosts}
          isActive={currentCategory === "all"}
        />
        {categories.map((category) => (
          <CategoryLink
            key={category}
            href={`/blog/category/${category.toLowerCase()}`}
            category={category}
            count={postsByCategory[category] || 0}
            isActive={category.toLowerCase() === currentCategory.toLowerCase()}
          />
        ))}
      </div>
    </nav>
  );
}

export default memo(Categories);