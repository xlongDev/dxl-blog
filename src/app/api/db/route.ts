import { promisePool } from "@/lib/db/config";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // 获取文章互动表数据
    const [interactions] = await promisePool.query(
      "SELECT * FROM article_interactions"
    );

    // 获取点赞记录表数据
    const [likes] = await promisePool.query("SELECT * FROM article_likes");

    // 获取收藏记录表数据
    const [favorites] = await promisePool.query(
      "SELECT * FROM article_favorites"
    );

    // 获取统计表数据
    const [stats] = await promisePool.query("SELECT * FROM article_stats");

    return NextResponse.json({
      tables: [
        { table_name: "文章互动表", data: interactions },
        { table_name: "点赞记录表", data: likes },
        { table_name: "收藏记录表", data: favorites },
        { table_name: "统计表", data: stats },
      ],
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "获取数据失败" },
      { status: 500 }
    );
  }
}
