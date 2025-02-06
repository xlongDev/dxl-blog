"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { MDXComponents as MDXComponentsType } from "mdx/types";
import {
  CheckIcon,
  ClipboardIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";
import CodeEditor from "./CodeEditor";

const extractText = (element: any): string => {
  if (!element) return "";
  if (typeof element === "string") return element;
  if (Array.isArray(element)) return element.map(extractText).join("");
  if (element.props) {
    if (element.props.children) return extractText(element.props.children);
    if (element.props["data-line"]) return element.props["data-line"];
  }
  return "";
};

const MDXComponents: MDXComponentsType = {
  h1: (props) => <h1 {...props} />,
  h2: (props) => {
    return <h2 {...props} />;
  },
  h3: (props) => <h3 {...props} />,
  h4: (props) => <h4 {...props} />,
  h5: (props) => <h5 {...props} />,
  h6: (props) => <h6 {...props} />,
  p: (props) => <p {...props} />,
  pre: function Pre(
    props: React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLPreElement>,
      HTMLPreElement
    >
  ) {
    const { children, ...rest } = props;
    const [isCopied, setIsCopied] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const codeElement = (children as any)?.props?.children;
    const [codeText, setCodeText] = useState("");

    useEffect(() => {
      const text = extractText(codeElement);
      setCodeText(text);
    }, [codeElement]);

    const handleCopy = async () => {
      if (codeText) {
        await navigator.clipboard.writeText(codeText);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      }
    };

    return (
      <div className="relative my-6 group">
        <AnimatePresence>
          {isEditing ? (
            <motion.div
              key="editor"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            >
              <CodeEditor
                code={codeText}
                language={
                  codeElement?.props?.className?.replace(/language-/, "") ||
                  "javascript"
                }
                onChange={(value) => {
                  setCodeText(value);
                }}
              />
            </motion.div>
          ) : (
            <motion.div
              key="preview"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            >
              <pre
                className={`overflow-hidden rounded-lg bg-gray-800/95 dark:bg-gray-900/95 backdrop-blur-sm transition-all duration-300 ease-in-out ${
                  isCollapsed ? "max-h-16" : "max-h-[1000vh]"
                }`}
                {...rest}
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
            </motion.div>
          )}
        </AnimatePresence>
        <div className="absolute top-3 right-3 flex gap-2">
          {!isEditing && (
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
          )}
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="p-2 rounded-lg bg-gray-700/50 hover:bg-gray-700/70 text-gray-300 hover:text-white transition-all duration-200 opacity-0 group-hover:opacity-100 backdrop-blur-sm"
            title={isEditing ? "预览代码" : "编辑代码"}
          >
            <PencilIcon className="w-5 h-5" />
          </button>
          {!isEditing && (
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
          )}
        </div>
      </div>
    );
  },
  code: (props) => (
    <code className="font-mono text-sm" {...props}>
      {props.children}
    </code>
  ),
};

export default MDXComponents;
