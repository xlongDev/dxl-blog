import { NextRequest, NextResponse } from "next/server";

interface ArticleStats {
  slug: string;
  views: number;
  likes: number;
  likedBy?: string[];
}

// 模拟数据存储
let articleStats: Map<string, ArticleStats> = new Map();

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");

  if (!slug) {
    return NextResponse.json({ error: "Slug is required" }, { status: 400 });
  }

  const stats = articleStats.get(slug) || { slug, views: 0, likes: 0 };
  return NextResponse.json(stats);
}

export async function POST(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");
  const action = searchParams.get("action"); // "view" or "like"

  if (!slug || !action) {
    return NextResponse.json(
      { error: "Slug and action are required" },
      { status: 400 }
    );
  }

  let stats = articleStats.get(slug) || { slug, views: 0, likes: 0 };

  if (action === "view") {
    stats.views += 1;
  } else if (action === "like" || action === "unlike") {
    // 初始化 likedBy 数组
    if (!stats.likedBy) {
      stats.likedBy = [];
    }

    const userId = request.cookies.get("user_id")?.value || "anonymous";
    const hasLiked = stats.likedBy.includes(userId);

    if (action === "like" && !hasLiked) {
      stats.likes += 1;
      stats.likedBy.push(userId);
    } else if (action === "unlike" && hasLiked) {
      stats.likes = Math.max(0, stats.likes - 1);
      stats.likedBy = stats.likedBy.filter((id) => id !== userId);
    }
  }

  articleStats.set(slug, stats);
  return NextResponse.json(stats);
}
