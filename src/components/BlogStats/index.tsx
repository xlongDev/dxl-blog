"use client";

import React, { useMemo } from "react";
import useSWR from "swr";
import BasicStats from "./BasicStats";
import TimeStats from "./TimeStats";
import PopularPosts from "./PopularPosts";
import FeaturedPosts from "./FeaturedPosts";
import ExtendedStats from "./ExtendedStats";
import { useThemeUtils } from "@/hooks/useThemeUtils";

interface SimplePost {
  title: string;
  date: string;
  url: string;
  category: string;
  tags?: string[];
  views?: number;
  likes?: number;
}

const calculateWordCount = (text: string) => text?.trim().split(/\s+/).length || 0;

const fetcher = (url: string) => fetch(url).then(res => res.json());

const BlogStats = () => {
  const { data, isLoading } = useSWR<{ posts: SimplePost[] }>("/api/posts-simple", fetcher, { revalidateOnFocus: false });
  const { theme } = useThemeUtils();

  // 根据主题获取渐变背景色
  const getGradientBgClass = () => {
    const themeColors = {
      light:
        "from-white via-white to-blue-50 dark:from-gray-800 dark:via-gray-800 dark:to-blue-900/20",
      dark: "from-gray-800 via-gray-800 to-blue-900/20",
      green:
        "from-white via-white to-green-50 dark:from-gray-800 dark:via-gray-800 dark:to-green-900/20",
      purple:
        "from-white via-white to-purple-50 dark:from-gray-800 dark:via-gray-800 dark:to-purple-900/20",
      orange:
        "from-white via-white to-orange-50 dark:from-gray-800 dark:via-gray-800 dark:to-orange-900/20",
      blue: "from-white via-white to-blue-50 dark:from-gray-800 dark:via-gray-800 dark:to-blue-900/20",
      pink: "from-white via-white to-pink-50 dark:from-gray-800 dark:via-gray-800 dark:to-pink-900/20",
      brown:
        "from-white via-white to-amber-50 dark:from-gray-800 dark:via-gray-800 dark:to-amber-900/20",
    };

    return themeColors[theme as keyof typeof themeColors] || themeColors.light;
  };

  // 根据主题获取悬停渐变背景色
  const getHoverGradientClass = () => {
    const themeColors = {
      light: "from-blue-500/5 via-purple-500/5 to-pink-500/5",
      dark: "from-blue-500/5 via-purple-500/5 to-pink-500/5",
      green: "from-green-500/5 via-teal-500/5 to-emerald-500/5",
      purple: "from-purple-500/5 via-indigo-500/5 to-violet-500/5",
      orange: "from-orange-500/5 via-amber-500/5 to-yellow-500/5",
      blue: "from-blue-500/5 via-cyan-500/5 to-sky-500/5",
      pink: "from-pink-500/5 via-rose-500/5 to-fuchsia-500/5",
      brown: "from-amber-500/5 via-yellow-500/5 to-orange-500/5",
    };

    return themeColors[theme as keyof typeof themeColors] || themeColors.light;
  };

  // 根据主题获取边框颜色
  const getBorderClass = () => {
    const themeColors = {
      light: "border-gray-200/50 dark:border-gray-700/50",
      dark: "border-gray-700/50",
      green: "border-green-200/50 dark:border-green-700/50",
      purple: "border-purple-200/50 dark:border-purple-700/50",
      orange: "border-orange-200/50 dark:border-orange-700/50",
      blue: "border-blue-200/50 dark:border-blue-700/50",
      pink: "border-pink-200/50 dark:border-pink-700/50",
      brown: "border-amber-200/50 dark:border-amber-700/50",
    };

    return themeColors[theme as keyof typeof themeColors] || themeColors.light;
  };

  const gradientBgClass = getGradientBgClass();
  const hoverGradientClass = getHoverGradientClass();
  const borderClass = getBorderClass();

  const stats = useMemo(() => {
    if (!data?.posts) return {
      totalPosts: 0,
      totalCategories: 0,
      totalTags: 0,
      latestUpdate: '',
      topPosts: [],
      featuredPosts: [],
      avgReadingTime: 0,
      totalViews: 0,
      totalLikes: 0,
      totalWords: 0,
      readingTimeDistribution: {},
    };
    // 预先计算所有文章的字数，避免重复计算
    const wordCounts = data.posts.map((post) => calculateWordCount((post as any).body?.raw || ""));
    const totalWords = wordCounts.reduce((sum, count) => sum + count, 0);

    // 使用 Set 来优化分类和标签的去重
    const categories = new Set(data.posts.map((post) => post.category));
    const tags = new Set(data.posts.flatMap((post) => post.tags || []));

    // 使用 reduce 一次遍历计算多个统计数据
    const { totalViews, totalLikes, readingTimeDistribution } = data.posts.reduce(
      (acc, post, index) => {
        const readingTime = Math.ceil((wordCounts[index] || 0) / 200);
        const category =
          readingTime <= 2
            ? "2分钟以下"
            : readingTime <= 5
            ? "2-5分钟"
            : readingTime <= 10
            ? "5-10分钟"
            : "10分钟以上";

        acc.readingTimeDistribution[category] =
          (acc.readingTimeDistribution[category] || 0) + 1;
        acc.totalViews += post.views || 0;
        acc.totalLikes += post.likes || 0;

        return acc;
      },
      {
        totalViews: 0,
        totalLikes: 0,
        readingTimeDistribution: {} as Record<string, number>,
      }
    );

    // 使用 slice 优化数组排序
    const latestPost = data.posts
      .slice()
      .sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      )[0];

    const topPosts = data.posts
      .slice()
      .sort((a, b) => (b.views || 0) - (a.views || 0))
      .slice(0, 3);

    // 获取精选文章（根据标签或阅读量筛选）
    const featuredPosts = data.posts
      .filter(
        (post) => post.tags?.includes("精选") || post.tags?.includes("推荐")
      )
      .slice(0, 3);

    // 如果没有带特定标签的文章，则使用阅读量最高但不在热门文章中的文章
    if (featuredPosts.length === 0) {
      const topPostIds = new Set(topPosts.map((post) => post.url));
      featuredPosts.push(
        ...data.posts
          .filter((post) => !topPostIds.has(post.url))
          .sort((a, b) => (b.views || 0) - (a.views || 0))
          .slice(0, 3)
      );
    }

    const avgReadingTime = Math.ceil(totalWords / (data.posts.length || 1) / 200);

    return {
      totalPosts: data.posts.length,
      totalCategories: categories.size,
      totalTags: tags.size,
      latestUpdate: latestPost?.date || '',
      topPosts,
      featuredPosts,
      avgReadingTime,
      totalViews,
      totalLikes,
      totalWords,
      readingTimeDistribution,
    };
  }, [data]);

  return (
    <div
      className={`w-full max-w-6xl mx-auto bg-gradient-to-br ${gradientBgClass} rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 sm:p-8 md:p-10 border ${borderClass} backdrop-blur-sm relative overflow-hidden group`}
    >
      {/* 悬停渐变效果 */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${hoverGradientClass} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
      />

      {/* 主内容区域 */}
      <div className="relative z-10 space-y-8 md:space-y-10">
        {/* 顶部统计区域 - 在大屏幕上并排显示 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* 基础统计信息 */}
          <div className="lg:col-span-1 h-full">
            <BasicStats
              totalPosts={stats.totalPosts}
              totalCategories={stats.totalCategories}
              totalTags={stats.totalTags}
            />
          </div>

          {/* 时间统计信息 */}
          <div className="lg:col-span-1 h-full">
            <TimeStats
              latestUpdate={stats.latestUpdate}
              avgReadingTime={stats.avgReadingTime}
            />
          </div>

          {/* 热门文章 */}
          <div className="lg:col-span-1 h-full">
            <PopularPosts topPosts={stats.topPosts} />
          </div>
        </div>

        {/* 中部区域 - 精选文章 */}
        <div className="w-full">
          <FeaturedPosts featuredPosts={stats.featuredPosts} />
        </div>

        {/* 底部区域 - 扩展统计 */}
        <div className="w-full">
          <ExtendedStats
            totalViews={stats.totalViews}
            totalLikes={stats.totalLikes}
            totalWords={stats.totalWords}
            readingTimeDistribution={stats.readingTimeDistribution}
          />
        </div>
      </div>
    </div>
  );
};

export default React.memo(BlogStats);