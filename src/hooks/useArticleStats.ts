"use client";

import { useState, useEffect } from "react";
import { getUserId } from "@/lib/user";

interface ArticleStats {
  slug: string;
  views: number;
  likes: number;
  likedBy?: string[];
}

export function useArticleStats(slug: string) {
  const [stats, setStats] = useState<ArticleStats | null>(null);
  const [hasLiked, setHasLiked] = useState(() => {
    if (typeof window !== "undefined") {
      const likeState = localStorage.getItem(`article-like-${slug}`);
      return likeState ? JSON.parse(likeState).liked : false;
    }
    return false;
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;

    const userId = getUserId();
    if (!userId) return;

    const initializeStats = async () => {
      // 初始化加载数据
      await fetchStats();
      // 记录浏览量
      await recordView();
    };

    initializeStats();
  }, [slug]);

  // 单独处理点赞状态
  useEffect(() => {
    const userId = getUserId();
    if (stats?.likedBy && userId) {
      setHasLiked(stats.likedBy.includes(userId));
    }
  }, [stats?.likedBy]);

  const fetchStats = async () => {
    try {
      const response = await fetch(`/api/article-stats?slug=${slug}`);
      if (!response.ok) throw new Error("获取数据失败");
      const data = await response.json();
      setStats(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "未知错误");
    } finally {
      setIsLoading(false);
    }
  };

  const recordView = async () => {
    try {
      await fetch(`/api/article-stats?slug=${slug}&action=view`, {
        method: "POST",
      });
    } catch (err) {
      console.error("记录浏览量失败:", err);
    }
  };

  const handleLike = async () => {
    const userId = getUserId();
    if (!userId) return;

    try {
      const action = hasLiked ? "unlike" : "like";
      const response = await fetch(
        `/api/article-stats?slug=${slug}&action=${action}`,
        {
          method: "POST",
        }
      );
      if (!response.ok)
        throw new Error(action === "like" ? "点赞失败" : "取消点赞失败");
      const data = await response.json();
      setStats(data);
      setHasLiked(!hasLiked);
      localStorage.setItem(
        `article-like-${slug}`,
        JSON.stringify({ liked: !hasLiked })
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "未知错误");
    }
  };

  return {
    stats,
    isLoading,
    error,
    handleLike,
  };
}
