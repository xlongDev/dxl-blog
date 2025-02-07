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
  const [displayText, setDisplayText] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setShowCursor(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    let currentIndex = 0;
    let typingInterval: NodeJS.Timeout;
    let deleteTimeout: NodeJS.Timeout;

    setDisplayText("");
    setIsTypingComplete(false);
    setIsDeleting(false);

    typingInterval = setInterval(() => {
      if (currentIndex < text.length) {
        const nextText = text.slice(0, currentIndex + 1);
        setDisplayText(nextText);
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setIsTypingComplete(true);

        deleteTimeout = setTimeout(() => {
          setShowCursor(false);
          setIsDeleting(true);
        }, 3500);
      }
    }, 140);

    return () => {
      clearInterval(typingInterval);
      clearTimeout(deleteTimeout);
    };
  }, [text, mounted]);

  useEffect(() => {
    if (!mounted) return;

    if (isDeleting) {
      let currentIndex = displayText.length;
      let deletingInterval: NodeJS.Timeout;

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
      }, 50);

      return () => {
        clearInterval(deletingInterval);
      };
    }
  }, [isDeleting, displayText, onTypingComplete, mounted]);

  if (!mounted) {
    return null;
  }

  return (
    <div className="relative">
      <h1
        className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4 tracking-wider leading-relaxed text-white"
        style={{
          textShadow: "2px 2px 8px rgba(0, 0, 0, 0.5)",
          fontFamily: "var(--font-noto-serif-sc)",
          letterSpacing: "0.1em",
        }}
      >
        {displayText}
        {showCursor && <span className="animate-pulse">|</span>}
      </h1>
      <p className="text-base sm:text-lg text-center text-white/80">
        —— {author}
      </p>
    </div>
  );
}
