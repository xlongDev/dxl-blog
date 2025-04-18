"use client";

import React, { useMemo } from "react";
import { Post } from "contentlayer/generated";
import BasicStats from "./BasicStats";
import TimeStats from "./TimeStats";
import PopularPosts from "./PopularPosts";
import ExtendedStats from "./ExtendedStats";
import { useThemeUtils } from "@/hooks/useThemeUtils";

interface BlogStatsProps {
  posts: Post[];
}

const calculateWordCount = (text: string) => text.trim().split(/\s+/).length;

const BlogStats = ({ posts }: BlogStatsProps) => {
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
    // 预先计算所有文章的字数，避免重复计算
    const wordCounts = posts.map((post) => calculateWordCount(post.body.raw));
    const totalWords = wordCounts.reduce((sum, count) => sum + count, 0);

    // 使用 Set 来优化分类和标签的去重
    const categories = new Set(posts.map((post) => post.category));
    const tags = new Set(posts.flatMap((post) => post.tags || []));

    // 使用 reduce 一次遍历计算多个统计数据
    const { totalViews, totalLikes, readingTimeDistribution } = posts.reduce(
      (acc, post, index) => {
        const readingTime = Math.ceil(wordCounts[index] / 200);
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
    const latestPost = posts
      .slice()
      .sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      )[0];

    const topPosts = posts
      .slice()
      .sort((a, b) => (b.views || 0) - (a.views || 0))
      .slice(0, 3);

    const avgReadingTime = Math.ceil(totalWords / posts.length / 200);

    return {
      totalPosts: posts.length,
      totalCategories: categories.size,
      totalTags: tags.size,
      latestUpdate: latestPost.date,
      topPosts,
      avgReadingTime,
      totalViews,
      totalLikes,
      totalWords,
      readingTimeDistribution,
    };
  }, [posts]);

  return (
    <div
      className={`md:block w-full max-w-6xl mx-auto bg-gradient-to-br ${gradientBgClass} rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 p-10 border ${borderClass} backdrop-blur-sm relative overflow-hidden group`}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${hoverGradientClass} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
      />
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        <BasicStats
          totalPosts={stats.totalPosts}
          totalCategories={stats.totalCategories}
          totalTags={stats.totalTags}
        />
        <div className="md:col-span-1">
          <TimeStats
            latestUpdate={stats.latestUpdate}
            avgReadingTime={stats.avgReadingTime}
          />
        </div>
        <div className="md:col-span-1">
          <PopularPosts topPosts={stats.topPosts} />
        </div>
        <div className="col-span-1 md:col-span-2 lg:col-span-3 mt-6 lg:mt-8">
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
