"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import {
  MoonIcon,
  SunIcon,
  ChevronDownIcon,
  SearchIcon,
  GithubIcon,
} from "@/components/icons/HeaderIcons";
import Search from "@/components/Search";
import { allPosts } from "contentlayer/generated";

export default function Header() {
  const [mounted, setMounted] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  // 获取所有分类并去重
  const categories = Array.from(
    new Set(allPosts.map((post) => post.category))
  ).sort();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200/50 dark:border-gray-700/50 shadow-lg transition-all duration-300">
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group">
              <Image
                src="/ava.jpg"
                alt="晓龙"
                width={32}
                height={32}
                className="rounded-full transform transition-transform duration-300 group-hover:scale-110"
              />
              <span className="text-xl font-bold truncate min-w-[3rem] bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent transition-all duration-300 group-hover:from-purple-600 group-hover:to-pink-600">
                晓龙的blog
              </span>
            </Link>
            <div className="flex items-center space-x-6">
              <Link
                href="/blog"
                className="relative py-1 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-gradient-to-r after:from-blue-600 after:to-purple-600 after:transition-all after:duration-300"
              >
                博客
              </Link>
              <div className="relative group">
                <button className="relative py-1 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 group-hover:after:w-full after:bg-gradient-to-r after:from-blue-600 after:to-purple-600 after:transition-all after:duration-300 flex items-center gap-1">
                  分类
                  <ChevronDownIcon className="h-4 w-4 transition-transform duration-300 group-hover:rotate-180 opacity-70 group-hover:opacity-100" />
                </button>
                <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-[280px] bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-xl py-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-in-out transform group-hover:translate-y-0 translate-y-2 border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 pointer-events-none" />
                  <div className="grid grid-cols-2 gap-1 relative z-10">
                    {categories.map((category) => (
                      <Link
                        key={category}
                        href={`/blog/category/${category.toLowerCase()}`}
                        className="mx-2 px-4 py-2 rounded-xl hover:bg-gradient-to-r hover:from-blue-500/10 hover:via-purple-500/10 hover:to-pink-500/10 transition-all duration-300 group/item"
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
              >
                关于
              </Link>

              <a
                href="https://github.com/xLongDev"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-300"
              >
                <GithubIcon className="w-5 h-5 transform transition-transform duration-300 hover:scale-110" />
              </a>

              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-300"
              >
                <SearchIcon className="w-5 h-5 transform transition-transform duration-300 hover:scale-110" />
              </button>

              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-300"
              >
                {mounted && theme === "dark" ? (
                  <SunIcon className="w-5 h-5 transform transition-transform duration-300 hover:scale-110" />
                ) : (
                  <MoonIcon className="w-5 h-5 transform transition-transform duration-300 hover:scale-110" />
                )}
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* 搜索对话框 */}
      <Search
        isOpen={isSearchOpen}
        setIsOpen={setIsSearchOpen}
        posts={allPosts}
      />
    </>
  );
}
