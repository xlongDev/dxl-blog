"use client";

import { Post } from "contentlayer/generated";
import Link from "next/link";
import { useMemo, memo } from "react";

interface CategoriesProps {
  posts: Post[];
}

const CategoryLink = memo(
  ({
    href,
    category,
    count,
  }: {
    href: string;
    category: string;
    count: number;
  }) => {
    return (
      <Link
        href={href}
        className="group flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:bg-gradient-to-r hover:from-indigo-500/10 hover:via-purple-500/10 hover:to-pink-500/10 hover:border-indigo-500/50 dark:hover:border-pink-400/50 border border-gray-200/50 dark:border-gray-700/50 shadow-sm bg-gradient-to-r from-blue-50/50 via-purple-50/50 to-pink-50/50 dark:from-blue-900/10 dark:via-purple-900/10 dark:to-pink-900/10 backdrop-blur-sm"
      >
        <span className="font-medium transition-all duration-300 bg-gradient-to-r from-gray-700 to-gray-900 dark:from-gray-300 dark:to-gray-100 bg-clip-text text-transparent group-hover:from-indigo-600 group-hover:via-purple-600 group-hover:to-pink-600">
          {category}
        </span>
        <span className="text-xs font-medium text-gray-600 dark:text-gray-300 bg-gradient-to-r from-blue-100/80 via-purple-100/80 to-pink-100/80 dark:from-blue-900/30 dark:via-purple-900/30 dark:to-pink-900/30 backdrop-blur-md px-2.5 py-1 rounded-full shadow-sm transition-all duration-300 group-hover:from-blue-200/80 group-hover:via-purple-200/80 group-hover:to-pink-200/80 dark:group-hover:from-blue-800/30 dark:group-hover:via-purple-800/30 dark:group-hover:to-pink-800/30 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:shadow-md group-hover:scale-105 border border-gray-200/50 dark:border-gray-700/50">
          {count}
        </span>
      </Link>
    );
  }
);

CategoryLink.displayName = "CategoryLink";

function Categories({ posts }: CategoriesProps) {
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
    <nav className="bg-white/20 dark:bg-gray-800/20 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-gray-200/50 dark:border-gray-700/50 hover:backdrop-blur-xl hover:bg-white/30 dark:hover:bg-gray-800/30 transition-all duration-500 ease-in-out transform hover:scale-[1.02] hover:shadow-xl hidden lg:block">
      <div className="flex flex-wrap gap-2">
        <CategoryLink href="/blog" category="全部文章" count={posts.length} />
        {allCategories.map((category) => (
          <CategoryLink
            key={category}
            href={`/blog/category/${category.toLowerCase()}`}
            category={category}
            count={postsByCategory[category].length}
          />
        ))}
      </div>
    </nav>
  );
}

export default memo(Categories);
