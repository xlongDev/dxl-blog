import { NextRequest, NextResponse } from "next/server";
import { ArticleStatsService } from "@/lib/db/article-stats";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");

  if (!slug) {
    return NextResponse.json({ error: "Slug is required" }, { status: 400 });
  }

  const stats = await ArticleStatsService.getStats(slug);
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

  const userId = request.cookies.get("user_id")?.value || "anonymous";

  if (action === "view") {
    await ArticleStatsService.incrementViews(slug);
  } else if (action === "like" || action === "unlike") {
    await ArticleStatsService.toggleLike(slug, userId);
  } else if (action === "favorite" || action === "unfavorite") {
    await ArticleStatsService.toggleFavorite(slug, userId);
  }

  const stats = await ArticleStatsService.getStats(slug);
  return NextResponse.json(stats);
}
