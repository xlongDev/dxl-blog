import { promisePool } from "@/lib/db/config";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // 获取最近的用户活动数据
    const [rows] = await promisePool.query(
      `SELECT 
        CONCAT(action_type, '_', article_slug, '_', user_id) as id,
        action_type as type,
        user_id as userId,
        article_slug as articleSlug,
        created_at as createdAt
      FROM (
        SELECT 'like' as action_type, user_id, article_slug, created_at
        FROM article_likes
        UNION ALL
        SELECT 'favorite' as action_type, user_id, article_slug, created_at
        FROM article_favorites
        UNION ALL
        SELECT 'comment' as action_type, user_id, article_slug, created_at
        FROM article_comments
      ) as activities
      ORDER BY created_at DESC
      LIMIT 20`
    );

    // 获取文章标题
    const activities = await Promise.all(
      (Array.isArray(rows) ? rows : []).map(async (activity: any) => {
        const [titleRows] = await promisePool.query(
          "SELECT title FROM articles WHERE slug = ?",
          [activity.articleSlug]
        );
        return {
          ...activity,
          articleTitle:
            Array.isArray(titleRows) && titleRows.length > 0
              ? (titleRows[0] as any).title
              : "未知文章",
        };
      })
    );

    return NextResponse.json(activities);
  } catch (error) {
    console.error("Error fetching activities:", error);
    return NextResponse.json({ error: "获取活动数据失败" }, { status: 500 });
  }
}
