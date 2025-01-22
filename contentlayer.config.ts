import { defineDocumentType, makeSource } from "contentlayer/source-files";

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
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (post) => {
        const pathSegments = post._raw.flattenedPath.split("/");
        return `/blog/${pathSegments.join("/")}`;
      },
    },
    category: {
      type: "string",
      resolve: (post) => {
        const pathSegments = post._raw.flattenedPath.split("/");
        return pathSegments.length > 1 ? pathSegments[0] : "未分类";
      },
    },
  },
}));

export default makeSource({
  contentDirPath: "content",
  documentTypes: [Post],
});
