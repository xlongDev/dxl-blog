"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";

interface Activity {
  id: string;
  type: "like" | "favorite" | "comment";
  userId: string;
  articleSlug: string;
  articleTitle: string;
  createdAt: string;
}

export default function RecentActivities() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchActivities() {
      try {
        const response = await fetch("/api/admin/activities");
        if (!response.ok) {
          throw new Error("获取活动数据失败");
        }
        const data = await response.json();
        setActivities(data);
      } catch (error) {
        console.error("Error fetching activities:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchActivities();
  }, []);

  const getActivityIcon = (type: Activity["type"]) => {
    switch (type) {
      case "like":
        return "❤️";
      case "favorite":
        return "⭐";
      case "comment":
        return "💬";
      default:
        return "📝";
    }
  };

  const getActivityText = (activity: Activity) => {
    switch (activity.type) {
      case "like":
        return "点赞了文章";
      case "favorite":
        return "收藏了文章";
      case "comment":
        return "评论了文章";
      default:
        return "与文章互动";
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            className="animate-pulse flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg"
          >
            <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded-full" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4 overflow-y-auto max-h-[calc(100%-2rem)]">
      {activities.length === 0 ? (
        <div className="text-center text-gray-500 dark:text-gray-400 py-8">
          暂无活动记录
        </div>
      ) : (
        activities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-start space-x-4 p-4 bg-gray-50 hover:bg-gray-100 dark:bg-gray-800/50 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <div className="text-2xl">{getActivityIcon(activity.type)}</div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-900 dark:text-gray-100">
                <span className="font-medium">用户 {activity.userId}</span>{" "}
                {getActivityText(activity)}{" "}
                <span className="font-medium truncate">
                  {activity.articleTitle}
                </span>
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {format(new Date(activity.createdAt), "yyyy年MM月dd日 HH:mm", {
                  locale: zhCN,
                })}
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
