"use client";

import { useEffect, useState } from "react";
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
  // 直接在初始化时生成随机标语
  const [currentQuote, setCurrentQuote] = useState(getRandomQuote());
  const [offset, setOffset] = useState(0);
  const [isPreloading, setIsPreloading] = useState(false);

  // 随机选择一个标语
  function getRandomQuote() {
    const quoteIndex = Math.floor(Math.random() * quotes.length);
    return quotes[quoteIndex];
  }

  // 获取 Bing 壁纸数据
  const fetchBingWallpapers = async (offset: number) => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/bing?offset=${offset}`);
      const data = await response.json();
      const images = data.images;

      const wallpaperData = images.map((image: any) => ({
        url: `https://www.bing.com${image.url}`,
        copyright: image.copyright,
        title: image.title,
        location: image.copyright.split("(")[1]?.split(")")[0] || "未知地点",
      }));

      setWallpapers((prev) => {
        if (offset === 0) {
          return wallpaperData;
        }
        const existingUrls = prev.map((w: BingWallpaper) => w.url);
        const uniqueWallpaperData = wallpaperData.filter(
          (w: BingWallpaper) => !existingUrls.includes(w.url)
        );
        return [...prev, ...uniqueWallpaperData];
      });
    } catch (error) {
      console.error("Failed to fetch Bing wallpapers:", error);
    } finally {
      setIsLoading(false);
      setIsPreloading(false);
    }
  };

  // 初始化时获取第一批壁纸
  useEffect(() => {
    const initWallpapers = async () => {
      await fetchBingWallpapers(offset);
      setCurrentIndex(0);
    };
    initWallpapers();
  }, []);

  // 预加载下一组壁纸和图片
  useEffect(() => {
    if (currentIndex >= wallpapers.length - 3 && !isPreloading) {
      let newOffset = offset + 8;
      if (newOffset > 16) newOffset = 0;
      setOffset(newOffset);
      setIsPreloading(true);
      fetchBingWallpapers(newOffset);

      if (currentIndex < wallpapers.length - 1) {
        const nextImage = new Image();
        nextImage.src = wallpapers[currentIndex + 1].url;
      }
    }

    const preloadImages = () => {
      if (currentIndex > 0) {
        const prevImage = new Image();
        prevImage.src = wallpapers[currentIndex - 1].url;
      }
      if (currentIndex < wallpapers.length - 1) {
        const nextImage = new Image();
        nextImage.src = wallpapers[currentIndex + 1].url;
      }
    };

    preloadImages();
  }, [currentIndex, wallpapers.length, isPreloading, offset, wallpapers]);

  // 滚动到内容区域
  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  // 切换到下一张壁纸
  const nextWallpaper = () => {
    if (currentIndex < wallpapers.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setCurrentQuote(getRandomQuote());
    } else if (currentIndex === wallpapers.length - 1) {
      setCurrentIndex(0);
      setCurrentQuote(getRandomQuote());
      if (offset + 8 > 16) {
        setOffset(0);
      }
    }
  };

  // 切换到上一张壁纸
  const prevWallpaper = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setCurrentQuote(getRandomQuote());
    } else if (currentIndex === 0) {
      setCurrentIndex(wallpapers.length - 1);
      setCurrentQuote(getRandomQuote());
    }
  };

  // 处理打字完成后的回调
  const handleTypingComplete = () => {
    const newQuote = getRandomQuote();
    if (newQuote.text === currentQuote.text) {
      setCurrentQuote(
        quotes[
          (quotes.findIndex((q) => q.text === currentQuote.text) + 1) %
            quotes.length
        ]
      );
    } else {
      setCurrentQuote(newQuote);
    }
  };

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

  const currentWallpaper = wallpapers[currentIndex];
  if (!currentWallpaper) {
    setCurrentIndex(0);
    return null;
  }

  return (
    <div className="relative w-full" style={{ height: "100vh" }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentWallpaper.url}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0 w-full h-full"
            style={{
              backgroundImage: `url(${currentWallpaper.url})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />
          <div className="absolute inset-0 bg-black/30" />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 flex items-center justify-center">
        <TypewriterQuote
          key={currentQuote.text}
          text={currentQuote.text}
          author={currentQuote.author}
          onTypingComplete={handleTypingComplete}
        />
      </div>

      <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2">
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          onClick={scrollToContent}
          className="animate-bounce text-white hover:text-blue-400 transition-colors"
          aria-label="Scroll to content"
        >
          <ChevronDownIcon className="h-10 w-10" />
        </motion.button>
      </div>

      {/* Navigation buttons */}
      <div className="absolute top-1/2 -translate-y-1/2 left-4 sm:left-8">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          onClick={prevWallpaper}
          className="p-2 sm:p-3 text-white/50 hover:text-white bg-black/10 hover:bg-black/30 hover:backdrop-blur-sm rounded-full transition-all duration-300 hover:scale-110"
          aria-label="Previous wallpaper"
        >
          <ChevronLeftIcon className="h-6 w-6 sm:h-7 sm:w-7" />
        </motion.button>
      </div>

      <div className="absolute top-1/2 -translate-y-1/2 right-4 sm:right-8">
        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          onClick={nextWallpaper}
          className="p-2 sm:p-3 text-white/50 hover:text-white bg-black/10 hover:bg-black/30 hover:backdrop-blur-sm rounded-full transition-all duration-300 hover:scale-110"
          aria-label="Next wallpaper"
        >
          <ChevronRightIcon className="h-6 w-6 sm:h-7 sm:w-7" />
        </motion.button>
      </div>

      {/* Info button */}
      <div className="absolute top-4 right-4 sm:top-8 sm:right-8 flex flex-col items-end">
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          onClick={() => setShowInfo(!showInfo)}
          className="p-2 sm:p-3 text-white/50 hover:text-white bg-black/10 hover:bg-black/30 hover:backdrop-blur-sm rounded-full transition-all duration-300 hover:scale-110"
          aria-label="Toggle information"
        >
          <InformationCircleIcon className="h-6 w-6 sm:h-7 sm:w-7" />
        </motion.button>

        {/* Wallpaper information */}
        <AnimatePresence>
          {showInfo && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="mt-2 bg-black/40 backdrop-blur-sm text-white p-4 rounded-lg w-[calc(100vw-2rem)] sm:w-[420px]"
            >
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
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
