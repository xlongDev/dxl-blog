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
  return allPosts.map((post) => ({
    slug: post._raw.flattenedPath.split("/"),
  }));
}

export default function BlogPost({ params }: { params: { slug: string[] } }) {
  const post = allPosts.find(
    (post) => post._raw.flattenedPath === params.slug.join("/")
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
