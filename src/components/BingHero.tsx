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
  useEffect(() => {
    const fetchBingWallpapers = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/bing");
        const data = await response.json();
        const images = data.images;

        const wallpaperData = images.map((image: any) => ({
          url: `https://www.bing.com${image.url}`,
          copyright: image.copyright,
          title: image.title,
          location: image.copyright.split("(")[1]?.split(")")[0] || "未知地点",
        }));

        setWallpapers(wallpaperData);
      } catch (error) {
        console.error("Failed to fetch Bing wallpapers:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBingWallpapers();
  }, []);

  // 滚动到内容区域
  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  // 切换到下一张壁纸
  const nextWallpaper = () => {
    if (wallpapers.length > 1) {
      setCurrentIndex((prev) => (prev + 1) % wallpapers.length);
      setCurrentQuote(getRandomQuote());
    }
  };

  // 切换到上一张壁纸
  const prevWallpaper = () => {
    if (wallpapers.length > 1) {
      setCurrentIndex(
        (prev) => (prev - 1 + wallpapers.length) % wallpapers.length
      );
      setCurrentQuote(getRandomQuote());
    }
  };

  // 处理打字完成后的回调
  const handleTypingComplete = () => {
    setCurrentQuote(getRandomQuote());
  };

  if (!wallpapers.length) return null;

  const currentWallpaper = wallpapers[currentIndex];

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