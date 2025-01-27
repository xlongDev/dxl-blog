import { Post } from "contentlayer/generated";
import Link from "next/link";

interface SeriesNavProps {
  currentPost: Post;
  seriesPosts: Post[];
}

export default function SeriesNav({
  currentPost,
  seriesPosts,
}: SeriesNavProps) {
  if (!currentPost.series || seriesPosts.length <= 1) return null;

  return (
    <div className="my-8 p-4 border border-gray-200 dark:border-gray-800 rounded-lg">
      <h3 className="font-bold mb-4">系列文章：{currentPost.series}</h3>
      <ol className="space-y-2">
        {seriesPosts.map((post: Post, index: number) => (
          <li key={post._id}>
            <Link
              href={`/blog/${post._raw.flattenedPath}`}
              className={`flex items-center space-x-2 ${
                post._id === currentPost._id
                  ? "text-blue-500 font-medium"
                  : "text-gray-600 dark:text-gray-400 hover:text-blue-500"
              }`}
            >
              <span>{index + 1}.</span>
              <span>{post.title}</span>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
