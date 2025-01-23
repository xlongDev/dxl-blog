"use client";

import { Post } from "contentlayer/generated";
import PostCard from "./PostCard";
import FadeIn from "@/components/FadeIn";
import Link from "next/link";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

interface CategoryFilterProps {
  posts: Post[];
}

export default function CategoryFilter({ posts }: CategoryFilterProps) {
  // 获取所有分类
  const allCategories = Array.from(
    new Set(posts.map((post) => post.category))
  ).sort();

  // 按分类组织文章
  const postsByCategory = allCategories.reduce((acc, category) => {
    acc[category] = posts.filter((post) => post.category === category);
    return acc;
  }, {} as Record<string, Post[]>);

  return (
    <div className="space-y-8">
      {/* 分类导航 */}
      <div className="w-full">
        <div className="hidden lg:block">
          <nav className="bg-white/30 dark:bg-gray-800/30 rounded-2xl p-4 shadow-lg border border-gray-200/50 dark:border-gray-700/50 hover:backdrop-blur-lg transition-all duration-300">
            <div className="flex flex-wrap gap-2">
              <Link
                href="/blog"
                className="group flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-purple-500/10"
              >
                <span className="font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  全部文章
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded-full transition-colors group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  {posts.length}
                </span>
              </Link>
              {allCategories.map((category) => (
                <Link
                  key={category}
                  href={`/blog/category/${category.toLowerCase()}`}
                  className="group flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-purple-500/10"
                >
                  <span className="font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {category}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded-full transition-colors group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    {postsByCategory[category].length}
                  </span>
                </Link>
              ))}
            </div>
          </nav>
        </div>

        <div className="lg:hidden">
          <Menu as="div" className="relative inline-block text-left w-full">
            <MenuButton className="inline-flex w-full justify-between items-center rounded-xl bg-white/30 dark:bg-gray-800/30 px-6 py-3.5 text-sm font-medium shadow-lg hover:bg-white/40 dark:hover:bg-gray-700/40 hover:backdrop-blur-lg focus:outline-none transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50">
              <span className="font-medium bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                文章分类
              </span>
              <ChevronDownIcon
                className="h-5 w-5 text-blue-600 dark:text-blue-400"
                aria-hidden="true"
              />
            </MenuButton>
            <MenuItems className="absolute left-0 z-10 mt-2 w-full origin-top-right rounded-xl bg-white/10 dark:bg-gray-800/10 backdrop-blur-lg p-4 rounded-xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg transition-all duration-300">
              <div className="py-2">
                <MenuItem>
                  {({ active }) => (
                    <Link
                      href="/blog"
                      className={`flex items-center justify-between px-6 py-3 text-sm transition-all duration-300 ${
                        active
                          ? "bg-gradient-to-r from-blue-500/10 to-purple-500/10"
                          : ""
                      }`}
                    >
                      <span
                        className={`font-medium ${
                          active ? "text-blue-600 dark:text-blue-400" : ""
                        }`}
                      >
                        全部文章
                      </span>
                      <span
                        className={`text-sm px-2.5 py-1 rounded-full transition-colors ${
                          active
                            ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                            : "text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700"
                        }`}
                      >
                        {posts.length}
                      </span>
                    </Link>
                  )}
                </MenuItem>
                {allCategories.map((category) => (
                  <MenuItem key={category}>
                    {({ active }) => (
                      <Link
                        href={`/blog/category/${category.toLowerCase()}`}
                        className={`flex items-center justify-between px-6 py-3 text-sm transition-all duration-300 ${
                          active
                            ? "bg-gradient-to-r from-blue-500/10 to-purple-500/10"
                            : ""
                        }`}
                      >
                        <span
                          className={`font-medium ${
                            active ? "text-blue-600 dark:text-blue-400" : ""
                          }`}
                        >
                          {category}
                        </span>
                        <span
                          className={`text-sm px-2.5 py-1 rounded-full transition-colors ${
                            active
                              ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                              : "text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700"
                          }`}
                        >
                          {postsByCategory[category].length}
                        </span>
                      </Link>
                    )}
                  </MenuItem>
                ))}
              </div>
            </MenuItems>
          </Menu>
        </div>
      </div>

      {/* 文章列表 */}
      <div className="w-full">
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {posts.map((post) => (
            <FadeIn key={post.url}>
              <PostCard post={post} />
            </FadeIn>
          ))}
        </div>
      </div>
    </div>
  );
}
