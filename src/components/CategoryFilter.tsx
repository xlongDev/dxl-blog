"use client"; // 标记该组件为客户端组件，仅在客户端渲染

import { Post } from "contentlayer/generated"; // 导入Post类型，用于表示文章数据
import PostCard from "./PostCard"; // 导入PostCard组件，用于展示单篇文章
import FadeIn from "@/components/FadeIn"; // 导入FadeIn组件，用于实现渐入动画效果
import Link from "next/link"; // 导入Link组件，用于实现客户端导航
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react"; // 导入Headless UI的Menu组件，用于实现下拉菜单
import { ChevronDownIcon } from "@heroicons/react/20/solid"; // 导入ChevronDownIcon图标，用于下拉菜单按钮

// 定义CategoryFilter组件的props类型
interface CategoryFilterProps {
  posts: Post[]; // 接收一个Post类型的数组作为props
}

// CategoryFilter组件，用于按分类过滤和展示文章
export default function CategoryFilter({ posts }: CategoryFilterProps) {
  // 获取所有分类，并去重和排序
  const allCategories = Array.from(
    new Set(posts.map((post) => post.category)) // 从posts中提取所有分类，并使用Set去重
  ).sort(); // 对分类进行排序

  // 按分类组织文章，生成一个以分类为键，文章数组为值的对象
  const postsByCategory = allCategories.reduce((acc, category) => {
    acc[category] = posts.filter((post) => post.category === category); // 过滤出属于当前分类的文章
    return acc;
  }, {} as Record<string, Post[]>); // 初始值为一个空对象，类型为Record<string, Post[]>

  return (
    <div className="space-y-8">
      {/* 分类导航部分 */}
      <div className="w-full">
        {/* 大屏幕下的分类导航 */}
        <div className="hidden lg:block">
          <nav className="bg-white/30 dark:bg-gray-800/30 rounded-2xl p-4 shadow-lg border border-gray-200/50 dark:border-gray-700/50 hover:backdrop-blur-lg transition-all duration-300">
            <div className="flex flex-wrap gap-2">
              {/* 全部文章链接 */}
              <Link
                href="/blog"
                className="group flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-purple-500/10"
              >
                <span className="font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  全部文章
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded-full transition-colors group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  {posts.length} {/* 显示文章总数 */}
                </span>
              </Link>
              {/* 遍历所有分类，生成分类链接 */}
              {allCategories.map((category) => (
                <Link
                  key={category}
                  href={`/blog/category/${category.toLowerCase()}`}
                  className="group flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-purple-500/10"
                >
                  <span className="font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {category} {/* 显示分类名称 */}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded-full transition-colors group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    {postsByCategory[category].length} {/* 显示该分类下的文章数量 */}
                  </span>
                </Link>
              ))}
            </div>
          </nav>
        </div>

        {/* 小屏幕下的分类导航（下拉菜单） */}
        <div className="lg:hidden">
          <Menu as="div" className="relative inline-block text-left w-full">
            {/* 下拉菜单按钮 */}
            <MenuButton className="inline-flex w-full justify-between items-center rounded-xl bg-white/30 dark:bg-gray-800/30 px-6 py-3.5 text-sm font-medium shadow-lg hover:bg-white/40 dark:hover:bg-gray-700/40 hover:backdrop-blur-lg focus:outline-none transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50">
              <span className="font-medium bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                文章分类
              </span>
              <ChevronDownIcon
                className="h-5 w-5 text-blue-600 dark:text-blue-400"
                aria-hidden="true"
              />
            </MenuButton>
            {/* 下拉菜单内容 */}
            <MenuItems className="absolute left-0 z-10 mt-2 w-full origin-top-right rounded-xl bg-white/10 dark:bg-gray-800/10 backdrop-blur-lg p-4 border border-gray-200/50 dark:border-gray-700/50 shadow-lg transition-all duration-300">
              <div className="py-2">
                {/* 全部文章菜单项 */}
                <MenuItem>
                  {({ focus }) => ( // 使用 focus 替代 active
                    <Link
                      href="/blog"
                      className={`flex items-center justify-between px-6 py-3 text-sm transition-all duration-300 ${
                        focus
                          ? "bg-gradient-to-r from-blue-500/10 to-purple-500/10"
                          : ""
                      }`}
                    >
                      <span
                        className={`font-medium ${
                          focus ? "text-blue-600 dark:text-blue-400" : ""
                        }`}
                      >
                        全部文章
                      </span>
                      <span
                        className={`text-sm px-2.5 py-1 rounded-full transition-colors ${
                          focus
                            ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                            : "text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700"
                        }`}
                      >
                        {posts.length} {/* 显示文章总数 */}
                      </span>
                    </Link>
                  )}
                </MenuItem>
                {/* 遍历所有分类，生成分类菜单项 */}
                {allCategories.map((category) => (
                  <MenuItem key={category}>
                    {({ focus }) => ( // 使用 focus 替代 active
                      <Link
                        href={`/blog/category/${category.toLowerCase()}`}
                        className={`flex items-center justify-between px-6 py-3 text-sm transition-all duration-300 ${
                          focus
                            ? "bg-gradient-to-r from-blue-500/10 to-purple-500/10"
                            : ""
                        }`}
                      >
                        <span
                          className={`font-medium ${
                            focus ? "text-blue-600 dark:text-blue-400" : ""
                          }`}
                        >
                          {category} {/* 显示分类名称 */}
                        </span>
                        <span
                          className={`text-sm px-2.5 py-1 rounded-full transition-colors ${
                            focus
                              ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                              : "text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700"
                          }`}
                        >
                          {postsByCategory[category].length} {/* 显示该分类下的文章数量 */}
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

      {/* 文章列表部分 */}
      <div className="w-full">
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {/* 遍历所有文章，使用FadeIn组件包裹PostCard组件 */}
          {posts.map((post) => (
            <FadeIn key={post.url}>
              <PostCard post={post} /> {/* 展示单篇文章 */}
            </FadeIn>
          ))}
        </div>
      </div>
    </div>
  );
}