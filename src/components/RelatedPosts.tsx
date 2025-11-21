import React, { useEffect, useState } from "react";
import { Post } from "contentlayer/generated";
import Link from "next/link";
import { useThemeUtils } from "@/hooks/useThemeUtils";

function getRelatedPosts(currentPost: Post, allPosts: Post[], limit = 3) {
  // 根据标签相似度计算相关文章
  return allPosts
    .filter((post) => post._id !== currentPost._id)
    .map((post) => {
      const commonTags =
        post.tags?.filter((tag) => currentPost.tags?.includes(tag)).length || 0;
      return { ...post, similarity: commonTags };
    })
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, limit);
}

export default function RelatedPosts({
  currentPost,
  allPosts,
}: {
  currentPost: Post;
  allPosts: Post[];
}) {
  const relatedPosts = getRelatedPosts(currentPost, allPosts);
  const { theme, getThemeColor } = useThemeUtils();
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

  if (relatedPosts.length === 0) return null;

  return (
    <div className="mt-16 pt-8 border-t border-gray-200/50 dark:border-gray-700/50">
      <h2
        className={`text-2xl font-bold mb-6 bg-gradient-to-r ${getThemeColor(
          "from-blue-600 via-purple-600 to-pink-600",
          "from-blue-600 via-purple-600 to-pink-600",
          {
            green: "from-green-600 via-teal-600 to-emerald-600",
            purple: "from-purple-600 via-indigo-600 to-blue-600",
            orange: "from-orange-600 via-amber-600 to-yellow-600",
            blue: "from-blue-600 via-cyan-600 to-sky-600",
            pink: "from-pink-600 via-rose-600 to-red-600",
            brown: "from-amber-700 via-yellow-700 to-orange-700",
          }
        )} bg-clip-text text-transparent`}
      >
        相关文章
      </h2>
      <div className="grid gap-6 md:grid-cols-3">
        {relatedPosts.map((post) => {
          // 根据主题设置不同的卡片背景和边框颜色
          const cardBg = getThemeColor("bg-gray-800/80", "bg-white/80", {
            green: "bg-green-50/80 dark:bg-gray-800/80",
            purple: "bg-purple-50/80 dark:bg-gray-800/80",
            orange: "bg-orange-50/80 dark:bg-gray-800/80",
            blue: "bg-blue-50/80 dark:bg-gray-800/80",
            pink: "bg-pink-50/80 dark:bg-gray-800/80",
            brown: "bg-amber-50/80 dark:bg-gray-800/80",
          });

          const borderColor = getThemeColor(
            "border-gray-700/50",
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
            "hover:border-blue-400/50",
            "hover:border-blue-500/50",
            {
              green: "hover:border-green-400/50 dark:hover:border-green-500/50",
              purple:
                "hover:border-purple-400/50 dark:hover:border-purple-500/50",
              orange:
                "hover:border-orange-400/50 dark:hover:border-orange-500/50",
              blue: "hover:border-blue-400/50 dark:hover:border-blue-500/50",
              pink: "hover:border-pink-400/50 dark:hover:border-pink-500/50",
              brown: "hover:border-amber-500/50 dark:hover:border-amber-600/50",
            }
          );

          const hoverTextColor = getThemeColor(
            "group-hover:text-blue-400",
            "group-hover:text-blue-500",
            {
              green:
                "group-hover:text-green-600 dark:group-hover:text-green-400",
              purple:
                "group-hover:text-purple-600 dark:group-hover:text-purple-400",
              orange:
                "group-hover:text-orange-600 dark:group-hover:text-orange-400",
              blue: "group-hover:text-blue-600 dark:group-hover:text-blue-400",
              pink: "group-hover:text-pink-600 dark:group-hover:text-pink-400",
              brown:
                "group-hover:text-amber-700 dark:group-hover:text-amber-500",
            }
          );

          return (
            <Link
              key={post._id}
              href={`/blog/${post._raw.flattenedPath}`}
              prefetch={shouldPrefetch}
              className={`block p-6 rounded-xl ${cardBg} backdrop-blur-sm border ${borderColor} ${hoverBorderColor} hover:shadow-xl transition-all duration-300 group`}
            >
              <h3
                className={`font-medium mb-3 line-clamp-2 ${hoverTextColor} transition-colors`}
              >
                {post.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                {post.description}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
