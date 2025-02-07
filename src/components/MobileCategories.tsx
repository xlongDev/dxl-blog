"use client";

import { Post } from "contentlayer/generated";
import Link from "next/link";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useMemo, memo, forwardRef } from "react";

interface MobileCategoriesProps {
  posts: Post[];
}

const CategoryLink = forwardRef<
  HTMLAnchorElement,
  {
    href: string;
    category: string;
    count: number;
    focus?: boolean;
  }
>(({ href, category, count, focus = false }, ref) => (
  <Link
    ref={ref}
    href={href}
    className={`flex items-center justify-between px-4 py-2 text-sm rounded-lg transition-all duration-300 ${
      focus ? "bg-gradient-to-r from-blue-500/10 to-purple-500/10" : ""
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
      {count}
    </span>
  </Link>
));

CategoryLink.displayName = "CategoryLink";

export default function MobileCategories({ posts }: MobileCategoriesProps) {
  const { allCategories, postsByCategory } = useMemo(() => {
    const categories = Array.from(
      new Set(posts.map((post) => post.category))
    ).sort();
    const postsMap = categories.reduce((acc, category) => {
      acc[category] = posts.filter((post) => post.category === category);
      return acc;
    }, {} as Record<string, Post[]>);

    return { allCategories: categories, postsByCategory: postsMap };
  }, [posts]);

  return (
    <div className="lg:hidden">
      <Menu as="div" className="relative z-[200]">
        <MenuButton className="w-full flex items-center justify-between px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg border border-gray-200/50 dark:border-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-700/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition-all duration-300">
          分类
          <ChevronDownIcon className="ml-2 h-5 w-5" aria-hidden="true" />
        </MenuButton>
        <MenuItems className="absolute z-[200] mt-2 w-full bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-lg shadow-xl border border-gray-200/50 dark:border-gray-700/50 focus:outline-none overflow-hidden">
          <div className="overflow-y-auto max-h-[80vh] space-y-4">
            {allCategories.map((category) => (
              <MenuItem key={category} as="div">
                {({ active }) => (
                  <CategoryLink
                    href={`/blog/category/${category.toLowerCase()}`}
                    category={category}
                    count={postsByCategory[category].length}
                    focus={active}
                  />
                )}
              </MenuItem>
            ))}
          </div>
        </MenuItems>
      </Menu>
    </div>
  );
}
