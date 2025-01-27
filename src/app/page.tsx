import Link from "next/link";
import { allPosts } from "contentlayer/generated";
import { compareDesc } from "date-fns";
import PostCard from "@/components/PostCard";
import Hero from "@/components/Hero";
import BingHero from "@/components/BingHero";
import PopularPosts from "@/components/PopularPosts";
import TechCategories from "@/components/TechCategories";
import LatestPosts from "@/components/LatestPosts";

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
        <LatestPosts posts={posts} />

        {/* 技术分类 */}
        <TechCategories />

        {/* 热门文章 */}
        <PopularPosts />
      </div>
    </>
  );
}
