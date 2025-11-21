import { allPosts } from "contentlayer/generated";
import { compareDesc } from "date-fns";
import BlogPageClient from "./BlogPageClient";
import { notFound } from "next/navigation";

export const revalidate = 60;

export async function generateMetadata() {
  return {
    title: "博客文章 | DXL Blog",
    description: "探索前端技术的最新动态和深度文章",
  };
}

export async function generateStaticParams() {
  const postsPerPage = 12;
  const totalPosts = allPosts.length;
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  return Array.from({ length: totalPages }, (_, i) => ({
    page: (i + 1).toString(),
  }));
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  try {
    const page = Number(searchParams.page) || 1;
    const postsPerPage = 12;

    const sortedPosts = allPosts.sort((a, b) =>
      compareDesc(new Date(a.date), new Date(b.date))
    );
    const totalPosts = sortedPosts.length;
    const totalPages = Math.ceil(totalPosts / postsPerPage);

    // 验证页码是否有效
    if (page < 1 || page > totalPages) {
      notFound();
    }

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
  } catch (error) {
    console.error("Error in BlogPage:", error);
    throw error;
  }
}
