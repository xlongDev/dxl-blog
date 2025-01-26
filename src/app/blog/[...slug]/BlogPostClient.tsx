"use client";

import { useMDXComponent } from "next-contentlayer/hooks";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";
import { Post } from "contentlayer/generated";
import MDXComponents from "@/components/MDXComponents";
import ArticleActions from "@/components/ArticleActions";
import Comments from "@/components/Comments";
import RelatedPosts from "@/components/RelatedPosts";
import TableOfContents from "@/components/TableOfContents";
import MobileTableOfContents from "@/components/MobileTableOfContents";
import ReadingProgress from "@/components/ReadingProgress";
import ShareButtons from "@/components/ShareButtons";
import ReadingTime from "@/components/ReadingTime";
import SeriesNav from "@/components/SeriesNav";
import { allPosts } from "contentlayer/generated";

interface BlogPostClientProps {
  post: Post;
}

export default function BlogPostClient({ post }: BlogPostClientProps) {
  const MDXContent = useMDXComponent(post.body.code);

  return (
    <div className="min-h-screen">
      <ReadingProgress />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <article className="flex-1 w-full lg:max-w-3xl mx-auto">
            <div className="prose prose-sm sm:prose-base lg:prose-lg dark:prose-invert max-w-none py-8">
              <h1 className="mb-4">{post.title}</h1>
              <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-8">
                <time dateTime={post.date}>
                  {format(new Date(post.date), "yyyy年MM月dd日", {
                    locale: zhCN,
                  })}
                </time>
                <span className="mx-2">·</span>
                <ReadingTime content={post.body.raw} />
                <span className="mx-2">·</span>
                <ShareButtons url={post.url} title={post.title} />
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2 w-full">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              {post.series && (
                <SeriesNav
                  currentPost={post}
                  seriesPosts={allPosts.filter((p) => p.series === post.series)}
                />
              )}
              <MDXContent components={MDXComponents} />
              <ArticleActions slug={post.url} />
            </div>
          </article>
          <div className="hidden lg:block w-64 relative">
            <div className="sticky top-24">
              <TableOfContents />
            </div>
          </div>
        </div>
        <MobileTableOfContents />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <Comments />
          <RelatedPosts currentPost={post} allPosts={allPosts} />
        </div>
      </div>
    </div>
  );
}
