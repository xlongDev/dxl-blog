import { defineDocumentType, makeSource } from "contentlayer/source-files";
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";

export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `*/**/*.mdx`,
  contentType: "mdx",
  // 移除fields中的category定义
  fields: {
    title: { type: "string", required: true },
    series: { type: "string", required: false },
    date: { type: "date", required: true },
    description: { type: "string", required: true },
    keywords: { type: "string", required: false },
    author: { type: "string", required: false, default: "晓龙" },
    image: { type: "string", required: false },
    tags: { type: "list", of: { type: "string" }, required: false },
    views: { type: "number", required: false, default: 0 },
    likes: { type: "number", required: false, default: 0 },
    // 移除这一行: category: { type: "string", required: false },
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (post) => `/blog/${encodeURIComponent(post._raw.flattenedPath)}`,
    },
    category: {
      type: "string",
      resolve: (post) => {
        const pathSegments = post._raw.flattenedPath.split("/");
        return pathSegments[0]; // 基于文件目录的分类
      },
    },
    subcategory: {
      type: "string",
      resolve: (post) => {
        const segments = post._raw.flattenedPath.split("/");
        return segments.length > 1 ? segments[1] : null;
      },
    },
  },
}));

export default makeSource({
  contentDirPath: "content",
  documentTypes: [Post],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      [
        rehypePrettyCode as any,
        {
          theme: "github-dark",
          onVisitLine(node: any) {
            if (node.children.length === 0) {
              node.children = [{ type: "text", value: " " }];
            }
          },
          onVisitHighlightedLine(node: any) {
            node.properties.className = [
              ...(node.properties.className || []),
              "line--highlighted",
            ];
          },
          onVisitHighlightedWord(node: any) {
            node.properties.className = ["word--highlighted"];
          },
        },
      ],
    ],
  },
  disableImportAliasWarning: true,
});
