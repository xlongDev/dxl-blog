"use client";

import { useState, useEffect } from "react";
import { Post } from "contentlayer/generated";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface SearchProps {
  posts: Post[];
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function Search({ posts, isOpen, setIsOpen }: SearchProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Post[]>([]);

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

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    const searchResults = posts.filter((post) => {
      const searchContent = `${post.title} ${post.description} ${
        post.tags?.join(" ") || ""
      }`.toLowerCase();
      return searchContent.includes(query.toLowerCase());
    });

    setResults(searchResults);
  }, [query, posts]);

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
                  {results.map((post) => {
                    const titleHighlight = post.title.replace(
                      new RegExp(query, "gi"),
                      (match) =>
                        `<mark class="bg-yellow-200 dark:bg-yellow-800">${match}</mark>`
                    );
                    const descriptionHighlight = post.description.replace(
                      new RegExp(query, "gi"),
                      (match) =>
                        `<mark class="bg-yellow-200 dark:bg-yellow-800">${match}</mark>`
                    );
                    return (
                      <li key={post._id}>
                        <Link
                          href={post.url}
                          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                          onClick={() => setIsOpen(false)}
                        >
                          <h3
                            className="font-medium"
                            dangerouslySetInnerHTML={{ __html: titleHighlight }}
                          />
                          <p
                            className="text-sm text-gray-500 dark:text-gray-400"
                            dangerouslySetInnerHTML={{
                              __html: descriptionHighlight,
                            }}
                          />
                        </Link>
                      </li>
                    );
                  })}
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
