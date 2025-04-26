"use client";

import { useState, useEffect } from "react";
import Image, { ImageProps } from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface OptimizedImageProps extends Omit<ImageProps, "alt"> {
  alt: string;
  lowQualityUrl?: string;
  priority?: boolean;
  className?: string;
  loadingSize?: "small" | "medium" | "large";
}

export default function OptimizedImage({
  src,
  alt,
  lowQualityUrl,
  priority = false,
  className = "",
  loadingSize = "medium",
  ...props
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(!priority);
  const [blurUrl, setBlurUrl] = useState(lowQualityUrl);

  // 根据 loadingSize 设置骨架屏大小
  const skeletonSizes = {
    small: "w-24 h-24",
    medium: "w-48 h-48",
    large: "w-96 h-96",
  };

  useEffect(() => {
    // 如果没有提供低质量图片URL，生成一个模糊的占位图
    if (!lowQualityUrl) {
      setBlurUrl("data:image/svg+xml,..."); // 这里可以生成一个简单的SVG占位图
    }
  }, [lowQualityUrl]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={`absolute inset-0 bg-gray-200 dark:bg-gray-800 animate-pulse rounded-lg ${skeletonSizes[loadingSize]}`}
          />
        )}
      </AnimatePresence>

      <Image
        src={src}
        alt={alt}
        priority={priority}
        onLoadingComplete={() => setIsLoading(false)}
        className={`transition-opacity duration-300 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
        placeholder={blurUrl ? "blur" : "empty"}
        blurDataURL={blurUrl}
        {...props}
      />
    </div>
  );
}
