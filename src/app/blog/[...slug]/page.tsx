import { allPosts } from "contentlayer/generated";
import { notFound } from "next/navigation";
import BlogPostClient from "./BlogPostClient";

type Props = {
  params: {
    slug: string[];
  };
};

export function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post._raw.flattenedPath.split("/"),
  }));
}

export default function BlogPost({ params }: Props) {
  const slug = params.slug
    .map((segment) => decodeURIComponent(segment))
    .join("/");
  const post = allPosts.find((post) => post._raw.flattenedPath === slug);

  if (!post) {
    notFound();
  }

  return <BlogPostClient post={post} />;
}
