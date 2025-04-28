import { allPosts } from "contentlayer/generated";
import { compareDesc } from "date-fns";
import Hero from "@/components/Hero";
import BingHero from "@/components/BingHero";
import PopularPosts from "@/components/PopularPosts";
import TechCategories from "@/components/TechCategories";
import LatestPosts from "@/components/LatestPosts";
import HeroTitle from "@/components/HeroTitle";
import FeaturedPosts from "@/components/BlogStats/FeaturedPosts";
import RecommendedPosts from "@/components/RecommendedPosts";
import InterviewPosts from "@/components/InterviewPosts";
import BlogStats from "@/components/BlogStats";
import { Post } from "contentlayer/generated";

// 在构建时获取文章数据
async function getStaticProps() {
  // 获取最新文章
  const latestPosts = allPosts
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
    .slice(0, 3);

  // 获取精选文章（根据标签或阅读量筛选）
  const featuredPosts = allPosts
    .filter((post) => post.tags?.includes("精选"))
    .slice(0, 9);

  // 如果没有带特定标签的文章，则使用阅读量最高的文章
  const finalFeaturedPosts =
    featuredPosts.length > 0
      ? featuredPosts
      : allPosts.sort((a, b) => (b.views || 0) - (a.views || 0)).slice(0, 6);

  // 获取推荐阅读文章（根据不同标准筛选，避免与精选文章重复）
  const recommendedPosts = allPosts
    .filter((post) => post.tags?.some((tag) => ["推荐"].includes(tag)))
    .filter((post) => !featuredPosts.some((fp) => fp._id === post._id))
    .slice(0, 9);

  // 如果推荐文章不足，则补充一些最新但不在精选中的文章
  const finalRecommendedPosts =
    recommendedPosts.length >= 3
      ? recommendedPosts
      : [
          ...recommendedPosts,
          ...allPosts
            .filter((post) => !featuredPosts.some((fp) => fp._id === post._id))
            .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
            .slice(0, 6 - recommendedPosts.length),
        ];

  // 获取面试相关文章
  const interviewPosts = allPosts
    .filter((post) => post.tags?.some((tag) => ["面试"].includes(tag)))
    .filter(
      (post) =>
        !featuredPosts.some((fp) => fp._id === post._id) &&
        !recommendedPosts.some((rp) => rp._id === post._id)
    )
    .slice(0, 9);

  // 如果面试文章不足，则补充一些最新但不在精选和推荐中的文章
  const finalInterviewPosts =
    interviewPosts.length >= 3
      ? interviewPosts
      : [
          ...interviewPosts,
          ...allPosts
            .filter(
              (post) =>
                !featuredPosts.some((fp) => fp._id === post._id) &&
                !recommendedPosts.some((rp) => rp._id === post._id)
            )
            .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
            .slice(0, 6 - interviewPosts.length),
        ];

  return {
    latestPosts,
    featuredPosts: finalFeaturedPosts,
    recommendedPosts: finalRecommendedPosts,
    interviewPosts: finalInterviewPosts,
  };
}

export default async function Home() {
  const { latestPosts, featuredPosts, recommendedPosts, interviewPosts } =
    await getStaticProps();

  return (
    <>
      <BingHero />
      {/* <Hero /> */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <HeroTitle />

        {/* Featured Posts */}
        <LatestPosts posts={latestPosts} />

        {/* 技术分类 */}
        <TechCategories />

        {/* 热门文章 */}
        <PopularPosts />

        {/* 精选文章 */}
        <div className="mt-16">
          <FeaturedPosts featuredPosts={featuredPosts.map(post => ({
            title: post.title,
            date: post.date,
            url: post.url,
            category: post.category ?? "未分类",
            tags: post.tags,
            views: post.views,
            likes: post.likes,
            description: post.description ?? ""
          }))} />
        </div>

        {/* 推荐阅读 */}
        <div className="mt-16">
          <RecommendedPosts recommendedPosts={recommendedPosts.map(post => ({
            title: post.title,
            date: post.date,
            url: post.url,
            category: post.category ?? "未分类",
            tags: post.tags,
            views: post.views,
            likes: post.likes,
            description: post.description ?? ""
          }))} />
        </div>

        {/* 面试精华 */}
        <div className="mt-16">
          <InterviewPosts interviewPosts={interviewPosts} />
        </div>
      </div>
    </>
  );
}
