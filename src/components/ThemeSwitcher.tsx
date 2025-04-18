"use client";

import { useState, useEffect, useRef } from "react";
import { PaletteIcon } from "@/components/icons/ThemeIcons";
import { useThemeUtils } from "@/hooks/useThemeUtils";
import { THEME_OPTIONS } from "@/hooks/themeConstants";

export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useThemeUtils();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 处理点击外部关闭下拉菜单
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // 确保组件挂载后再渲染，避免服务端渲染与客户端渲染不一致
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-300"
        aria-label="切换主题"
      >
        <PaletteIcon className="w-5 h-5 transform transition-transform duration-300 hover:scale-110" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-1 z-50 border border-gray-200 dark:border-gray-700">
          {THEME_OPTIONS.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                setTheme(option.value);
                setIsOpen(false);
              }}
              className={`flex items-center w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 ${
                theme === option.value ? "bg-gray-100 dark:bg-gray-700" : ""
              }`}
            >
              <option.icon className="w-5 h-5 mr-3" />
              <span>{option.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
