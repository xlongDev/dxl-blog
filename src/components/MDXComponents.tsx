import type { MDXComponents as MDXComponentsType } from "mdx/types";

const MDXComponents: MDXComponentsType = {
  pre: (
    props: React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLPreElement>,
      HTMLPreElement
    >
  ) => {
    return (
      <pre className="my-6 overflow-auto rounded-lg bg-gray-800 p-4" {...props}>
        {props.children}
      </pre>
    );
  },
  code: (
    props: React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement>,
      HTMLElement
    >
  ) => {
    return (
      <code className="font-mono text-sm" {...props}>
        {props.children}
      </code>
    );
  },
};

export default MDXComponents;
