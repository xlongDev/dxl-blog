// contentlayer.config.ts
import { defineDocumentType, makeSource } from "contentlayer2/source-files";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
var rehypePrettyCodeOptions = {
  theme: "github-dark",
  onVisitLine(node) {
    if (node.children.length === 0) {
      node.children = [{ type: "text", value: " " }];
    }
  },
  keepBackground: false,
  defaultLang: "text",
  filterMetaString: (str) => str,
  tokensMap: {}
};
var Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `**/*.mdx`,
  // 匹配所有 content/ 下的 .mdx 文件
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    series: { type: "string", required: false },
    date: { type: "date", required: true },
    description: { type: "string", required: true },
    keywords: { type: "string", required: false },
    author: { type: "string", required: false, default: "\u6653\u9F99" },
    image: { type: "string", required: false },
    tags: { type: "list", of: { type: "string" }, required: false },
    views: { type: "number", required: false, default: 0 },
    likes: { type: "number", required: false, default: 0 },
    category: { type: "string", required: false }
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (post) => `/blog/${post._raw.flattenedPath}`
    },
    // 修正后的分类逻辑：优先使用文件中定义的category字段，若无则从路径中提取
    category: {
      type: "string",
      resolve: (post) => {
        if (post.category) {
          return post.category;
        }
        const pathParts = post._raw.flattenedPath.split("/");
        return pathParts[0] || "\u672A\u5206\u7C7B";
      }
    }
  }
}));
var contentlayer_config_default = makeSource({
  contentDirPath: "content",
  documentTypes: [Post],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: "wrap" }],
      [rehypePrettyCode, rehypePrettyCodeOptions]
    ]
  },
  onSuccess: async () => {
    console.log("\u2705 Contentlayer \u5185\u5BB9\u751F\u6210\u5B8C\u6210");
    return Promise.resolve();
  }
});
export {
  Post,
  contentlayer_config_default as default
};
//# sourceMappingURL=compiled-contentlayer-config-A5AT5NGA.mjs.map
