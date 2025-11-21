"use client";

import Link from "next/link";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";
import { useThemeUtils } from "@/hooks/useThemeUtils";
import { useTheme } from "next-themes";
import { renderEmojiText } from "@/utils/emojiUtils";
import { Post } from "contentlayer/generated";
import Image from "next/image";
import { Eye, Heart } from "lucide-react";
import { useState, useEffect } from "react";

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const { theme, getThemeValue } = useThemeUtils();
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 获取卡片背景色
  const getCardBg = () => {
    return getThemeValue(
      {
        light: "bg-white/30 dark:bg-gray-800/30",
        dark: "bg-gray-800/30",
        green: "bg-green-50/30 dark:bg-gray-800/30",
        purple: "bg-purple-50/30 dark:bg-gray-800/30",
        orange: "bg-orange-50/30 dark:bg-gray-800/30",
        blue: "bg-blue-50/30 dark:bg-gray-800/30",
        pink: "bg-pink-50/30 dark:bg-gray-800/30",
        brown: "bg-amber-50/30 dark:bg-gray-800/30",
      },
      "bg-white/30 dark:bg-gray-800/30"
    );
  };

  // 获取卡片边框色
  const getCardBorder = () => {
    return getThemeValue(
      {
        light: "border-gray-200/50 dark:border-gray-700/50",
        dark: "border-gray-700/50",
        green: "border-green-200/50 dark:border-gray-700/50",
        purple: "border-purple-200/50 dark:border-gray-700/50",
        orange: "border-orange-200/50 dark:border-gray-700/50",
        blue: "border-blue-200/50 dark:border-gray-700/50",
        pink: "border-pink-200/50 dark:border-gray-700/50",
        brown: "border-amber-200/50 dark:border-gray-700/50",
      },
      "border-gray-200/50 dark:border-gray-700/50"
    );
  };

  // 获取hover时的边框色
  const getHoverBorder = () => {
    return getThemeValue(
      {
        light: "hover:border-blue-500/50",
        dark: "hover:border-blue-500/50",
        green: "hover:border-green-500/50",
        purple: "hover:border-purple-500/50",
        orange: "hover:border-orange-500/50",
        blue: "hover:border-blue-500/50",
        pink: "hover:border-pink-500/50",
        brown: "hover:border-amber-600/50",
      },
      "hover:border-blue-500/50"
    );
  };

  // 获取hover时的背景渐变
  const getHoverGradient = () => {
    return getThemeValue(
      {
        light: "hover:from-blue-500/10 hover:to-purple-500/10",
        dark: "hover:from-blue-500/10 hover:to-purple-500/10",
        green: "hover:from-green-500/10 hover:to-teal-500/10",
        purple: "hover:from-purple-500/10 hover:to-indigo-500/10",
        orange: "hover:from-orange-500/10 hover:to-amber-500/10",
        blue: "hover:from-blue-500/10 hover:to-cyan-500/10",
        pink: "hover:from-pink-500/10 hover:to-rose-500/10",
        brown: "hover:from-amber-600/10 hover:to-yellow-600/10",
      },
      "hover:from-blue-500/10 hover:to-purple-500/10"
    );
  };

  // 获取hover时的标题渐变色
  const getTitleGradient = () => {
    return getThemeValue(
      {
        light:
          "group-hover:from-blue-600 group-hover:via-purple-600 group-hover:to-pink-600",
        dark: "group-hover:from-blue-600 group-hover:via-purple-600 group-hover:to-pink-600",
        green:
          "group-hover:from-green-600 group-hover:via-teal-600 group-hover:to-emerald-600",
        purple:
          "group-hover:from-purple-600 group-hover:via-indigo-600 group-hover:to-blue-600",
        orange:
          "group-hover:from-orange-600 group-hover:via-amber-600 group-hover:to-yellow-600",
        blue: "group-hover:from-blue-600 group-hover:via-cyan-600 group-hover:to-sky-600",
        pink: "group-hover:from-pink-600 group-hover:via-rose-600 group-hover:to-red-600",
        brown:
          "group-hover:from-amber-700 group-hover:via-yellow-700 group-hover:to-orange-700",
      },
      "group-hover:from-blue-600 group-hover:via-purple-600 group-hover:to-pink-600"
    );
  };

  // 获取hover时的日期颜色
  const getDateColor = () => {
    return getThemeValue(
      {
        light: "group-hover:text-blue-400",
        dark: "group-hover:text-blue-500",
        green: "group-hover:text-green-400 dark:group-hover:text-green-600",
        purple: "group-hover:text-purple-400 dark:group-hover:text-purple-600",
        orange: "group-hover:text-orange-400 dark:group-hover:text-orange-600",
        blue: "group-hover:text-blue-400 dark:group-hover:text-blue-600",
        pink: "group-hover:text-pink-400 dark:group-hover:text-pink-600",
        brown: "group-hover:text-amber-500 dark:group-hover:text-amber-700",
      },
      "group-hover:text-blue-400"
    );
  };

  // 获取标签样式 - 修复水合错误
  const getTagStyles = () => {
    if (!mounted) {
      // 服务端渲染时使用简化的样式，避免水合错误
      return "text-xs px-2.5 py-0.5 rounded-full transition-all bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300 hover:bg-blue-100";
    }

    const bgColor = getThemeValue(
      {
        light:
          "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300",
        dark: "bg-blue-900/30 text-blue-300",
        green:
          "bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-300",
        purple:
          "bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-300",
        orange:
          "bg-orange-50 text-orange-600 dark:bg-orange-900/30 dark:text-orange-300",
        blue: "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300",
        pink: "bg-pink-50 text-pink-600 dark:bg-pink-900/30 dark:text-pink-300",
        brown:
          "bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
      },
      "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300"
    );

    const hoverBgColor = getThemeValue(
      {
        light: "hover:bg-blue-100",
        dark: "hover:bg-blue-800/50",
        green: "hover:bg-green-100 dark:hover:bg-green-800/50",
        purple: "hover:bg-purple-100 dark:hover:bg-purple-800/50",
        orange: "hover:bg-orange-100 dark:hover:bg-orange-800/50",
        blue: "hover:bg-blue-100 dark:hover:bg-blue-800/50",
        pink: "hover:bg-pink-100 dark:hover:bg-pink-800/50",
        brown: "hover:bg-amber-100 dark:hover:bg-amber-800/50",
      },
      "hover:bg-blue-100 dark:hover:bg-blue-800/50"
    );

    return `text-xs px-2.5 py-0.5 rounded-full transition-all ${bgColor} ${hoverBgColor}`;
  };

  const cardBg = getCardBg();
  const cardBorder = getCardBorder();
  const hoverBorder = getHoverBorder();
  const hoverGradient = getHoverGradient();
  const titleGradient = getTitleGradient();
  const dateColor = getDateColor();
  const tagStyles = getTagStyles();
  const [shouldPrefetch, setShouldPrefetch] = useState(true);

  useEffect(() => {
    try {
      const nav: any = typeof navigator !== "undefined" ? navigator : null;
      const conn: any = nav && nav.connection ? nav.connection : null;
      const saveData = !!(conn && conn.saveData);
      const effective = (conn && conn.effectiveType) || "4g";
      const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
      const slow = /(^2g|^slow-2g|^3g)/.test(effective);
      setShouldPrefetch(!saveData && !slow && !isMobile);
    } catch {
      setShouldPrefetch(true);
    }
  }, []);

  return (
    <Link
      href={post.url}
      prefetch={shouldPrefetch}
      className={`group block p-6 rounded-lg border ${cardBorder} ${cardBg} hover:backdrop-blur-lg ${hoverBorder} transition-all duration-300 hover:-translate-y-1 shadow-md hover:shadow-xl hover:bg-gradient-to-r ${hoverGradient}`}
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
            {post.category || "未分类"}
          </span>
          <time
            dateTime={post.date}
            className={`text-sm font-mono shrink-0 text-gray-500 dark:text-gray-400 ${dateColor} transition-colors`}
          >
            {format(new Date(post.date), "yyyy-MM-dd", { locale: zhCN })}
          </time>
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 transition-all duration-300">
          {renderEmojiText(
            post.title,
            `transition-all duration-300 group-hover:bg-gradient-to-r ${titleGradient} group-hover:bg-clip-text group-hover:text-transparent`
          )}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 line-clamp-2">
          {post.description}
        </p>
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className={tagStyles}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
