"use client";

import { Post } from "contentlayer/generated";
import { BarChart3, FileText, Folder, Hash } from "lucide-react";

interface BasicStatsProps {
  totalPosts: number;
  totalCategories: number;
  totalTags: number;
}

const BasicStats = ({
  totalPosts,
  totalCategories,
  totalTags,
}: BasicStatsProps) => {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-xl">
          <BarChart3 className="w-6 h-6" />
        </div>
        <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          博客统计
        </h3>
      </div>
      <div className="space-y-8">
        <div className="flex items-center justify-between group/item hover:transform hover:translate-x-3 transition-all duration-300 p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50">
          <div className="flex items-center gap-3">
            <FileText
              size={20}
              className="text-blue-500 transition-colors duration-300 group-hover/item:text-purple-500"
            />
            <span className="text-base text-gray-700 dark:text-gray-300 font-medium">
              文章总数
            </span>
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {totalPosts}
          </span>
        </div>
        <div className="flex items-center justify-between group/item hover:transform hover:translate-x-3 transition-all duration-300 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50">
          <div className="flex items-center gap-3">
            <Folder
              size={20}
              className="text-blue-500 transition-colors duration-300 group-hover/item:text-purple-500"
            />
            <span className="text-base text-gray-700 dark:text-gray-300 font-medium">
              文章分类
            </span>
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {totalCategories}
          </span>
        </div>
        <div className="flex items-center justify-between group/item hover:transform hover:translate-x-3 transition-all duration-300 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50">
          <div className="flex items-center gap-3">
            <Hash
              size={20}
              className="text-blue-500 transition-colors duration-300 group-hover/item:text-purple-500"
            />
            <span className="text-base text-gray-700 dark:text-gray-300 font-medium">
              文章标签
            </span>
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {totalTags}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BasicStats;
