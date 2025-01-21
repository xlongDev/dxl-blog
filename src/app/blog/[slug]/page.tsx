import { allPosts } from "contentlayer/generated";
import { format } from "date-fns";
import { useMDXComponent } from "next-contentlayer/hooks";
import { notFound } from "next/navigation";
import TableOfContents from "@/components/TableOfContents";
import ReadingProgress from "@/components/ReadingProgress";
import RelatedPosts from "@/components/RelatedPosts";
import ShareButtons from "@/components/ShareButtons";
import ReadingTime from "@/components/ReadingTime";
import SeriesNav from "@/components/SeriesNav";
import MDXComponents from "@/components/MDXComponents";
import MobileTableOfContents from "@/components/MobileTableOfContents";
import ArticleActions from "@/components/ArticleActions";
import Comments from "@/components/Comments";

export async function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post._raw.flattenedPath,
  }));
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = allPosts.find((post) => post._raw.flattenedPath === params.slug);

  if (!post) {
    notFound();
  }

  const Content = useMDXComponent(post.body.code);

  const seriesPosts = post.series
    ? allPosts
        .filter((p) => p.series === post.series)
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    : [];

  return (
    <>
      <ReadingProgress />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-[1fr_300px] lg:gap-12">
          <article className="prose prose-lg dark:prose-invert max-w-none">
            <div>
              <div className="space-y-4 mb-8">
                <h1 className="text-3xl font-bold">{post.title}</h1>
                <div className="flex flex-wrap gap-4 text-gray-500 items-center">
                  <time dateTime={post.date}>
                    {format(new Date(post.date), "yyyy年MM月dd日")}
                  </time>
                  <ReadingTime content={post.body.raw} />
                  <div className="flex gap-2">
                    {post.tags?.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-gray-100 dark:bg-gray-800 px-3 py-1"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <ShareButtons url={post.url} title={post.title} />
              </div>
              <div className="prose dark:prose-invert max-w-none">
                {post.series && (
                  <SeriesNav currentPost={post} seriesPosts={seriesPosts} />
                )}
                <Content components={MDXComponents} />
              </div>
              <ArticleActions slug={params.slug} />
              <Comments />
              <RelatedPosts currentPost={post} allPosts={allPosts} />
            </div>
          </article>
          <div>
            <div className="hidden lg:block sticky top-20">
              <TableOfContents />
            </div>
          </div>
        </div>
        <MobileTableOfContents />
      </div>
    </>
  );
}
