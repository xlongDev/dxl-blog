"use client";

import { useMemo } from "react";
import { Post } from "contentlayer/generated";
import BasicStats from "./BlogStats/BasicStats";
import TimeStats from "./BlogStats/TimeStats";
import PopularPosts from "./BlogStats/PopularPosts";
import ExtendedStats from "./BlogStats/ExtendedStats";

interface BlogStatsProps {
  posts: Post[];
}

const calculateWordCount = (text: string) => text.trim().split(/\s+/).length;

const BlogStats = ({ posts }: BlogStatsProps) => {
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
    <div className="md:block w-full max-w-6xl mx-auto bg-gradient-to-br from-white via-white to-blue-50 dark:from-gray-800 dark:via-gray-800 dark:to-blue-900/20 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 p-10 border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
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
            totalWords={stats.totalWords}
            readingTimeDistribution={stats.readingTimeDistribution}
            totalLikes={stats.totalLikes}
          />
        </div>
      </div>
    </div>
  );
};

export default BlogStats;
