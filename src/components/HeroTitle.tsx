"use client";

import { motion } from "framer-motion";
import { useThemeUtils } from "@/hooks/useThemeUtils";
import { THEME_COLORS } from "@/hooks/themeConstants";

export default function HeroTitle() {
  const { theme, getThemeValue } = useThemeUtils();
  const tags = [
    "React",
    "Next.js",
    "JavaScript",
    "TypeScript",
    "Node.js",
    "Vue",
    "小程序",
  ];

  // 根据主题获取标题渐变色
  const getTitleGradient = () => {
    return getThemeValue(
      {
        light: "from-blue-500 via-teal-500 to-green-400",
        dark: "from-blue-400 via-teal-400 to-green-300",
        green: "from-green-500 via-emerald-500 to-teal-400",
        purple: "from-purple-500 via-violet-500 to-indigo-400",
        orange: "from-orange-500 via-amber-500 to-yellow-400",
        blue: "from-blue-500 via-sky-500 to-cyan-400",
        pink: "from-pink-500 via-rose-500 to-red-400",
        brown: "from-amber-700 via-amber-600 to-yellow-500",
      },
      "from-blue-500 via-teal-500 to-green-400"
    );
  };

  // 根据主题获取标签渐变色
  const getTagGradient = () => {
    return getThemeValue(
      {
        light:
          "from-purple-500/10 to-rose-400/10 dark:from-purple-500/20 dark:to-rose-400/20",
        dark: "from-blue-500/20 to-cyan-400/20",
        green:
          "from-green-500/10 to-emerald-400/10 dark:from-green-500/20 dark:to-emerald-400/20",
        purple:
          "from-purple-500/10 to-violet-400/10 dark:from-purple-500/20 dark:to-violet-400/20",
        orange:
          "from-orange-500/10 to-amber-400/10 dark:from-orange-500/20 dark:to-amber-400/20",
        blue: "from-blue-500/10 to-sky-400/10 dark:from-blue-500/20 dark:to-sky-400/20",
        pink: "from-pink-500/10 to-rose-400/10 dark:from-pink-500/20 dark:to-rose-400/20",
        brown:
          "from-amber-700/10 to-amber-500/10 dark:from-amber-700/20 dark:to-amber-500/20",
      },
      "from-purple-500/10 to-rose-400/10 dark:from-purple-500/20 dark:to-rose-400/20"
    );
  };

  // 根据主题获取标签悬停渐变色
  const getTagHoverGradient = () => {
    return getThemeValue(
      {
        light:
          "hover:from-purple-500/20 hover:to-rose-400/20 dark:hover:from-purple-500/30 dark:hover:to-rose-400/30",
        dark: "hover:from-blue-500/30 hover:to-cyan-400/30",
        green:
          "hover:from-green-500/20 hover:to-emerald-400/20 dark:hover:from-green-500/30 dark:hover:to-emerald-400/30",
        purple:
          "hover:from-purple-500/20 hover:to-violet-400/20 dark:hover:from-purple-500/30 dark:hover:to-violet-400/30",
        orange:
          "hover:from-orange-500/20 hover:to-amber-400/20 dark:hover:from-orange-500/30 dark:hover:to-amber-400/30",
        blue: "hover:from-blue-500/20 hover:to-sky-400/20 dark:hover:from-blue-500/30 dark:hover:to-sky-400/30",
        pink: "hover:from-pink-500/20 hover:to-rose-400/20 dark:hover:from-pink-500/30 dark:hover:to-rose-400/30",
        brown:
          "hover:from-amber-700/20 hover:to-amber-500/20 dark:hover:from-amber-700/30 dark:hover:to-amber-500/30",
      },
      "hover:from-purple-500/20 hover:to-rose-400/20 dark:hover:from-purple-500/30 dark:hover:to-rose-400/30"
    );
  };

  // 根据主题获取标签文本颜色
  const getTagTextColor = () => {
    return getThemeValue(
      {
        light: "text-gray-700 dark:text-gray-300",
        dark: "text-gray-300",
        green: "text-gray-700 dark:text-gray-300",
        purple: "text-gray-700 dark:text-gray-300",
        orange: "text-gray-700 dark:text-gray-300",
        blue: "text-gray-700 dark:text-gray-300",
        pink: "text-gray-700 dark:text-gray-300",
        brown: "text-gray-700 dark:text-gray-300",
      },
      "text-gray-700 dark:text-gray-300"
    );
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-center space-y-6 sm:space-y-8 py-8 sm:py-12 px-4 sm:px-6"
    >
      <motion.h1
        className={`text-4xl sm:text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${getTitleGradient()} leading-tight`}
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
            className={`px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r ${getTagGradient()} 
                       ${getTagTextColor()} rounded-full text-sm sm:text-base font-medium
                       ${getTagHoverGradient()}
                       transition-all duration-300 cursor-pointer`}
          >
            {tag}
          </motion.span>
        ))}
      </motion.div>
    </motion.section>
  );
}
