import Link from "next/link";
import { allPosts } from "contentlayer/generated";
import { compareDesc } from "date-fns";
import PostCard from "@/components/PostCard";
import Hero from "@/components/Hero";
import BingHero from "@/components/BingHero";
import PopularPosts from "@/components/PopularPosts";
import TechCategories from "@/components/TechCategories";
import LatestPosts from "@/components/LatestPosts";
import HeroTitle from "@/components/HeroTitle";

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
        <HeroTitle />

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
