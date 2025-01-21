"use client";

import { useTheme } from "next-themes";
import { useEffect, useRef } from "react";

export default function Comments() {
  const ref = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    if (!ref.current) return;

    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.async = true;
    script.crossOrigin = "anonymous";

    script.setAttribute("data-repo", "xlongDev/dxl-blog");
    script.setAttribute("data-repo-id", "R_kgDOK_RKYA");
    script.setAttribute("data-category", "Announcements");
    script.setAttribute("data-category-id", "DIC_kwDOK_RKYc4CbvYH");
    script.setAttribute("data-mapping", "url");
    script.setAttribute("data-strict", "0");
    script.setAttribute("data-reactions-enabled", "1");
    script.setAttribute("data-emit-metadata", "0");
    script.setAttribute("data-input-position", "bottom");
    script.setAttribute("data-theme", theme === "dark" ? "dark" : "light");
    script.setAttribute("data-lang", "zh-CN");

    ref.current.appendChild(script);

    return () => {
      const giscus = document.querySelector("iframe.giscus-frame");
      if (giscus) {
        giscus.remove();
      }
    };
  }, [theme]);

  return (
    <div className="mt-10 max-w-3xl mx-auto">
      <div ref={ref} />
    </div>
  );
}
