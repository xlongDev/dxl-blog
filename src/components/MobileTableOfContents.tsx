"use client";

import { useState, useEffect } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

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
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 shadow-lg">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-4 py-3 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
      >
        <span>目录</span>
        <ChevronDownIcon
          className={`w-5 h-5 transition-transform duration-200 ${
            isOpen ? "transform rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <nav className="absolute bottom-full left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 shadow-lg px-4 py-4 max-h-[60vh] overflow-y-auto">
          <ul className="space-y-1">
            {headings.map((heading) => (
              <li
                key={heading.id}
                style={{
                  paddingLeft: `${(heading.level - 2) * 0.75}rem`,
                }}
              >
                <a
                  href={`#${heading.id}`}
                  className={`block py-1.5 text-sm ${
                    activeId === heading.id
                      ? "text-blue-500 font-medium"
                      : "text-gray-600 dark:text-gray-400"
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(heading.id)?.scrollIntoView({
                      behavior: "smooth",
                    });
                    setIsOpen(false);
                  }}
                >
                  {heading.text}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
}
