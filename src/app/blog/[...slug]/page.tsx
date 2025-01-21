import { allPosts } from "contentlayer/generated";
import { notFound } from "next/navigation";
import MDXComponents from "@/components/MDXComponents";
import { useMDXComponent } from "next-contentlayer/hooks";
import ArticleActions from "@/components/ArticleActions";
import Comments from "@/components/Comments";
import RelatedPosts from "@/components/RelatedPosts";
import TableOfContents from "@/components/TableOfContents";
import ReadingProgress from "@/components/ReadingProgress";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";

type Props = {
  params: {
    slug: string[];
  };
};

export function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post._raw.flattenedPath.split("/"),
  }));
}

export default function BlogPost({ params }: Props) {
  const slug = params.slug.join("/");
  const post = allPosts.find((post) => post._raw.flattenedPath === slug);

  if (!post) {
    notFound();
  }

  const MDXContent = useMDXComponent(post.body.code);

  return (
    <>
      <ReadingProgress />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex gap-8">
          <article className="flex-1 max-w-3xl">
            <header className="mb-8">
              <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
              <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm">
                <time dateTime={post.date}>
                  {format(new Date(post.date), "yyyy年MM月dd日", {
                    locale: zhCN,
                  })}
                </time>
                <span className="mx-2">·</span>
                <div className="flex gap-2">
                  {post.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </header>

            <div className="prose dark:prose-invert max-w-none mb-8">
              <MDXContent components={MDXComponents} />
            </div>

            <ArticleActions slug={post._raw.flattenedPath} />
            <Comments />
            <RelatedPosts currentPost={post} allPosts={allPosts} />
          </article>
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <TableOfContents />
          </aside>
        </div>
      </div>
    </>
  );
}
