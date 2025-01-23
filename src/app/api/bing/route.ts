export async function GET() {
  try {
    const response = await fetch(
      "https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=8&mkt=zh-CN"
    );
    const data = await response.json();

    return new Response(JSON.stringify(data), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "public, s-maxage=86400",
      },
    });
  } catch (error) {
    return Response.json(
      { error: "Failed to fetch Bing wallpaper" },
      { status: 500 }
    );
  }
}
