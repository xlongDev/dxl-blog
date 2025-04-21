import { allPosts } from "contentlayer/generated";
import { compareDesc } from "date-fns";
import FadeIn from "@/components/FadeIn";
import CategoryFilter from "@/components/CategoryFilter";
import fs from "fs";
import path from "path";

// 定义 MinimalPost 类型，与 CategoryFilter 一致
interface MinimalPost {
  title: string;
  date: string;
  description: string;
  url: string;
  category: string;
  tags?: string[];
  image?: string;
  views?: number;
  likes?: number;
}

// 定义缓存数据的类型
interface PostsByCategoryCache {
  totalPosts: number;
  postsByCategory: Record<string, number>;
}

// 读取缓存的 postsByCategory 数据
async function getPostsByCategoryCache(): Promise<PostsByCategoryCache> {
  const cachePath = path.join(process.cwd(), "public", "cache", "postsByCategory.json");
  if (fs.existsSync(cachePath)) {
    const cacheData = JSON.parse(fs.readFileSync(cachePath, "utf-8"));
    return cacheData as PostsByCategoryCache;
  }

  // 如果缓存不存在，生成默认值（开发模式下可能需要）
  const categories = Array.from(
    new Set(
      allPosts.map((post) => post.category).filter((cat): cat is string => typeof cat === "string")
    )
  );
  const postsByCategory = categories.reduce((acc, category) => {
    acc[category] = allPosts.filter((post) => post.category === category).length;
    return acc;
  }, {} as Record<string, number>);
  const totalPosts = allPosts.length;

  return { totalPosts, postsByCategory };
}

export async function generateStaticParams() {
  // 获取所有分类
  const categories = Array.from(
    new Set(
      allPosts.map((post) => post.category).filter((cat): cat is string => typeof cat === "string")
    )
  );

  // 热门分类（根据 views 排序，取前 5 个）
  const popularCategories = categories
    .map((category) => {
      const posts = allPosts.filter((post) => post.category === category);
      const totalViews = posts.reduce((sum, post) => sum + (post.views || 0), 0);
      return { category, totalViews };
    })
    .sort((a, b) => b.totalViews - a.totalViews)
    .slice(0, 5)
    .map(({ category }) => category);

  // 预生成热门分类和 "all" 页面
  return [...popularCategories, "all"].map((category) => ({
    category: category.toLowerCase(),
  }));
}

export const revalidate = 60; // 每 60 秒重新验证

export default async function CategoryPage({ params }: { params: { category: string } }) {
  const { category } = params;
  const decodedCategory = decodeURIComponent(category);

  // 仅加载当前分类的文章
  const filteredPosts: MinimalPost[] = allPosts
    .filter(
      (post) =>
        decodedCategory === "all" ||
        (post.category && post.category.toLowerCase() === decodedCategory.toLowerCase())
    )
    .map((post) => ({
      title: post.title,
      date: post.date,
      description: post.description,
      url: post.url,
      category: post.category,
      tags: post.tags,
      image: post.image,
      views: post.views,
      likes: post.likes,
    }))
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));

  // 获取所有分类，确保类型为 string[]
  const categories = Array.from(
    new Set(
      allPosts.map((post) => post.category).filter((cat): cat is string => typeof cat === "string")
    )
  );

  // 从缓存读取 postsByCategory 和 totalPosts
  const { totalPosts, postsByCategory } = await getPostsByCategoryCache();

  return (
    <div className="space-y-8 container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <FadeIn>
        <h1 className="text-3xl font-bold mb-8">
          {decodedCategory === "all" ? "所有文章" : `${decodedCategory} 分类下的文章`}
        </h1>
      </FadeIn>
      <CategoryFilter 
        posts={filteredPosts}
        totalPosts={totalPosts}
        currentCategory={decodedCategory}
        categories={categories}
        postsByCategory={postsByCategory}
      />
    </div>
  );
}