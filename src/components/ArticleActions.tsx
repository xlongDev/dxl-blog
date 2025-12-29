"use client";

import {
  HeartIcon,
  BookmarkIcon,
  ShareIcon,
} from "@heroicons/react/24/outline";
import { useArticleStats } from "@/hooks/useArticleStats";
import {
  HeartIcon as HeartIconSolid,
  BookmarkIcon as BookmarkIconSolid,
} from "@heroicons/react/24/solid";

interface ArticleActionsProps {
  slug: string;
}

export default function ArticleActions({ slug }: ArticleActionsProps) {
  const { stats, hasLiked, hasFavorited, handleLike, handleFavorite } =
    useArticleStats(slug);

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
        {hasLiked ? (
          <HeartIconSolid className="w-5 h-5 text-red-500" />
        ) : (
          <HeartIcon className="w-5 h-5" />
        )}
        <span>点赞</span>
      </button>
      <button
        onClick={handleFavorite}
        className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      >
        {hasFavorited ? (
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
