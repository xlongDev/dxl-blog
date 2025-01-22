import Link from "next/link";
import { format } from "date-fns";
import type { Post } from "contentlayer/generated";

export default function PostCard({ post }: { post: Post }) {
  return (
    <Link
      href={post.url}
      className="group block p-6 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
    >
      <h2 className="text-lg sm:text-xl font-bold mb-2 leading-snug group-hover:text-blue-500 transition-colors">
        {post.title}
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-4">
        {post.description}
      </p>
      <div className="flex items-center justify-between text-sm text-gray-500">
        <time
          dateTime={post.date}
          className="font-mono text-sm shrink-0 hover:text-blue-500 transition-colors"
        >
          {format(new Date(post.date), "yyyy.MM.dd")}
        </time>
        <div className="flex gap-1.5 flex-wrap justify-end">
          {post.tags?.map((tag) => (
            <span
              key={tag}
              className="inline-block rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 text-xs px-2.5 py-0.5 max-w-[120px] truncate transition-all hover:bg-blue-100 dark:hover:bg-blue-900/50"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
