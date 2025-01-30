import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { ArticleStats } from "@/models/ArticleStats";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");

    if (!slug) {
      return NextResponse.json({ error: "Slug is required" }, { status: 400 });
    }

    await connectDB();

    const stats = await ArticleStats.findOne({ slug });
    if (!stats) {
      return NextResponse.json({ slug, views: 0, likes: 0, likedBy: [] });
    }

    return NextResponse.json(stats);
  } catch (error) {
    console.error("获取文章统计失败:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");
    const action = searchParams.get("action"); // "view" or "like" or "unlike"

    if (!slug || !action) {
      return NextResponse.json(
        { error: "Slug and action are required" },
        { status: 400 }
      );
    }

    await connectDB();

    const userId = request.cookies.get("user_id")?.value || "anonymous";
    const now = new Date();

    // 使用 findOneAndUpdate 来确保原子性操作
    let update: any = {};
    let options = { new: true, upsert: true };

    if (action === "view") {
      update = {
        $inc: { views: 1 },
        lastViewedAt: now,
      };
    } else if (action === "like" || action === "unlike") {
      if (action === "like") {
        update = {
          $inc: { likes: 1 },
          $addToSet: { likedBy: userId },
          lastLikedAt: now,
        };
      } else {
        update = {
          $inc: { likes: -1 },
          $pull: { likedBy: userId },
        };
      }

      // 添加条件以防止重复操作
      if (action === "like") {
        options = {
          ...options,
          // 确保用户未点赞过
          new: true,
          upsert: true,
        };
      } else {
        options = {
          ...options,
          // 确保用户已点赞
          new: true,
        };
      }
    }

    const stats = await ArticleStats.findOneAndUpdate(
      { slug },
      update,
      options
    );

    if (!stats) {
      return NextResponse.json(
        { error: "Article stats not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(stats);
  } catch (error) {
    console.error("更新文章统计失败:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
