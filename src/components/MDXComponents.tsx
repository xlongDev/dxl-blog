"use client";

import { useState } from "react";
import type { MDXComponents as MDXComponentsType } from "mdx/types";
import { CheckIcon, ClipboardIcon } from "@heroicons/react/24/outline";

const MDXComponents: MDXComponentsType = {
  pre: ({
    children,
    ...props
  }: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLPreElement>,
    HTMLPreElement
  >) => {
    const [isCopied, setIsCopied] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);

    // 从children中提取代码内容
    const codeElement = (children as any)?.props?.children;
    let codeText = "";

    // 递归提取代码内容
    const extractText = (element: any): string => {
      if (typeof element === "string") return element;
      if (Array.isArray(element)) return element.map(extractText).join("");
      if (element?.props?.children) return extractText(element.props.children);
      if (element?.props?.["data-line"]) return element.props["data-line"];
      return "";
    };

    // 尝试从code元素中获取原始文本
    if (codeElement?.props?.children?.props?.["data-line"]) {
      codeText = codeElement.props.children.props["data-line"];
    } else {
      codeText = extractText(codeElement);
    }

    const handleCopy = async () => {
      if (codeText) {
        await navigator.clipboard.writeText(codeText);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      }
    };

    return (
      <div className="relative my-6 group">
        <pre
          className={`overflow-hidden rounded-lg bg-gray-800/95 dark:bg-gray-900/95 backdrop-blur-sm transition-all duration-300 ease-in-out ${
            isCollapsed ? "max-h-16" : "max-h-[1000vh]"
          }`}
          {...props}
        >
          <div
            className={`p-4 transition-all duration-300 ease-in-out origin-top ${
              isCollapsed
                ? "opacity-0 transform -translate-y-6 scale-y-0"
                : "opacity-100 transform translate-y-0 scale-y-100"
            }`}
          >
            {children}
          </div>
        </pre>
        <div className="absolute top-3 right-3 flex gap-2">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-lg bg-gray-700/50 hover:bg-gray-700/70 text-gray-300 hover:text-white transition-all duration-200 opacity-0 group-hover:opacity-100 backdrop-blur-sm"
            title={isCollapsed ? "展开代码" : "折叠代码"}
          >
            <svg
              className={`w-5 h-5 transform transition-transform duration-200 ${
                isCollapsed ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isCollapsed ? "M19 9l-7 7-7-7" : "M19 15l-7-7-7 7"}
              />
            </svg>
          </button>
          <button
            onClick={handleCopy}
            className="p-2 rounded-lg bg-gray-700/50 hover:bg-gray-700/70 text-gray-300 hover:text-white transition-all duration-200 opacity-0 group-hover:opacity-100 backdrop-blur-sm overflow-hidden"
            title={isCopied ? "已复制" : "复制代码"}
          >
            <div className="relative">
              <ClipboardIcon
                className={`w-5 h-5 transition-all duration-300 ${
                  isCopied ? "scale-0 rotate-12" : "scale-100"
                }`}
              />
              <CheckIcon
                className={`w-5 h-5 text-green-500 absolute top-0 left-0 transition-all duration-300 ${
                  isCopied ? "scale-100 rotate-0" : "scale-0 -rotate-12"
                }`}
              />
            </div>
          </button>
        </div>
      </div>
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
