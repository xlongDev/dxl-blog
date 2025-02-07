"use client";

import React from "react";
import { Post } from "contentlayer/generated";
import { TrendingUp } from "lucide-react";

interface PopularPostsProps {
  topPosts: Post[];
}

const PopularPosts = ({ topPosts }: PopularPostsProps) => {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 rounded-xl bg-gradient-to-r from-emerald-500 to-blue-500 text-white shadow-lg transform transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_20px_rgba(16,185,129,0.6)] hover:from-blue-500 hover:to-emerald-500">
          <TrendingUp className="w-6 h-6" />
        </div>
        <h3 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
          热门文章
        </h3>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {topPosts.map((post, index) => (
          <a
            key={post._id}
            href={post.url}
            className="block p-4 rounded-xl bg-gradient-to-br from-white to-purple-50 dark:from-gray-800 dark:to-purple-900/20 shadow-md hover:shadow-xl transition-all duration-300 group hover:transform hover:translate-y-[-0.25rem] border border-gray-200/50 dark:border-gray-700/50"
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400 text-sm font-medium">
                {index + 1}
              </span>
              <h4 className="font-medium text-gray-900 dark:text-gray-100 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors line-clamp-1">
                {post.title}
              </h4>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <TrendingUp className="w-4 h-4" />
              <span>{post.views || 0} 次阅读</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default React.memo(PopularPosts);
