"use client";

import { motion } from "framer-motion";

export default function HeroTitle() {
  const tags = [
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Vue",
    "Web3",
    "前端工程化",
    "性能优化",
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-center space-y-6 sm:space-y-8 py-8 sm:py-12 px-4 sm:px-6"
    >
      <motion.h1
        className="text-4xl sm:text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-teal-500 to-green-400 leading-tight"
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        分享世界，记录成长
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-2xl sm:max-w-3xl mx-auto leading-relaxed px-4 sm:px-6"
      >
        探索前端技术的无限可能，分享开发心得与实践经验，
        一起在技术的海洋中不断成长。
      </motion.p>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="flex flex-wrap justify-center gap-2 sm:gap-3 max-w-2xl sm:max-w-3xl mx-auto px-4"
      >
        {tags.map((tag, index) => (
          <motion.span
            key={tag}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.6 + index * 0.1 }}
            className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-purple-500/10 to-rose-400/10 dark:from-purple-500/20 dark:to-rose-400/20 
                       text-gray-700 dark:text-gray-300 rounded-full text-sm sm:text-base font-medium
                       hover:from-purple-500/20 hover:to-rose-400/20 dark:hover:from-purple-500/30 dark:hover:to-rose-400/30
                       transition-all duration-300 cursor-pointer"
          >
            {tag}
          </motion.span>
        ))}
      </motion.div>
    </motion.section>
  );
}
