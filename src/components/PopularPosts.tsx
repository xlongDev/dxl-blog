import Link from "next/link";
import { allPosts } from "contentlayer/generated";
import PostCard from "@/components/PostCard";
import { TrendingUp, Eye, MessageSquare, ThumbsUp } from "lucide-react";

interface HeatScore {
  views: number;
  likes: number;
  comments: number;
  score: number;
}

export default function PopularPosts() {
  // 计算文章热度分数
  const calculateHeatScore = (post: any): HeatScore => {
    const views = post.views || 0;
    const likes = post.likes || 0;
    const comments = post.comments || 0;
    // 根据不同指标权重计算热度分数
    const score = views * 1 + likes * 2 + comments * 3;
    return { views, likes, comments, score };
  };

  // 获取热门文章
  const popularPosts = allPosts
    .map((post) => ({
      ...post,
      heatScore: calculateHeatScore(post),
    }))
    .sort((a, b) => b.heatScore.score - a.heatScore.score)
    .slice(0, 3);

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
          <div key={post._id} className="group">
            <PostCard post={post} />
            <div className="mt-4 flex items-center justify-between px-4 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <Eye className="w-4 h-4" />
                  {post.heatScore.views}
                </span>
                <span className="flex items-center gap-1.5">
                  <ThumbsUp className="w-4 h-4" />
                  {post.heatScore.likes}
                </span>
                <span className="flex items-center gap-1.5">
                  <MessageSquare className="w-4 h-4" />
                  {post.heatScore.comments}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-red-500" />
                <span className="font-medium text-red-500">
                  {post.heatScore.score}
                </span>
              </div>
            </div>
          </div>
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
