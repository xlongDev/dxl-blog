"use client";

import React, { useState, useEffect, ReactNode, Suspense } from "react";
import type { MDXComponents as MDXComponentsType } from "mdx/types";
import {
  CheckIcon,
  ClipboardIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";
import dynamic from "next/dynamic";
import { useThemeUtils } from "@/hooks/useThemeUtils";

// 动态导入CodeEditor组件
const CodeEditor = dynamic(() => import("./CodeEditor"), {
  loading: () => (
    <div className="animate-pulse bg-gray-700/50 rounded-lg min-h-[120px] w-full flex items-center justify-center">
      <span className="text-gray-400">加载编辑器中...</span>
    </div>
  ),
  ssr: false, // 禁用服务端渲染
});

// 辅助函数：分离emoji和文本
const splitEmojiAndText = (children: ReactNode): [ReactNode[], ReactNode[]] => {
  const emojis: ReactNode[] = [];
  const texts: ReactNode[] = [];

  React.Children.forEach(children, (child) => {
    if (typeof child === "string") {
      // 使用正则表达式匹配emoji
      const parts = child.split(
        /([\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]|[\u{1F100}-\u{1F1FF}]|[\u{1F200}-\u{1F2FF}]|[\u{1F600}-\u{1F64F}]|[\u{1F680}-\u{1F6FF}]|[\u{1F900}-\u{1F9FF}]|[\u{1FA70}-\u{1FAFF}])/u
      );
      parts.forEach((part, index) => {
        if (
          part.match(
            /([\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]|[\u{1F100}-\u{1F1FF}]|[\u{1F200}-\u{1F2FF}]|[\u{1F600}-\u{1F64F}]|[\u{1F680}-\u{1F6FF}]|[\u{1F900}-\u{1F9FF}]|[\u{1FA70}-\u{1FAFF}])/u
          )
        ) {
          emojis.push(part);
        } else if (part.trim()) {
          texts.push(part);
        }
      });
    } else {
      texts.push(child);
    }
  });

  return [emojis, texts];
};

// 创建标题组件的高阶组件
const createHeadingComponent = (
  tag: "h1" | "h2" | "h3" | "h4" | "h5" | "h6",
  baseStyle: string,
  getGradientClass: (getThemeValue: any) => string
) => {
  return ({ children, ...props }: any) => {
    const { getThemeValue } = useThemeUtils();
    const gradientClass = getGradientClass(getThemeValue);
    const Component = tag;

    // 处理子元素，将文本和emoji分开处理
    const [emojis, texts] = splitEmojiAndText(children);

    return (
      <Component
        className={`${baseStyle} flex flex-wrap items-center gap-1`}
        {...props}
      >
        {/* 先渲染文本，整体应用渐变效果 */}
        {texts.length > 0 && (
          <span
            className={`bg-gradient-to-r ${gradientClass} bg-clip-text text-transparent break-words`}
          >
            {texts}
          </span>
        )}
        {/* 后渲染emoji */}
        {emojis.map((emoji, index) => (
          <span key={`emoji-${index}`} className="text-current">
            {emoji}
          </span>
        ))}
      </Component>
    );
  };
};

// 提取代码块组件
const CodeBlock = ({
  children,
  className,
}: {
  children: any;
  className?: string;
}) => {
  const [isCopied, setIsCopied] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [codeText, setCodeText] = useState("");
  const { getThemeColor } = useThemeUtils();

  useEffect(() => {
    const text = extractText(children);
    setCodeText(text);
  }, [children]);

  const handleCopy = async () => {
    if (codeText) {
      await navigator.clipboard.writeText(codeText);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  return (
    <div className="relative my-4 group">
      {isEditing ? (
        <div className="transition-opacity duration-300">
          <CodeEditor
            code={codeText}
            language={className?.replace(/language-/, "") || "javascript"}
            onChange={setCodeText}
          />
        </div>
      ) : (
        <div className="transition-opacity duration-300">
          <pre
            className={`overflow-x-auto rounded-lg ${getThemeColor(
              "bg-gray-900/95",
              "bg-gray-800/95",
              {
                green: "bg-emerald-950/95",
                purple: "bg-purple-950/95",
                orange: "bg-orange-950/95",
                blue: "bg-blue-950/95",
                pink: "bg-pink-950/95",
                brown: "bg-amber-950/95",
              }
            )} backdrop-blur-sm transition-all duration-300 ease-in-out ${
              isCollapsed ? "max-h-16" : "max-h-[1000vh]"
            }`}
          >
            <div
              className={`px-4 py-2 transition-all duration-300 ease-in-out origin-top ${
                isCollapsed
                  ? "opacity-0 -translate-y-6 scale-y-0"
                  : "opacity-100 translate-y-0 scale-y-100"
              }`}
            >
              {children}
            </div>
          </pre>
        </div>
      )}
      <CodeBlockActions
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        isCopied={isCopied}
        onCopy={handleCopy}
      />
    </div>
  );
};

// 提取代码块操作按钮组件
const CodeBlockActions = ({
  isEditing,
  setIsEditing,
  isCollapsed,
  setIsCollapsed,
  isCopied,
  onCopy,
}: {
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
  isCopied: boolean;
  onCopy: () => void;
}) => {
  const { getThemeColor } = useThemeUtils();
  const buttonBaseClass = `p-1.5 rounded-md ${getThemeColor(
    "bg-gray-700/50 hover:bg-gray-700/70",
    "bg-gray-600/50 hover:bg-gray-600/70",
    {
      green: "bg-emerald-800/50 hover:bg-emerald-800/70",
      purple: "bg-purple-800/50 hover:bg-purple-800/70",
      orange: "bg-orange-800/50 hover:bg-orange-800/70",
      blue: "bg-blue-800/50 hover:bg-blue-800/70",
      pink: "bg-pink-800/50 hover:bg-pink-800/70",
      brown: "bg-amber-800/50 hover:bg-amber-800/70",
    }
  )} text-gray-300 hover:text-white transition-all duration-200 opacity-0 group-hover:opacity-100 backdrop-blur-sm`;

  return (
    <div className="absolute top-2 right-2 flex gap-1">
      {!isEditing && (
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`${buttonBaseClass} transition-transform hover:scale-110 active:scale-95`}
          title={isCollapsed ? "展开代码" : "折叠代码"}
        >
          <svg
            className={`w-4 h-4 transform transition-transform duration-200 ${
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
        className={`${buttonBaseClass} transition-transform hover:scale-110 active:scale-95`}
        title={isEditing ? "预览代码" : "编辑代码"}
      >
        <PencilIcon className="w-4 h-4" />
      </button>
      {!isEditing && (
        <button
          onClick={onCopy}
          className={`${buttonBaseClass} transition-transform hover:scale-110 active:scale-95`}
          title={isCopied ? "已复制" : "复制代码"}
        >
          <div className="relative">
            <ClipboardIcon
              className={`w-4 h-4 transition-all duration-300 ${
                isCopied ? "scale-0 rotate-12" : "scale-100"
              }`}
            />
            <CheckIcon
              className={`w-4 h-4 text-green-500 absolute top-0 left-0 transition-all duration-300 ${
                isCopied ? "scale-100 rotate-0" : "scale-0 -rotate-12"
              }`}
            />
          </div>
        </button>
      )}
    </div>
  );
};

// 行内代码高亮组件
const InlineCode = ({ children }: { children: React.ReactNode }) => {
  const { getThemeColor } = useThemeUtils();

  return (
    <code
      className={`font-mono text-sm px-1.5 py-0.5 rounded ${getThemeColor(
        "bg-slate-800/60 text-indigo-200",
        "bg-indigo-50/60 text-indigo-900",
        {
          green:
            "bg-emerald-100/60 text-emerald-900 dark:bg-emerald-950/60 dark:text-emerald-100",
          purple:
            "bg-purple-100/60 text-purple-900 dark:bg-purple-950/60 dark:text-purple-100",
          orange:
            "bg-orange-100/60 text-orange-900 dark:bg-orange-950/60 dark:text-orange-100",
          blue: "bg-blue-100/60 text-blue-900 dark:bg-blue-950/60 dark:text-blue-100",
          pink: "bg-pink-100/60 text-pink-900 dark:bg-pink-950/60 dark:text-pink-100",
          brown:
            "bg-amber-100/60 text-amber-900 dark:bg-amber-950/60 dark:text-amber-100",
        }
      )} whitespace-pre-wrap break-words backdrop-blur-sm border border-indigo-200/10`}
    >
      {children}
    </code>
  );
};

// 辅助函数
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

// MDX组件映射
const MDXComponents: MDXComponentsType = {
  h1: createHeadingComponent("h1", "text-3xl font-bold my-4", (getThemeValue) =>
    getThemeValue(
      {
        light: "from-indigo-700 via-purple-600 to-pink-600",
        dark: "from-indigo-400 via-purple-400 to-pink-400",
        green: "from-emerald-600 via-teal-500 to-cyan-500",
        purple: "from-purple-600 via-indigo-500 to-violet-500",
        orange: "from-orange-600 via-amber-500 to-yellow-500",
        blue: "from-blue-600 via-sky-500 to-cyan-500",
        pink: "from-pink-600 via-rose-500 to-red-500",
        brown: "from-amber-800 via-yellow-600 to-orange-500",
      },
      "from-indigo-700 via-purple-600 to-pink-600"
    )
  ),

  h2: createHeadingComponent("h2", "text-2xl font-bold my-3", (getThemeValue) =>
    getThemeValue(
      {
        light: "from-indigo-600 via-purple-500 to-pink-500",
        dark: "from-indigo-300 via-purple-300 to-pink-300",
        green: "from-emerald-500 via-teal-400 to-cyan-400",
        purple: "from-purple-500 via-indigo-400 to-violet-400",
        orange: "from-orange-500 via-amber-400 to-yellow-400",
        blue: "from-blue-500 via-sky-400 to-cyan-400",
        pink: "from-pink-500 via-rose-400 to-red-400",
        brown: "from-amber-700 via-yellow-500 to-orange-400",
      },
      "from-indigo-600 via-purple-500 to-pink-500"
    )
  ),

  h3: createHeadingComponent("h3", "text-xl font-bold my-2", (getThemeValue) =>
    getThemeValue(
      {
        light: "from-indigo-500 via-purple-500 to-pink-500",
        dark: "from-indigo-200 via-purple-200 to-pink-200",
        green: "from-emerald-500 via-teal-400 to-cyan-400",
        purple: "from-purple-500 via-indigo-400 to-violet-400",
        orange: "from-orange-500 via-amber-400 to-yellow-400",
        blue: "from-blue-500 via-sky-400 to-cyan-400",
        pink: "from-pink-500 via-rose-400 to-red-400",
        brown: "from-amber-600 via-yellow-500 to-orange-400",
      },
      "from-indigo-500 via-purple-500 to-pink-500"
    )
  ),

  h4: createHeadingComponent("h4", "text-lg font-bold my-2", (getThemeValue) =>
    getThemeValue(
      {
        light: "from-indigo-500 via-purple-400 to-pink-400",
        dark: "from-indigo-200 via-purple-200 to-pink-200",
        green: "from-emerald-400 via-teal-300 to-cyan-300",
        purple: "from-purple-400 via-indigo-300 to-violet-300",
        orange: "from-orange-400 via-amber-300 to-yellow-300",
        blue: "from-blue-400 via-sky-300 to-cyan-300",
        pink: "from-pink-400 via-rose-300 to-red-300",
        brown: "from-amber-500 via-yellow-400 to-orange-300",
      },
      "from-indigo-500 via-purple-400 to-pink-400"
    )
  ),

  h5: createHeadingComponent(
    "h5",
    "text-base font-bold my-1",
    (getThemeValue) =>
      getThemeValue(
        {
          light: "from-indigo-400 via-purple-400 to-pink-400",
          dark: "from-indigo-200 via-purple-200 to-pink-200",
          green: "from-emerald-400 via-teal-300 to-cyan-300",
          purple: "from-purple-400 via-indigo-300 to-violet-300",
          orange: "from-orange-400 via-amber-300 to-yellow-300",
          blue: "from-blue-400 via-sky-300 to-cyan-300",
          pink: "from-pink-400 via-rose-300 to-red-300",
          brown: "from-amber-500 via-yellow-400 to-orange-300",
        },
        "from-indigo-400 via-purple-400 to-pink-400"
      )
  ),

  h6: createHeadingComponent("h6", "text-sm font-bold my-1", (getThemeValue) =>
    getThemeValue(
      {
        light: "from-indigo-400 via-purple-300 to-pink-300",
        dark: "from-indigo-200 via-purple-200 to-pink-200",
        green: "from-emerald-300 via-teal-200 to-cyan-200",
        purple: "from-purple-300 via-indigo-200 to-violet-200",
        orange: "from-orange-300 via-amber-200 to-yellow-200",
        blue: "from-blue-300 via-sky-200 to-cyan-200",
        pink: "from-pink-300 via-rose-200 to-red-200",
        brown: "from-amber-400 via-yellow-300 to-orange-200",
      },
      "from-indigo-400 via-purple-300 to-pink-300"
    )
  ),
  p: (props) => (
    <p
      className="my-3 leading-relaxed text-slate-700 dark:text-slate-300"
      {...props}
    />
  ),
  table: (props) => {
    const { getThemeValue } = useThemeUtils();
    const tableClass = getThemeValue(
      {
        light:
          "border-indigo-200 bg-indigo-50/50 dark:border-indigo-800 dark:bg-slate-900/80",
        dark: "border-slate-700 bg-slate-900/80",
        green:
          "border-emerald-200 bg-emerald-50/50 dark:border-emerald-800 dark:bg-emerald-900/80",
        purple:
          "border-purple-200 bg-purple-50/50 dark:border-purple-800 dark:bg-purple-900/80",
        orange:
          "border-orange-200 bg-orange-50/50 dark:border-orange-800 dark:bg-orange-900/80",
        blue: "border-blue-200 bg-blue-50/50 dark:border-blue-800 dark:bg-blue-900/80",
        pink: "border-pink-200 bg-pink-50/50 dark:border-pink-800 dark:bg-pink-900/80",
        brown:
          "border-amber-200 bg-amber-50/50 dark:border-amber-800 dark:bg-amber-900/80",
      },
      "border-indigo-200 bg-indigo-50/50 dark:border-indigo-800 dark:bg-slate-900/80"
    );

    return (
      <div className="relative w-full my-4 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700 scrollbar-track-transparent">
        <div
          className={`inline-block min-w-full rounded-lg border backdrop-blur-sm shadow-lg ${tableClass}`}
        >
          <table
            className="min-w-full divide-y divide-gray-200 dark:divide-gray-700"
            {...props}
          />
        </div>
      </div>
    );
  },
  thead: (props) => {
    const { getThemeValue } = useThemeUtils();
    const theadClass = getThemeValue(
      {
        light:
          "!bg-indigo-100/90 !text-indigo-900 dark:!bg-indigo-900/90 dark:!text-indigo-100",
        dark: "!bg-slate-800/90 !text-slate-100",
        green:
          "!bg-emerald-100/90 !text-emerald-900 dark:!bg-emerald-900/90 dark:!text-emerald-100",
        purple:
          "!bg-purple-100/90 !text-purple-900 dark:!bg-purple-900/90 dark:!text-purple-100",
        orange:
          "!bg-orange-100/90 !text-orange-900 dark:!bg-orange-900/90 dark:!text-orange-100",
        blue: "!bg-blue-100/90 !text-blue-900 dark:!bg-blue-900/90 dark:!text-blue-100",
        pink: "!bg-pink-100/90 !text-pink-900 dark:!bg-pink-900/90 dark:!text-pink-100",
        brown:
          "!bg-amber-100/90 !text-amber-900 dark:!bg-amber-900/90 dark:!text-amber-100",
      },
      "!bg-indigo-100/90 !text-indigo-900 dark:!bg-indigo-900/90 dark:!text-indigo-100"
    );

    return (
      <thead
        className={`${theadClass} backdrop-blur-sm sticky top-0 z-10`}
        {...props}
      />
    );
  },
  tbody: (props) => <tbody {...props} />,
  tr: (props) => {
    const { getThemeValue } = useThemeUtils();
    const trClass = getThemeValue(
      {
        light:
          "border-b border-indigo-200/50 hover:bg-indigo-50/50 dark:border-indigo-800/50 dark:hover:bg-indigo-900/30",
        dark: "border-b border-slate-700/50 hover:bg-slate-800/30",
        green:
          "border-b border-emerald-200/50 hover:bg-emerald-50/50 dark:border-emerald-800/50 dark:hover:bg-emerald-900/30",
        purple:
          "border-b border-purple-200/50 hover:bg-purple-50/50 dark:border-purple-800/50 dark:hover:bg-purple-900/30",
        orange:
          "border-b border-orange-200/50 hover:bg-orange-50/50 dark:border-orange-800/50 dark:hover:bg-orange-900/30",
        blue: "border-b border-blue-200/50 hover:bg-blue-50/50 dark:border-blue-800/50 dark:hover:bg-blue-900/30",
        pink: "border-b border-pink-200/50 hover:bg-pink-50/50 dark:border-pink-800/50 dark:hover:bg-pink-900/30",
        brown:
          "border-b border-amber-200/50 hover:bg-amber-50/50 dark:border-amber-800/50 dark:hover:bg-amber-900/30",
      },
      "border-b border-indigo-200/50 hover:bg-indigo-50/50 dark:border-indigo-800/50 dark:hover:bg-indigo-900/30"
    );

    return (
      <tr
        className={`transition-colors backdrop-blur-sm ${trClass}`}
        {...props}
      />
    );
  },
  th: (props) => {
    const { getThemeValue } = useThemeUtils();
    const thClass = getThemeValue(
      {
        light:
          "!bg-indigo-100/90 !text-indigo-900 dark:!bg-indigo-900/90 dark:!text-indigo-100 border-b-2 border-indigo-200 dark:border-indigo-700",
        dark: "!bg-slate-800/90 !text-slate-100 border-b-2 border-slate-600",
        green:
          "!bg-emerald-100/90 !text-emerald-900 dark:!bg-emerald-900/90 dark:!text-emerald-100 border-b-2 border-emerald-200 dark:border-emerald-700",
        purple:
          "!bg-purple-100/90 !text-purple-900 dark:!bg-purple-900/90 dark:!text-purple-100 border-b-2 border-purple-200 dark:border-purple-700",
        orange:
          "!bg-orange-100/90 !text-orange-900 dark:!bg-orange-900/90 dark:!text-orange-100 border-b-2 border-orange-200 dark:border-orange-700",
        blue: "!bg-blue-100/90 !text-blue-900 dark:!bg-blue-900/90 dark:!text-blue-100 border-b-2 border-blue-200 dark:border-blue-700",
        pink: "!bg-pink-100/90 !text-pink-900 dark:!bg-pink-900/90 dark:!text-pink-100 border-b-2 border-pink-200 dark:border-pink-700",
        brown:
          "!bg-amber-100/90 !text-amber-900 dark:!bg-amber-900/90 dark:!text-amber-100 border-b-2 border-amber-200 dark:border-amber-700",
      },
      "!bg-indigo-100/90 !text-indigo-900 dark:!bg-indigo-900/90 dark:!text-indigo-100 border-b-2 border-indigo-200 dark:border-indigo-700"
    );

    return (
      <th
        className={`p-3 text-sm font-bold tracking-wider whitespace-nowrap text-left align-middle ${thClass}`}
        {...props}
      />
    );
  },
  td: (props) => {
    const { getThemeValue } = useThemeUtils();
    const tdClass = getThemeValue(
      {
        light: "text-slate-700 dark:text-slate-300",
        dark: "text-slate-300",
        green: "text-emerald-700 dark:text-emerald-200",
        purple: "text-purple-700 dark:text-purple-200",
        orange: "text-orange-700 dark:text-orange-200",
        blue: "text-blue-700 dark:text-blue-200",
        pink: "text-pink-700 dark:text-pink-200",
        brown: "text-amber-700 dark:text-amber-200",
      },
      "text-slate-700 dark:text-slate-300"
    );

    return (
      <td
        className={`p-3 text-sm align-middle break-words ${tdClass}`}
        {...props}
      />
    );
  },
  pre: ({ children, ...props }) => {
    const childProps = (children as any)?.props;
    return (
      <div className="rounded-lg shadow-lg shadow-indigo-500/5">
        <CodeBlock {...childProps} />
      </div>
    );
  },
  code: ({ children }) => {
    const { getThemeValue } = useThemeUtils();
    const codeClass = getThemeValue(
      {
        light:
          "bg-indigo-50/80 text-indigo-900 dark:bg-indigo-950/80 dark:text-indigo-100",
        dark: "bg-slate-800/80 text-slate-100",
        green:
          "bg-emerald-50/80 text-emerald-900 dark:bg-emerald-950/80 dark:text-emerald-100",
        purple:
          "bg-purple-50/80 text-purple-900 dark:bg-purple-950/80 dark:text-purple-100",
        orange:
          "bg-orange-50/80 text-orange-900 dark:bg-orange-950/80 dark:text-orange-100",
        blue: "bg-blue-50/80 text-blue-900 dark:bg-blue-950/80 dark:text-blue-100",
        pink: "bg-pink-50/80 text-pink-900 dark:bg-pink-950/80 dark:text-pink-100",
        brown:
          "bg-amber-50/80 text-amber-900 dark:bg-amber-950/80 dark:text-amber-100",
      },
      "bg-indigo-50/80 text-indigo-900 dark:bg-indigo-950/80 dark:text-indigo-100"
    );

    return (
      <code
        className={`font-mono text-sm px-1.5 py-0.5 rounded-md ${codeClass} whitespace-pre-wrap break-words backdrop-blur-sm transition-colors duration-200`}
      >
        {children}
      </code>
    );
  },
  // 添加链接样式
  a: (props) => {
    const { getThemeValue } = useThemeUtils();
    const linkClass = getThemeValue(
      {
        light:
          "text-indigo-600 hover:text-purple-600 decoration-indigo-200/30 hover:decoration-purple-400/50",
        dark: "text-indigo-400 hover:text-purple-400 decoration-indigo-700/30 hover:decoration-purple-500/50",
        green:
          "text-emerald-600 hover:text-teal-600 decoration-emerald-200/30 hover:decoration-teal-400/50",
        purple:
          "text-purple-600 hover:text-indigo-600 decoration-purple-200/30 hover:decoration-indigo-400/50",
        orange:
          "text-orange-600 hover:text-yellow-600 decoration-orange-200/30 hover:decoration-yellow-400/50",
        blue: "text-blue-600 hover:text-cyan-600 decoration-blue-200/30 hover:decoration-cyan-400/50",
        pink: "text-pink-600 hover:text-rose-600 decoration-pink-200/30 hover:decoration-rose-400/50",
        brown:
          "text-amber-700 hover:text-yellow-600 decoration-amber-200/30 hover:decoration-yellow-400/50",
      },
      "text-indigo-600 hover:text-purple-600 decoration-indigo-200/30 hover:decoration-purple-400/50"
    );

    return (
      <a className={`${linkClass} transition-colors underline`} {...props} />
    );
  },
  // 添加列表样式
  ul: (props) => (
    <ul
      className="list-disc list-inside my-4 space-y-2 text-slate-700 dark:text-slate-300"
      {...props}
    />
  ),
  ol: (props) => (
    <ol
      className="list-decimal list-inside my-4 space-y-2 text-slate-700 dark:text-slate-300"
      {...props}
    />
  ),
  li: (props) => <li className="leading-relaxed" {...props} />,
  // 添加引用样式
  blockquote: (props) => {
    const { getThemeValue } = useThemeUtils();
    const quoteClass = getThemeValue(
      {
        light: "border-indigo-400 bg-indigo-50/50",
        dark: "border-indigo-600 bg-indigo-900/20",
        green:
          "border-emerald-400 bg-emerald-50/50 dark:border-emerald-600 dark:bg-emerald-900/20",
        purple:
          "border-purple-400 bg-purple-50/50 dark:border-purple-600 dark:bg-purple-900/20",
        orange:
          "border-orange-400 bg-orange-50/50 dark:border-orange-600 dark:bg-orange-900/20",
        blue: "border-blue-400 bg-blue-50/50 dark:border-blue-600 dark:bg-blue-900/20",
        pink: "border-pink-400 bg-pink-50/50 dark:border-pink-600 dark:bg-pink-900/20",
        brown:
          "border-amber-400 bg-amber-50/50 dark:border-amber-600 dark:bg-amber-900/20",
      },
      "border-indigo-400 bg-indigo-50/50 dark:border-indigo-600 dark:bg-indigo-900/20"
    );

    return (
      <blockquote
        className={`border-l-4 pl-4 my-4 italic text-slate-600 dark:text-slate-400 py-2 rounded-r-lg ${quoteClass}`}
        {...props}
      />
    );
  },
  // 添加水平线样式
  hr: (props) => (
    <hr
      className="my-8 border-t-2 border-indigo-100 dark:border-indigo-900"
      {...props}
    />
  ),
};

export default MDXComponents;