"use client";

import { useMemo } from "react";
import { Post } from "contentlayer/generated";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";
import { Calendar } from "lucide-react";

interface TimelineViewProps {
  posts: Post[];
}

interface TimelineItem {
  year: string;
  posts: Post[];
}

const TimelineView = ({ posts }: TimelineViewProps) => {
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

  return (
    <div className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="flex items-center gap-2 mb-6">
        <Calendar className="text-blue-500" />
        <h3 className="text-lg font-semibold">文章时间线</h3>
      </div>
      <div className="space-y-8">
        {timelineData.map(({ year, posts }) => (
          <div key={year} className="relative">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-xl font-bold text-blue-500">{year}</span>
              <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700" />
            </div>
            <div className="space-y-4 pl-4">
              {posts.map((post) => (
                <div
                  key={post.url}
                  className="relative pl-4 border-l-2 border-gray-200 dark:border-gray-700"
                >
                  <div className="absolute left-[-5px] top-2 w-2 h-2 rounded-full bg-blue-500" />
                  <a
                    href={post.url}
                    className="block hover:text-blue-500 transition-colors"
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
      </div>
    </div>
  );
};

export default TimelineView;
