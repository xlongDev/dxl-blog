import { allPosts } from "contentlayer/generated";
import { compareDesc } from "date-fns";
import dynamic from "next/dynamic";

const BlogPageClient = dynamic(() => import("./BlogPageClient"), {
  loading: () => (
    <div className="min-h-screen animate-pulse bg-gray-200 dark:bg-gray-700" />
  ),
});

export async function generateMetadata() {
  return {
    title: "博客文章 | DXL Blog",
    description: "探索前端技术的最新动态和深度文章",
  };
}

export default function BlogPage() {
  const sortedPosts = [...allPosts].sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date))
  );

  return <BlogPageClient posts={sortedPosts} />;
}
