"use client";

import React from "react";
import Link from "next/link";
import { allPosts } from "contentlayer/generated";
import { motion } from "framer-motion";
import TechCategoryIcon from "./icons/TechCategoryIcons";

const categories = Array.from(
  new Set(allPosts.map((post) => post.category))
).sort();

export default function TechCategories() {
  return (
    <section className="space-y-8 mt-16">
      <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent inline-block">
        技术分类
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {categories.map((category, index) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
          >
            <Link
              href={`/blog/category/${category.toLowerCase()}`}
              className="block p-6 rounded-2xl bg-gradient-to-br from-white/80 to-gray-50/80 dark:from-gray-800/80 dark:to-gray-900/80 hover:shadow-xl transition-all duration-300 text-center group border border-gray-200/30 dark:border-gray-700/30 hover:border-blue-500/50 dark:hover:border-blue-500/50 backdrop-blur-sm relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10 text-2xl mb-3 block transform transition-all duration-300 group-hover:scale-110">
                <TechCategoryIcon
                  category={category}
                  className="w-8 h-8 mx-auto text-blue-500 dark:text-blue-400 group-hover:text-blue-600 dark:group-hover:text-blue-300"
                />
              </span>
              <span className="relative z-10 font-medium text-sm text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors">
                {category}
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
