"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import {
  MoonIcon,
  SunIcon,
  SearchIcon,
  GithubIcon,
} from "@/components/icons/HeaderIcons";

interface ActionsProps {
  onSearchClick: () => void;
}

export default function Actions({ onSearchClick }: ActionsProps) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="flex items-center space-x-2">
      <a
        href="https://github.com/xLongDev"
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-300"
      >
        <GithubIcon className="w-5 h-5 transform transition-transform duration-300 hover:scale-110" />
      </a>

      <button
        onClick={onSearchClick}
        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-300"
      >
        <SearchIcon className="w-5 h-5 transform transition-transform duration-300 hover:scale-110" />
      </button>

      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-300"
      >
        {mounted && theme === "dark" ? (
          <SunIcon className="w-5 h-5 transform transition-transform duration-300 hover:scale-110" />
        ) : (
          <MoonIcon className="w-5 h-5 transform transition-transform duration-300 hover:scale-110" />
        )}
      </button>
    </div>
  );
}
