"use client";

import { useEffect, useState } from "react";
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

    return () => {
      elements.forEach(({ id }) => {
        const element = document.getElementById(id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, []);

  if (headings.length === 0) {
    return null;
  }

  return (
    <nav className="hidden lg:block bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-800 max-h-[calc(100vh-8rem)] sticky top-24 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold">目录</h2>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          aria-label={isExpanded ? "折叠目录" : "展开目录"}
        >
          <ChevronDownIcon
            className={`h-5 w-5 transform transition-transform duration-200 ${
              isExpanded ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>
      <div
        className={`overflow-hidden transition-[max-height] duration-500 ease-in-out ${
          isExpanded ? "max-h-[calc(100vh-12rem)]" : "max-h-0"
        }`}
      >
        <ul className="space-y-2">
          {headings.map((heading) => (
            <li
              key={heading.id}
              style={{ paddingLeft: `${(heading.level - 2) * 0.75}rem` }}
            >
              <a
                href={`#${heading.id}`}
                className={`block text-sm hover:text-blue-500 ${
                  activeId === heading.id
                    ? "text-blue-500 font-medium"
                    : "text-gray-600 dark:text-gray-400"
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
