"use client";

import { useMDXComponent } from "next-contentlayer/hooks";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";
import { Post } from "contentlayer/generated";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import MDXComponents from "@/components/MDXComponents";
const ArticleActions = dynamic(() => import("@/components/ArticleActions"));
const Comments = dynamic(() => import("@/components/Comments"));
const RelatedPosts = dynamic(() => import("@/components/RelatedPosts"));
const TableOfContents = dynamic(() => import("@/components/TableOfContents"));
const MobileTableOfContents = dynamic(
  () => import("@/components/MobileTableOfContents")
);
const ReadingProgress = dynamic(() => import("@/components/ReadingProgress"));
const ShareButtons = dynamic(() => import("@/components/ShareButtons"));
const ReadingTime = dynamic(() => import("@/components/ReadingTime"));
const SeriesNav = dynamic(() => import("@/components/SeriesNav"));

interface BlogPostClientProps {
  post: Post;
  allPosts: Post[];
}

export default function BlogPostClient({
  post,
  allPosts,
}: BlogPostClientProps) {
  const MDXContent = useMDXComponent(post.body.code);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <Suspense fallback={null}>
        <ReadingProgress />
      </Suspense>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <article className="flex-1 w-full lg:max-w-3xl mx-auto">
            <div className="prose prose-sm sm:prose-base lg:prose-lg dark:prose-invert max-w-none py-8 prose-headings:scroll-mt-20">
              <h1 className="mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent font-extrabold tracking-tight">
                {post.title}
              </h1>
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
                    {format(new Date(post.date), "yyyy年MM月dd日", {
                      locale: zhCN,
                    })}
                  </time>
                </div>
                <span className="text-gray-300 dark:text-gray-600">|</span>
                <Suspense fallback={null}>
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
                </Suspense>
                <span className="text-gray-300 dark:text-gray-600">|</span>
                <Suspense fallback={null}>
                  <ShareButtons url={post.url} title={post.title} />
                </Suspense>
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
              <Suspense fallback={null}>
                {post.series && (
                  <SeriesNav
                    currentPost={post}
                    seriesPosts={allPosts.filter(
                      (p) => p.series === post.series
                    )}
                  />
                )}
              </Suspense>
              <Suspense fallback={<div>Loading content...</div>}>
                <MDXContent components={MDXComponents} />
              </Suspense>
              <Suspense fallback={null}>
                <ArticleActions slug={post.url} />
              </Suspense>
            </div>
          </article>
          <div className="hidden lg:block w-64 relative">
            <div className="sticky top-24">
              <Suspense fallback={null}>
                <TableOfContents />
              </Suspense>
            </div>
          </div>
        </div>
        <Suspense fallback={null}>
          <MobileTableOfContents />
        </Suspense>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <Suspense fallback={null}>
            <Comments />
          </Suspense>
          <Suspense fallback={null}>
            <RelatedPosts currentPost={post} allPosts={allPosts} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
