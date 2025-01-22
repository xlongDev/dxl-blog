import { allPosts } from "contentlayer/generated";
import { compareDesc } from "date-fns";
import CategoryFilter from "@/components/CategoryFilter";
import FadeIn from "@/components/FadeIn";

export default function BlogPage() {
  const posts = allPosts.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date))
  );

  return (
    <div className="space-y-8 container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <FadeIn>
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">
          所有文章
        </h1>
      </FadeIn>
      <CategoryFilter posts={posts} />
    </div>
  );
}
