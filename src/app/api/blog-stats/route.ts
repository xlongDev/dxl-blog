import { promisePool } from "@/lib/db/config";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // 获取总阅读量和总点赞数
    const [result] = await promisePool.query(
      `SELECT 
        SUM(views) as total_views,
        SUM(likes) as total_likes
      FROM article_interactions`
    );

    const stats = Array.isArray(result) && result.length > 0 ? result[0] : null;

    return NextResponse.json({
      totalViews: stats ? (stats as any).total_views || 0 : 0,
      totalLikes: stats ? (stats as any).total_likes || 0 : 0,
    });
  } catch (error) {
    console.error("Error fetching blog stats:", error);
    return NextResponse.json(
      { error: "获取博客统计数据失败" },
      { status: 500 }
    );
  }
}
