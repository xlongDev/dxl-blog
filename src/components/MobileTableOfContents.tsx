"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";
import { useThemeUtils } from "@/hooks/useThemeUtils";

type Heading = {
  id: string;
  text: string;
  level: number;
};

export default function MobileTableOfContents() {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>("");
  const [mounted, setMounted] = useState(false);
  const { theme, getThemeValue } = useThemeUtils();

  // 创建一个ref来引用目录列表容器
  const tocRef = useRef<HTMLDivElement>(null);

  // 监听activeId变化，自动滚动到当前活动的标题项
  useEffect(() => {
    if (isOpen && activeId && tocRef.current) {
      const activeElement = tocRef.current.querySelector(
        `a[href="#${activeId}"]`
      );
      if (activeElement) {
        // 计算滚动位置，使活动项居中显示
        const containerHeight = tocRef.current.clientHeight;
        const activeElementTop = activeElement.getBoundingClientRect().top;
        const containerTop = tocRef.current.getBoundingClientRect().top;
        const relativeTop = activeElementTop - containerTop;

        tocRef.current.scrollTo({
          top:
            tocRef.current.scrollTop +
            relativeTop -
            containerHeight / 2 +
            activeElement.clientHeight / 2,
          behavior: "smooth",
        });
      }
    }
  }, [activeId, isOpen]);

  useEffect(() => {
    setMounted(true);

    // 初始化一个标志，表示是否已经获取过标题
    let hasInitialized = false;

    // 获取标题元素的函数
    const getHeadingElements = () => {
      // 用于跟踪相同文本的标题数量
      const textCountMap: Record<string, number> = {};

      const elements = Array.from(document.querySelectorAll("h2, h3, h4")).map(
        (element) => {
          if (!element.id) {
            const text = element.textContent || "";
            // 检查这个文本之前是否出现过
            textCountMap[text] = (textCountMap[text] || 0) + 1;
            // 如果是重复文本，添加计数作为后缀
            const suffix =
              textCountMap[text] > 1 ? `-${textCountMap[text]}` : "";
            element.id =
              `${text.toLowerCase().replace(/\s+/g, "-")}${suffix}` ||
              `heading-${Math.random().toString(36).substring(2, 11)}`;
          }
          return {
            id: element.id,
            text: element.textContent || "",
            level: Number(element.tagName.charAt(1)),
          };
        }
      );

      if (elements.length > 0) {
        hasInitialized = true;
      }

      return elements;
    };

    // 初始化 IntersectionObserver
    const initIntersectionObserver = (elements: Heading[]) => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveId(entry.target.id);
            }
          });
        },
        { rootMargin: "-20% 0px -80% 0px" }
      );

      elements.forEach(({ id }) => {
        const element = document.getElementById(id);
        if (element) {
          observer.observe(element);
        }
      });

      return observer;
    };

    // 初始尝试获取标题
    let elements = getHeadingElements();
    setHeadings(elements);
    let intersectionObserver: IntersectionObserver | null = null;

    if (elements.length > 0) {
      intersectionObserver = initIntersectionObserver(elements);
    }

    // 如果没有找到标题，设置一个延迟再次尝试
    const retryTimeout = setTimeout(() => {
      if (!hasInitialized) {
        elements = getHeadingElements();
        if (elements.length > 0) {
          setHeadings(elements);
          intersectionObserver = initIntersectionObserver(elements);
        }
      }
    }, 500);

    // 设置 MutationObserver 监听 DOM 变化
    const mutationObserver = new MutationObserver((mutations) => {
      // 检查是否有新的标题元素被添加
      let shouldUpdate = false;
      mutations.forEach((mutation) => {
        if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === 1) {
              // 元素节点
              const element = node as Element;
              if (
                ["H2", "H3", "H4"].includes(element.tagName) ||
                element.querySelector("h2, h3, h4")
              ) {
                shouldUpdate = true;
              }
            }
          });
        }
      });

      if (shouldUpdate) {
        // 清除之前的 IntersectionObserver
        if (intersectionObserver) {
          intersectionObserver.disconnect();
        }

        // 重新获取标题并设置新的 IntersectionObserver
        const newElements = getHeadingElements();
        setHeadings(newElements);
        intersectionObserver = initIntersectionObserver(newElements);
      }
    });

    // 开始监听 DOM 变化
    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      // 清理工作
      clearTimeout(retryTimeout);
      mutationObserver.disconnect();
      if (intersectionObserver) {
        intersectionObserver.disconnect();
      }
    };
  }, []);

  if (!mounted || headings.length === 0) return null;

  return (
    <div
      className={`lg:hidden fixed bottom-0 left-0 right-0 z-[100] backdrop-blur-sm border-t shadow-lg transition-colors duration-300
      ${
        theme === "dark"
          ? "bg-gray-900/95 border-gray-800"
          : theme === "green"
          ? "bg-green-50/95 border-green-200/50"
          : theme === "purple"
          ? "bg-purple-50/95 border-purple-200/50"
          : theme === "orange"
          ? "bg-orange-50/95 border-orange-200/50"
          : theme === "blue"
          ? "bg-blue-50/95 border-blue-200/50"
          : theme === "pink"
          ? "bg-pink-50/95 border-pink-200/50"
          : theme === "brown"
          ? "bg-amber-50/95 border-amber-200/50"
          : "bg-white/95 border-gray-200"
      }`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-between w-full px-4 py-3 text-sm font-medium transition-colors duration-300
          ${
            theme === "dark"
              ? "text-gray-200 hover:bg-gray-800/80"
              : theme === "green"
              ? "text-green-800 hover:bg-green-100/80"
              : theme === "purple"
              ? "text-purple-800 hover:bg-purple-100/80"
              : theme === "orange"
              ? "text-orange-800 hover:bg-orange-100/80"
              : theme === "blue"
              ? "text-blue-800 hover:bg-blue-100/80"
              : theme === "pink"
              ? "text-pink-800 hover:bg-pink-100/80"
              : theme === "brown"
              ? "text-amber-800 hover:bg-amber-100/80"
              : "text-gray-800 hover:bg-gray-50/80"
          }`}
      >
        <span
          className={`font-medium ${
            theme === "dark"
              ? "text-gray-200"
              : theme === "green"
              ? "text-green-700"
              : theme === "purple"
              ? "text-purple-700"
              : theme === "orange"
              ? "text-orange-700"
              : theme === "blue"
              ? "text-blue-700"
              : theme === "pink"
              ? "text-pink-700"
              : theme === "brown"
              ? "text-amber-700"
              : "text-gray-800"
          }`}
        >
          目录
        </span>
        <ChevronDownIcon
          className={`w-5 h-5 transition-transform duration-200 ${
            isOpen ? "transform rotate-180" : ""
          } ${
            theme === "dark"
              ? "text-gray-300"
              : theme === "green"
              ? "text-green-600"
              : theme === "purple"
              ? "text-purple-600"
              : theme === "orange"
              ? "text-orange-600"
              : theme === "blue"
              ? "text-blue-600"
              : theme === "pink"
              ? "text-pink-600"
              : theme === "brown"
              ? "text-amber-700"
              : "text-gray-600"
          }`}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            ref={tocRef}
            className={`absolute bottom-full left-0 right-0 max-h-[70vh] overflow-y-auto backdrop-blur-lg border-t shadow-lg
              ${
                theme === "dark"
                  ? "bg-gray-800/95 border-gray-700/50 scrollbar-thumb-gray-600"
                  : theme === "green"
                  ? "bg-green-50/95 border-green-200/50 scrollbar-thumb-green-300"
                  : theme === "purple"
                  ? "bg-purple-50/95 border-purple-200/50 scrollbar-thumb-purple-300"
                  : theme === "orange"
                  ? "bg-orange-50/95 border-orange-200/50 scrollbar-thumb-orange-300"
                  : theme === "blue"
                  ? "bg-blue-50/95 border-blue-200/50 scrollbar-thumb-blue-300"
                  : theme === "pink"
                  ? "bg-pink-50/95 border-pink-200/50 scrollbar-thumb-pink-300"
                  : theme === "brown"
                  ? "bg-amber-50/95 border-amber-200/50 scrollbar-thumb-amber-300"
                  : "bg-white/95 border-gray-200/50 scrollbar-thumb-gray-300"
              }`}
          >
            <motion.div
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              exit={{ y: 20 }}
              transition={{ duration: 0.2 }}
              className="px-4 py-4"
            >
              <ul className="space-y-1">
                {headings.map((heading, index) => (
                  <li
                    key={`${heading.id}-${index}`}
                    style={{
                      paddingLeft: `${(heading.level - 2) * 0.75}rem`,
                    }}
                  >
                    <a
                      href={`#${heading.id}`}
                      className={`block py-1.5 text-sm rounded-md transition-all duration-200 ${
                        activeId === heading.id
                          ? theme === "dark"
                            ? "text-blue-400 font-medium bg-blue-500/10"
                            : theme === "green"
                            ? "text-green-600 font-medium bg-green-500/10"
                            : theme === "purple"
                            ? "text-purple-600 font-medium bg-purple-500/10"
                            : theme === "orange"
                            ? "text-orange-600 font-medium bg-orange-500/10"
                            : theme === "blue"
                            ? "text-blue-600 font-medium bg-blue-500/10"
                            : theme === "pink"
                            ? "text-pink-600 font-medium bg-pink-500/10"
                            : theme === "brown"
                            ? "text-amber-700 font-medium bg-amber-500/10"
                            : "text-blue-600 font-medium bg-blue-500/10"
                          : theme === "dark"
                          ? "text-gray-400 hover:text-blue-400 hover:bg-blue-500/5"
                          : theme === "green"
                          ? "text-gray-600 hover:text-green-600 hover:bg-green-500/5"
                          : theme === "purple"
                          ? "text-gray-600 hover:text-purple-600 hover:bg-purple-500/5"
                          : theme === "orange"
                          ? "text-gray-600 hover:text-orange-600 hover:bg-orange-500/5"
                          : theme === "blue"
                          ? "text-gray-600 hover:text-blue-600 hover:bg-blue-500/5"
                          : theme === "pink"
                          ? "text-gray-600 hover:text-pink-600 hover:bg-pink-500/5"
                          : theme === "brown"
                          ? "text-gray-600 hover:text-amber-700 hover:bg-amber-500/5"
                          : "text-gray-600 hover:text-blue-600 hover:bg-blue-500/5"
                      }`}
                      onClick={(e) => {
                        e.preventDefault();
                        const element = document.getElementById(heading.id);
                        if (element) {
                          const headerHeight = 80;
                          const elementPosition =
                            element.getBoundingClientRect().top +
                            window.scrollY;
                          const offsetPosition = elementPosition - headerHeight;

                          const handleScroll = () => {
                            const currentPosition = window.scrollY;
                            if (
                              Math.abs(currentPosition - offsetPosition) < 2
                            ) {
                              window.removeEventListener(
                                "scroll",
                                handleScroll
                              );
                              setIsOpen(false);
                            }
                          };

                          window.addEventListener("scroll", handleScroll);

                          window.scrollTo({
                            top: offsetPosition,
                            behavior: "smooth",
                          });

                          setTimeout(() => {
                            window.removeEventListener("scroll", handleScroll);
                            setIsOpen(false);
                          }, 1000);
                        }
                      }}
                    >
                      {heading.text}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  );
}
