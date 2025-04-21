import { defineDocumentType, makeSource } from "contentlayer/source-files";
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";

export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    series: {
      type: "string",
      required: false,
    },
    date: {
      type: "date",
      required: true,
    },
    description: {
      type: "string",
      required: true,
    },
    keywords: {
      type: "string",
      required: false,
    },
    author: {
      type: "string",
      required: false,
      default: "晓龙",
    },
    image: {
      type: "string",
      required: false,
    },
    tags: {
      type: "list",
      of: { type: "string" },
      required: false,
    },
    views: {
      type: "number",
      required: false,
      default: 0,
    },
    likes: {
      type: "number",
      required: false,
      default: 0,
    },
    category: {
      type: "string",
      required: true, // category 是必需字段，确保类型为 string
    },
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (post) => `/blog/${encodeURIComponent(post._raw.flattenedPath)}`,
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
    remarkPlugins: [
      remarkGfm,
    ],
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
            node.properties.className = [...(node.properties.className || []), "line--highlighted"];
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