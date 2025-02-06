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

export default function BlogPost({ params }: { params: { slug: string[] } }) {
  // 对路径参数进行解码，以支持中文路径
  const decodedSlug = params.slug.map((segment) => decodeURIComponent(segment));
  const post = allPosts.find(
    (post) => post._raw.flattenedPath === decodedSlug.join("/")
  );

  if (!post) {
    notFound();
  }

  return (
    <Suspense
      fallback={
        <div className="min-h-screen animate-pulse bg-gray-200 dark:bg-gray-700" />
      }
    >
      <BlogPostClient post={post} allPosts={allPosts} />
    </Suspense>
  );
}
