import React, { useState, useCallback, useEffect } from "react";

const ReadingProgress: React.FC = () => {
  const [readingProgress, setReadingProgress] = useState(0);

  const scrollListener = useCallback(() => {
    const element = document.documentElement;
    const scrollTop = element.scrollTop || document.body.scrollTop;
    const scrollHeight = element.scrollHeight || document.body.scrollHeight;
    const clientHeight = element.clientHeight;

    const windowHeight = scrollHeight - clientHeight;
    const progress = Math.round((scrollTop / windowHeight) * 100);

    setReadingProgress(Math.min(100, Math.max(0, progress)));
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", scrollListener);
    scrollListener(); // 初始化进度

    return () => {
      window.removeEventListener("scroll", scrollListener);
    };
  }, [scrollListener]);

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
      <div
        className="h-full bg-primary transition-all duration-300"
        style={{ width: `${readingProgress}%` }}
      />
    </div>
  );
};

export default ReadingProgress;
