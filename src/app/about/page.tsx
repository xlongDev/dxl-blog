"use client";

import { motion } from "framer-motion";
import Profile from "@/components/about/Profile";
import Contact from "@/components/about/Contact";
import TechStack from "@/components/about/TechStack";

export default function AboutPage() {
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

  return (
    <motion.div
      className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div className="flex items-center justify-center gap-6 mb-16">
        <motion.div
          className="hidden md:block h-0.5 w-16 bg-gradient-to-r from-transparent to-blue-600"
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 64, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />
        <motion.h1
          className="text-5xl font-extrabold text-center bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          关于我
        </motion.h1>
        <motion.div
          className="hidden md:block h-0.5 w-16 bg-gradient-to-r from-purple-600 to-transparent"
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 64, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />
      </motion.div>

      <motion.div
        className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 sm:p-10 mb-12 sm:mb-16 border border-gray-200/50 dark:border-gray-700/50"
        variants={itemVariants}
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
    </motion.div>
  );
}
