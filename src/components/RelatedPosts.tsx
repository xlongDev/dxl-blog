import { Post } from "contentlayer/generated";
import Link from "next/link";

function getRelatedPosts(currentPost: Post, allPosts: Post[], limit = 3) {
  // 根据标签相似度计算相关文章
  return allPosts
    .filter((post) => post._id !== currentPost._id)
    .map((post) => {
      const commonTags =
        post.tags?.filter((tag) => currentPost.tags?.includes(tag)).length || 0;
      return { ...post, similarity: commonTags };
    })
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, limit);
}

export default function RelatedPosts({
  currentPost,
  allPosts,
}: {
  currentPost: Post;
  allPosts: Post[];
}) {
  const relatedPosts = getRelatedPosts(currentPost, allPosts);

  if (relatedPosts.length === 0) return null;

  return (
    <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800">
      <h2 className="text-2xl font-bold mb-6">相关文章</h2>
      <div className="grid gap-6 md:grid-cols-3">
        {relatedPosts.map((post) => (
          <Link
            key={post._id}
            href={post.url}
            className="block p-4 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-blue-500 dark:hover:border-blue-500 transition-colors"
          >
            <h3 className="font-medium mb-2 line-clamp-2">{post.title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
              {post.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
