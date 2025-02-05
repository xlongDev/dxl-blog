"use client";

import { useEffect, useRef, useState } from "react";
import { Post } from "contentlayer/generated";
import { FileText } from "lucide-react";
import FadeIn from "./FadeIn";

interface InfiniteArticleListProps {
  posts: Post[];
  postsPerPage?: number;
}

export default function InfiniteArticleList({
  posts,
  postsPerPage = 10,
}: InfiniteArticleListProps) {
  const [displayedPosts, setDisplayedPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerTarget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 初始加载第一页
    const initialPosts = posts.slice(0, postsPerPage);
    setDisplayedPosts(initialPosts);
    setHasMore(posts.length > postsPerPage);
  }, [posts, postsPerPage]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadMorePosts();
        }
      },
      { threshold: 0.1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [hasMore, loading]);

  const loadMorePosts = () => {
    setLoading(true);
    const startIndex = page * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    const nextPosts = posts.slice(startIndex, endIndex);

    setTimeout(() => {
      setDisplayedPosts((prev) => [...prev, ...nextPosts]);
      setPage((prev) => prev + 1);
      setHasMore(endIndex < posts.length);
      setLoading(false);
    }, 500); // 添加小延迟以展示加载状态
  };

  return (
    <div className="space-y-4">
      {displayedPosts.map((post) => (
        <FadeIn key={post.url}>
          <a
            href={post.url}
            className="block p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg shadow border border-gray-200/50 dark:border-gray-700/50 hover:border-blue-500/50 dark:hover:border-blue-500/50 transition-colors"
          >
            <div className="flex items-center gap-2 mb-2">
              <FileText size={16} className="text-blue-500" />
              <h2 className="text-lg font-semibold hover:text-blue-500 transition-colors">
                {post.title}
              </h2>
            </div>
            {post.description && (
              <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
                {post.description}
              </p>
            )}
            <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              {new Date(post.date).toLocaleDateString("zh-CN", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          </a>
        </FadeIn>
      ))}
      <div ref={observerTarget} className="h-10">
        {loading && (
          <div className="flex justify-center items-center py-4">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500" />
          </div>
        )}
      </div>
    </div>
  );
}