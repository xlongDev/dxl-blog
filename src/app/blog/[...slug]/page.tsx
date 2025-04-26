import { allPosts } from "contentlayer/generated";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const BlogPostClient = dynamic(() => import("./BlogPostClient"), {
  loading: () => (
    <div className="min-h-screen animate-pulse bg-gray-200 dark:bg-gray-700" />
  ),
});

export async function generateStaticParams() {
  return allPosts
    .filter(
      (post) => post._raw.flattenedPath && post._raw.flattenedPath.length > 0
    )
    .map((post) => ({
      slug: post._raw.flattenedPath.split("/"),
    }));
}

export const revalidate = 3600; // 设置页面缓存时间为1小时

export default function BlogPost({ params }: { params: { slug: string[] } }) {
  // 对路径参数进行解码，以支持中文路径
  const decodedSlug = params.slug.map((segment) => decodeURIComponent(segment));
  const post = allPosts.find(
    (post) => post._raw.flattenedPath === decodedSlug.join("/")
  );

  if (!post) {
    notFound();
  }

  // 预加载相关文章数据
  const relatedPosts = allPosts
    .filter(
      (p) =>
        p.category === post.category &&
        p._raw.flattenedPath !== post._raw.flattenedPath
    )
    .slice(0, 3);

  return (
    <Suspense
      fallback={
        <div className="min-h-screen space-y-4 p-4">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse w-3/4" />
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse w-1/2" />
        </div>
      }
    >
      <BlogPostClient post={post} allPosts={relatedPosts} />
    </Suspense>
  );
}
