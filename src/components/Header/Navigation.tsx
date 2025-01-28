"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { allPosts } from "contentlayer/generated";

type NavigationProps = {
  onNavigate?: () => void;
};

export default function Navigation({ onNavigate }: NavigationProps) {
  const categories = Array.from(
    new Set(allPosts.map((post) => post.category))
  ).sort();
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  return (
    <div className="flex md:items-center md:space-x-6 flex-col md:flex-row space-y-4 md:space-y-0">
      <Link
        href="/blog"
        className="relative py-1 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-gradient-to-r after:from-blue-600 after:to-purple-600 after:transition-all after:duration-300"
        onClick={onNavigate}
      >
        博客
      </Link>
      <div className="relative group md:hover:block">
        <button
          onClick={() => setIsCategoryOpen(!isCategoryOpen)}
          className="relative py-1 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 md:group-hover:after:w-full after:bg-gradient-to-r after:from-blue-600 after:to-purple-600 after:transition-all after:duration-300 flex items-center gap-1 w-full justify-center md:justify-start"
        >
          分类
          <ChevronDownIcon
            className={`h-4 w-4 transition-transform duration-300 opacity-70 md:group-hover:opacity-100 ${
              isCategoryOpen ? "rotate-180" : ""
            } md:group-hover:rotate-180`}
          />
        </button>
        <div
          className={`md:absolute left-1/2 -translate-x-1/2 mt-2 w-[280px] bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-xl py-4 transition-all duration-300 ease-in-out transform border border-gray-200/50 dark:border-gray-700/50 overflow-hidden md:left-1/2 md:-translate-x-1/2 left-0 translate-x-0
            md:opacity-0 md:invisible md:group-hover:opacity-100 md:group-hover:visible md:translate-y-2 md:group-hover:translate-y-0
            ${
              isCategoryOpen
                ? "opacity-100 visible translate-y-0 h-auto"
                : "opacity-0 invisible translate-y-2 h-0 md:h-auto"
            }`}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 pointer-events-none" />
          <div className="grid grid-cols-2 gap-1 relative z-10">
            {categories.map((category) => (
              <Link
                key={category}
                href={`/blog/category/${category.toLowerCase()}`}
                className="mx-2 px-4 py-2 rounded-xl hover:bg-gradient-to-r hover:from-blue-500/10 hover:via-purple-500/10 hover:to-pink-500/10 transition-all duration-300 group/item"
                onClick={() => {
                  setIsCategoryOpen(false);
                  onNavigate?.();
                }}
              >
                <div className="font-medium text-gray-800 dark:text-gray-200 group-hover/item:bg-gradient-to-r group-hover/item:from-blue-600 group-hover/item:via-purple-600 group-hover/item:to-pink-600 group-hover/item:bg-clip-text group-hover/item:text-transparent transition-all duration-300">
                  {category}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <Link
        href="/about"
        className="relative py-1 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-gradient-to-r after:from-blue-600 after:to-purple-600 after:transition-all after:duration-300"
        onClick={onNavigate}
      >
        关于
      </Link>
    </div>
  );
}
