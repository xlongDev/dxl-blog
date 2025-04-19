import { allPosts } from "contentlayer/generated";
import { compareDesc } from "date-fns";
import FadeIn from "@/components/FadeIn";
import CategoryFilter from "@/components/CategoryFilter";
import { notFound } from "next/navigation";

type Props = {
  params: {
    category: string;
  };
};

export function generateStaticParams() {
  const categories = Array.from(
    new Set(allPosts.map((post) => post.category).filter(Boolean))
  );
  return categories.map((category) => ({
    category: category,
  }));
}

export default function CategoryPage({ params }: Props) {
  const { category } = params;
  const decodedCategory = decodeURIComponent(category);

  // 只获取必要的字段，减少数据量
  const posts = allPosts
    .filter(
      (post) => post.category?.toLowerCase() === decodedCategory.toLowerCase()
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

  // 如果没有找到任何文章，返回404
  if (posts.length === 0) {
    notFound();
  }

  // 获取原始分类名称
  const originalCategory =
    allPosts.find(
      (post) => post.category?.toLowerCase() === decodedCategory.toLowerCase()
    )?.category || decodedCategory;

  return (
    <div className="space-y-8 container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <FadeIn>
        <h1 className="text-3xl font-bold mb-8">
          {originalCategory} 分类下的文章
        </h1>
      </FadeIn>
      <CategoryFilter posts={posts} />
    </div>
  );
}
