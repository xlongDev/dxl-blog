import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const offset = searchParams.get("offset") || "0";

  try {
    // 确保获取最新的壁纸数据
    const response = await fetch(
      `https://www.bing.com/HPImageArchive.aspx?format=js&idx=${offset}&n=8&mkt=zh-CN`
    );
    const data = await response.json();

    return NextResponse.json(data, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "public, s-maxage=86400",
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch Bing wallpaper" },
      { status: 500 }
    );
  }
}
