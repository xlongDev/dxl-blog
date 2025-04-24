"use client";

import Link from "next/link";
import { allPosts } from "contentlayer/generated";
import PostCard from "@/components/PostCard";
import { TrendingUp } from "lucide-react";
import PostStats from "@/components/PostStats";
import { useArticleStats } from "@/hooks/useArticleStats";
import { useMemo } from "react";
import { useThemeUtils } from "@/hooks/useThemeUtils";

interface HeatScore {
  views: number;
  likes: number;
  favorites: number;
  score: number;
}

interface PostWithStats {
  post: any;
  stats: HeatScore;
}

function PopularPostCard({ post }: { post: any }) {
  const { stats } = useArticleStats(post.slug);

  const heatScore = useMemo(() => {
    const views = stats?.views || 0;
    const likes = stats?.likes || 0;
    const favorites = 0;
    const score = views * 1 + likes * 2 + favorites * 3;
    return { views, likes, favorites, score };
  }, [stats]);

  return (
    <div className="group">
      <PostCard post={post} />
      {/* <PostStats stats={heatScore} showScore={true} /> */}
    </div>
  );
}

export default function PopularPosts() {
  const { theme, getThemeValue } = useThemeUtils();

  const popularPosts = allPosts.slice(0, 3);

  // 更新为热门的红色系配色方案
  const getIconGradient = () => {
    return getThemeValue(
      {
        light: "from-rose-500 to-pink-600", // 明亮模式: 玫瑰红到粉红
        dark: "from-rose-400 to-pink-500",  // 暗黑模式: 稍柔和的色调
        green: "from-emerald-500 to-teal-500",
        purple: "from-purple-500 to-violet-500",
        orange: "from-orange-500 to-red-500",
        blue: "from-blue-500 to-indigo-500",
        pink: "from-pink-500 to-fuchsia-500",
        brown: "from-amber-500 to-orange-500",
      },
      "from-rose-500 to-pink-600" // 默认使用明亮的红色系
    );
  };

  // 标题文字渐变更新
  const getTitleGradient = () => {
    return getThemeValue(
      {
        light: "from-rose-600 to-pink-700", // 更深的红色系
        dark: "from-rose-400 to-pink-500",  // 暗黑模式保持柔和
        green: "from-emerald-600 to-teal-600",
        purple: "from-purple-600 to-violet-600",
        orange: "from-orange-600 to-red-600",
        blue: "from-blue-600 to-indigo-600",
        pink: "from-pink-600 to-fuchsia-600",
        brown: "from-amber-600 to-orange-600",
      },
      "from-rose-600 to-pink-700"
    );
  };

  // 按钮背景渐变更新
  const getButtonGradient = () => {
    return getThemeValue(
      {
        light: "from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700",
        dark: "from-rose-400 to-pink-500 hover:from-rose-500 hover:to-pink-600",
        green: "from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600",
        purple: "from-purple-500 to-violet-500 hover:from-purple-600 hover:to-violet-600",
        orange: "from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600",
        blue: "from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600",
        pink: "from-pink-500 to-fuchsia-500 hover:from-pink-600 hover:to-fuchsia-600",
        brown: "from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600",
      },
      "from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700"
    );
  };

  return (
    <section className="space-y-8 mt-16">
      <div className="flex items-center gap-3">
        <div
          className={`p-2.5 rounded-xl bg-gradient-to-r ${getIconGradient()} text-white`}
        >
          <TrendingUp className="w-5 h-5" />
        </div>
        <h2
          className={`text-2xl font-bold bg-gradient-to-r ${getTitleGradient()} bg-clip-text text-transparent`}
        >
          热门文章
        </h2>
      </div>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {popularPosts.map((post) => (
          <PopularPostCard key={post._id} post={post} />
        ))}
      </div>
      {/* <div className="text-center">
        <Link
          href="/blog"
          className={`inline-block px-6 py-3 rounded-full bg-gradient-to-r ${getButtonGradient()} text-white transition-all duration-300 hover:shadow-lg`}
        >
          查看所有文章
        </Link>
      </div> */}
    </section>
  );
}