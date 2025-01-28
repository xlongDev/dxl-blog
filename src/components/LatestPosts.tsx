import Link from "next/link";
import { Post } from "contentlayer/generated";
import PostCard from "@/components/PostCard";
import { Clock, ArrowRight } from "lucide-react";
import { getReadingTime } from "./ReadingTime";

interface LatestPostsProps {
  posts: Post[];
}

export default function LatestPosts({ posts }: LatestPostsProps) {
  return (
    <section className="space-y-8 mt-16">
      <div className="flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white">
          <Clock className="w-5 h-5" />
        </div>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          最新文章
        </h2>
      </div>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <div key={post._id} className="group">
            <PostCard post={post} />
            <div className="mt-4 flex items-center justify-between px-4 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  {getReadingTime(post.body.raw)} 分钟
                </span>
              </div>
              <Link
                href={`/blog/${post._raw.flattenedPath}`}
                className="flex items-center gap-1 text-blue-500 hover:text-blue-600 transition-colors"
              >
                阅读全文
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center">
        <Link
          href="/blog"
          className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 transition-all duration-300 hover:shadow-lg"
        >
          查看所有文章
        </Link>
      </div>
    </section>
  );
}
