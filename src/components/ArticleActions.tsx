"use client";

import { useState, useEffect } from "react";
import {
  HeartIcon,
  BookmarkIcon,
  ShareIcon,
} from "@heroicons/react/24/outline";
import {
  HeartIcon as HeartIconSolid,
  BookmarkIcon as BookmarkIconSolid,
} from "@heroicons/react/24/solid";

interface ArticleActionsProps {
  slug: string;
}

export default function ArticleActions({ slug }: ArticleActionsProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    // 从localStorage加载状态
    const likedPosts = JSON.parse(localStorage.getItem("likedPosts") || "[]");
    const bookmarkedPosts = JSON.parse(
      localStorage.getItem("bookmarkedPosts") || "[]"
    );
    setIsLiked(likedPosts.includes(slug));
    setIsBookmarked(bookmarkedPosts.includes(slug));
  }, [slug]);

  const handleLike = async () => {
    const newLikedState = !isLiked;
    setIsLiked(newLikedState);

    // 更新localStorage
    const likedPosts = JSON.parse(localStorage.getItem("likedPosts") || "[]");
    if (newLikedState) {
      likedPosts.push(slug);
    } else {
      const index = likedPosts.indexOf(slug);
      if (index > -1) {
        likedPosts.splice(index, 1);
      }
    }
    localStorage.setItem("likedPosts", JSON.stringify(likedPosts));

    // TODO: 发送请求到后端API更新点赞状态
  };

  const handleBookmark = () => {
    const newBookmarkedState = !isBookmarked;
    setIsBookmarked(newBookmarkedState);

    // 更新localStorage
    const bookmarkedPosts = JSON.parse(
      localStorage.getItem("bookmarkedPosts") || "[]"
    );
    if (newBookmarkedState) {
      bookmarkedPosts.push(slug);
    } else {
      const index = bookmarkedPosts.indexOf(slug);
      if (index > -1) {
        bookmarkedPosts.splice(index, 1);
      }
    }
    localStorage.setItem("bookmarkedPosts", JSON.stringify(bookmarkedPosts));

    // TODO: 发送请求到后端API更新收藏状态
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: document.title,
          url: window.location.href,
        });
      } catch (err) {
        console.error("分享失败:", err);
      }
    } else {
      await navigator.clipboard.writeText(window.location.href);
      alert("链接已复制到剪贴板");
    }
  };

  return (
    <div className="flex items-center justify-center gap-4 py-8">
      <button
        onClick={handleLike}
        className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      >
        {isLiked ? (
          <HeartIconSolid className="w-5 h-5 text-red-500" />
        ) : (
          <HeartIcon className="w-5 h-5" />
        )}
        <span>点赞</span>
      </button>
      <button
        onClick={handleBookmark}
        className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      >
        {isBookmarked ? (
          <BookmarkIconSolid className="w-5 h-5 text-blue-500" />
        ) : (
          <BookmarkIcon className="w-5 h-5" />
        )}
        <span>收藏</span>
      </button>
      <button
        onClick={handleShare}
        className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      >
        <ShareIcon className="w-5 h-5" />
        <span>分享</span>
      </button>
    </div>
  );
}
