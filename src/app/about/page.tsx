"use client";

import { motion } from "framer-motion";
import Profile from "@/components/about/Profile";
import Contact from "@/components/about/Contact";
import TechStack from "@/components/about/TechStack";
import { useThemeUtils } from "@/hooks/useThemeUtils";
import { THEME_COLORS } from "@/hooks/themeConstants";

export default function AboutPage() {
  const { getThemeColor } = useThemeUtils();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  // 根据主题获取标题渐变色
  const titleGradient = getThemeColor(
    "from-blue-400 via-purple-400 to-pink-400",
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

  // 根据主题获取装饰线条渐变色
  const decorLineGradient = getThemeColor(
    "from-transparent to-blue-600",
    "from-transparent to-purple-600",
    {
      green: "from-transparent to-green-600",
      purple: "from-transparent to-indigo-600",
      orange: "from-transparent to-orange-600",
      blue: "from-transparent to-blue-600",
      pink: "from-transparent to-pink-600",
      brown: "from-transparent to-amber-700",
    }
  );

  const decorLineGradientReverse = getThemeColor(
    "from-purple-600 to-transparent",
    "from-blue-600 to-transparent",
    {
      green: "from-emerald-600 to-transparent",
      purple: "from-fuchsia-600 to-transparent",
      orange: "from-yellow-600 to-transparent",
      blue: "from-cyan-600 to-transparent",
      pink: "from-rose-600 to-transparent",
      brown: "from-orange-700 to-transparent",
    }
  );

  // 根据主题获取卡片背景色
  const cardBgColor = getThemeColor(
    "bg-white/80 dark:bg-gray-800/80",
    "bg-white/80 dark:bg-gray-800/80",
    {
      green:
        "bg-white/80 dark:bg-gray-800/80 dark:bg-opacity-90 dark:border-green-800/30",
      purple:
        "bg-white/80 dark:bg-gray-800/80 dark:bg-opacity-90 dark:border-purple-800/30",
      orange:
        "bg-white/80 dark:bg-gray-800/80 dark:bg-opacity-90 dark:border-orange-800/30",
      blue: "bg-white/80 dark:bg-gray-800/80 dark:bg-opacity-90 dark:border-blue-800/30",
      pink: "bg-white/80 dark:bg-gray-800/80 dark:bg-opacity-90 dark:border-pink-800/30",
      brown:
        "bg-white/80 dark:bg-gray-800/80 dark:bg-opacity-90 dark:border-amber-800/30",
    }
  );

  return (
    <motion.div
      className="w-full bg-[hsl(var(--background))] transition-colors duration-300"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <motion.div className="flex items-center justify-center gap-6 mb-16">
          <motion.div
            className={`hidden md:block h-0.5 w-16 bg-gradient-to-r ${decorLineGradient}`}
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 64, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
          <motion.h1
            className={`text-5xl font-extrabold text-center bg-gradient-to-r ${titleGradient} bg-clip-text text-transparent`}
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            关于我
          </motion.h1>
          <motion.div
            className={`hidden md:block h-0.5 w-16 bg-gradient-to-r ${decorLineGradientReverse}`}
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 64, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
        </motion.div>

        <motion.div
          className={`${cardBgColor} backdrop-blur-sm rounded-2xl shadow-xl p-6 sm:p-10 mb-12 sm:mb-16 border ${getThemeColor(
            "border-gray-700/50",
            "border-gray-200/50",
            {
              green: "border-green-200/50 dark:border-green-700/50",
              purple: "border-purple-200/50 dark:border-purple-700/50",
              orange: "border-orange-200/50 dark:border-orange-700/50",
              blue: "border-blue-200/50 dark:border-blue-700/50",
              pink: "border-pink-200/50 dark:border-pink-700/50",
              brown: "border-amber-200/50 dark:border-amber-700/50",
            }
          )}`}
          variants={itemVariants}
          whileHover={{
            boxShadow:
              "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* 左侧个人信息和联系方式 */}
            <div className="lg:col-span-4 space-y-8">
              <Profile itemVariants={itemVariants} />
              <Contact itemVariants={itemVariants} />
            </div>

            {/* 右侧技术栈 */}
            <div className="lg:col-span-8">
              <TechStack itemVariants={itemVariants} />
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
