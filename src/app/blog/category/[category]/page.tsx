import { allPosts } from "contentlayer/generated";
import { compareDesc } from "date-fns";
import CategoryFilter from "@/components/CategoryFilter";
import { Post } from "contentlayer/generated";
import { notFound } from "next/navigation";
import { cache } from "react";

// 使用 React cache 缓存统计数据
const getPostsStats = cache(() => {
  try {
    // 获取所有分类
    const categories = Array.from(
      new Set(
        allPosts
          .map((post) => {
            const pathSegments = post._raw.flattenedPath.split("/");
            return pathSegments[0];
          })
          .filter((cat): cat is string => typeof cat === "string")
      )
    );

    // 统计每个分类的文章数
    const postsByCategory = categories.reduce((acc, category) => {
      acc[category.toLowerCase()] = allPosts.filter((post) => {
        const pathSegments = post._raw.flattenedPath.split("/");
        return pathSegments[0].toLowerCase() === category.toLowerCase();
      }).length;
      return acc;
    }, {} as Record<string, number>);

    return {
      categories: categories.map((c) => c.toLowerCase()),
      categoriesOriginal: categories,
      postsByCategory,
      totalPosts: allPosts.length,
    };
  } catch (error) {
    console.error("Error getting posts stats:", error);
    return {
      categories: [],
      categoriesOriginal: [],
      postsByCategory: {},
      totalPosts: 0,
    };
  }
});

// 使用 React cache 缓存分类文章数据
const getCategoryPosts = cache((category: string) => {
  return allPosts
    .filter((post) => {
      const pathSegments = post._raw.flattenedPath.split("/");
      const postCategory = pathSegments[0].toLowerCase();
      return category === "all" || postCategory === category;
    })
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));
});

export async function generateStaticParams() {
  try {
    const { categoriesOriginal } = getPostsStats();
    const postsPerPage = 9;

    // 为每个分类生成所有可能的页面
    const params = [];

    // 添加 "all" 分类的所有页面
    const allPosts = getCategoryPosts("all");
    const allTotalPages = Math.ceil(allPosts.length / postsPerPage);
    for (let page = 1; page <= allTotalPages; page++) {
      params.push({
        category: "all",
        page: page.toString(),
      });
    }

    // 为每个分类生成所有页面
    for (const category of categoriesOriginal) {
      const categoryPosts = getCategoryPosts(category.toLowerCase());
      const totalPages = Math.ceil(categoryPosts.length / postsPerPage);

      for (let page = 1; page <= totalPages; page++) {
        params.push({
          category: category.toLowerCase(),
          page: page.toString(),
        });
      }
    }

    return params;
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

// 设置较长的重新验证时间，因为内容不会频繁更新
export const revalidate = 3600; // 1小时

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: { category: string };
  searchParams: { page?: string };
}) {
  try {
    const { category } = params;
    const decodedCategory = decodeURIComponent(category).toLowerCase();
    const page = Number(searchParams.page) || 1;
    const postsPerPage = 9;

    const {
      categories,
      categoriesOriginal,
      postsByCategory,
      totalPosts: totalAllPosts,
    } = getPostsStats();

    // 验证分类是否存在
    if (decodedCategory !== "all" && !categories.includes(decodedCategory)) {
      console.log(
        "Category not found:",
        decodedCategory,
        "Available categories:",
        categories
      );
      notFound();
    }

    // 获取缓存的分类文章数据
    const filteredPosts = getCategoryPosts(decodedCategory);

    // 计算分页
    const totalPosts = filteredPosts.length;
    const totalPages = Math.ceil(totalPosts / postsPerPage);

    // 验证页码是否有效
    if (totalPages > 0 && (page < 1 || page > totalPages)) {
      notFound();
    }

    const startIndex = (page - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    const paginatedPosts = filteredPosts.slice(startIndex, endIndex);

    return (
      <div className="space-y-8 container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <CategoryFilter
          posts={paginatedPosts}
          totalPosts={
            decodedCategory === "all"
              ? totalAllPosts
              : postsByCategory[decodedCategory] || 0
          }
          currentCategory={decodedCategory}
          categories={categoriesOriginal}
          postsByCategory={postsByCategory}
          currentPage={page}
          totalPages={totalPages}
        />
      </div>
    );
  } catch (error) {
    console.error("Error in CategoryPage:", error);
    throw error;
  }
}
