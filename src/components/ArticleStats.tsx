import { format } from "date-fns";
import { useArticleStats } from "@/hooks/useArticleStats";
import { HeartIcon } from "lucide-react";

interface ArticleStatsProps {
  date: string;
  content: string;
  slug: string;
}

export default function ArticleStats({
  date,
  content,
  slug,
}: ArticleStatsProps) {
  const { stats, handleLike } = useArticleStats(slug);
  const wordCount = content.trim().split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / 200);

  return (
    <div className="flex items-center gap-4 text-sm text-gray-500">
      <time dateTime={date}>{format(new Date(date), "yyyy年MM月dd日")}</time>
      <div className="flex items-center gap-1">
        <span>{wordCount} 字</span>
        <span>·</span>
        <span>{readingTime} 分钟阅读</span>
        <span>·</span>
        <span>{stats?.views || 0} 阅读</span>
        <button
          onClick={handleLike}
          className="inline-flex items-center gap-1 hover:text-red-500 transition-colors"
        >
          <HeartIcon size={14} />
          <span>{stats?.likes || 0}</span>
        </button>
      </div>
    </div>
  );
}
