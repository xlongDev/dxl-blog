import Link from "next/link";
import { format } from "date-fns";
import type { Post } from "contentlayer/generated";

export default function PostCard({ post }: { post: Post }) {
  return (
    <Link
      href={post.url}
      className="group block p-6 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
    >
      <h2 className="text-xl font-bold mb-2 group-hover:text-blue-500 transition-colors">
        {post.title}
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-4">
        {post.description}
      </p>
      <div className="flex items-center justify-between text-sm text-gray-500">
        <time dateTime={post.date}>
          {format(new Date(post.date), "yyyy年MM月dd日")}
        </time>
        <div className="flex gap-2">
          {post.tags?.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-gray-100 dark:bg-gray-800 px-3 py-1 transition-transform group-hover:scale-105"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
