import { defineDocumentType, makeSource } from "contentlayer2/source-files";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";

// 配置 rehype-pretty-code 插件选项
const rehypePrettyCodeOptions = {
  theme: "github-dark",
  onVisitLine(node: any) {
    if (node.children.length === 0) {
      node.children = [{ type: "text", value: " " }];
    }
  },
  keepBackground: false,
  defaultLang: "text",
  filterMetaString: (str: string) => str,
  tokensMap: {},
};

export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `**/*.mdx`, // 匹配所有 content/ 下的 .mdx 文件
  contentType: "mdx",
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
    category: { type: "string", required: false },
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (post) => `/blog/${post._raw.flattenedPath}`,
    },
    // 修正后的分类逻辑：优先使用文件中定义的category字段，若无则从路径中提取
    category: {
      type: "string",
      resolve: (post) => {
        // 优先使用文件中定义的category字段
        // 注意：Contentlayer会将frontmatter字段直接放在post对象上
        if (post.category) {
          return post.category;
        }
        // 若无category字段，则从路径中提取一级目录作为分类
        const pathParts = post._raw.flattenedPath.split("/");
        return pathParts[0] || "未分类";
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
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: "wrap" }],
      [rehypePrettyCode, rehypePrettyCodeOptions],
    ],
  },
  onSuccess: async () => {
    console.log("✅ Contentlayer 内容生成完成");
    return Promise.resolve();
  },
});
