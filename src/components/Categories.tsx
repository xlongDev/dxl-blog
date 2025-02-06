"use client";

import { Post } from "contentlayer/generated";
import Link from "next/link";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

interface CategoriesProps {
  posts: Post[];
}

export default function Categories({ posts }: CategoriesProps) {
  const allCategories = Array.from(
    new Set(posts.map((post) => post.category))
  ).sort();

  const postsByCategory = allCategories.reduce((acc, category) => {
    acc[category] = posts.filter((post) => post.category === category);
    return acc;
  }, {} as Record<string, Post[]>);

  return (
    <div className="w-full">
      <div className="hidden lg:block">
        <nav className="bg-white/20 dark:bg-gray-800/20 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-gray-200/50 dark:border-gray-700/50 hover:backdrop-blur-xl hover:bg-white/30 dark:hover:bg-gray-800/30 transition-all duration-500 ease-in-out transform hover:scale-[1.02] hover:shadow-xl">
          <div className="flex flex-wrap gap-2">
            <Link
              href="/blog"
              className="group flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 hover:bg-gradient-to-r hover:from-indigo-500/10 hover:via-purple-500/10 hover:to-pink-500/10 border border-gray-200/50 dark:border-gray-700/50 hover:border-indigo-500/50 dark:hover:border-pink-400/50 shadow-sm hover:shadow-md bg-gradient-to-r from-blue-50/50 via-purple-50/50 to-pink-50/50 dark:from-blue-900/10 dark:via-purple-900/10 dark:to-pink-900/10 backdrop-blur-sm"
            >
              <span className="font-medium transition-all duration-300 bg-gradient-to-r from-gray-700 to-gray-900 dark:from-gray-300 dark:to-gray-100 bg-clip-text text-transparent group-hover:from-indigo-600 group-hover:via-purple-600 group-hover:to-pink-600">
                全部文章
              </span>
              <span className="text-xs font-medium text-gray-600 dark:text-gray-300 bg-gradient-to-r from-blue-100/80 via-purple-100/80 to-pink-100/80 dark:from-blue-900/30 dark:via-purple-900/30 dark:to-pink-900/30 backdrop-blur-md px-2.5 py-1 rounded-full shadow-sm transition-all duration-300 group-hover:from-blue-200/80 group-hover:via-purple-200/80 group-hover:to-pink-200/80 dark:group-hover:from-blue-800/30 dark:group-hover:via-purple-800/30 dark:group-hover:to-pink-800/30 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:shadow-md group-hover:scale-105 border border-gray-200/50 dark:border-gray-700/50">
                {posts.length}
              </span>
            </Link>
            {allCategories.map((category) => (
              <Link
                key={category}
                href={`/blog/category/${category.toLowerCase()}`}
                className="group flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:bg-gradient-to-r hover:from-indigo-500/10 hover:via-purple-500/10 hover:to-pink-500/10 hover:border-indigo-500/50 dark:hover:border-pink-400/50 border border-gray-200/50 dark:border-gray-700/50 shadow-sm bg-gradient-to-r from-blue-50/50 via-purple-50/50 to-pink-50/50 dark:from-blue-900/10 dark:via-purple-900/10 dark:to-pink-900/10 backdrop-blur-sm"
              >
                <span className="font-medium transition-all duration-300 bg-gradient-to-r from-gray-700 to-gray-900 dark:from-gray-300 dark:to-gray-100 bg-clip-text text-transparent group-hover:from-indigo-600 group-hover:via-purple-600 group-hover:to-pink-600">
                  {category}
                </span>
                <span className="text-xs font-medium text-gray-600 dark:text-gray-300 bg-gradient-to-r from-blue-100/80 via-purple-100/80 to-pink-100/80 dark:from-blue-900/30 dark:via-purple-900/30 dark:to-pink-900/30 backdrop-blur-md px-2.5 py-1 rounded-full shadow-sm transition-all duration-300 group-hover:from-blue-200/80 group-hover:via-purple-200/80 group-hover:to-pink-200/80 dark:group-hover:from-blue-800/30 dark:group-hover:via-purple-800/30 dark:group-hover:to-pink-800/30 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:shadow-md group-hover:scale-105 border border-gray-200/50 dark:border-gray-700/50">
                  {postsByCategory[category].length}
                </span>
              </Link>
            ))}
          </div>
        </nav>
      </div>

      <div className="lg:hidden">
        <Menu as="div" className="relative inline-block text-left w-full">
          <MenuButton className="inline-flex w-full justify-between items-center rounded-xl bg-white/30 dark:bg-gray-800/30 px-4 py-3 text-sm font-medium shadow-lg hover:bg-white/40 dark:hover:bg-gray-700/40 hover:backdrop-blur-lg focus:outline-none transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50">
            <span className="font-medium bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              文章分类
            </span>
            <ChevronDownIcon
              className="h-5 w-5 text-blue-600 dark:text-blue-400"
              aria-hidden="true"
            />
          </MenuButton>
          <MenuItems className="absolute left-0 z-10 mt-2 w-full origin-top-right rounded-xl bg-white/20 dark:bg-gray-800/20 backdrop-blur-md p-4 border border-gray-200/50 dark:border-gray-700/50 shadow-lg transition-all duration-300 hover:backdrop-blur-xl hover:bg-white/30 dark:hover:bg-gray-800/30 transform hover:scale-[1.02] hover:shadow-xl">
            <div className="py-1 space-y-1">
              <MenuItem>
                {({ focus }) => (
                  <Link
                    href="/blog"
                    className={`flex items-center justify-between px-4 py-2 text-sm rounded-lg transition-all duration-300 ${
                      focus
                        ? "bg-gradient-to-r from-blue-500/10 to-purple-500/10"
                        : ""
                    }`}
                  >
                    <span
                      className={`font-medium ${
                        focus
                          ? "text-blue-600 dark:text-blue-400"
                          : "text-gray-800 dark:text-gray-200"
                      }`}
                    >
                      全部文章
                    </span>
                    <span
                      className={`text-xs font-medium px-2.5 py-1 rounded-full shadow-sm transition-all duration-300 ${
                        focus
                          ? "bg-gradient-to-r from-blue-200/80 via-purple-200/80 to-pink-200/80 dark:from-blue-800/30 dark:via-purple-800/30 dark:to-pink-800/30 text-transparent bg-clip-text font-bold scale-105 shadow-md"
                          : "text-gray-500 dark:text-gray-400 bg-gray-100/80 dark:bg-gray-700/80 backdrop-blur-sm"
                      }`}
                    >
                      {posts.length}
                    </span>
                  </Link>
                )}
              </MenuItem>
              {allCategories.map((category) => (
                <MenuItem key={category}>
                  {({ focus }) => (
                    <Link
                      href={`/blog/category/${category.toLowerCase()}`}
                      className={`flex items-center justify-between px-4 py-2 text-sm rounded-lg transition-all duration-300 ${
                        focus
                          ? "bg-gradient-to-r from-blue-500/10 to-purple-500/10"
                          : ""
                      }`}
                    >
                      <span
                        className={`font-medium ${
                          focus
                            ? "text-blue-600 dark:text-blue-400"
                            : "text-gray-800 dark:text-gray-200"
                        }`}
                      >
                        {category}
                      </span>
                      <span
                        className={`text-xs font-medium px-2.5 py-1 rounded-full shadow-sm transition-all duration-300 ${
                          focus
                            ? "bg-blue-100/80 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 scale-105 shadow-md"
                            : "text-gray-500 dark:text-gray-400 bg-gray-100/80 dark:bg-gray-700/80 backdrop-blur-sm"
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
  );
}
