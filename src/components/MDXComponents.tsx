import CodeBlock from "./CodeBlock";
import type { MDXComponents as MDXComponentsType } from "mdx/types";

const MDXComponents: MDXComponentsType = {
  pre: ({ children, ...props }: { children: React.ReactNode }) => {
    const child = children as React.ReactElement;
    if (child?.props?.mdxType === "code") {
      return (
        <CodeBlock
          language={child.props.className?.replace("language-", "") || "text"}
          filename={child.props.filename}
        >
          {child.props.children}
        </CodeBlock>
      );
    }
    return <pre {...props}>{children}</pre>;
  },
};

export default MDXComponents;
