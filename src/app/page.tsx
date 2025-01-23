import Link from "next/link";
import { allPosts } from "contentlayer/generated";
import { compareDesc } from "date-fns";
import PostCard from "@/components/PostCard";
import Hero from "@/components/Hero";
import BingHero from "@/components/BingHero";
import PopularPosts from "@/components/PopularPosts";

export default function Home() {
  const posts = allPosts
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
    .slice(0, 3);

  return (
    <>
      <BingHero />
      {/* <Hero /> */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <section className="text-center space-y-6">
          <h1 className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
            分享世界，记录成长
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            分享前端开发技术、经验和见解，专注于 React、Next等现代 Web 技术。
          </p>
        </section>

        {/* Featured Posts */}
        <section className="space-y-8 mt-16">
          <h2 className="text-2xl font-bold">最新文章</h2>
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

        {/* 热门文章 */}
        {/* <PopularPosts /> */}
      </div>
    </>
  );
}
