import { allPosts } from "contentlayer/generated";
import { compareDesc } from "date-fns";
import BlogPageClient from "./BlogPageClient";

export const revalidate = 60;

export async function generateMetadata() {
  return {
    title: "博客文章 | DXL Blog",
    description: "探索前端技术的最新动态和深度文章",
  };
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const page = Number(searchParams.page) || 1;
  const postsPerPage = 12;

  const sortedPosts = allPosts.sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));
  const totalPosts = sortedPosts.length;
  const totalPages = Math.ceil(totalPosts / postsPerPage);
  const startIndex = (page - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const paginatedPosts = sortedPosts.slice(startIndex, endIndex);

  return (
    <BlogPageClient
      initialPosts={paginatedPosts}
      totalPosts={totalPosts}
      totalPages={totalPages}
      currentPage={page}
      postsPerPage={postsPerPage}
    />
  );
}
