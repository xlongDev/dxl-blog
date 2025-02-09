"use client";

import { useEffect, useState } from "react";

interface BlogStats {
  totalViews: number;
  totalLikes: number;
}

export function useBlogStats() {
  const [stats, setStats] = useState<BlogStats>({
    totalViews: 0,
    totalLikes: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await fetch("/api/blog-stats");
        if (!response.ok) {
          throw new Error("获取博客统计数据失败");
        }
        const data = await response.json();
        setStats(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "获取博客统计数据失败");
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  return { stats, loading, error };
}
