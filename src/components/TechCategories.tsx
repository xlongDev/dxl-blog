"use client";

import React from "react";
import Link from "next/link";
import { allPosts } from "contentlayer/generated";
import { motion } from "framer-motion";
import { Folder, Clock } from "lucide-react";
import TechCategoryIcon from "./icons/TechCategoryIcons";

interface CategoryInfo {
  name: string;
  count: number;
  lastUpdated: string;
}

const getCategoryInfo = (): CategoryInfo[] => {
  const categoryMap = new Map<string, CategoryInfo>();

  allPosts.forEach((post) => {
    if (!post.category) return;

    const info = categoryMap.get(post.category) || {
      name: post.category,
      count: 0,
      lastUpdated: post.date,
    };

    info.count++;
    if (post.date > info.lastUpdated) {
      info.lastUpdated = post.date;
    }

    categoryMap.set(post.category, info);
  });

  return Array.from(categoryMap.values()).sort((a, b) => {
    const isChineseA = /[\u4e00-\u9fa5]/.test(a.name);
    const isChineseB = /[\u4e00-\u9fa5]/.test(b.name);

    if (isChineseA === isChineseB) {
      return a.name.localeCompare(b.name);
    }
    return isChineseA ? 1 : -1;
  });
};

const categories = getCategoryInfo();

export default function TechCategories() {
  return (
    <section className="space-y-8 mt-16">
      <div className="flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-gradient-to-r from-green-500 to-blue-500 text-white">
          <Folder className="w-5 h-5" />
        </div>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
          技术分类
        </h2>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {categories.map((category, index) => (
          <motion.div
            key={category.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
          >
            <Link
              href={`/blog/category/${category.name.toLowerCase()}`}
              className="block p-6 rounded-2xl bg-gradient-to-br from-white/80 to-gray-50/80 dark:from-gray-800/80 dark:to-gray-900/80 hover:shadow-xl transition-all duration-300 text-center group border border-gray-200/30 dark:border-gray-700/30 hover:border-blue-500/50 dark:hover:border-blue-500/50 backdrop-blur-sm relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <TechCategoryIcon
                category={category.name}
                className="w-10 h-10 mx-auto mb-4 text-blue-500 dark:text-blue-400 group-hover:text-blue-600 dark:group-hover:text-blue-300 transform transition-all duration-300 group-hover:scale-110"
              />
              <span className="relative z-10 font-medium text-sm text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors">
                {category.name}
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
