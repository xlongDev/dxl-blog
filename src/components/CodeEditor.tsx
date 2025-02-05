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
    if (monacoEl.current) {
      // 延迟加载 Monaco Editor
      import("monaco-editor").then(async (monaco) => {
        // 根据当前编辑器语言动态加载语言支持
        if (language === "javascript") {
          await import(
            "monaco-editor/esm/vs/basic-languages/javascript/javascript.contribution"
          );
        } else if (language === "python") {
          await import(
            "monaco-editor/esm/vs/basic-languages/python/python.contribution"
          );
        }

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
      });
    }

    return () => {
      editorRef.current?.dispose();
    };
  }, [initialCode, language, onChange]);

  return (
    <div
      ref={monacoEl}
      style={{ height }}
      className="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700"
    />
  );
}
