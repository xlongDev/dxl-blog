"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface ProfileProps {
  itemVariants: any;
}

export default function Profile({ itemVariants }: ProfileProps) {
  return (
    <div className="text-center">
      <motion.div
        className="relative inline-block mb-8"
        whileHover={{ scale: 1.05, rotate: 5 }}
        transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
      >
        <div className="relative">
          <Image
            src="/ava.jpg"
            alt="晓龙"
            width={200}
            height={200}
            className="rounded-full ring-4 ring-blue-500/20 shadow-lg relative z-10"
            priority
          />
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-pink-500/30 animate-pulse blur-lg z-0" />
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-full blur-md opacity-40 animate-gradient-slow z-0" />
          <div className="absolute -inset-2 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-full blur-xl opacity-20 animate-gradient-reverse z-0" />
        </div>
      </motion.div>
      <motion.h2
        className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
        variants={itemVariants}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
      >
        晓龙
      </motion.h2>
      <motion.p
        className="text-gray-600 dark:text-gray-400 text-lg sm:text-xl mb-3 sm:mb-4 font-medium"
        variants={itemVariants}
      >
        前端开发者 / 跑者
      </motion.p>
      <motion.p
        className="text-gray-500 dark:text-gray-400 text-base sm:text-lg leading-relaxed max-w-md mx-auto"
        variants={itemVariants}
      >
        热爱技术，专注于前端开发。致力于创造优秀的用户体验和高质量的代码。
      </motion.p>
    </div>
  );
}
