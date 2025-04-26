"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TypewriterQuoteProps {
  text: string;
  author: string;
  onTypingComplete: () => void;
}

export default function TypewriterQuote({
  text,
  author,
  onTypingComplete,
}: TypewriterQuoteProps) {
  // 初始状态均为 ""，确保服务端和客户端一致
  const [displayText, setDisplayText] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let currentIndex = 0;
    let typingInterval: NodeJS.Timeout;
    let deleteTimeout: NodeJS.Timeout;

    // 重置状态
    setDisplayText("");
    setIsTypingComplete(false);
    setIsDeleting(false);
    setShowCursor(true);

    // 开始打字动画
    typingInterval = setInterval(() => {
      if (currentIndex < text.length) {
        const nextText = text.slice(0, currentIndex + 1);
        setDisplayText(nextText);
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setIsTypingComplete(true);

        // 等待 3.5 秒后开始删除动画
        deleteTimeout = setTimeout(() => {
          setShowCursor(false);
          setIsDeleting(true);
        }, 3500);
      }
    }, 120);

    return () => {
      clearInterval(typingInterval);
      clearTimeout(deleteTimeout);
    };
  }, [text]);

  useEffect(() => {
    if (isDeleting) {
      let currentIndex = displayText.length;
      let deletingInterval: NodeJS.Timeout;

      // 开始删除动画
      deletingInterval = setInterval(() => {
        if (currentIndex > 0) {
          const nextText = displayText.slice(0, currentIndex - 1);
          setDisplayText(nextText);
          currentIndex--;
        } else {
          clearInterval(deletingInterval);
          setIsDeleting(false);
          onTypingComplete();
        }
      }, 30);

      return () => {
        clearInterval(deletingInterval);
      };
    }
  }, [isDeleting, displayText, onTypingComplete]);

  return (
    <div className="relative">
      <motion.h1
        className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4 tracking-wider leading-relaxed text-white"
        style={{
          textShadow: "2px 2px 8px rgba(0, 0, 0, 0.5)",
          fontFamily: "var(--font-noto-serif-sc)",
          letterSpacing: "0.1em",
          lineHeight: "1.5",
        }}
      >
        {displayText}
        <motion.span
          animate={{ opacity: showCursor ? [1, 0] : 0 }}
          transition={{ duration: 0.8, repeat: Infinity }}
          className="inline-block bg-white"
          style={{
            width: "2px",
            height: "0.8em",
            verticalAlign: "middle",
            marginLeft: "2px",
            visibility: showCursor ? "visible" : "hidden",
          }}
        />
      </motion.h1>
      <AnimatePresence>
        {isTypingComplete && author && !isDeleting && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute right-0 bottom-[-2rem] text-sm sm:text-base text-white"
            style={{
              textShadow: "1px 1px 4px rgba(0, 0, 0, 0.5)",
            }}
          >
            —— {author}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
