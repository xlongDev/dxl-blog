"use client";

import { useMDXComponent } from "next-contentlayer/hooks";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";
import { Post } from "contentlayer/generated";
import { Suspense, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import MDXComponents from "@/components/MDXComponents";
import ArticleActions from "@/components/ArticleActions";
import ShareButtons from "@/components/ShareButtons";
import ReadingTime from "@/components/ReadingTime";
import SeriesNav from "@/components/SeriesNav";
import TableOfContents from "@/components/TableOfContents";
import MobileTableOfContents from "@/components/MobileTableOfContents";
import { useThemeUtils, ThemeType } from "@/hooks/useThemeUtils";
import { useTheme } from "next-themes";
import { THEME_COLORS } from "@/hooks/themeConstants";
import { renderEmojiText } from "@/utils/emojiUtils";

// 动态导入组件
const Comments = dynamic(() => import("@/components/Comments"), {
  ssr: false,
  loading: () => <LoadingPlaceholder height="h-32" />,
});

const RelatedPosts = dynamic(() => import("@/components/RelatedPosts"), {
  loading: () => <LoadingPlaceholder height="h-48" />,
});

const ReadingProgress = dynamic(() => import("@/components/ReadingProgress"), {
  ssr: false,
  loading: () => <LoadingPlaceholder height="h-1" fixed />,
});

interface LoadingPlaceholderProps {
  height: string;
  fixed?: boolean;
}

// 加载占位组件
const LoadingPlaceholder = ({
  height,
  fixed = false,
}: LoadingPlaceholderProps) => (
  <div
    className={`animate-pulse bg-gray-200 dark:bg-gray-700 rounded my-4 ${height} ${
      fixed ? "fixed top-0 left-0 w-full z-50" : ""
    }`}
  />
);

// 文章元数据组件
interface ArticleMetaProps {
  post: Post;
}

const ArticleMeta = ({ post }: ArticleMetaProps) => {
  const [mounted, setMounted] = useState(false);
  const { theme, getThemeColor } = useThemeUtils();

  // 确保组件挂载后再渲染，避免服务端渲染与客户端渲染不一致
  useEffect(() => {
    setMounted(true);
  }, []);

  // 如果组件尚未挂载，返回一个简单的加载占位符
  if (!mounted) {
    return (
      <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse mb-8" />
    );
  }

  // 根据主题设置不同的卡片背景和边框颜色
  const cardBg = getThemeColor("bg-gray-800/50", "bg-white/50", {
    green: "bg-green-50/50 dark:bg-gray-800/50",
    purple: "bg-purple-50/50 dark:bg-gray-800/50",
    orange: "bg-orange-50/50 dark:bg-gray-800/50",
    blue: "bg-blue-50/50 dark:bg-gray-800/50",
    pink: "bg-pink-50/50 dark:bg-gray-800/50",
    brown: "bg-amber-50/50 dark:bg-gray-800/50",
  });

  const borderColor = getThemeColor(
    "border-gray-700/50",
    "border-gray-200/50",
    {
      green: "border-green-200/50 dark:border-gray-700/50",
      purple: "border-purple-200/50 dark:border-gray-700/50",
      orange: "border-orange-200/50 dark:border-gray-700/50",
      blue: "border-blue-200/50 dark:border-gray-700/50",
      pink: "border-pink-200/50 dark:border-gray-700/50",
      brown: "border-amber-200/50 dark:border-gray-700/50",
    }
  );

  const hoverShadow = getThemeColor("hover:shadow-md", "hover:shadow-md", {
    green: "hover:shadow-green-100 dark:hover:shadow-gray-900",
    purple: "hover:shadow-purple-100 dark:hover:shadow-gray-900",
    orange: "hover:shadow-orange-100 dark:hover:shadow-gray-900",
    blue: "hover:shadow-blue-100 dark:hover:shadow-gray-900",
    pink: "hover:shadow-pink-100 dark:hover:shadow-gray-900",
    brown: "hover:shadow-amber-100 dark:hover:shadow-gray-900",
  });

  return (
    <div
      className={`flex flex-wrap items-center gap-3 text-sm text-gray-600 dark:text-gray-400 mb-8 ${cardBg} backdrop-blur-sm p-4 rounded-xl border ${borderColor} shadow-sm ${hoverShadow} transition-all duration-300`}
    >
      <div className="flex items-center gap-2">
        <svg
          className="w-4 h-4 text-blue-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <time
          dateTime={post.date}
          className="hover:text-blue-500 transition-colors"
        >
          {format(new Date(post.date), "yyyy年MM月dd日", { locale: zhCN })}
        </time>
      </div>
      <span className="text-gray-300 dark:text-gray-600">|</span>
      <div className="flex items-center gap-2">
        <svg
          className="w-4 h-4 text-purple-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <ReadingTime content={post.body.raw} />
      </div>
      <span className="text-gray-300 dark:text-gray-600">|</span>
      <ShareButtons url={post.url} title={post.title} />
      {post.tags && post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2 w-full">
          {post.tags.map((tag) => {
            // 根据主题设置不同的渐变色和文字颜色
            const gradientFrom = getThemeColor(
              "from-blue-500/10",
              "from-blue-500/10",
              {
                green: "from-green-500/10",
                purple: "from-purple-500/10",
                orange: "from-orange-500/10",
                blue: "from-blue-500/10",
                pink: "from-pink-500/10",
                brown: "from-amber-500/10",
              }
            );

            const gradientTo = getThemeColor(
              "to-purple-500/10",
              "to-purple-500/10",
              {
                green: "to-emerald-500/10",
                purple: "to-indigo-500/10",
                orange: "to-yellow-500/10",
                blue: "to-cyan-500/10",
                pink: "to-rose-500/10",
                brown: "to-yellow-600/10",
              }
            );

            const hoverFrom = getThemeColor(
              "hover:from-blue-500/20",
              "hover:from-blue-500/20",
              {
                green: "hover:from-green-500/20",
                purple: "hover:from-purple-500/20",
                orange: "hover:from-orange-500/20",
                blue: "hover:from-blue-500/20",
                pink: "hover:from-pink-500/20",
                brown: "hover:from-amber-500/20",
              }
            );

            const hoverTo = getThemeColor(
              "hover:to-purple-500/20",
              "hover:to-purple-500/20",
              {
                green: "hover:to-emerald-500/20",
                purple: "hover:to-indigo-500/20",
                orange: "hover:to-yellow-500/20",
                blue: "hover:to-cyan-500/20",
                pink: "hover:to-rose-500/20",
                brown: "hover:to-yellow-600/20",
              }
            );

            const textColor = getThemeColor("text-blue-400", "text-blue-600", {
              green: "text-green-600",
              purple: "text-purple-600",
              orange: "text-orange-600",
              blue: "text-blue-600",
              pink: "text-pink-600",
              brown: "text-amber-700",
            });

            return (
              <span
                key={tag}
                className={`bg-gradient-to-r ${gradientFrom} ${gradientTo} ${hoverFrom} ${hoverTo} ${textColor} dark:text-blue-400 px-3 py-1 rounded-full text-sm transition-colors cursor-pointer`}
              >
                {tag}
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
};

// 文章内容组件
interface ArticleContentProps {
  post: Post;
  allPosts: Post[];
  getThemeValue: <T>(options: Record<ThemeType, T>, defaultValue: T) => T;
}

const ArticleContent = ({
  post,
  allPosts,
  getThemeValue,
}: ArticleContentProps) => {
  const MDXContent = useMDXComponent(post.body.code);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 获取标题渐变色
  const getTitleGradient = () => {
    return getThemeValue(
      {
        light: "from-blue-600 via-purple-600 to-pink-600",
        dark: "from-blue-500 via-purple-500 to-pink-500",
        green: "from-green-600 via-emerald-600 to-teal-600",
        purple: "from-purple-600 via-violet-600 to-indigo-600",
        orange: "from-orange-600 via-amber-600 to-yellow-600",
        blue: "from-blue-600 via-sky-600 to-cyan-600",
        pink: "from-pink-600 via-rose-600 to-red-600",
        brown: "from-amber-800 via-amber-700 to-yellow-600",
      },
      "from-blue-600 via-purple-600 to-pink-600"
    );
  };

  if (!mounted) {
    return (
      <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
    );
  }

  return (
    <div className="prose prose-sm sm:prose-base lg:prose-lg dark:prose-invert max-w-none py-8 prose-headings:scroll-mt-20">
      <h1 className="mb-4 font-extrabold tracking-tight">
        {renderEmojiText(
          post.title,
          `bg-gradient-to-r ${getTitleGradient()} bg-clip-text text-transparent`
        )}
      </h1>
      <ArticleMeta post={post} />
      {post.series && (
        <SeriesNav
          currentPost={post}
          seriesPosts={allPosts.filter((p) => p.series === post.series)}
        />
      )}
      <Suspense fallback={<LoadingPlaceholder height="h-96" />}>
        <MDXContent components={MDXComponents} />
      </Suspense>
      <ArticleActions slug={post.url} />
    </div>
  );
};

interface BlogPostClientProps {
  post: Post;
  allPosts: Post[];
}

export default function BlogPostClient({
  post,
  allPosts,
}: BlogPostClientProps) {
  const { getThemeValue } = useThemeUtils();
  const [mounted, setMounted] = useState(false);
  const MDXContent = useMDXComponent(post.body.code);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 获取标题渐变色
  const getTitleGradient = () => {
    return getThemeValue(
      {
        light: "from-blue-600 via-purple-600 to-pink-600",
        dark: "from-blue-500 via-purple-500 to-pink-500",
        green: "from-green-600 via-emerald-600 to-teal-600",
        purple: "from-purple-600 via-violet-600 to-indigo-600",
        orange: "from-orange-600 via-amber-600 to-yellow-600",
        blue: "from-blue-600 via-sky-600 to-cyan-600",
        pink: "from-pink-600 via-rose-600 to-red-600",
        brown: "from-amber-800 via-amber-700 to-yellow-600",
      },
      "from-blue-600 via-purple-600 to-pink-600"
    );
  };

  if (!mounted) {
    return (
      <div className="min-h-screen space-y-4 p-4">
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse w-3/4" />
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse w-1/2" />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen">
      <ReadingProgress />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_300px] gap-8">
          <article className="relative">
            <div className="prose prose-sm sm:prose-base lg:prose-lg dark:prose-invert max-w-none">
              <h1 className="mb-4 font-extrabold tracking-tight">
                {renderEmojiText(
                  post.title,
                  `bg-gradient-to-r ${getTitleGradient()} bg-clip-text text-transparent`
                )}
              </h1>
              <ArticleMeta post={post} />
              {post.series && (
                <SeriesNav
                  currentPost={post}
                  seriesPosts={allPosts.filter((p) => p.series === post.series)}
                />
              )}
              <Suspense fallback={<LoadingPlaceholder height="h-96" />}>
                <MDXContent components={MDXComponents} />
              </Suspense>
              <ArticleActions slug={post.url} />
            </div>
            <div className="mt-16 space-y-16">
              <Comments />
              <RelatedPosts currentPost={post} allPosts={allPosts} />
            </div>
          </article>
          <aside className="space-y-8">
            <div className="sticky top-24">
              <TableOfContents />
            </div>
          </aside>
        </div>
      </div>
      <MobileTableOfContents />
    </div>
  );
}
