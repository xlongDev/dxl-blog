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
    <div className="flex gap-8">
      {/* 左侧分类导航（桌面端） */}
      <div className="hidden lg:block w-64 space-y-4">
        <h2 className="text-xl font-bold mb-4">文章分类</h2>
        <ul className="space-y-2">
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
                href={`/blog/category/${category.toLowerCase()}`}
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
          <Menu.Button className="inline-flex w-full justify-between items-center rounded-md bg-white dark:bg-gray-800 px-4 py-2 text-sm font-medium shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none">
            文章分类
            <ChevronDownIcon className="-mr-1 h-5 w-5" aria-hidden="true" />
          </Menu.Button>

          <Menu.Items className="absolute left-0 z-10 mt-2 w-full origin-top-right rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <Link
                    href="/blog"
                    className={`block px-4 py-2 text-sm ${
                      active ? "bg-gray-100 dark:bg-gray-700" : ""
                    }`}
                  >
                    全部文章 ({posts.length})
                  </Link>
                )}
              </Menu.Item>
              {allCategories.map((category) => (
                <Menu.Item key={category}>
                  {({ active }) => (
                    <Link
                      href={`/blog/category/${category.toLowerCase()}`}
                      className={`block px-4 py-2 text-sm ${
                        active ? "bg-gray-100 dark:bg-gray-700" : ""
                      }`}
                    >
                      {category} ({postsByCategory[category].length})
                    </Link>
                  )}
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </Menu>
      </div>

      {/* 右侧文章列表 */}
      <div className="flex-1">
        <div className="grid gap-8 grid-cols-1">
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
