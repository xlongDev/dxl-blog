"use client";

import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

interface CodeBlockProps {
  children: string;
  language: string;
  filename?: string;
}

export default function CodeBlock({
  children,
  language,
  filename,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group my-6">
      {filename && (
        <div className="absolute top-0 left-0 right-0 px-4 py-2 bg-gray-800 text-gray-400 text-sm rounded-t-lg">
          {filename}
        </div>
      )}
      <button
        onClick={handleCopy}
        className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded bg-gray-700 hover:bg-gray-600"
      >
        {copied ? (
          <svg
            className="h-5 w-5 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        ) : (
          <svg
            className="h-5 w-5 text-gray-400 hover:text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
            />
          </svg>
        )}
      </button>
      <SyntaxHighlighter
        language={language}
        style={oneDark}
        customStyle={{
          margin: 0,
          borderRadius: filename ? "0 0 0.5rem 0.5rem" : "0.5rem",
          padding: "1rem",
          fontSize: "0.875rem",
          lineHeight: "1.5",
        }}
        showLineNumbers
        lineNumberStyle={{
          minWidth: "2.25em",
          paddingRight: "1em",
          color: "#666",
        }}
      >
        {children}
      </SyntaxHighlighter>
    </div>
  );
}