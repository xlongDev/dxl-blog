"use client";

import { useState, useEffect } from "react";
import { HeartIcon, BookmarkIcon } from "@heroicons/react/24/outline";
import {
  HeartIcon as HeartIconSolid,
  BookmarkIcon as BookmarkIconSolid,
} from "@heroicons/react/24/solid";

interface ArticleActionsProps {
  slug: string;
}

export default function ArticleActions({ slug }: ArticleActionsProps) {
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    // 从 localStorage 读取状态
    const savedLiked = localStorage.getItem(`article-${slug}-liked`);
    const savedBookmarked = localStorage.getItem(`article-${slug}-bookmarked`);
    const savedLikeCount = localStorage.getItem(`article-${slug}-likes`);

    if (savedLiked) setLiked(JSON.parse(savedLiked));
    if (savedBookmarked) setBookmarked(JSON.parse(savedBookmarked));
    if (savedLikeCount) setLikeCount(parseInt(savedLikeCount));
  }, [slug]);

  const handleLike = () => {
    const newLiked = !liked;
    setLiked(newLiked);
    setLikeCount((prev) => (newLiked ? prev + 1 : prev - 1));
    localStorage.setItem(`article-${slug}-liked`, JSON.stringify(newLiked));
    localStorage.setItem(
      `article-${slug}-likes`,
      String(newLiked ? likeCount + 1 : likeCount - 1)
    );
  };

  const handleBookmark = () => {
    const newBookmarked = !bookmarked;
    setBookmarked(newBookmarked);
    localStorage.setItem(
      `article-${slug}-bookmarked`,
      JSON.stringify(newBookmarked)
    );
  };

  return (
    <div className="flex items-center space-x-4">
      <button
        onClick={handleLike}
        className={`flex items-center space-x-1 ${
          liked ? "text-red-500" : "text-gray-500 hover:text-red-500"
        }`}
      >
        {liked ? (
          <HeartIconSolid className="w-6 h-6" />
        ) : (
          <HeartIcon className="w-6 h-6" />
        )}
        <span>{likeCount}</span>
      </button>
      <button
        onClick={handleBookmark}
        className={`flex items-center ${
          bookmarked ? "text-blue-500" : "text-gray-500 hover:text-blue-500"
        }`}
      >
        {bookmarked ? (
          <BookmarkIconSolid className="w-6 h-6" />
        ) : (
          <BookmarkIcon className="w-6 h-6" />
        )}
      </button>
    </div>
  );
}
