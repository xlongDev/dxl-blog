import { promisePool } from "@/lib/db/config";
import { NextResponse } from "next/server";
import { RowDataPacket } from "mysql2";

// 1. 定义类型（继承RowDataPacket以兼容MySQL2返回类型）
interface ActivityRaw extends RowDataPacket {
  type: string;
  userId: number;
  articleSlug: string;
  createdAt: Date;
  articleTitle?: string | null; // 明确标记可能为null
}

interface Activity {
  id: string;
  type: string;
  userId: number;
  articleSlug: string;
  createdAt: Date;
  articleTitle: string;
}

export async function GET() {
  try {
    // 2. 查询数据（自动匹配RowDataPacket类型）
    const [rows] = await promisePool.query<ActivityRaw[]>(`
      SELECT 
        a.action_type as type,
        a.user_id as userId,
        a.article_slug as articleSlug,
        a.created_at as createdAt,
        a.article_slug as articleTitle
      FROM (
        SELECT 'like' as action_type, user_id, article_slug, created_at FROM article_likes
        UNION ALL
        SELECT 'favorite' as action_type, user_id, article_slug, created_at FROM article_favorites
        UNION ALL
        SELECT 'comment' as action_type, user_id, article_slug, created_at FROM article_comments
      ) a
      ORDER BY a.created_at DESC
      LIMIT 20
    `);

    // 注意：article_interactions表中没有title列，暂时使用article_slug代替

    // 3. 转换数据格式
    const activities: Activity[] = rows.map((row) => ({
      id: `${row.type}_${row.articleSlug}_${row.userId}`,
      type: row.type,
      userId: row.userId,
      articleSlug: row.articleSlug,
      createdAt: row.createdAt,
      articleTitle: row.articleTitle || "未知文章", // 处理null/undefined情况
    }));

    // 4. 返回结果
    return NextResponse.json(activities, {
      headers: {
        "Cache-Control": "public, max-age=60", // 添加缓存头
      },
    });
  } catch (error) {
    console.error("Error fetching activities:", error);
    return NextResponse.json(
      {
        error: "获取活动数据失败",
        ...(process.env.NODE_ENV === "development" && {
          details: error instanceof Error ? error.message : String(error),
        }),
      },
      { status: 500 }
    );
  }
}
