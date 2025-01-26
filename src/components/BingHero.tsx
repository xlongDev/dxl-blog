"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDownIcon,
  InformationCircleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { quotes } from "@/data/quotes";
import TypewriterQuote from "./TypewriterQuote";
import OptimizedImage from "./OptimizedImage";

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
  const [currentQuote, setCurrentQuote] = useState(quotes[0]);
  const [offset, setOffset] = useState(0);
  const [isPreloading, setIsPreloading] = useState(false); // 用于标记是否正在预加载

  // 随机选择一个标语
  const getRandomQuote = () => {
    const quoteIndex = Math.floor(Math.random() * quotes.length);
    return quotes[quoteIndex];
  };

  // 初始化时随机选择一个标语
  useEffect(() => {
    setCurrentQuote(getRandomQuote());
  }, []);

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

      // 将新获取的壁纸追加到现有壁纸列表中
      setWallpapers((prev) => {
        // 如果是初始加载（offset为0），直接使用新数据
        if (offset === 0) {
          return wallpaperData;
        }

        // 否则检查新数据是否已经存在，避免重复追加
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
      setIsPreloading(false); // 预加载完成
    }
  };

  // 初始化时获取第一批壁纸
  useEffect(() => {
    const initWallpapers = async () => {
      await fetchBingWallpapers(offset);
      // 设置 currentIndex 为0，因为最新的壁纸在数组的开始位置
      setCurrentIndex(0);
    };
    initWallpapers();
  }, []);

  // 预加载下一组壁纸和图片
  useEffect(() => {
    // 当用户浏览到当前组壁纸的后半部分时预加载下一组壁纸
    if (currentIndex >= wallpapers.length - 3 && !isPreloading) {
      let newOffset = offset + 8;
      if (newOffset > 16) newOffset = 0;

      setOffset(newOffset);
      setIsPreloading(true);
      fetchBingWallpapers(newOffset);

      // 预加载下一张图片
      if (currentIndex < wallpapers.length - 1) {
        const nextImage = new Image();
        nextImage.src = wallpapers[currentIndex + 1].url;
      }
    }

    // 预加载当前显示的图片的前后各一张
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
      // 如果当前是最后一张壁纸，重置 currentIndex 为 0
      setCurrentIndex(0);
      setCurrentQuote(getRandomQuote());

      // 如果 offset 超过 16，重置为 0
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
      // 如果当前是第一张壁纸，切换到数组的最后一张
      setCurrentIndex(wallpapers.length - 1);
      setCurrentQuote(getRandomQuote());
    }
  };

  // 处理打字完成后的回调
  const handleTypingComplete = () => {
    setCurrentQuote(getRandomQuote());
  };

  // 如果壁纸数据未加载完成，显示加载状态
  if (isLoading || !wallpapers.length) {
    return (
      <div
        className="relative w-full flex items-center justify-center"
        style={{ height: "100vh" }}
      >
        <div className="text-white text-lg">加载中...</div>
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
      <div className="absolute top-4 right-4 sm:top-8 sm:right-8">
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
      </div>

      {/* Wallpaper information */}
      <AnimatePresence>
        {showInfo && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute top-16 right-4 sm:top-20 sm:right-8 bg-black/40 backdrop-blur-sm text-white p-4 rounded-lg max-w-[calc(100vw-2rem)] sm:max-w-md"
          >
            <h3 className="font-bold mb-2 text-sm sm:text-base">
              {currentWallpaper.title}
            </h3>
            <p className="text-xs sm:text-sm">{currentWallpaper.copyright}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
