"use client";

import Link from "next/link";
import { allPosts } from "contentlayer/generated";
import PostCard from "@/components/PostCard";
import { TrendingUp } from "lucide-react";
import PostStats from "@/components/PostStats";
import { useArticleStats } from "@/hooks/useArticleStats";
import { useMemo } from "react";

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
    const favorites = 0; // 暂时保持为0，因为还没有收藏功能
    const score = views * 1 + likes * 2 + favorites * 3;
    return { views, likes, favorites, score };
  }, [stats]);

  return (
    <div className="group">
      <PostCard post={post} />
      <PostStats stats={heatScore} showScore={true} />
    </div>
  );
}

export default function PopularPosts() {
  // 获取热门文章
  const popularPosts = allPosts.slice(0, 3); // 暂时只显示最新的3篇文章，因为需要实时计算热度

  return (
    <section className="space-y-8 mt-16">
      <div className="flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white">
          <TrendingUp className="w-5 h-5" />
        </div>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
          热门文章
        </h2>
      </div>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {popularPosts.map((post) => (
          <PopularPostCard key={post._id} post={post} />
        ))}
      </div>
      <div className="text-center">
        <Link
          href="/blog"
          className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600 transition-all duration-300 hover:shadow-lg"
        >
          查看所有文章
        </Link>
      </div>
    </section>
  );
}
