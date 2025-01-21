"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { quotes, backgrounds } from "@/data/hero";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

export default function Hero() {
  const [currentQuote, setCurrentQuote] = useState(quotes[0]);
  const [currentBg, setCurrentBg] = useState(backgrounds[0]);

  useEffect(() => {
    const quoteIndex = Math.floor(Math.random() * quotes.length);
    const bgIndex = Math.floor(Math.random() * backgrounds.length);
    setCurrentQuote(quotes[quoteIndex]);
    setCurrentBg(backgrounds[bgIndex]);
  }, []);

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative w-full" style={{ height: "100vh" }}>
      <AnimatePresence>
        <motion.div
          key={currentBg.url}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0 w-full h-full"
            style={{
              backgroundImage: `url(${currentBg.url})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              height: "100vh",
              minHeight: "100vh",
            }}
          />
          <div className="absolute inset-0 bg-black/30" />
        </motion.div>
      </AnimatePresence>

      <div className="relative h-full flex flex-col items-center justify-center text-white px-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-center mb-4 tracking-wider leading-relaxed"
          style={{
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
            fontFamily: "var(--font-noto-serif-sc)",
            letterSpacing: "0.1em",
          }}
        >
          {currentQuote.text}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-lg md:text-xl text-center text-gray-200 tracking-wide"
          style={{
            textShadow: "1px 1px 2px rgba(0, 0, 0, 0.2)",
            fontFamily: "var(--font-noto-sans-sc)",
            letterSpacing: "0.05em",
          }}
        >
          {currentQuote.translation}
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          onClick={scrollToContent}
          className="absolute bottom-8 animate-bounce"
          aria-label="Scroll to content"
        >
          <ChevronDownIcon className="h-8 w-8" />
        </motion.button>
      </div>
    </div>
  );
}