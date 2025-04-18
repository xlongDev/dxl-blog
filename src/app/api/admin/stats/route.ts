import { promisePool } from "@/lib/db/config";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // 获取总浏览量、总点赞数和总评论数
    const [result] = await promisePool.query(
      `SELECT 
        SUM(views) as total_views,
        SUM(likes) as total_likes,
        SUM(total_comments) as total_comments
      FROM article_interactions i
      LEFT JOIN article_stats s ON i.article_slug = s.article_slug`
    );

    // 获取文章总数（通过统计article_interactions表中的不同article_slug数量）
    const [postsResult] = await promisePool.query(
      `SELECT COUNT(DISTINCT article_slug) as total_posts 
       FROM article_interactions`
    );

    const stats = Array.isArray(result) && result.length > 0 ? result[0] : null;
    const postsStats =
      Array.isArray(postsResult) && postsResult.length > 0
        ? postsResult[0]
        : null;

    return NextResponse.json({
      totalViews: stats ? (stats as any).total_views || 0 : 0,
      totalLikes: stats ? (stats as any).total_likes || 0 : 0,
      totalComments: stats ? (stats as any).total_comments || 0 : 0,
      totalPosts: postsStats ? (postsStats as any).total_posts || 0 : 0,
    });
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    return NextResponse.json(
      { error: "获取管理统计数据失败" },
      { status: 500 }
    );
  }
}
