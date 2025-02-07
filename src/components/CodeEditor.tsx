"use client";

import { useEffect, useRef, useState } from "react";
import type { editor } from "monaco-editor";

interface CodeEditorProps {
  code: string;
  language?: string;
  onChange?: (value: string) => void;
  height?: string;
}

export default function CodeEditor({
  code: initialCode,
  language = "javascript",
  onChange,
  height = "300px",
}: CodeEditorProps) {
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const monacoEl = useRef(null);
  const [isEditorReady, setIsEditorReady] = useState(false);

  useEffect(() => {
    if (monacoEl.current && !editorRef.current) {
      let isMounted = true;

      const initializeEditor = async () => {
        // 确保只在客户端加载 Monaco Editor
        if (typeof window === "undefined") return;

        const monaco = await import("monaco-editor/esm/vs/editor/editor.api");

        // 确保在生产环境中正确加载Web Worker
        if (typeof window !== "undefined") {
          const workerPath = "/_next/static";
          window.MonacoEnvironment = {
            getWorker: function (workerId, label) {
              const getWorkerModule = (moduleUrl: string): Worker => {
                return new Worker(new URL(moduleUrl, window.location.origin));
              };

              if (label === "json") {
                return getWorkerModule(`${workerPath}/json.worker.js`);
              }
              if (label === "css" || label === "scss" || label === "less") {
                return getWorkerModule(`${workerPath}/css.worker.js`);
              }
              if (
                label === "html" ||
                label === "handlebars" ||
                label === "razor"
              ) {
                return getWorkerModule(`${workerPath}/html.worker.js`);
              }
              if (label === "typescript" || label === "javascript") {
                return getWorkerModule(`${workerPath}/ts.worker.js`);
              }
              return getWorkerModule(`${workerPath}/editor.worker.js`);
            },
          };
        }

        // 并行加载语言支持
        const languageLoaders = {
          javascript: () =>
            import(
              "monaco-editor/esm/vs/basic-languages/javascript/javascript.contribution"
            ),
          python: () =>
            import(
              "monaco-editor/esm/vs/basic-languages/python/python.contribution"
            ),
        };

        if (language in languageLoaders) {
          await languageLoaders[language as keyof typeof languageLoaders]();
        }

        if (!isMounted) return;

        // 定义编辑器主题
        monaco.editor.defineTheme("custom-dark", {
          base: "vs-dark",
          inherit: true,
          rules: [
            { token: "comment", foreground: "6A9955", fontStyle: "italic" },
            { token: "keyword", foreground: "569CD6", fontStyle: "bold" },
            { token: "string", foreground: "CE9178" },
            { token: "number", foreground: "B5CEA8" },
            { token: "regexp", foreground: "D16969" },
            { token: "type", foreground: "4EC9B0", fontStyle: "bold" },
            { token: "class", foreground: "4EC9B0", fontStyle: "bold" },
            { token: "function", foreground: "DCDCAA" },
            { token: "variable", foreground: "9CDCFE" },
            { token: "operator", foreground: "D4D4D4" },
            { token: "parameter", foreground: "9CDCFE" },
            { token: "property", foreground: "9CDCFE" },
            { token: "interface", foreground: "4EC9B0", fontStyle: "bold" },
            { token: "namespace", foreground: "4EC9B0" },
            { token: "enum", foreground: "4EC9B0", fontStyle: "bold" },
            { token: "typeParameter", foreground: "4EC9B0" },
            { token: "decorator", foreground: "DCDCAA" },
          ],
          colors: {
            "editor.foreground": "#D4D4D4",
            "editor.background": "#1E1E1E",
            "editor.selectionBackground": "#264F78",
            "editor.lineHighlightBackground": "#2F3337",
            "editorCursor.foreground": "#AEAFAD",
            "editorWhitespace.foreground": "#404040",
          },
        });

        editorRef.current = monaco.editor.create(monacoEl.current!, {
          value: initialCode,
          language,
          theme: "custom-dark",
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          fontSize: 14,
          automaticLayout: true,
          tabSize: 2,
          wordWrap: "on",
          lineNumbers: "on",
          folding: true,
          lineDecorationsWidth: 0,
          lineNumbersMinChars: 3,
          renderLineHighlight: "all",
          suggestOnTriggerCharacters: true,
          formatOnPaste: true,
          formatOnType: true,
          autoClosingBrackets: "always",
          autoClosingQuotes: "always",
          autoIndent: "full",
          cursorBlinking: "smooth",
          cursorSmoothCaretAnimation: "on",
        });

        editorRef.current.onDidChangeModelContent(() => {
          onChange?.(editorRef.current?.getValue() || "");
        });

        setIsEditorReady(true);
      };

      initializeEditor().catch(console.error);

      return () => {
        isMounted = false;
        editorRef.current?.dispose();
      };
    }
  }, [initialCode, language, onChange]);

  return (
    <div
      ref={monacoEl}
      style={{ height }}
      className="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700"
    >
      {!isEditorReady && (
        <div className="flex items-center justify-center h-full bg-gray-100 dark:bg-gray-800">
          <div className="text-gray-500 dark:text-gray-400">
            加载编辑器中...
          </div>
        </div>
      )}
    </div>
  );
}
