"use client";

import { useEffect, useState } from "react";

type Heading = {
  id: string;
  text: string;
  level: number;
};

export default function TableOfContents() {
  const [headings, setHeadings] = useState<Heading[]>([]);
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
    <nav className="hidden lg:block bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-800">
      <h2 className="font-bold mb-4">目录</h2>
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
    </nav>
  );
}
