"use client";

import { useState } from "react";
import { Post } from "contentlayer/generated";
import PostCard from "./PostCard";
import FadeIn from "@/components/FadeIn";
import Link from "next/link";
import { Menu } from "@headlessui/react";
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
    <div className="flex flex-col lg:flex-row gap-8">
      {/* 左侧分类导航（桌面端） */}
      <div className="hidden lg:block w-64 shrink-0 space-y-4">
        <h2 className="text-xl font-bold mb-4">文章分类</h2>
        <ul className="space-y-2 sticky top-24">
          <li>
            <Link
              href="/blog"
              className="block w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              全部文章
              <span className="ml-2 text-gray-500 dark:text-gray-400">
                ({posts.length})
              </span>
            </Link>
          </li>
          {allCategories.map((category) => (
            <li key={category}>
              <Link
                href={`/blog/category/${category}`}
                className="block w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                {category}
                <span className="ml-2 text-gray-500 dark:text-gray-400">
                  ({postsByCategory[category].length})
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* 移动端下拉菜单 */}
      <div className="lg:hidden w-full mb-6">
        <Menu as="div" className="relative inline-block text-left w-full">
          <Menu.Button className="inline-flex w-full justify-between items-center rounded-lg bg-white dark:bg-gray-800 px-6 py-3 text-sm font-medium shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none transition-all duration-200 ease-in-out border border-gray-200 dark:border-gray-700">
            <span className="flex items-center gap-2">
              <svg
                className="w-5 h-5 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
              文章分类
            </span>
            <ChevronDownIcon
              className="h-5 w-5 text-gray-500 transition-transform duration-200"
              aria-hidden="true"
            />
          </Menu.Button>

          <Menu.Items className="absolute left-0 z-10 mt-2 w-full origin-top-right rounded-lg bg-white dark:bg-gray-800 shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none border border-gray-200 dark:border-gray-700 divide-y divide-gray-100 dark:divide-gray-700 overflow-hidden transition-all duration-200 ease-in-out">
            <div className="py-2">
              <Menu.Item>
                {({ active }) => (
                  <Link
                    href="/blog"
                    className={`flex items-center justify-between px-6 py-3 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150 ${
                      active ? "bg-gray-50 dark:bg-gray-700" : ""
                    }`}
                    onClick={() => {
                      const button = document.querySelector(
                        '[aria-expanded="true"]'
                      );
                      if (button) {
                        (button as HTMLElement).click();
                      }
                    }}
                  >
                    <span className="font-medium">全部文章</span>
                    <span className="text-gray-500 dark:text-gray-400 text-xs bg-gray-100 dark:bg-gray-600 px-2 py-1 rounded-full">
                      {posts.length}
                    </span>
                  </Link>
                )}
              </Menu.Item>
              {allCategories.map((category) => (
                <Menu.Item key={category}>
                  {({ active }) => (
                    <Link
                      href={`/blog/category/${category.toLowerCase()}`}
                      className={`flex items-center justify-between px-6 py-3 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150 ${
                        active ? "bg-gray-50 dark:bg-gray-700" : ""
                      }`}
                      onClick={() => {
                        const button = document.querySelector(
                          '[aria-expanded="true"]'
                        );
                        if (button) {
                          (button as HTMLElement).click();
                        }
                      }}
                    >
                      <span className="font-medium">{category}</span>
                      <span className="text-gray-500 dark:text-gray-400 text-xs bg-gray-100 dark:bg-gray-600 px-2 py-1 rounded-full">
                        {postsByCategory[category].length}
                      </span>
                    </Link>
                  )}
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </Menu>
      </div>

      {/* 右侧文章列表 */}
      <div className="w-full lg:flex-1">
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
