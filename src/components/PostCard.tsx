"use client";

import Link from "next/link";
import { format } from "date-fns";
import type { Post } from "contentlayer/generated";
import { useThemeUtils } from "@/hooks/useThemeUtils";
import { renderEmojiText } from "@/utils/emojiUtils";

export default function PostCard({ post }: { post: Post }) {
  const { getThemeColor } = useThemeUtils();

  // 根据主题设置不同的卡片背景和边框颜色
  const cardBg = getThemeColor("bg-gray-800/30", "bg-white/30", {
    green: "bg-green-50/30 dark:bg-gray-800/30",
    purple: "bg-purple-50/30 dark:bg-gray-800/30",
    orange: "bg-orange-50/30 dark:bg-gray-800/30",
    blue: "bg-blue-50/30 dark:bg-gray-800/30",
    pink: "bg-pink-50/30 dark:bg-gray-800/30",
    brown: "bg-amber-50/30 dark:bg-gray-800/30",
  });

  const borderColor = getThemeColor(
    "border-gray-800/50",
    "border-gray-200/50",
    {
      green: "border-green-200/50 dark:border-gray-700/50",
      purple: "border-purple-200/50 dark:border-gray-700/50",
      orange: "border-orange-200/50 dark:border-gray-700/50",
      blue: "border-blue-200/50 dark:border-gray-700/50",
      pink: "border-pink-200/50 dark:border-gray-700/50",
      brown: "border-amber-200/50 dark:border-gray-700/50",
    }
  );

  const hoverBorderColor = getThemeColor(
    "hover:border-blue-500/50",
    "hover:border-blue-500/50",
    {
      green: "hover:border-green-500/50",
      purple: "hover:border-purple-500/50",
      orange: "hover:border-orange-500/50",
      blue: "hover:border-blue-500/50",
      pink: "hover:border-pink-500/50",
      brown: "hover:border-amber-600/50",
    }
  );

  const hoverGradient = getThemeColor(
    "hover:from-blue-500/10 hover:to-purple-500/10",
    "hover:from-blue-500/10 hover:to-purple-500/10",
    {
      green: "hover:from-green-500/10 hover:to-teal-500/10",
      purple: "hover:from-purple-500/10 hover:to-indigo-500/10",
      orange: "hover:from-orange-500/10 hover:to-amber-500/10",
      blue: "hover:from-blue-500/10 hover:to-cyan-500/10",
      pink: "hover:from-pink-500/10 hover:to-rose-500/10",
      brown: "hover:from-amber-600/10 hover:to-yellow-600/10",
    }
  );

  const titleGradient = getThemeColor(
    "group-hover:from-blue-600 group-hover:via-purple-600 group-hover:to-pink-600",
    "group-hover:from-blue-600 group-hover:via-purple-600 group-hover:to-pink-600",
    {
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
    }
  );

  const dateColor = getThemeColor(
    "group-hover:text-blue-400",
    "group-hover:text-blue-500",
    {
      green: "group-hover:text-green-400 dark:group-hover:text-green-600",
      purple: "group-hover:text-purple-400 dark:group-hover:text-purple-600",
      orange: "group-hover:text-orange-400 dark:group-hover:text-orange-600",
      blue: "group-hover:text-blue-400 dark:group-hover:text-blue-600",
      pink: "group-hover:text-pink-400 dark:group-hover:text-pink-600",
      brown: "group-hover:text-amber-500 dark:group-hover:text-amber-700",
    }
  );

  const tagBgColor = getThemeColor(
    "bg-blue-900/30 text-blue-300",
    "bg-blue-50 text-blue-600",
    {
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
    }
  );

  const tagHoverBgColor = getThemeColor(
    "hover:bg-blue-800/50",
    "hover:bg-blue-100",
    {
      green: "hover:bg-green-800/50 dark:hover:bg-green-100",
      purple: "hover:bg-purple-800/50 dark:hover:bg-purple-100",
      orange: "hover:bg-orange-800/50 dark:hover:bg-orange-100",
      blue: "hover:bg-blue-800/50 dark:hover:bg-blue-100",
      pink: "hover:bg-pink-800/50 dark:hover:bg-pink-100",
      brown: "hover:bg-amber-800/50 dark:hover:bg-amber-100",
    }
  );

  return (
    <Link
      href={`/blog/${post._raw.flattenedPath}`}
      className={`group block p-6 rounded-lg border ${borderColor} ${cardBg} hover:backdrop-blur-lg ${hoverBorderColor} transition-all duration-300 hover:-translate-y-1 shadow-md hover:shadow-xl hover:bg-gradient-to-r ${hoverGradient}`}
    >
      <h2 className="text-lg sm:text-xl font-bold mb-2 leading-snug">
        {renderEmojiText(
          post.title,
          `transition-all duration-300 group-hover:bg-gradient-to-r ${titleGradient} group-hover:bg-clip-text group-hover:text-transparent`
        )}
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-4">
        {post.description}
      </p>
      <div className="flex items-center justify-between text-sm text-gray-500">
        <time
          dateTime={post.date}
          className={`font-mono text-sm shrink-0 ${dateColor} transition-colors`}
        >
          {format(new Date(post.date), "yyyy.MM.dd")}
        </time>
        <div className="flex gap-1.5 flex-wrap justify-end">
          {post.tags?.map((tag) => (
            <span
              key={tag}
              className={`inline-block rounded-full ${tagBgColor} text-xs px-2.5 py-0.5 max-w-[120px] truncate transition-all ${tagHoverBgColor}`}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
