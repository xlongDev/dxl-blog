import { useState, useMemo } from "react";
import { Post } from "contentlayer/generated";

interface UsePaginatedPostsProps {
  posts: Post[];
  postsPerPage?: number;
}

export function usePaginatedPosts({
  posts,
  postsPerPage = 70,
}: UsePaginatedPostsProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(posts.length / postsPerPage);

  const paginatedPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    return posts.slice(startIndex, endIndex);
  }, [posts, currentPage, postsPerPage]);

  const scrollToPostList = () => {
    const postListContainer = document.getElementById("post-list-container");
    if (postListContainer) {
      const headerOffset = -100; // 调整偏移量，使滚动位置更合理
      const elementPosition =
        postListContainer.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerOffset;

      // 使用 requestAnimationFrame 确保滚动更流畅
      requestAnimationFrame(() => {
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      });
    }
  };

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    scrollToPostList();
  };

  const goToPreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
    scrollToPostList();
  };

  const goToPage = (page: number) => {
    const pageNumber = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(pageNumber);
    scrollToPostList();
  };

  return {
    currentPage,
    totalPages,
    paginatedPosts,
    goToNextPage,
    goToPreviousPage,
    goToPage,
  };
}
