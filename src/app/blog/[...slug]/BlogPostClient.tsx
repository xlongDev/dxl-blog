"use client";

import { useMDXComponent } from "next-contentlayer/hooks";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";
import { Post } from "contentlayer/generated";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import MDXComponents from "@/components/MDXComponents";
import ArticleActions from "@/components/ArticleActions";
import ShareButtons from "@/components/ShareButtons";
import ReadingTime from "@/components/ReadingTime";
import SeriesNav from "@/components/SeriesNav";
import TableOfContents from "@/components/TableOfContents";
import MobileTableOfContents from "@/components/MobileTableOfContents";

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

const ArticleMeta = ({ post }: ArticleMetaProps) => (
  <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 dark:text-gray-400 mb-8 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm p-4 rounded-xl border border-gray-200/50 dark:border-gray-700/50 shadow-sm hover:shadow-md transition-all duration-300">
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
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 hover:from-blue-500/20 hover:to-purple-500/20 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full text-sm transition-colors cursor-pointer"
          >
            {tag}
          </span>
        ))}
      </div>
    )}
  </div>
);

// 文章内容组件
interface ArticleContentProps {
  post: Post;
  allPosts: Post[];
}

const ArticleContent = ({ post, allPosts }: ArticleContentProps) => {
  const MDXContent = useMDXComponent(post.body.code);

  return (
    <div className="prose prose-sm sm:prose-base lg:prose-lg dark:prose-invert max-w-none py-8 prose-headings:scroll-mt-20">
      <h1 className="mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent font-extrabold tracking-tight">
        {post.title}
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
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <ReadingProgress />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <article className="flex-1 w-full lg:max-w-3xl mx-auto">
            <ArticleContent post={post} allPosts={allPosts} />
          </article>
          <div className="hidden lg:block w-64 relative">
            <div className="sticky top-24">
              <TableOfContents />
            </div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <MobileTableOfContents />
          <Suspense fallback={<LoadingPlaceholder height="h-32" />}>
            <Comments />
          </Suspense>
          <Suspense fallback={<LoadingPlaceholder height="h-48" />}>
            <RelatedPosts currentPost={post} allPosts={allPosts} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
