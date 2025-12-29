"use client";

import { useState } from "react";
import { Post } from "contentlayer/generated";
import PostCard from "./PostCard";

export default function TagFilter({ initialPosts }: { initialPosts: Post[] }) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [posts, setPosts] = useState(initialPosts);

  const allTags = Array.from(
    new Set(initialPosts.flatMap((post) => post.tags || []))
  ).sort();

  const handleTagClick = (tag: string) => {
    const newTag = selectedTag === tag ? null : tag;
    setSelectedTag(newTag);

    if (newTag) {
      const filtered = initialPosts.filter((post) =>
        post.tags?.includes(newTag)
      );
      setPosts(filtered);
    } else {
      setPosts(initialPosts);
    }
  };

  return (
    <>
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">标签筛选</h2>
        <div className="flex flex-wrap gap-2">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => handleTagClick(tag)}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                selectedTag === tag
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
      <div className="grid gap-8 md:grid-cols-2">
        {posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </>
  );
}
