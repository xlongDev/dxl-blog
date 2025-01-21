import { format } from "date-fns";

interface ArticleStatsProps {
  date: string;
  content: string;
}

export default function ArticleStats({ date, content }: ArticleStatsProps) {
  const wordCount = content.trim().split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / 200); // 假设阅读速度为每分钟200字

  return (
    <div className="flex items-center gap-4 text-sm text-gray-500">
      <time dateTime={date}>{format(new Date(date), "yyyy年MM月dd日")}</time>
      <div className="flex items-center gap-1">
        <span>{wordCount} 字</span>
        <span>·</span>
        <span>{readingTime} 分钟阅读</span>
      </div>
    </div>
  );
}
