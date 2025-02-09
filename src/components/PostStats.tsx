import { Eye, ThumbsUp, Bookmark, TrendingUp } from "lucide-react";

interface PostStatsProps {
  stats: {
    views: number;
    likes: number;
    favorites: number;
    score?: number;
  };
  showScore?: boolean;
}

export default function PostStats({
  stats,
  showScore = false,
}: PostStatsProps) {
  return (
    <div className="mt-4 flex items-center justify-between px-4 text-sm text-gray-500 dark:text-gray-400">
      <div className="flex items-center gap-4">
        <span className="flex items-center gap-1.5">
          <Eye className="w-4 h-4" />
          {stats.views}
        </span>
        <span className="flex items-center gap-1.5">
          <ThumbsUp className="w-4 h-4" />
          {stats.likes}
        </span>
        <span className="flex items-center gap-1.5">
          <Bookmark className="w-4 h-4" />
          {stats.favorites}
        </span>
      </div>
      {showScore && stats.score !== undefined && (
        <div className="flex items-center gap-1.5">
          <TrendingUp className="w-4 h-4 text-red-500" />
          <span className="font-medium text-red-500">{stats.score}</span>
        </div>
      )}
    </div>
  );
}
