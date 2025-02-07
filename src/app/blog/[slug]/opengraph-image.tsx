import { ImageResponse } from "@vercel/og";

export const contentType = "image/png";

export default async function OpenGraphImage({
  params,
}: {
  params: { slug: string };
}) {
  return new ImageResponse(
    (
      <div
        style={{
          background: "white",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
        }}
      >
        <h1
          style={{
            fontSize: "64px",
            fontWeight: "bold",
            color: "#1a202c",
          }}
        >
          {decodeURIComponent(params.slug).split("-").join(" ")}
        </h1>
        <p
          style={{
            fontSize: "32px",
            color: "#4a5568",
            marginTop: "20px",
          }}
        >
          晓龙的技术博客
        </p>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}

// 移除 edge runtime 配置，使用默认的 Node.js runtime
