"use client";

import { Post } from "contentlayer/generated";
import PostCard from "./PostCard";
import FadeIn from "@/components/FadeIn";
import Categories from "./Categories";

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

interface CategoryFilterProps {
  posts: MinimalPost[];
}

export default function CategoryFilter({ posts }: CategoryFilterProps) {
  return (
    <div className="space-y-8">
      <Categories posts={posts} />
      <div className="w-full">
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {posts.map((post) => (
            <FadeIn key={post.url} delay={0.1}>
              <PostCard post={post} />
            </FadeIn>
          ))}
        </div>
      </div>
    </div>
  );
}
