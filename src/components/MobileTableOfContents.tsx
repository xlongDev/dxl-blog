"use client";

import { useState, useEffect } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";

type Heading = {
  id: string;
  text: string;
  level: number;
};

export default function MobileTableOfContents() {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll("h2, h3, h4")).map(
      (element) => {
        // 如果元素没有 id，生成一个唯一的 id
        if (!element.id) {
          element.id =
            element.textContent?.toLowerCase().replace(/\s+/g, "-") ||
            `heading-${Math.random().toString(36).substr(2, 9)}`;
        }
        return {
          id: element.id,
          text: element.textContent || "",
          level: Number(element.tagName.charAt(1)),
        };
      }
    );
    setHeadings(elements);

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

    document.querySelectorAll("h2, h3, h4").forEach((element) => {
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  if (headings.length === 0) return null;

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-[100] bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-t border-gray-200 dark:border-gray-800 shadow-lg">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-4 py-3 text-sm font-medium text-gray-800 dark:text-gray-200 hover:bg-gray-50/80 dark:hover:bg-gray-800/80 transition-colors"
      >
        <span>目录</span>
        <ChevronDownIcon
          className={`w-5 h-5 transition-transform duration-200 ${
            isOpen ? "transform rotate-180" : ""
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
            className="absolute bottom-full left-0 right-0 max-h-[70vh] overflow-y-auto bg-white/95 dark:bg-gray-800/95 backdrop-blur-lg border-t border-gray-200/50 dark:border-gray-700/50 shadow-lg"
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
                      className={`block py-1.5 text-sm ${
                        activeId === heading.id
                          ? "text-blue-600 dark:text-blue-400 font-medium"
                          : "text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
                      }`}
                      onClick={(e) => {
                        e.preventDefault();
                        const element = document.getElementById(heading.id);
                        if (element) {
                          const headerHeight = 80; // 顶部导航栏的高度
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

                          // 设置一个超时，以防滚动没有完全到达目标位置
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