"use client";

import { useState } from "react";
import { Post } from "contentlayer/generated";
import PostCard from "./PostCard";
import FadeIn from "@/components/FadeIn";

interface BlogFilterProps {
  posts: Post[];
}

export default function BlogFilter({ posts }: BlogFilterProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const allTags = Array.from(
    new Set(posts.flatMap((post) => post.tags || []))
  ).sort();

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = !selectedTag || post.tags?.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  return (
    <div className="space-y-8">
      <FadeIn delay={0.1} className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="搜索文章..."
          className="flex-1 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-800 bg-transparent"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-800 bg-transparent"
          value={selectedTag || ""}
          onChange={(e) => setSelectedTag(e.target.value || null)}
        >
          <option value="">所有标签</option>
          {allTags.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </FadeIn>
      <div className="grid gap-8 md:grid-cols-2">
        {filteredPosts.map((post, index) => (
          <FadeIn key={post._id} delay={0.2 + index * 0.1}>
            <PostCard post={post} />
          </FadeIn>
        ))}
      </div>
      {filteredPosts.length === 0 && (
        <FadeIn delay={0.2}>
          <p className="text-center text-gray-500">未找到匹配的文章</p>
        </FadeIn>
      )}
    </div>
  );
}
