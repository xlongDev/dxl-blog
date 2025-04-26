"use client";

import { useEffect, useState, useRef } from "react";
import { useThemeUtils } from "@/hooks/useThemeUtils";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

type Heading = {
  id: string;
  text: string;
  level: number;
};

export default function TableOfContents() {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const [isExpanded, setIsExpanded] = useState(true);
  const { theme, getThemeValue } = useThemeUtils();

  // 创建一个ref来引用目录列表容器
  const tocRef = useRef<HTMLDivElement>(null);

  // 监听activeId变化，自动滚动到当前活动的标题项
  useEffect(() => {
    if (isExpanded && activeId && tocRef.current) {
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
  }, [activeId, isExpanded]);

  useEffect(() => {
    // 初始化一个标志，表示是否已经获取过标题
    let hasInitialized = false;

    // 获取标题元素的函数
    const getHeadingElements = () => {
      // 用于跟踪相同文本的标题数量
      const textCountMap: Record<string, number> = {};

      const elements = Array.from(document.querySelectorAll("h2, h3, h4")).map(
        (element) => {
          // 如果元素没有 id，生成一个唯一的 id
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
        {
          rootMargin: "-20% 0% -35% 0%",
        }
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

  if (headings.length === 0) {
    return null;
  }

  return (
    <nav
      className={`hidden lg:block backdrop-blur-lg p-4 rounded-xl max-h-[calc(100vh-8rem)] sticky top-24 overflow-y-auto scrollbar-thin scrollbar-track-transparent shadow-lg transition-all duration-300 
      ${
        theme === "dark"
          ? "bg-gray-800/90 border border-gray-700/50 scrollbar-thumb-gray-600"
          : theme === "green"
          ? "bg-green-50/90 border border-green-200/50 scrollbar-thumb-green-300"
          : theme === "purple"
          ? "bg-purple-50/90 border border-purple-200/50 scrollbar-thumb-purple-300"
          : theme === "orange"
          ? "bg-orange-50/90 border border-orange-200/50 scrollbar-thumb-orange-300"
          : theme === "blue"
          ? "bg-blue-50/90 border border-blue-200/50 scrollbar-thumb-blue-300"
          : theme === "pink"
          ? "bg-pink-50/90 border border-pink-200/50 scrollbar-thumb-pink-300"
          : theme === "brown"
          ? "bg-amber-50/90 border border-amber-200/50 scrollbar-thumb-amber-300"
          : "bg-white/90 border border-gray-200/50 scrollbar-thumb-gray-300"
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <h2
          className={`font-bold bg-clip-text text-transparent bg-gradient-to-r 
          ${
            theme === "dark"
              ? "from-blue-400 to-purple-400"
              : theme === "green"
              ? "from-green-600 to-green-400"
              : theme === "purple"
              ? "from-purple-600 to-purple-400"
              : theme === "orange"
              ? "from-orange-600 to-orange-400"
              : theme === "blue"
              ? "from-blue-600 to-blue-400"
              : theme === "pink"
              ? "from-pink-600 to-pink-400"
              : theme === "brown"
              ? "from-amber-700 to-amber-500"
              : "from-blue-600 to-purple-600"
          }`}
        >
          目录
        </h2>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`p-1.5 rounded-lg transition-all duration-300 
            ${
              theme === "dark"
                ? "hover:bg-gray-700/70"
                : theme === "green"
                ? "hover:bg-green-100/70"
                : theme === "purple"
                ? "hover:bg-purple-100/70"
                : theme === "orange"
                ? "hover:bg-orange-100/70"
                : theme === "blue"
                ? "hover:bg-blue-100/70"
                : theme === "pink"
                ? "hover:bg-pink-100/70"
                : theme === "brown"
                ? "hover:bg-amber-100/70"
                : "hover:bg-gray-100/70"
            }`}
          aria-label={isExpanded ? "折叠目录" : "展开目录"}
        >
          <ChevronDownIcon
            className={`h-5 w-5 transform transition-transform duration-200 
              ${isExpanded ? "rotate-180" : ""} 
              ${
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
      </div>
      <div
        ref={tocRef}
        className={`overflow-y-auto transition-[max-height] duration-500 ease-in-out ${
          isExpanded ? "max-h-[calc(100vh-12rem)]" : "max-h-0"
        }`}
      >
        <ul className="space-y-2">
          {headings.map((heading, index) => (
            <li
              key={`${heading.id}-${index}`}
              style={{ paddingLeft: `${(heading.level - 2) * 0.75}rem` }}
            >
              <a
                href={`#${heading.id}`}
                className={`block text-sm py-1 px-2 rounded-md transition-all duration-200 
                  ${
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
                  document.getElementById(heading.id)?.scrollIntoView({
                    behavior: "smooth",
                  });
                }}
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
