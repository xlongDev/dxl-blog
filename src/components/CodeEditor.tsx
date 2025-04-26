"use client";

import { useEffect, useRef, useState } from "react";
import { EditorView } from "@codemirror/view";
import { EditorState } from "@codemirror/state";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { json } from "@codemirror/lang-json";
import { oneDark } from "@codemirror/theme-one-dark";
import { keymap } from "@codemirror/view";
import { defaultKeymap } from "@codemirror/commands";
import { indentWithTab } from "@codemirror/commands";

interface CodeEditorProps {
  code: string;
  language?: string;
  onChange?: (value: string) => void;
  className?: string;
  readOnly?: boolean;
}

// 语言扩展映射表
const languageExtensions = {
  javascript: javascript(),
  typescript: javascript({ typescript: true }),
  jsx: javascript({ jsx: true }),
  tsx: javascript({ jsx: true, typescript: true }),
  python: python(),
  html: html(),
  css: css(),
  json: json(),
};

export default function CodeEditor({
  code: initialCode,
  language = "javascript",
  onChange,
  className = "",
  readOnly = false,
}: CodeEditorProps) {
  // DOM引用和编辑器实例引用
  const editorRef = useRef<HTMLDivElement>(null);
  const editorViewRef = useRef<EditorView | null>(null);
  const [isEditorReady, setIsEditorReady] = useState(false);

  useEffect(() => {
    // 如果DOM未准备好或已有实例则跳过
    if (!editorRef.current || editorViewRef.current) return;

    // 获取对应语言的扩展，默认使用javascript
    const languageExtension = 
      languageExtensions[language as keyof typeof languageExtensions] || 
      javascript();

    // 创建编辑器状态
    const state = EditorState.create({
      doc: initialCode, // 初始内容
      extensions: [
        // 键盘映射（包含默认快捷键和Tab缩进）
        keymap.of([...defaultKeymap, indentWithTab]),
        // 语言支持
        languageExtension,
        // 暗色主题
        oneDark,
        // 内容变化监听器
        EditorView.updateListener.of((update) => {
          if (update.docChanged) {
            onChange?.(update.state.doc.toString());
          }
        }),
        // 设置是否可编辑
        EditorView.editable.of(!readOnly),
        // 自定义主题样式
        EditorView.theme({
          "&": {
            borderRadius: "0.75rem",  // 增加圆角
            backgroundColor: "#1e1e1e",
            height: "auto",
            minHeight: "120px",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.2)", // 添加柔和阴影
          },
          ".cm-content": {
            padding: "1rem 1.2rem",   // 增加四周内边距
            fontFamily: 'Menlo, Monaco, "Courier New", monospace',
            fontSize: "14px",
            lineHeight: "1.6",        // 增加行高
            caretColor: "#60a5fa",     // 自定义光标颜色
          },
          ".cm-gutters": {
            backgroundColor: "#1e1e1e",
            color: "#6b7280",         // 调整行号颜色
            borderRight: "1px solid #374151",
            padding: "0 0.5rem",      // 增加行号区边距
          },
          ".cm-activeLineGutter": {
            backgroundColor: "#2a2d2e",
            color: "#e5e7eb",         // 激活行号文字颜色
            borderLeft: "2px solid #3b82f6", // 添加左侧高亮条
          },
          ".cm-activeLine": {
            backgroundColor: "#2a2d2e80", // 半透明激活行背景
          },
          ".cm-scroller": {
            overflow: "auto",
            "&::-webkit-scrollbar": { // 自定义滚动条
              width: 8,
              height: 8,
            },
            "&::-webkit-scrollbar-track": {
              background: "#1a1a1a",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "#4b5563",
              borderRadius: 4,
            },
          },
          ".cm-line": {
            padding: "2px 4px",       // 每行代码的内边距
          },
        }),
      ],
    });

    // 创建编辑器实例
    editorViewRef.current = new EditorView({
      state,
      parent: editorRef.current,
    });

    // 标记编辑器已就绪
    setIsEditorReady(true);

    // 清理函数：销毁编辑器实例
    return () => {
      editorViewRef.current?.destroy();
      editorViewRef.current = null;
      setIsEditorReady(false);
    };
  }, [language, readOnly]); // 仅在这些依赖变化时重建编辑器

  useEffect(() => {
    if (editorViewRef.current && isEditorReady) {
      const currentValue = editorViewRef.current.state.doc.toString();
      // 只有在外部的initialCode与当前内容不同时才更新
      if (currentValue !== initialCode) {
        editorViewRef.current.dispatch({
          changes: {
            from: 0,
            to: currentValue.length,
            insert: initialCode,
          },
        });
      }
    }
  }, [initialCode, isEditorReady]);

  return (
    <div className={`relative ${className}`}>
      {/* 编辑器容器 */}
      <div 
        ref={editorRef}
        className="overflow-hidden rounded-lg"
      />
      
      {/* 加载状态提示 */}
      {!isEditorReady && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-800 rounded-lg">
          <div className="text-gray-400">加载编辑器中...</div>
        </div>
      )}
    </div>
  );
}