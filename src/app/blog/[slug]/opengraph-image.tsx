import { ImageResponse } from "@vercel/og";
import { allPosts } from "contentlayer/generated";

export const runtime = "edge";
export const contentType = "image/png";

export default async function OpenGraphImage({
  params,
}: {
  params: { slug: string };
}) {
  const post = allPosts.find((post) => post._raw.flattenedPath === params.slug);

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
          {post?.title}
        </h1>
        <p
          style={{
            fontSize: "32px",
            color: "#4a5568",
            marginTop: "20px",
          }}
        >
          {post?.description}
        </p>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
