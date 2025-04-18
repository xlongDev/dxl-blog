"use client";

import { useEffect, useState } from "react";
import {
  ChartBarIcon,
  EyeIcon,
  HeartIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/outline";
import VisitTrend from "@/components/admin/VisitTrend";
import RecentActivities from "@/components/admin/RecentActivities";

interface StatsData {
  totalViews: number;
  totalLikes: number;
  totalComments: number;
  totalPosts: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<StatsData>({
    totalViews: 0,
    totalLikes: 0,
    totalComments: 0,
    totalPosts: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [visitDataLoading, setVisitDataLoading] = useState(true);
  const [visitData, setVisitData] = useState<
    { date: string; visits: number }[]
  >([]);

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await fetch("/api/admin/stats");
        if (!response.ok) {
          throw new Error("获取统计数据失败");
        }
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setIsLoading(false);
      }
    }

    async function fetchVisitData() {
      try {
        const response = await fetch("/api/admin/visit-trend");
        if (!response.ok) {
          throw new Error("获取访问趋势数据失败");
        }
        const data = await response.json();
        setVisitData(data);
      } catch (error) {
        console.error("Error fetching visit trend:", error);
      } finally {
        setVisitDataLoading(false);
      }
    }

    fetchStats();
    fetchVisitData();
  }, []);

  const stats_cards = [
    {
      title: "总浏览量",
      value: stats.totalViews,
      icon: EyeIcon,
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-50 dark:bg-blue-900/50",
    },
    {
      title: "总点赞数",
      value: stats.totalLikes,
      icon: HeartIcon,
      color: "text-pink-600 dark:text-pink-400",
      bgColor: "bg-pink-50 dark:bg-pink-900/50",
    },
    {
      title: "总评论数",
      value: stats.totalComments,
      icon: ChatBubbleLeftRightIcon,
      color: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-50 dark:bg-green-900/50",
    },
    {
      title: "文章总数",
      value: stats.totalPosts,
      icon: ChartBarIcon,
      color: "text-purple-600 dark:text-purple-400",
      bgColor: "bg-purple-50 dark:bg-purple-900/50",
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">仪表盘</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats_cards.map((card, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {card.title}
                </p>
                <p className="mt-2 text-3xl font-semibold">
                  {isLoading ? (
                    <span className="inline-block h-8 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                  ) : (
                    card.value.toLocaleString()
                  )}
                </p>
              </div>
              <div className={`p-3 rounded-full ${card.bgColor} ${card.color}`}>
                <card.icon className="w-6 h-6" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 图表区域 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-lg font-semibold mb-4">访问趋势</h2>
          <div className="h-80">
            {visitDataLoading ? (
              <div className="h-full flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin" />
              </div>
            ) : (
              <VisitTrend data={visitData} />
            )}
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-lg font-semibold mb-4">最近活动</h2>
          <div className="h-80">
            <RecentActivities />
          </div>
        </div>
      </div>
    </div>
  );
}
