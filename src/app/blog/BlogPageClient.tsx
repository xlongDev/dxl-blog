"use client";

import { useState } from "react";
import { Post } from "contentlayer/generated";
import FadeIn from "@/components/FadeIn";
import BlogFilter from "@/components/BlogFilter";
import BlogStats from "@/components/BlogStats";
import ArticleTree from "@/components/ArticleTree";
import TimelineView from "@/components/TimelineView";
import CategoryFilter from "@/components/CategoryFilter";

interface BlogPageClientProps {
  posts: Post[];
}

export default function BlogPageClient({ posts }: BlogPageClientProps) {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          <FadeIn>
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg shadow p-4 border border-gray-200/50 dark:border-gray-700/50">
              <BlogStats posts={posts} />
            </div>
          </FadeIn>
          <FadeIn>
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg shadow p-4 border border-gray-200/50 dark:border-gray-700/50">
              <CategoryFilter posts={posts} />
            </div>
          </FadeIn>
          <FadeIn>
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg shadow p-4 border border-gray-200/50 dark:border-gray-700/50">
              <BlogFilter posts={posts} />
            </div>
          </FadeIn>
        </div>
        <div className="lg:col-span-4 space-y-8">
          <FadeIn>
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg shadow p-4 border border-gray-200/50 dark:border-gray-700/50 sticky top-20">
              <ArticleTree posts={posts} />
            </div>
          </FadeIn>
          <FadeIn>
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg shadow p-4 border border-gray-200/50 dark:border-gray-700/50">
              <TimelineView posts={posts} />
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}
