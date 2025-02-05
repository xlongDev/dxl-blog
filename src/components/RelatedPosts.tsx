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
    <div className="mt-16 pt-8 border-t border-gray-200/50 dark:border-gray-700/50">
      <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
        相关文章
      </h2>
      <div className="grid gap-6 md:grid-cols-3">
        {relatedPosts.map((post) => (
          <Link
            key={post._id}
            href={`/blog/${post._raw.flattenedPath}`}
            className="block p-6 rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 hover:shadow-xl hover:border-blue-500/50 dark:hover:border-blue-500/50 transition-all duration-300 group"
          >
            <h3 className="font-medium mb-3 line-clamp-2 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
              {post.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
              {post.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
