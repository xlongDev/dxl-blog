"use client";

import { useState } from "react";
import Search from "@/components/Search";
import { allPosts } from "contentlayer/generated";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Logo from "./Header/Logo";
import Navigation from "./Header/Navigation";
import Actions from "./Header/Actions";
import ReadingProgress from "@/components/ReadingProgress";

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200/50 dark:border-gray-700/50 shadow-lg transition-all duration-300 hover:shadow-xl">
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Logo />
            {/* <ReadingProgress /> */}
            {/* 桌面端导航 */}
            <div className="hidden md:flex items-center space-x-6">
              <Navigation />
              <Actions onSearchClick={() => setIsSearchOpen(true)} />
            </div>
            {/* 移动端导航 */}
            <div className="flex items-center space-x-2 md:hidden">
              <Actions onSearchClick={() => setIsSearchOpen(true)} />
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-300"
              >
                {isMobileMenuOpen ? (
                  <XMarkIcon className="h-6 w-6" />
                ) : (
                  <Bars3Icon className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* 移动端菜单 */}
      <div
        className={`md:hidden fixed top-0 right-0 w-85 h-screen z-40 bg-white/70 dark:bg-gray-900/90 backdrop-blur-sm transform transition-all duration-300 ease-in-out shadow-xl border-l border-gray-200/50 dark:border-gray-700/50 ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col items-start space-y-6 p-6 pt-20 h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent hover:scrollbar-thumb-gray-400 dark:hover:scrollbar-thumb-gray-500 scrollbar-thumb-rounded-full ">
          <Navigation onNavigate={() => setIsMobileMenuOpen(false)} />
        </div>
      </div>

      {/* 移动端菜单背景遮罩 */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 z-30 bg-black/20 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* 搜索对话框 */}
      <Search
        isOpen={isSearchOpen}
        setIsOpen={setIsSearchOpen}
        posts={allPosts}
      />
    </>
  );
}
