import { allPosts } from "contentlayer/generated";
import { compareDesc } from "date-fns";
import FadeIn from "@/components/FadeIn";
import CategoryFilter from "@/components/CategoryFilter";

type Props = {
  params: {
    category: string;
  };
};

export function generateStaticParams() {
  const categories = Array.from(new Set(allPosts.map((post) => post.category)));
  return categories.map((category) => ({
    category: category?.toLowerCase(),
  }));
}

export default function CategoryPage({ params }: Props) {
  const { category } = params;
  const posts = allPosts
    .filter((post) => post.category?.toLowerCase() === category)
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));

  return (
    <div className="space-y-8 container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <FadeIn>
        <h1 className="text-3xl font-bold mb-8">{category} 分类下的文章</h1>
      </FadeIn>
      <CategoryFilter posts={posts} />
    </div>
  );
}
