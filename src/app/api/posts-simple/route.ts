import { NextResponse } from "next/server";
import { allPosts } from "contentlayer/generated";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const pageSize = parseInt(searchParams.get("pageSize") || "12", 10);
  const all = searchParams.get("all") === "1";

  // 按日期倒序
  const sortedPosts = allPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const totalPosts = sortedPosts.length;
  const totalPages = Math.ceil(totalPosts / pageSize);
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedPosts = sortedPosts.slice(startIndex, endIndex).map(post => ({
    title: post.title,
    date: post.date,
    url: post.url,
    category: post.category,
    tags: post.tags,
    views: post.views || 0,
    likes: post.likes || 0,
    description: post.description || '',
  }));

  if (all) {
    // 返回全部文章
    const allSimplePosts = sortedPosts.map(post => ({
      title: post.title,
      date: post.date,
      url: post.url,
      category: post.category,
      tags: post.tags,
      views: post.views || 0,
      likes: post.likes || 0,
      description: post.description || '',
    }));
    return NextResponse.json({ posts: allSimplePosts, totalPosts }, {
      headers: { "Cache-Control": "no-store" }
    });
  }

  return NextResponse.json({
    posts: paginatedPosts,
    totalPosts,
    totalPages,
    currentPage: page,
  }, {
    headers: { "Cache-Control": "no-store" }
  });
} 