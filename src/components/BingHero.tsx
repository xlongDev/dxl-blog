"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
 
import {
  ChevronDownIcon,
  InformationCircleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowDownTrayIcon,
} from "@heroicons/react/24/outline";
import { quotes } from "@/data/quotes";
import TypewriterQuote from "./TypewriterQuote";
import Image from "next/image";

interface BingWallpaper {
  url: string;
  copyright: string;
  title: string;
  location: string;
}

export default function BingHero() {
  const [wallpapers, setWallpapers] = useState<BingWallpaper[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showInfo, setShowInfo] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentQuote, setCurrentQuote] = useState(getRandomQuote());
  const [offset, setOffset] = useState(0);
  const [isLoadingNext, setIsLoadingNext] = useState(false);
  const [isLoadingPrev, setIsLoadingPrev] = useState(false);
  const MAX_INDEX = 7;
  const preloadedUrlsRef = useRef<Set<string>>(new Set());

  // 随机选择标语
  function getRandomQuote() {
    return quotes[Math.floor(Math.random() * quotes.length)];
  }

  // 预加载图片
  const preloadImage = (url: string) =>
    new Promise<void>((resolve) => {
      if (preloadedUrlsRef.current.has(url)) {
        resolve();
        return;
      }
      
      const img = new window.Image();
      img.src = url;
      img.onload = () => {
        preloadedUrlsRef.current.add(url);
        resolve();
      };
      img.onerror = () => resolve();
    });

  // 获取壁纸数据
  const fetchBingWallpapers = async (offset: number): Promise<BingWallpaper[]> => {
    try {
      const response = await fetch(`/api/bing?offset=${offset}`);
      if (!response.ok) throw new Error('Failed to fetch wallpapers');
      
      const data = await response.json();
      return data.images.map((image: any) => ({
        url: `https://www.bing.com${image.url}`,
        copyright: image.copyright,
        title: image.title,
        location: image.copyright.split("(")[1]?.split(")")[0] || "未知地点",
      }));
    } catch (error) {
      console.error("Failed to fetch Bing wallpapers:", error);
      return [];
    }
  };

  // 预加载相邻壁纸
  const preloadAdjacentWallpapers = async (index: number) => {
    if (index < 0 || index >= wallpapers.length) return;
    
    const nextIndex = index + 1;
    const prevIndex = index - 1;
    
    if (nextIndex < wallpapers.length) {
      await preloadImage(wallpapers[nextIndex].url);
    }
    
    if (prevIndex >= 0) {
      await preloadImage(wallpapers[prevIndex].url);
    }
  };

  // 初始化壁纸
  useEffect(() => {
    const initWallpapers = async () => {
      setIsLoading(true);
      try {
        const firstBatch = await fetchBingWallpapers(0);
        if (firstBatch.length > 0) {
          setWallpapers(firstBatch);
          // 预加载首张和下一张
          await Promise.all([
            preloadImage(firstBatch[0].url),
            firstBatch[1] ? preloadImage(firstBatch[1].url) : Promise.resolve()
          ]);
          setCurrentIndex(0);
        }
      } catch (error) {
        console.error("Initialization failed:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    initWallpapers();
  }, []);

  // 预加载LCP图片
  useEffect(() => {
    // 只有当有壁纸且是第一张时才预加载
    if (!wallpapers.length || !wallpapers[0]?.url) return;
    
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = wallpapers[0].url;
    document.head.appendChild(link);
    
    return () => {
      document.head.removeChild(link);
    };
  }, [wallpapers]);

  // 滚动到内容区域
  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  // 切换到下一张壁纸
  const nextWallpaper = async () => {
    if (isLoadingNext || (currentIndex >= wallpapers.length - 1 && offset >= MAX_INDEX)) return;
    setIsLoadingNext(true);
    
    try {
      const targetIndex = currentIndex + 1;
      
      // 需要新批次数据
      if (targetIndex >= wallpapers.length && offset < MAX_INDEX) {
        const newOffset = offset + 1;
        const newBatch = await fetchBingWallpapers(newOffset);
        
        if (newBatch.length > 0) {
          setWallpapers(prev => [...prev, ...newBatch]);
          setOffset(newOffset);
        }
      }
      
      // 确保目标壁纸已加载
      const targetUrl = wallpapers[targetIndex]?.url;
      if (targetUrl) {
        await preloadImage(targetUrl);
      }
      
      setCurrentIndex(targetIndex);
      setCurrentQuote(getRandomQuote());
      await preloadAdjacentWallpapers(targetIndex);
    } catch (error) {
      console.error("Next wallpaper failed:", error);
    } finally {
      setIsLoadingNext(false);
    }
  };

  // 切换到上一张壁纸
  const prevWallpaper = async () => {
    if (isLoadingPrev || currentIndex === 0) return;
    setIsLoadingPrev(true);
    
    try {
      const targetIndex = currentIndex - 1;
      
      // 确保目标壁纸已加载
      const targetUrl = wallpapers[targetIndex]?.url;
      if (targetUrl) {
        await preloadImage(targetUrl);
      }
      
      setCurrentIndex(targetIndex);
      setCurrentQuote(getRandomQuote());
      await preloadAdjacentWallpapers(targetIndex);
    } catch (error) {
      console.error("Previous wallpaper failed:", error);
    } finally {
      setIsLoadingPrev(false);
    }
  };

  // 处理打字完成
  const handleTypingComplete = () => {
    setCurrentQuote(prev => {
      const currentIndex = quotes.findIndex(q => q.text === prev.text);
      return quotes[(currentIndex + 1) % quotes.length];
    });
  };

  // 恢复骨架屏
  if (isLoading || !wallpapers.length) {
    return (
      <div
        className="relative w-full flex items-center justify-center"
        style={{ height: "100vh" }}
      >
        <div className="w-full h-full">
          {/* 骨架屏效果 */}
          <div className="absolute inset-0 w-full h-full bg-gray-800 dark:bg-gray-900">
            {/* 模拟壁纸的骨架屏 */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 bg-[length:200%_100%] animate-shimmer"></div>
            </div>

            {/* 模拟导航按钮 */}
            <div className="absolute top-1/2 -translate-y-1/2 left-4 sm:left-8">
              <div className="p-2 sm:p-3 bg-gray-700 dark:bg-gray-800 rounded-full animate-pulse"></div>
            </div>
            <div className="absolute top-1/2 -translate-y-1/2 right-4 sm:right-8">
              <div className="p-2 sm:p-3 bg-gray-700 dark:bg-gray-800 rounded-full animate-pulse"></div>
            </div>

            {/* 模拟信息按钮 */}
            <div className="absolute top-4 right-4 sm:top-8 sm:right-8">
              <div className="p-2 sm:p-3 bg-gray-700 dark:bg-gray-800 rounded-full animate-pulse"></div>
            </div>

            {/* 模拟中央文字区域 */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/4 max-w-2xl space-y-4">
              <div className="h-8 bg-gray-700 dark:bg-gray-800 rounded-lg w-full animate-pulse"></div>
              <div className="h-4 bg-gray-700 dark:bg-gray-800 rounded-lg w-3/4 mx-auto animate-pulse"></div>
              <div className="h-4 bg-gray-700 dark:bg-gray-800 rounded-lg w-1/2 mx-auto animate-pulse"></div>
              <div className="h-4 bg-gray-700 dark:bg-gray-800 rounded-lg w-2/3 mx-auto animate-pulse"></div>
            </div>

            {/* 模拟底部滚动按钮 */}
            <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2">
              <div className="h-10 w-10 bg-gray-700 dark:bg-gray-800 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentWallpaper = wallpapers[currentIndex] || wallpapers[0];
  if (!currentWallpaper) return null;

  return (
    <div className="relative w-full" style={{ height: "100vh" }}>
      {/* 壁纸展示区 - 优化动画流程 */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentWallpaper.url}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Image
              src={currentWallpaper.url}
              alt={currentWallpaper.title}
              fill
              priority
              className="object-cover"
              sizes="100vw"
              draggable={false}
              onLoad={() => preloadedUrlsRef.current.add(currentWallpaper.url)}
            />
            <div className="absolute inset-0 bg-black/30" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 内容区域 */}
      <div className="absolute inset-0 flex items-center justify-center">
        <TypewriterQuote
          key={currentQuote.text}
          text={currentQuote.text}
          author={currentQuote.author}
          onTypingComplete={handleTypingComplete}
        />
      </div>

      {/* 滚动指示器 */}
      <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2">
        <button
          onClick={scrollToContent}
          className="animate-bounce text-white hover:text-blue-400 transition-colors"
          aria-label="Scroll to content"
        >
          <ChevronDownIcon className="h-10 w-10" />
        </button>
      </div>

      {/* 导航按钮 - 添加加载状态反馈 */}
      <div className="absolute top-1/2 -translate-y-1/2 left-4 sm:left-8">
        <button
          onClick={prevWallpaper}
          disabled={isLoadingPrev || currentIndex === 0}
          className={`p-2 sm:p-3 rounded-full transition-all duration-300 ${
            isLoadingPrev || currentIndex === 0
              ? "cursor-not-allowed opacity-50"
              : "text-white/50 hover:text-white bg-black/10 hover:bg-black/30 hover:backdrop-blur-sm hover:scale-110"
          }`}
          aria-label="Previous wallpaper"
        >
          {isLoadingPrev ? (
            <div className="h-6 w-6 sm:h-7 sm:w-7 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <ChevronLeftIcon className="h-6 w-6 sm:h-7 sm:w-7" />
          )}
        </button>
      </div>

      <div className="absolute top-1/2 -translate-y-1/2 right-4 sm:right-8">
        <button
          onClick={nextWallpaper}
          disabled={isLoadingNext || (currentIndex >= wallpapers.length - 1 && offset >= MAX_INDEX)}
          className={`p-2 sm:p-3 rounded-full transition-all duration-300 ${
            isLoadingNext || (currentIndex >= wallpapers.length - 1 && offset >= MAX_INDEX)
              ? "cursor-not-allowed opacity-50"
              : "text-white/50 hover:text-white bg-black/10 hover:bg-black/30 hover:backdrop-blur-sm hover:scale-110"
          }`}
          aria-label="Next wallpaper"
        >
          {isLoadingNext ? (
            <div className="h-6 w-6 sm:h-7 sm:w-7 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <ChevronRightIcon className="h-6 w-6 sm:h-7 sm:w-7" />
          )}
        </button>
      </div>

      {/* 信息面板 */}
      <div className="absolute top-4 right-4 sm:top-8 sm:right-8 flex flex-col items-end">
        <button
          onClick={() => setShowInfo(!showInfo)}
          className="p-2 sm:p-3 text-white/50 hover:text-white bg-black/10 hover:bg-black/30 hover:backdrop-blur-sm rounded-full transition-all duration-300 hover:scale-110"
          aria-label="Toggle information"
        >
          <InformationCircleIcon className="h-6 w-6 sm:h-7 sm:w-7" />
        </button>

        {showInfo && (
          <div className="mt-2 bg-black/40 backdrop-blur-sm text-white p-4 rounded-lg w-[calc(100vw-2rem)] sm:w-[420px]">
            <div className="flex justify-between items-start">
              <div className="flex-1 pr-4">
                <h3 className="font-bold mb-2 text-sm sm:text-base">
                  {currentWallpaper.title}
                </h3>
                <p className="text-xs sm:text-sm">
                  {currentWallpaper.copyright}
                </p>
              </div>
              <button
                onClick={async () => {
                  try {
                    const response = await fetch(currentWallpaper.url);
                    const blob = await response.blob();
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = `${currentWallpaper.title}.jpg`;
                    document.body.appendChild(a);
                    a.click();
                    window.URL.revokeObjectURL(url);
                    document.body.removeChild(a);
                  } catch (error) {
                    console.error("下载失败:", error);
                  }
                }}
                className="p-2 text-white/50 hover:text-white bg-black/10 hover:bg-black/30 hover:backdrop-blur-sm rounded-full transition-all duration-300 hover:scale-110"
                aria-label="下载壁纸"
              >
                <ArrowDownTrayIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}