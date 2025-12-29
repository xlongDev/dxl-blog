"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Post } from "contentlayer/generated";
import PostCard from "@/components/PostCard";
import { Clock, ArrowRight } from "lucide-react";
import { getReadingTime } from "./ReadingTime";
import { useThemeUtils } from "@/hooks/useThemeUtils";

interface LatestPostsProps {
  posts: Post[];
}

export default function LatestPosts({ posts }: LatestPostsProps) {
  const { theme, getThemeValue } = useThemeUtils();
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

  // 根据主题获取图标背景渐变
  const getIconGradient = () => {
    return getThemeValue(
      {
        light: "from-blue-500 to-purple-500",
        dark: "from-blue-400 to-purple-400",
        green: "from-green-500 to-teal-500",
        purple: "from-purple-500 to-indigo-500",
        orange: "from-orange-500 to-amber-500",
        blue: "from-blue-500 to-cyan-500",
        pink: "from-pink-500 to-rose-500",
        brown: "from-amber-500 to-yellow-500",
      },
      "from-blue-500 to-purple-500"
    );
  };

  // 根据主题获取标题文字渐变
  const getTitleGradient = () => {
    return getThemeValue(
      {
        light: "from-blue-600 via-purple-600 to-pink-600",
        dark: "from-blue-400 via-purple-400 to-pink-400",
        green: "from-green-600 via-teal-600 to-emerald-600",
        purple: "from-purple-600 via-indigo-600 to-violet-600",
        orange: "from-orange-600 via-amber-600 to-yellow-600",
        blue: "from-blue-600 via-cyan-600 to-sky-600",
        pink: "from-pink-600 via-rose-600 to-fuchsia-600",
        brown: "from-amber-600 via-yellow-600 to-orange-600",
      },
      "from-blue-600 via-purple-600 to-pink-600"
    );
  };

  // 根据主题获取按钮背景渐变
  const getButtonGradient = () => {
    return getThemeValue(
      {
        light:
          "from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600",
        dark: "from-blue-400 to-purple-400 hover:from-blue-500 hover:to-purple-500",
        green:
          "from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600",
        purple:
          "from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600",
        orange:
          "from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600",
        blue: "from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600",
        pink: "from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600",
        brown:
          "from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600",
      },
      "from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
    );
  };

  // 根据主题获取链接文本颜色
  const getLinkTextColor = () => {
    return getThemeValue(
      {
        light: "text-blue-500 hover:text-blue-600",
        dark: "text-blue-400 hover:text-blue-500",
        green: "text-green-500 hover:text-green-600",
        purple: "text-purple-500 hover:text-purple-600",
        orange: "text-orange-500 hover:text-orange-600",
        blue: "text-blue-500 hover:text-blue-600",
        pink: "text-pink-500 hover:text-pink-600",
        brown: "text-amber-500 hover:text-amber-600",
      },
      "text-blue-500 hover:text-blue-600"
    );
  };

  return (
    <section className="space-y-8 mt-16">
      <div className="flex items-center gap-3">
        <div
          className={`p-2.5 rounded-xl bg-gradient-to-r ${getIconGradient()} text-white`}
        >
          <Clock className="w-5 h-5" />
        </div>
        <h2
          className={`text-2xl font-bold bg-gradient-to-r ${getTitleGradient()} bg-clip-text text-transparent`}
        >
          最新文章
        </h2>
      </div>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <div key={post._id} className="group">
            <PostCard post={post} />
            <div className="mt-4 flex items-center justify-between px-4 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  {getReadingTime(post.body.raw)} 分钟
                </span>
              </div>
              <Link
                href={`/blog/${post._raw.flattenedPath}`}
                prefetch={shouldPrefetch}
                className={`flex items-center gap-1 ${getLinkTextColor()} transition-colors`}
              >
                阅读全文
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center">
        <Link
          href="/blog"
          prefetch={shouldPrefetch}
          className={`inline-block px-6 py-3 rounded-full bg-gradient-to-r ${getButtonGradient()} text-white transition-all duration-300 hover:shadow-lg`}
        >
          查看所有文章
        </Link>
      </div>
    </section>
  );
}
