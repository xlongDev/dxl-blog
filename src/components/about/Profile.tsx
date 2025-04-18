"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useThemeUtils } from "@/hooks/useThemeUtils";

interface ProfileProps {
  itemVariants: any;
}

export default function Profile({ itemVariants }: ProfileProps) {
  const { getThemeColor } = useThemeUtils();

  // 根据主题获取头像装饰渐变色
  const avatarGradient = getThemeColor(
    "from-blue-500/30 via-purple-500/30 to-pink-500/30",
    "from-blue-500/30 via-purple-500/30 to-pink-500/30",
    {
      green: "from-green-500/30 via-teal-500/30 to-emerald-500/30",
      purple: "from-indigo-500/30 via-purple-500/30 to-fuchsia-500/30",
      orange: "from-orange-500/30 via-amber-500/30 to-yellow-500/30",
      blue: "from-blue-500/30 via-sky-500/30 to-cyan-500/30",
      pink: "from-pink-500/30 via-rose-500/30 to-fuchsia-500/30",
      brown: "from-amber-700/30 via-yellow-700/30 to-orange-700/30",
    }
  );

  const avatarBorderGradient = getThemeColor(
    "from-blue-600 via-purple-600 to-pink-600",
    "from-blue-600 via-purple-600 to-pink-600",
    {
      green: "from-green-600 via-teal-600 to-emerald-600",
      purple: "from-indigo-600 via-purple-600 to-fuchsia-600",
      orange: "from-orange-600 via-amber-600 to-yellow-600",
      blue: "from-blue-600 via-sky-600 to-cyan-600",
      pink: "from-pink-600 via-rose-600 to-fuchsia-600",
      brown: "from-amber-700 via-yellow-700 to-orange-700",
    }
  );

  const nameGradient = getThemeColor(
    "from-blue-600 via-purple-600 to-pink-600",
    "from-blue-600 via-purple-600 to-pink-600",
    {
      green: "from-green-600 via-teal-600 to-emerald-600",
      purple: "from-indigo-600 via-purple-600 to-fuchsia-600",
      orange: "from-orange-600 via-amber-600 to-yellow-600",
      blue: "from-blue-600 via-sky-600 to-cyan-600",
      pink: "from-pink-600 via-rose-600 to-fuchsia-600",
      brown: "from-amber-700 via-yellow-700 to-orange-700",
    }
  );

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
            className="rounded-full ring-4 ring-blue-500/20 dark:ring-blue-500/40 shadow-lg relative z-10"
            priority
          />
          <div
            className={`absolute inset-0 rounded-full bg-gradient-to-r ${avatarGradient} animate-pulse blur-lg z-0`}
          />
          <div
            className={`absolute -inset-1 bg-gradient-to-r ${avatarBorderGradient} rounded-full blur-md opacity-40 animate-gradient-slow z-0`}
          />
          <div
            className={`absolute -inset-2 bg-gradient-to-r ${avatarBorderGradient} rounded-full blur-xl opacity-20 animate-gradient-reverse z-0`}
          />
        </div>
      </motion.div>
      <motion.h2
        className={`text-3xl sm:text-4xl font-bold mb-3 sm:mb-4 bg-gradient-to-r ${nameGradient} bg-clip-text text-transparent`}
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
        热爱技术、跑步，专注于前端开发领域。
      </motion.p>
    </div>
  );
}
