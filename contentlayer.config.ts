import { defineDocumentType, makeSource } from "contentlayer/source-files";
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";

export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    date: { type: "date", required: true },
    description: { type: "string", required: true },
    keywords: { type: "string", required: false },
    author: { type: "string", required: false, default: "晓龙" },
    image: { type: "string", required: false },
    tags: { type: "list", of: { type: "string" }, required: false },
    category: { type: "string", required: false },
    series: { type: "string", required: false },
    views: { type: "number", required: false, default: 0 },
    likes: { type: "number", required: false, default: 0 },
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (post) => `/blog/${encodeURIComponent(post._raw.flattenedPath)}`,
    },
  },
}));

export default makeSource({
  contentDirPath: "content",
  documentTypes: [Post],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [[rehypePrettyCode as any, { theme: "github-dark" }]],
  },
});
