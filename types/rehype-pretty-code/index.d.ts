declare module "rehype-pretty-code" {
  import type { Plugin } from "unified";
  import type { Options } from "shiki";

  interface PrettyCodeOptions extends Partial<Options> {
    theme?: string | Options["theme"];
    keepBackground?: boolean;
    onVisitLine?: (node: any) => void;
    onVisitHighlightedLine?: (node: any) => void;
    onVisitHighlightedWord?: (node: any) => void;
    filterMetaString?: (meta: string) => string;
  }

  const rehypePrettyCode: Plugin<[PrettyCodeOptions?], any>;
  export default rehypePrettyCode;
}
