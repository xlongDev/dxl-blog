import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const offset = searchParams.get("offset") || "0";

  try {
    // 使用 stale-while-revalidate 策略来优化缓存
    const response = await fetch(
      `https://www.bing.com/HPImageArchive.aspx?format=js&idx=${offset}&n=1&mkt=zh-CN`,
      {
        next: {
          revalidate: 3600, // 每小时重新验证一次
        },
      }
    );
    const data = await response.json();

    return NextResponse.json(data, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=43200",
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch Bing wallpaper" },
      { status: 500 }
    );
  }
}
