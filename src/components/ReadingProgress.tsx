"use client";

import { useEffect, useState, useCallback } from "react";

const ReadingProgress: React.FC = () => {
  const [readingProgress, setReadingProgress] = useState(0);

  const scrollHandler = useCallback(() => {
    const element = document.documentElement;
    const scrollTop = element.scrollTop || document.body.scrollTop;
    const scrollHeight = element.scrollHeight || document.body.scrollHeight;
    const clientHeight = element.clientHeight;

    const windowHeight = scrollHeight - clientHeight;
    const progress = windowHeight > 0 ? (scrollTop / windowHeight) * 100 : 0;

    // 使用 requestAnimationFrame 优化性能
    requestAnimationFrame(() => {
      setReadingProgress(progress);
    });
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", scrollHandler, { passive: true });

    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, [scrollHandler]);

  return (
    <div className="fixed top-0 left-0 w-full h-1 z-50">
      <div
        className="h-full bg-primary-500 transition-all duration-150"
        style={{ width: `${readingProgress}%` }}
      />
    </div>
  );
};

export default ReadingProgress;
