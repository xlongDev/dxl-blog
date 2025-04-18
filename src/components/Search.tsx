"use client";

import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { Post } from "contentlayer/generated";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { debounce } from "lodash-es";
import { useRouter } from "next/navigation";
import { useThemeUtils } from "@/hooks/useThemeUtils";
import { THEME_COLORS } from "@/hooks/themeConstants";
import { useVirtualizer } from "@tanstack/react-virtual";
import {
  XMarkIcon,
  MagnifyingGlassIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from "@heroicons/react/24/outline";

// 预处理文章数据的接口
interface ProcessedPost extends Post {
  searchableText: string;
  titleLower: string;
  descriptionLower: string;
  tagsLower: string;
}

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
  const { theme } = useThemeUtils();

  // 添加refs用于DOM操作
  const resultsListRef = useRef<HTMLUListElement>(null);
  const parentRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const resultItemsRef = useRef<(HTMLElement | null)[]>([]);

  // 预处理文章数据，提高搜索效率
  const processedPosts = useMemo(() => {
    return posts.map((post) => ({
      ...post,
      titleLower: post.title.toLowerCase(),
      descriptionLower: post.description.toLowerCase(),
      tagsLower: post.tags?.join(" ").toLowerCase() || "",
      searchableText: `${post.title.toLowerCase()} ${post.description.toLowerCase()} ${
        post.tags?.join(" ").toLowerCase() || ""
      }`,
    }));
  }, [posts]);

  // 使用useMemo缓存主题相关的样式类，避免重复计算
  const themeClasses = useMemo(() => {
    return {
      backdrop:
        theme === "dark"
          ? "bg-gray-900/40"
          : theme === "green"
          ? "bg-green-900/10"
          : theme === "purple"
          ? "bg-purple-900/10"
          : theme === "orange"
          ? "bg-orange-900/10"
          : theme === "blue"
          ? "bg-blue-900/10"
          : theme === "pink"
          ? "bg-pink-900/10"
          : theme === "brown"
          ? "bg-amber-900/10"
          : "bg-gray-500/30",
      container:
        theme === "dark"
          ? "bg-gray-800 border-gray-700"
          : theme === "green"
          ? "bg-green-50 border-green-200"
          : theme === "purple"
          ? "bg-purple-50 border-purple-200"
          : theme === "orange"
          ? "bg-orange-50 border-orange-200"
          : theme === "blue"
          ? "bg-blue-50 border-blue-200"
          : theme === "pink"
          ? "bg-pink-50 border-pink-200"
          : theme === "brown"
          ? "bg-amber-50 border-amber-200"
          : "bg-white border-gray-200",
      input:
        theme === "dark"
          ? "border-gray-700 text-white placeholder-gray-400"
          : theme === "green"
          ? "border-green-300 text-green-900 placeholder-green-500/70"
          : theme === "purple"
          ? "border-purple-300 text-purple-900 placeholder-purple-500/70"
          : theme === "orange"
          ? "border-orange-300 text-orange-900 placeholder-orange-500/70"
          : theme === "blue"
          ? "border-blue-300 text-blue-900 placeholder-blue-500/70"
          : theme === "pink"
          ? "border-pink-300 text-pink-900 placeholder-pink-500/70"
          : theme === "brown"
          ? "border-amber-300 text-amber-900 placeholder-amber-500/70"
          : "border-gray-200 text-gray-900 placeholder-gray-500",
      hoverItem:
        theme === "dark"
          ? "hover:bg-gradient-to-r hover:from-blue-500/10 hover:via-purple-500/10 hover:to-pink-500/10 hover:border-blue-500/50"
          : theme === "green"
          ? "hover:bg-gradient-to-r hover:from-green-500/10 hover:via-teal-500/10 hover:to-emerald-500/10 hover:border-green-500/50"
          : theme === "purple"
          ? "hover:bg-gradient-to-r hover:from-purple-500/10 hover:via-indigo-500/10 hover:to-violet-500/10 hover:border-purple-500/50"
          : theme === "orange"
          ? "hover:bg-gradient-to-r hover:from-orange-500/10 hover:via-amber-500/10 hover:to-yellow-500/10 hover:border-orange-500/50"
          : theme === "blue"
          ? "hover:bg-gradient-to-r hover:from-blue-500/10 hover:via-sky-500/10 hover:to-cyan-500/10 hover:border-blue-500/50"
          : theme === "pink"
          ? "hover:bg-gradient-to-r hover:from-pink-500/10 hover:via-rose-500/10 hover:to-red-500/10 hover:border-pink-500/50"
          : theme === "brown"
          ? "hover:bg-gradient-to-r hover:from-amber-600/10 hover:via-amber-500/10 hover:to-yellow-600/10 hover:border-amber-600/50"
          : "hover:bg-gradient-to-r hover:from-blue-500/10 hover:via-purple-500/10 hover:to-pink-500/10 hover:border-blue-500/50",
      selectedItem:
        theme === "dark"
          ? "bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 border-blue-500/50"
          : theme === "green"
          ? "bg-gradient-to-r from-green-500/10 via-teal-500/10 to-emerald-500/10 border-green-500/50"
          : theme === "purple"
          ? "bg-gradient-to-r from-purple-500/10 via-indigo-500/10 to-violet-500/10 border-purple-500/50"
          : theme === "orange"
          ? "bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-yellow-500/10 border-orange-500/50"
          : theme === "blue"
          ? "bg-gradient-to-r from-blue-500/10 via-sky-500/10 to-cyan-500/10 border-blue-500/50"
          : theme === "pink"
          ? "bg-gradient-to-r from-pink-500/10 via-rose-500/10 to-red-500/10 border-pink-500/50"
          : theme === "brown"
          ? "bg-gradient-to-r from-amber-600/10 via-amber-500/10 to-yellow-600/10 border-amber-600/50"
          : "bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 border-blue-500/50",
      titleGradient:
        theme === "dark"
          ? "group-hover:from-blue-600 group-hover:via-purple-600 group-hover:to-pink-600"
          : theme === "green"
          ? "group-hover:from-green-600 group-hover:via-teal-600 group-hover:to-emerald-600"
          : theme === "purple"
          ? "group-hover:from-purple-600 group-hover:via-indigo-600 group-hover:to-blue-600"
          : theme === "orange"
          ? "group-hover:from-orange-600 group-hover:via-amber-600 group-hover:to-yellow-600"
          : theme === "blue"
          ? "group-hover:from-blue-600 group-hover:via-cyan-600 group-hover:to-sky-600"
          : theme === "pink"
          ? "group-hover:from-pink-600 group-hover:via-rose-600 group-hover:to-red-600"
          : theme === "brown"
          ? "group-hover:from-amber-700 group-hover:via-yellow-700 group-hover:to-orange-700"
          : "group-hover:from-blue-600 group-hover:via-purple-600 group-hover:to-pink-600",
      description:
        theme === "dark"
          ? "text-gray-400"
          : theme === "green"
          ? "text-green-600/80"
          : theme === "purple"
          ? "text-purple-600/80"
          : theme === "orange"
          ? "text-orange-600/80"
          : theme === "blue"
          ? "text-blue-600/80"
          : theme === "pink"
          ? "text-pink-600/80"
          : theme === "brown"
          ? "text-amber-600/80"
          : "text-gray-500",
      footer:
        theme === "dark"
          ? "border-gray-700 text-gray-400 bg-gray-800/70"
          : theme === "green"
          ? "border-green-200 text-green-600/80 bg-green-50/70"
          : theme === "purple"
          ? "border-purple-200 text-purple-600/80 bg-purple-50/70"
          : theme === "orange"
          ? "border-orange-200 text-orange-600/80 bg-orange-50/70"
          : theme === "blue"
          ? "border-blue-200 text-blue-600/80 bg-blue-50/70"
          : theme === "pink"
          ? "border-pink-200 text-pink-600/80 bg-pink-50/70"
          : theme === "brown"
          ? "border-amber-200 text-amber-600/80 bg-amber-50/70"
          : "border-gray-200 text-gray-500 bg-gray-50/70",
      keyButton:
        theme === "dark"
          ? "bg-gray-700/80 border-gray-600 hover:bg-gray-600 hover:border-gray-500"
          : theme === "green"
          ? "bg-green-100/80 border-green-200 hover:bg-green-200 hover:border-green-300"
          : theme === "purple"
          ? "bg-purple-100/80 border-purple-200 hover:bg-purple-200 hover:border-purple-300"
          : theme === "orange"
          ? "bg-orange-100/80 border-orange-200 hover:bg-orange-200 hover:border-orange-300"
          : theme === "blue"
          ? "bg-blue-100/80 border-blue-200 hover:bg-blue-200 hover:border-blue-300"
          : theme === "pink"
          ? "bg-pink-100/80 border-pink-200 hover:bg-pink-200 hover:border-pink-300"
          : theme === "brown"
          ? "bg-amber-100/80 border-amber-200 hover:bg-amber-200 hover:border-amber-300"
          : "bg-gray-100/80 border-gray-200 hover:bg-gray-200 hover:border-gray-300",
      highlight:
        theme === "dark"
          ? "bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-pink-500/30 text-white font-medium border-b border-blue-500/40 shadow-sm"
          : theme === "green"
          ? "bg-gradient-to-r from-green-300/40 to-emerald-300/40 text-green-900 font-medium border-b border-green-400/40 shadow-sm"
          : theme === "purple"
          ? "bg-gradient-to-r from-purple-300/40 to-violet-300/40 text-purple-900 font-medium border-b border-purple-400/40 shadow-sm"
          : theme === "orange"
          ? "bg-gradient-to-r from-orange-300/40 to-amber-300/40 text-orange-900 font-medium border-b border-orange-400/40 shadow-sm"
          : theme === "blue"
          ? "bg-gradient-to-r from-blue-300/40 to-sky-300/40 text-blue-900 font-medium border-b border-blue-400/40 shadow-sm"
          : theme === "pink"
          ? "bg-gradient-to-r from-pink-300/40 to-rose-300/40 text-pink-900 font-medium border-b border-pink-400/40 shadow-sm"
          : theme === "brown"
          ? "bg-gradient-to-r from-amber-300/40 to-yellow-300/40 text-amber-900 font-medium border-b border-amber-400/40 shadow-sm"
          : "bg-gradient-to-r from-blue-300/40 via-purple-300/40 to-pink-300/40 text-gray-900 font-medium border-b border-blue-400/40 shadow-sm",
    };
  }, [theme]);

  // 虚拟列表配置
  const rowVirtualizer = useVirtualizer({
    count: results.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 120, // 增加预估高度，确保有足够空间
    overscan: 5,
  });

  // 优化的防抖搜索函数
  const debouncedSearch = useCallback(
    debounce((searchQuery: string) => {
      if (!searchQuery) {
        setResults([]);
        return;
      }

      const lowerQuery = searchQuery.toLowerCase();
      const queryTerms = lowerQuery
        .split(/\s+/)
        .filter((term) => term.length > 0);

      // 如果没有有效的搜索词，返回空结果
      if (queryTerms.length === 0) {
        setResults([]);
        return;
      }

      // 使用预处理的数据进行搜索，提高效率
      const scoredResults = processedPosts
        .map((post) => {
          // 快速预筛选 - 使用searchableText进行初步筛选
          if (!queryTerms.some((term) => post.searchableText.includes(term))) {
            return null; // 不包含任何搜索词，直接排除
          }

          // 计算相关性分数
          let score = 0;
          const { titleLower, descriptionLower, tagsLower } = post;

          // 对每个搜索词进行评分
          for (const term of queryTerms) {
            // 标题匹配权重最高
            if (titleLower.includes(term)) {
              score += 100;
              // 标题开头匹配加分
              if (titleLower.startsWith(term)) {
                score += 50;
              }
              // 标题完全匹配加分
              if (titleLower === term) {
                score += 100;
              }
            }

            // 描述匹配
            if (descriptionLower.includes(term)) {
              score += 50;
            }

            // 标签匹配
            if (tagsLower.includes(term)) {
              score += 75;
              // 标签完全匹配加分
              if (post.tags?.some((tag) => tag.toLowerCase() === term)) {
                score += 50;
              }
            }
          }

          return { post, score };
        })
        .filter((item) => item !== null) // 过滤掉不匹配的结果
        .sort((a, b) => b!.score - a!.score) // 按分数降序排序
        .map((item) => item!.post); // 提取排序后的文章

      setResults(scoredResults);
      setSelectedIndex(-1); // 重置选中索引
    }, 50), // 减少延迟时间提高响应速度
    [processedPosts]
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
    // 注意：setSelectedIndex(-1) 已移至 debouncedSearch 内部
  }, [query, debouncedSearch]);

  // 当搜索框打开时，自动聚焦输入框
  useEffect(() => {
    if (isOpen && inputRef.current) {
      // 短暂延迟确保动画开始后再聚焦
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [isOpen]);

  // 优化的键盘导航处理函数
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex((prev) => {
            const newIndex = prev < results.length - 1 ? prev + 1 : prev;
            // 使用虚拟列表的scrollToIndex方法，更高效
            if (newIndex >= 0 && rowVirtualizer) {
              rowVirtualizer.scrollToIndex(newIndex, { align: "center" });
            }
            return newIndex;
          });
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex((prev) => {
            const newIndex = prev > 0 ? prev - 1 : prev;
            // 使用虚拟列表的scrollToIndex方法，更高效
            if (newIndex >= 0 && rowVirtualizer) {
              rowVirtualizer.scrollToIndex(newIndex, { align: "center" });
            }
            return newIndex;
          });
          break;
        case "Enter":
          if (selectedIndex >= 0 && results[selectedIndex]) {
            router.push(`/blog/${results[selectedIndex]._raw.flattenedPath}`);
            setIsOpen(false);
          }
          break;
      }
    },
    [results, selectedIndex, router, setIsOpen, rowVirtualizer]
  );

  // 优化的高亮匹配文本函数
  const highlightMatch = useCallback(
    (text: string) => {
      if (!query || query.trim() === "") return text;

      // 处理多个搜索词
      const terms = query
        .toLowerCase()
        .split(/\s+/)
        .filter((term) => term.length > 0);
      if (terms.length === 0) return text;

      // 创建正则表达式匹配所有搜索词
      const regex = new RegExp(
        `(${terms
          .map((term) => term.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"))
          .join("|")})`,
        "gi"
      );
      const parts = text.split(regex);

      return parts.map((part, i) => {
        const lowerPart = part.toLowerCase();
        return terms.some((term) => lowerPart === term) ? (
          <span key={i} className={`${themeClasses.highlight} rounded px-1`}>
            {part}
          </span>
        ) : (
          part
        );
      });
    },
    [query, themeClasses.highlight]
  );

  // 优化的清空搜索框函数
  const clearSearch = useCallback(() => {
    setQuery("");
    setResults([]);
    // 直接聚焦，不需要延迟
    inputRef.current?.focus();
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className={`fixed inset-0 backdrop-blur-sm z-50 flex items-start justify-center pt-[4rem] px-4 ${themeClasses.backdrop}`}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setIsOpen(false);
            }
          }}
        >
          <motion.div
            ref={searchContainerRef}
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2 }}
            className="w-full max-w-2xl mx-auto"
          >
            <div
              className={`${themeClasses.container} rounded-xl shadow-2xl border overflow-hidden`}
            >
              {/* 搜索输入区域 */}
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <MagnifyingGlassIcon className="h-5 w-5" />
                </div>
                <input
                  ref={inputRef}
                  type="text"
                  className={`w-full pl-12 pr-12 py-3.5 text-base md:text-lg bg-transparent border-b focus:outline-none transition-all duration-300 ${themeClasses.input}`}
                  placeholder="搜索文章... (⌘K 打开)"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                {query && (
                  <button
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200 flex items-center justify-center h-8 w-8 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={clearSearch}
                    aria-label="清空搜索"
                  >
                    <XMarkIcon className="h-5 w-5" />
                  </button>
                )}
              </div>

              {/* 搜索结果区域 */}
              <div className="relative">
                <AnimatePresence mode="wait">
                  {results.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      {/* 搜索结果计数 */}
                      <motion.div
                        key="results-count"
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                        className={`px-4 py-2.5 text-sm ${themeClasses.description} flex items-center justify-between border-b ${themeClasses.footer} sticky top-0 z-10 backdrop-blur-sm shadow-sm`}
                      >
                        <span className="flex items-center gap-2">
                          <motion.span
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            transition={{
                              type: "spring",
                              stiffness: 400,
                              damping: 10,
                            }}
                            className={`inline-flex items-center justify-center h-5 w-5 rounded-full ${themeClasses.selectedItem} text-xs font-semibold`}
                          >
                            {results.length}
                          </motion.span>
                          <span>篇相关文章</span>
                        </span>
                      </motion.div>
                      <motion.div
                        ref={parentRef}
                        className="max-h-[60vh] overflow-auto p-3"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{
                          opacity: 1,
                          height: `${Math.max(
                            results.length * 120,
                            results.length === 1 ? 160 : 0
                          )}px`,
                        }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                        style={{
                          width: "100%",
                        }}
                      >
                        <div
                          style={{
                            height: `${rowVirtualizer.getTotalSize()}px`,
                            width: "100%",
                            position: "relative",
                          }}
                        >
                          {rowVirtualizer
                            .getVirtualItems()
                            .map((virtualRow, index) => {
                              const post = results[virtualRow.index];
                              return (
                                <div
                                  key={post._id}
                                  data-index={virtualRow.index}
                                  className="absolute top-0 left-0 w-full"
                                  style={{
                                    height: `${virtualRow.size}px`,
                                    transform: `translateY(${virtualRow.start}px)`,
                                  }}
                                >
                                  <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{
                                      duration: 0.2,
                                      delay: index * 0.05,
                                    }}
                                    className="py-1"
                                  >
                                    <Link
                                      href={`/blog/${post._raw.flattenedPath}`}
                                      className={`group block px-4 py-3 rounded-lg transition-all duration-200 border ${
                                        virtualRow.index === selectedIndex
                                          ? themeClasses.selectedItem
                                          : "border-gray-200/50 dark:border-gray-700/50"
                                      } ${
                                        themeClasses.hoverItem
                                      } hover:shadow-lg hover:scale-[1.01] transform hover:backdrop-blur-lg mb-2`}
                                      onClick={() => setIsOpen(false)}
                                    >
                                      <h3
                                        className={`font-medium text-base md:text-lg transition-all duration-300 group-hover:bg-gradient-to-r ${themeClasses.titleGradient} group-hover:bg-clip-text group-hover:text-transparent line-clamp-2`}
                                      >
                                        {highlightMatch(post.title)}
                                      </h3>
                                      <p
                                        className={`text-sm mt-2 ${themeClasses.description} line-clamp-2`}
                                      >
                                        {highlightMatch(post.description)}
                                      </p>
                                    </Link>
                                  </motion.div>
                                </div>
                              );
                            })}
                        </div>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* 无结果提示 */}
                <AnimatePresence mode="wait">
                  {query && query.trim() !== "" && results.length === 0 && (
                    <motion.div
                      key="no-results"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className={`p-8 text-center ${themeClasses.description} flex flex-col items-center`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-12 w-12 mb-4 opacity-30"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <p className="text-lg font-medium">未找到相关文章</p>
                      <p className="mt-1">请尝试其他关键词</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* 底部快捷键提示区域 - 重新设计 */}
                <div
                  className={`p-4 border-t ${themeClasses.footer} flex flex-wrap items-center justify-center gap-4 text-sm`}
                >
                  <div className="flex items-center gap-2 group transition-all duration-200 hover:opacity-90">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => {
                          if (results.length > 0) {
                            setSelectedIndex((prev) => {
                              const newIndex = prev > 0 ? prev - 1 : 0;
                              // 使用虚拟列表的scrollToIndex方法，与键盘导航保持一致
                              if (newIndex >= 0 && rowVirtualizer) {
                                rowVirtualizer.scrollToIndex(newIndex, {
                                  align: "center",
                                });
                              }
                              return newIndex;
                            });
                          }
                        }}
                        className={`inline-flex items-center justify-center h-6 w-6 rounded-md border text-xs font-medium shadow-sm ${themeClasses.keyButton} active:scale-95 transition-transform hover:scale-105`}
                        aria-label="向上导航"
                      >
                        <ArrowUpIcon className="h-3 w-3" />
                      </button>
                      <button
                        onClick={() => {
                          if (results.length > 0) {
                            setSelectedIndex((prev) => {
                              const newIndex =
                                prev < results.length - 1 ? prev + 1 : prev;
                              // 使用虚拟列表的scrollToIndex方法，与键盘导航保持一致
                              if (newIndex >= 0 && rowVirtualizer) {
                                rowVirtualizer.scrollToIndex(newIndex, {
                                  align: "center",
                                });
                              }
                              return newIndex;
                            });
                          }
                        }}
                        className={`inline-flex items-center justify-center h-6 w-6 rounded-md border text-xs font-medium shadow-sm ${themeClasses.keyButton} active:scale-95 transition-transform hover:scale-105`}
                        aria-label="向下导航"
                      >
                        <ArrowDownIcon className="h-3 w-3" />
                      </button>
                    </div>
                    <span className="font-medium">导航</span>
                  </div>

                  <button
                    onClick={() => {
                      if (selectedIndex >= 0 && results[selectedIndex]) {
                        router.push(
                          `/blog/${results[selectedIndex]._raw.flattenedPath}`
                        );
                        setIsOpen(false);
                      }
                    }}
                    className="flex items-center gap-2 group transition-all duration-300 hover:opacity-90 cursor-pointer"
                  >
                    <kbd
                      className={`inline-flex items-center justify-center h-6 px-2 rounded-md border text-xs font-medium shadow-sm ${themeClasses.keyButton} active:scale-95 transition-transform`}
                    >
                      Enter
                    </kbd>
                    <span className="font-medium">选择</span>
                  </button>

                  <button
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-2 group transition-all duration-300 hover:opacity-90 cursor-pointer"
                  >
                    <kbd
                      className={`inline-flex items-center justify-center h-6 px-2 rounded-md border text-xs font-medium shadow-sm ${themeClasses.keyButton} active:scale-95 transition-transform`}
                    >
                      esc
                    </kbd>
                    <span className="font-medium">关闭</span>
                  </button>

                  <button
                    onClick={() => {
                      setIsOpen(true);
                      setTimeout(() => inputRef.current?.focus(), 50);
                    }}
                    className="flex items-center gap-2 group transition-all duration-300 hover:opacity-90 cursor-pointer"
                  >
                    <div className="flex items-center gap-1">
                      <kbd
                        className={`inline-flex items-center justify-center h-6 px-1.5 rounded-md border text-xs font-medium shadow-sm ${themeClasses.keyButton} active:scale-95 transition-transform`}
                      >
                        ⌘
                      </kbd>
                      <kbd
                        className={`inline-flex items-center justify-center h-6 w-6 rounded-md border text-xs font-medium shadow-sm ${themeClasses.keyButton} active:scale-95 transition-transform`}
                      >
                        K
                      </kbd>
                    </div>
                    <span className="font-medium">打开</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
