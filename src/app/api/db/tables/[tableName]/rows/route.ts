import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { tableName: string } }
) {
  try {
    const data = await req.json();
    // 解码URL中的中文表名
    const decodedTableName = decodeURIComponent(params.tableName);

    // 表名映射
    const tableNameMap: { [key: string]: string } = {
      文章互动表: "article_interactions",
      点赞记录表: "article_likes",
      收藏记录表: "article_favorites",
      统计表: "article_stats",
    };

    // 获取实际的数据库表名
    const actualTableName = tableNameMap[decodedTableName];
    if (!actualTableName) {
      console.error("删除记录失败: 无效的表名");
      return NextResponse.json({ error: "无效的表名" }, { status: 400 });
    }

    // 验证请求数据
    if (!data || Object.keys(data).length === 0) {
      console.error("删除记录失败: 无效的请求数据");
      return NextResponse.json({ error: "无效的请求数据" }, { status: 400 });
    }

    // 验证是否存在id
    if (!data.id) {
      console.error("删除记录失败: 缺少id字段");
      return NextResponse.json({ error: "缺少id字段" }, { status: 400 });
    }

    // 打印SQL查询信息用于调试
    console.log("SQL查询:", `DELETE FROM \`${actualTableName}\` WHERE id = ?`);
    console.log("参数值:", [data.id]);

    // 执行删除操作
    const [result] = await db.execute(
      `DELETE FROM \`${actualTableName}\` WHERE id = ?`,
      [data.id]
    );

    console.log("删除操作结果:", result);
    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error("删除记录失败:", error);
    return NextResponse.json({ error: "删除记录失败" }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { tableName: string } }
) {
  try {
    const { oldData, newData } = await req.json();
    // 解码URL中的中文表名
    const decodedTableName = decodeURIComponent(params.tableName);

    // 表名映射
    const tableNameMap: { [key: string]: string } = {
      文章互动表: "article_interactions",
      点赞记录表: "article_likes",
      收藏记录表: "article_favorites",
      统计表: "article_stats",
    };

    // 获取实际的数据库表名
    const actualTableName = tableNameMap[decodedTableName];
    if (!actualTableName) {
      console.error("更新记录失败: 无效的表名");
      return NextResponse.json({ error: "无效的表名" }, { status: 400 });
    }

    // 验证请求数据
    if (!oldData || !newData || Object.keys(newData).length === 0) {
      console.error("更新记录失败: 无效的请求数据");
      return NextResponse.json({ error: "无效的请求数据" }, { status: 400 });
    }

    // 验证是否存在id
    if (!oldData.id) {
      console.error("更新记录失败: 缺少id字段");
      return NextResponse.json({ error: "缺少id字段" }, { status: 400 });
    }

    // 构建更新语句
    const updateFields = Object.keys(newData)
      .map((key) => `\`${key}\` = ?`)
      .join(", ");
    const updateValues = Object.values(newData);

    // 打印SQL查询信息用于调试
    console.log(
      "SQL查询:",
      `UPDATE \`${actualTableName}\` SET ${updateFields} WHERE id = ?`
    );
    console.log("参数值:", [...updateValues, oldData.id]);

    // 执行更新操作
    const [result] = await db.execute(
      `UPDATE \`${actualTableName}\` SET ${updateFields} WHERE id = ?`,
      [...updateValues, oldData.id]
    );

    console.log("更新操作结果:", result);
    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error("更新记录失败:", error);
    return NextResponse.json({ error: "更新记录失败" }, { status: 500 });
  }
}
