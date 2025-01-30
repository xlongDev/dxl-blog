import { defineDocumentType, makeSource } from "contentlayer/source-files";
import rehypePrettyCode from "rehype-pretty-code";

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
      required: true,
    },
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (post) => {
        return `/blog/${post._raw.flattenedPath}`;
      },
    },
    category: {
      type: "string",
      resolve: (post) => {
        const pathSegments = post._raw.flattenedPath.split("/");
        return pathSegments[0];
      },
    },
    subcategory: {
      type: "string",
      resolve: (post) => {
        const pathSegments = post._raw.flattenedPath.split("/");
        return pathSegments.length > 1 ? pathSegments[1] : null;
      },
    },
  },
}));

export default makeSource({
  contentDirPath: "content",
  documentTypes: [Post],
  mdx: {
    rehypePlugins: [
      [
        rehypePrettyCode as any,
        {
          theme: "github-dark",
          onVisitLine(node: {
            children: Array<{ type: string; value: string }>;
          }) {
            // 防止空行折叠
            if (node.children.length === 0) {
              node.children = [{ type: "text", value: " " }];
            }
          },
          onVisitHighlightedLine(node: {
            properties: { className: string[] };
          }) {
            // 添加高亮行的样式
            node.properties.className.push("line--highlighted");
          },
          onVisitHighlightedWord(node: {
            properties: { className: string[] };
          }) {
            // 添加高亮词的样式
            node.properties.className = ["word--highlighted"];
          },
        },
      ],
    ],
  },
});
