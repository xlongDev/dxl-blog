"use client";

import React from "react";
import { Calendar, Clock } from "lucide-react";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";

interface TimeStatsProps {
  latestUpdate: string;
  avgReadingTime: number;
}

const TimeStats = ({ latestUpdate, avgReadingTime }: TimeStatsProps) => {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg transform transition-all duration-500 hover:scale-125 hover:animate-pulse hover:from-pink-500 hover:to-purple-500 hover:shadow-[0_0_15px_rgba(219,39,119,0.5)]">
          <Clock className="w-6 h-6" />
        </div>
        <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          时间统计
        </h3>
      </div>
      <div className="space-y-8">
        <div className="group/item hover:transform hover:translate-x-3 transition-all duration-300 p-6 rounded-xl hover:bg-gray-50/80 dark:hover:bg-gray-800/50 hover:shadow-md bg-gradient-to-br from-white to-purple-50/30 dark:from-gray-800 dark:to-purple-900/20">
          <div className="flex items-center gap-4 mb-3">
            <Calendar
              size={24}
              className="text-purple-500 transition-colors duration-300 group-hover/item:text-pink-500"
            />
            <span className="text-lg text-gray-700 dark:text-gray-300 font-medium">
              最近更新
            </span>
          </div>
          <span className="text-xl font-medium bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            {format(new Date(latestUpdate), "yyyy年MM月dd日", {
              locale: zhCN,
            })}
          </span>
        </div>
        <div className="group/item hover:transform hover:translate-x-3 transition-all duration-300 p-6 rounded-xl hover:bg-gray-50/80 dark:hover:bg-gray-800/50 hover:shadow-md bg-gradient-to-br from-white to-purple-50/30 dark:from-gray-800 dark:to-purple-900/20">
          <div className="flex items-center gap-4 mb-3">
            <Clock
              size={24}
              className="text-purple-500 transition-colors duration-300 group-hover/item:text-pink-500"
            />
            <span className="text-lg text-gray-700 dark:text-gray-300 font-medium">
              平均阅读时长
            </span>
          </div>
          <span className="text-xl font-medium bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            {avgReadingTime} 分钟
          </span>
        </div>
      </div>
    </div>
  );
};

export default React.memo(TimeStats);
