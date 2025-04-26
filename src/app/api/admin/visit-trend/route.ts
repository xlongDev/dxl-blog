import { promisePool } from "@/lib/db/config";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // 获取最近30天的访问趋势数据
    const [rows] = await promisePool.query(
      `SELECT 
        DATE(created_at) as date,
        COUNT(*) as views
      FROM article_views
      WHERE created_at >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
      GROUP BY DATE(created_at)
      ORDER BY date ASC`
    );

    return NextResponse.json(Array.isArray(rows) ? rows : []);
  } catch (error) {
    console.error("Error fetching visit trend:", error);
    return NextResponse.json(
      { error: "获取访问趋势数据失败" },
      { status: 500 }
    );
  }
}
