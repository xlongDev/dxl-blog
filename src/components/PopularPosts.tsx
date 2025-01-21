import Link from "next/link";
import { allPosts } from "contentlayer/generated";
import PostCard from "@/components/PostCard";

export default function PopularPosts() {
  // 按浏览量排序，获取前3篇热门文章
  const popularPosts = allPosts
    .sort((a, b) => (b.views || 0) - (a.views || 0))
    .slice(0, 3);

  return (
    <section className="space-y-8 mt-16">
      <h2 className="text-2xl font-bold">热门文章</h2>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {popularPosts.map((post) => (
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