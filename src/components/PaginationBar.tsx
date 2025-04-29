import { useState, useEffect, memo } from "react";
import { useThemeUtils } from "@/hooks/useThemeUtils";

interface PaginationBarProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

const PaginationBar = memo(({ currentPage, totalPages, onPageChange, className = "" }: PaginationBarProps) => {
  const [inputValue, setInputValue] = useState(currentPage);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const { getThemeClass } = useThemeUtils();

  useEffect(() => { setInputValue(currentPage); }, [currentPage]);

  const goToPage = (page: number) => {
    const validPage = Math.max(1, Math.min(page, totalPages));
    if (validPage !== currentPage) {
      onPageChange(validPage);
    }
  };

  // 按钮基础样式
  const btnBase = "px-4 py-2 rounded-full font-medium transition-all duration-300 focus:outline-none flex items-center justify-center";
  
  // 按钮主题样式
  const btnTheme = getThemeClass(
    "bg-gray-100 text-gray-700 hover:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed",
    {
      light: "bg-gray-100 text-gray-700 hover:bg-blue-100",
      dark: "bg-gray-800 text-gray-200 hover:bg-blue-900",
      green: "bg-emerald-50 text-emerald-700 hover:bg-emerald-100",
      purple: "bg-purple-50 text-purple-700 hover:bg-purple-100",
      orange: "bg-orange-50 text-orange-700 hover:bg-orange-100",
      blue: "bg-blue-50 text-blue-700 hover:bg-blue-100",
      pink: "bg-pink-50 text-pink-700 hover:bg-pink-100",
      brown: "bg-amber-50 text-amber-700 hover:bg-amber-100",
    }
  );

  // 活动按钮样式
  const activeBtnTheme = getThemeClass(
    "bg-blue-500 text-white shadow-md",
    {
      light: "bg-blue-500 text-white",
      dark: "bg-blue-600 text-white",
      green: "bg-emerald-500 text-white",
      purple: "bg-purple-500 text-white",
      orange: "bg-orange-500 text-white",
      blue: "bg-blue-500 text-white",
      pink: "bg-pink-500 text-white",
      brown: "bg-amber-500 text-white",
    }
  );

  // 输入框样式
  const inputTheme = getThemeClass(
    "bg-gray-200 text-gray-900 focus:ring-2 focus:ring-blue-400",
    {
      light: "bg-gray-200 text-gray-900",
      dark: "bg-gray-900 text-gray-100",
      green: "bg-emerald-100 text-emerald-900",
      purple: "bg-purple-100 text-purple-900",
      orange: "bg-orange-100 text-orange-900",
      blue: "bg-blue-100 text-blue-900",
      pink: "bg-pink-100 text-pink-900",
      brown: "bg-amber-100 text-amber-900",
    }
  );

  // 生成页码按钮
  const renderPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // 添加第一页和省略号
    if (startPage > 1) {
      pages.push(
        <button
          key={1}
          onClick={() => goToPage(1)}
          className={`${btnBase} ${btnTheme} w-10 h-10`}
        >
          1
        </button>
      );
      if (startPage > 2) {
        pages.push(
          <span key="left-ellipsis" className="flex items-center justify-center w-10 h-10">
            ...
          </span>
        );
      }
    }

    // 添加中间页码
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => goToPage(i)}
          className={`${btnBase} w-10 h-10 ${i === currentPage ? activeBtnTheme : btnTheme}`}
          aria-current={i === currentPage ? "page" : undefined}
        >
          {i}
        </button>
      );
    }

    // 添加省略号和最后一页
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(
          <span key="right-ellipsis" className="flex items-center justify-center w-10 h-10">
            ...
          </span>
        );
      }
      pages.push(
        <button
          key={totalPages}
          onClick={() => goToPage(totalPages)}
          className={`${btnBase} ${btnTheme} w-10 h-10`}
        >
          {totalPages}
        </button>
      );
    }

    return pages;
  };

  return (
    <div className={`flex flex-wrap items-center justify-center gap-2 py-4 ${className}`}>
      {/* 导航按钮 */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => goToPage(1)}
          disabled={currentPage === 1}
          className={`${btnBase} ${btnTheme} px-3 h-10 hover:scale-105 active:scale-95 transition-transform`}
          aria-label="First page"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414zm-6 0a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L5.414 10l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
        </button>
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className={`${btnBase} ${btnTheme} px-3 h-10 hover:scale-105 active:scale-95 transition-transform`}
          aria-label="Previous page"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      {/* 页码按钮 */}
      <div className="flex items-center gap-1">
        {renderPageNumbers()}
      </div>

      {/* 导航按钮 */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`${btnBase} ${btnTheme} px-3 h-10 hover:scale-105 active:scale-95 transition-transform`}
          aria-label="Next page"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </button>
        <button
          onClick={() => goToPage(totalPages)}
          disabled={currentPage === totalPages}
          className={`${btnBase} ${btnTheme} px-3 h-10 hover:scale-105 active:scale-95 transition-transform`}
          aria-label="Last page"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
            <path fillRule="evenodd" d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      {/* 快速跳转 */}
      <div className={`flex items-center gap-1 ml-2 px-3 py-1 rounded-full transition-all duration-300 ${isInputFocused ? 'ring-2 ring-opacity-50 ' + getThemeClass('ring-blue-400', {
        light: 'ring-blue-400',
        dark: 'ring-blue-500',
        green: 'ring-emerald-400',
        purple: 'ring-purple-400',
        orange: 'ring-orange-400',
        blue: 'ring-blue-400',
        pink: 'ring-pink-400',
        brown: 'ring-amber-400',
      }) : ''}`}>
        <span className="text-sm whitespace-nowrap">跳至</span>
        <input
          type="number"
          min={1}
          max={totalPages}
          value={inputValue}
          onChange={e => setInputValue(Number(e.target.value))}
          onBlur={() => {
            goToPage(inputValue);
            setIsInputFocused(false);
          }}
          onFocus={() => setIsInputFocused(true)}
          onKeyDown={e => { if (e.key === 'Enter') goToPage(inputValue); }}
          className={`w-12 text-center rounded-full ${inputTheme} text-sm h-8 border-none outline-none transition-all duration-300`}
        />
        <span className="text-sm whitespace-nowrap">页</span>
      </div>

      {/* 动画样式 */}
      <style jsx>{`
        button {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        button:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }
        button:active {
          transform: translateY(0);
          box-shadow: none;
        }
        .page-btn-active {
          transform: scale(1.1);
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }
      `}</style>
    </div>
  );
});

PaginationBar.displayName = "PaginationBar";

export default PaginationBar;