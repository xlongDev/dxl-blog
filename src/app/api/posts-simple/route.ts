import { NextResponse } from "next/server";
import { allPosts } from "contentlayer/generated";

export async function GET() {
  // 只返回必要字段，避免正文等大字段
  const simplePosts = allPosts.map(post => ({
    title: post.title,
    date: post.date,
    url: post.url,
    category: post.category,
    tags: post.tags,
    views: post.views || 0,
    likes: post.likes || 0,
  }));
  return NextResponse.json({ posts: simplePosts });
} 