"use client";

import { useMemo, useState } from "react";
import { Post } from "contentlayer/generated";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";
import { Calendar, ChevronDown, ChevronUp } from "lucide-react";
import { useThemeUtils } from "@/hooks/useThemeUtils";

interface TimelineViewProps {
  posts: Post[];
}

interface TimelineItem {
  year: string;
  posts: Post[];
}

const TimelineView = ({ posts }: TimelineViewProps) => {
  const [expanded, setExpanded] = useState(false);
  const { theme, getThemeColor } = useThemeUtils();

  // 定义hover状态的颜色映射
  const getHoverColorClass = () => {
    const hoverColors = {
      light: "hover:text-blue-600",
      dark: "hover:text-blue-600",
      green: "hover:text-green-600",
      purple: "hover:text-purple-600",
      orange: "hover:text-orange-600",
      blue: "hover:text-blue-600",
      pink: "hover:text-pink-600",
      brown: "hover:text-amber-600",
    };

    return hoverColors[theme as keyof typeof hoverColors] || hoverColors.light;
  };

  const timelineData = useMemo(() => {
    const sortedPosts = [...posts].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    const timeline: { [key: string]: Post[] } = {};

    sortedPosts.forEach((post) => {
      const year = new Date(post.date).getFullYear().toString();
      if (!timeline[year]) {
        timeline[year] = [];
      }
      timeline[year].push(post);
    });

    return Object.entries(timeline)
      .sort((a, b) => parseInt(b[0]) - parseInt(a[0]))
      .map(([year, posts]) => ({
        year,
        posts,
      }));
  }, [posts]);

  // 默认只显示第一年的数据，展开后显示全部
  const displayData = expanded ? timelineData : timelineData.slice(0, 1);

  // 根据主题获取颜色
  const getAccentColor = () => {
    const themeColors = {
      light: "text-blue-500",
      dark: "text-blue-500",
      green: "text-green-500",
      purple: "text-purple-500",
      orange: "text-orange-500",
      blue: "text-blue-500",
      pink: "text-pink-500",
      brown: "text-amber-500",
    };

    return themeColors[theme as keyof typeof themeColors] || themeColors.light;
  };

  const getBgClass = () => {
    const themeColors = {
      light:
        "bg-white/80 dark:bg-gray-800/80 hover:bg-white/90 dark:hover:bg-gray-800/90",
      dark: "bg-gray-800/80 hover:bg-gray-800/90",
      green:
        "bg-green-50/80 dark:bg-green-900/20 hover:bg-green-50/90 dark:hover:bg-green-900/30",
      purple:
        "bg-purple-50/80 dark:bg-purple-900/20 hover:bg-purple-50/90 dark:hover:bg-purple-900/30",
      orange:
        "bg-orange-50/80 dark:bg-orange-900/20 hover:bg-orange-50/90 dark:hover:bg-orange-900/30",
      blue: "bg-blue-50/80 dark:bg-blue-900/20 hover:bg-blue-50/90 dark:hover:bg-blue-900/30",
      pink: "bg-pink-50/80 dark:bg-pink-900/20 hover:bg-pink-50/90 dark:hover:bg-pink-900/30",
      brown:
        "bg-amber-50/80 dark:bg-amber-900/20 hover:bg-amber-50/90 dark:hover:bg-amber-900/30",
    };

    return themeColors[theme as keyof typeof themeColors] || themeColors.light;
  };

  const getBorderClass = () => {
    const themeColors = {
      light: "border-gray-200/50 dark:border-gray-700/50",
      dark: "border-gray-700/50",
      green:
        "border-green-200/50 dark:border-green-700/50 hover:border-green-300/70 dark:hover:border-green-600/70",
      purple:
        "border-purple-200/50 dark:border-purple-700/50 hover:border-purple-300/70 dark:hover:border-purple-600/70",
      orange:
        "border-orange-200/50 dark:border-orange-700/50 hover:border-orange-300/70 dark:hover:border-orange-600/70",
      blue: "border-blue-200/50 dark:border-blue-700/50 hover:border-blue-300/70 dark:hover:border-blue-600/70",
      pink: "border-pink-200/50 dark:border-pink-700/50 hover:border-pink-300/70 dark:hover:border-pink-600/70",
      brown:
        "border-amber-200/50 dark:border-amber-700/50 hover:border-amber-300/70 dark:hover:border-amber-600/70",
    };

    return themeColors[theme as keyof typeof themeColors] || themeColors.light;
  };

  const accentColor = getAccentColor();
  const bgClass = getBgClass();
  const borderClass = getBorderClass();
  const hoverColorClass = getHoverColorClass();

  return (
    <div
      className={`w-full max-w-2xl ${bgClass} rounded-lg shadow-lg p-6 group transition-all duration-300 hover:shadow-xl border ${borderClass} backdrop-blur-sm`}
    >
      <div className="flex items-center gap-2 mb-6">
        <Calendar className={accentColor} />
        <h3 className={`text-lg font-semibold ${accentColor}`}>文章时间线</h3>
      </div>
      <div className="space-y-8">
        {displayData.map(({ year, posts }) => (
          <div key={year} className="relative">
            <div className="flex items-center gap-4 mb-4">
              <span className={`text-xl font-bold ${accentColor}`}>{year}</span>
              <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700" />
            </div>
            <div className="space-y-4 pl-4">
              {posts.map((post) => (
                <div
                  key={post.url}
                  className={`relative pl-4 border-l-2 ${borderClass} transition-all duration-300`}
                >
                  <div
                    className={`absolute left-[-5px] top-2 w-2 h-2 rounded-full ${accentColor.replace(
                      "text-",
                      "bg-"
                    )}`}
                  />
                  <a
                    href={post.url}
                    className={`block ${hoverColorClass} transition-all duration-300`}
                  >
                    <time className="text-sm text-gray-500 dark:text-gray-400">
                      {format(new Date(post.date), "MM月dd日", {
                        locale: zhCN,
                      })}
                    </time>
                    <h4 className="text-base font-medium mt-1">{post.title}</h4>
                  </a>
                </div>
              ))}
            </div>
          </div>
        ))}

        {timelineData.length > 1 && (
          <button
            onClick={() => setExpanded(!expanded)}
            className={`flex items-center justify-center w-full mt-4 py-2 text-sm ${accentColor} ${hoverColorClass} transition-colors focus:outline-none`}
          >
            <span className="mr-1">{expanded ? "收起" : "查看更多"}</span>
            {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        )}
      </div>
    </div>
  );
};

export default TimelineView;
