"use client";
import React from "react";
import {
  BarChart3,
  FileText,
  Clock,
  MessageCircle,
  TrendingUp,
} from "lucide-react";

interface ExtendedStatsProps {
  totalViews: number;
  totalWords: number;
  readingTimeDistribution: Record<string, number>;
  totalLikes: number;
}

const ExtendedStats = ({
  totalViews,
  totalWords,
  readingTimeDistribution,
  totalLikes,
}: ExtendedStatsProps) => {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 lg:gap-6">
      <div className="group/item hover:transform hover:translate-y-[-0.5rem] transition-all duration-300 p-4 md:p-5 lg:p-6 rounded-xl bg-gradient-to-br from-white to-green-50 dark:from-gray-800 dark:to-green-900/20 shadow-md hover:shadow-xl">
        <div className="flex items-center gap-4 mb-3">
          <TrendingUp
            size={24}
            className="text-green-500 transition-colors duration-300 group-hover/item:text-teal-500"
          />
          <span className="text-base md:text-lg text-gray-700 dark:text-gray-300 font-medium">
            总阅读量
          </span>
        </div>
        <span className="text-2xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
          {totalViews.toLocaleString()}
        </span>
      </div>
      <div className="group/item hover:transform hover:translate-y-[-0.5rem] transition-all duration-300 p-4 md:p-5 lg:p-6 rounded-xl bg-gradient-to-br from-white to-green-50 dark:from-gray-800 dark:to-green-900/20 shadow-md hover:shadow-xl">
        <div className="flex items-center gap-4 mb-3">
          <FileText
            size={24}
            className="text-green-500 transition-colors duration-300 group-hover/item:text-teal-500"
          />
          <span className="text-base md:text-lg text-gray-700 dark:text-gray-300 font-medium">
            总字数
          </span>
        </div>
        <span className="text-2xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
          {totalWords.toLocaleString()}
        </span>
      </div>
      <div className="group/item hover:transform hover:translate-y-[-0.5rem] transition-all duration-300 p-4 md:p-5 lg:p-6 rounded-xl bg-gradient-to-br from-white to-green-50 dark:from-gray-800 dark:to-green-900/20 shadow-md hover:shadow-xl">
        <div className="flex items-center gap-4 mb-3">
          <Clock
            size={24}
            className="text-green-500 transition-colors duration-300 group-hover/item:text-teal-500"
          />
          <span className="text-base md:text-lg text-gray-700 dark:text-gray-300 font-medium">
            阅读时长分布
          </span>
        </div>
        <div className="space-y-1">
          {Object.entries(readingTimeDistribution).map(([category, count]) => (
            <div
              key={category}
              className="flex justify-between items-center py-0.5"
            >
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {category}
              </span>
              <span className="text-sm font-medium text-green-600 dark:text-green-400">
                {count} 篇
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="group/item hover:transform hover:translate-y-[-0.5rem] transition-all duration-300 p-4 md:p-5 lg:p-6 rounded-xl bg-gradient-to-br from-white to-green-50 dark:from-gray-800 dark:to-green-900/20 shadow-md hover:shadow-xl">
        <div className="flex items-center gap-4 mb-3">
          <MessageCircle
            size={24}
            className="text-green-500 transition-colors duration-300 group-hover/item:text-teal-500"
          />
          <span className="text-base md:text-lg text-gray-700 dark:text-gray-300 font-medium">
            总点赞数
          </span>
        </div>
        <span className="text-2xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
          {totalLikes.toLocaleString()}
        </span>
      </div>
    </div>
  );
};

export default React.memo(ExtendedStats);
