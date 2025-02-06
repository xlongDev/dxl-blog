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
            <ReadingProgress />
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
        className={`md:hidden fixed inset-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col items-center space-y-6 pt-20">
          <Navigation onNavigate={() => setIsMobileMenuOpen(false)} />
        </div>
      </div>

      {/* 搜索对话框 */}
      <Search
        isOpen={isSearchOpen}
        setIsOpen={setIsSearchOpen}
        posts={allPosts}
      />
    </>
  );
}
