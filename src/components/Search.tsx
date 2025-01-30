"use client";

import { useState, useEffect, useCallback } from "react";
import { Post } from "contentlayer/generated";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { debounce } from "lodash-es";
import { useRouter } from "next/navigation";

interface SearchProps {
  posts: Post[];
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function Search({ posts, isOpen, setIsOpen }: SearchProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Post[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const router = useRouter();

  // 防抖搜索函数，避免频繁触发搜索
  const debouncedSearch = useCallback(
    debounce((searchQuery: string) => {
      if (!searchQuery) {
        setResults([]);
        return;
      }

      const searchResults = posts.filter((post) => {
        const searchContent = `${post.title} ${post.description} ${
          post.tags?.join(" ") || ""
        }`.toLowerCase();
        return searchContent.includes(searchQuery.toLowerCase());
      });

      setResults(searchResults);
    }, 100), // 搜索延迟时间为100ms
    [posts]
  );

  // 监听键盘事件，支持快捷键打开/关闭搜索框
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen(!isOpen);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, setIsOpen]);

  // 当查询变化时触发搜索
  useEffect(() => {
    debouncedSearch(query);
    setSelectedIndex(-1); // 重置选中索引
  }, [query, debouncedSearch]);

  // 处理键盘导航（上下键选择，回车键跳转）
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex((prev) =>
            prev < results.length - 1 ? prev + 1 : prev
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
          break;
        case "Enter":
          if (selectedIndex >= 0 && results[selectedIndex]) {
            router.push(`/blog/${results[selectedIndex]._raw.flattenedPath}`);
            setIsOpen(false);
          }
          break;
      }
    },
    [results, selectedIndex, router, setIsOpen]
  );

  // 高亮匹配的文本
  const highlightMatch = (text: string) => {
    if (!query) return text;
    const parts = text.split(new RegExp(`(${query})`, "gi"));
    return parts.map((part, i) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <span
          key={i}
          className="bg-gradient-to-r from-orange-200/50 to-rose-200/50 dark:from-orange-900/30 dark:to-rose-900/30 rounded px-1"
        >
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-gray-500/50 dark:bg-gray-900/50 backdrop-blur-sm z-50"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setIsOpen(false);
            }
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2, delay: 0.1 }}
            className="fixed inset-x-4 top-8 max-w-2xl mx-auto"
          >
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl">
              <div className="relative">
                <input
                  type="text"
                  className="w-full px-4 py-3 text-lg bg-transparent border-b border-gray-200 dark:border-gray-700 focus:outline-none"
                  placeholder="搜索文章... (Esc 关闭, ⌘K 打开)"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  autoFocus
                />
                <button
                  className="absolute right-4 top-3 text-gray-400"
                  onClick={() => setIsOpen(false)}
                >
                  Esc
                </button>
              </div>
              {results.length > 0 && (
                <ul className="max-h-[60vh] overflow-auto p-2">
                  {results.map((post, index) => (
                    <li key={post._id}>
                      <Link
                        href={`/blog/${post._raw.flattenedPath}`}
                        className={`block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded ${
                          index === selectedIndex
                            ? "bg-gray-100 dark:bg-gray-700"
                            : ""
                        }`}
                        onClick={() => setIsOpen(false)}
                      >
                        <h3 className="font-medium">
                          {highlightMatch(post.title)}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {highlightMatch(post.description)}
                        </p>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
              {query && results.length === 0 && (
                <p className="p-4 text-center text-gray-500">未找到相关文章</p>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
