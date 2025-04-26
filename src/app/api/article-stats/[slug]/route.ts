import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { v4 as uuidv4 } from "uuid";
import {
  getArticleStats,
  incrementViews,
  updateLikes,
  hasUserLiked,
  updateReadingStats,
  updateFavorites,
} from "@/lib/db/articles";

// 获取文章统计数据
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const stats = await getArticleStats(params.slug);
    return NextResponse.json(
      stats || { views: 0, likes: 0, totalComments: 0, avgReadTime: 0 }
    );
  } catch (error) {
    console.error("Error fetching article stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch article stats" },
      { status: 500 }
    );
  }
}

// 更新文章统计数据
export async function POST(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { action, readTime } = await request.json();

    // 获取或创建用户ID
    const cookieStore = cookies();
    let userId = cookieStore.get("user_id")?.value;
    if (!userId) {
      userId = uuidv4();
      cookieStore.set("user_id", userId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 365, // 1 year
      });
    }

    switch (action) {
      case "view":
        await incrementViews(params.slug);
        break;
      case "like":
      case "unlike":
        await updateLikes(params.slug, userId, action);
        break;
      case "favorite":
      case "unfavorite":
        await updateFavorites(params.slug, userId, action);
        break;
      case "read":
        if (typeof readTime === "number" && readTime > 0) {
          await updateReadingStats(params.slug, readTime);
        }
        break;
      default:
        return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }

    const stats = await getArticleStats(params.slug);
    return NextResponse.json(stats);
  } catch (error) {
    console.error("Error updating article stats:", error);
    return NextResponse.json(
      { error: "Failed to update article stats" },
      { status: 500 }
    );
  }
}
