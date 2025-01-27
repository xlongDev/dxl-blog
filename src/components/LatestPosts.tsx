import Link from "next/link";
import { Post } from "contentlayer/generated";
import PostCard from "@/components/PostCard";

interface LatestPostsProps {
  posts: Post[];
}

export default function LatestPosts({ posts }: LatestPostsProps) {
  return (
    <section className="space-y-8 mt-16">
      <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
        最新文章
      </h2>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
      <div className="text-center">
        <Link
          href="/blog"
          className="inline-block px-6 py-3 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors"
        >
          查看所有文章
        </Link>
      </div>
    </section>
  );
}
