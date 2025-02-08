"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { TechStackIcon } from "@/components/TechStackIcons";

interface ContactProps {
  itemVariants: any;
}

export default function Contact({ itemVariants }: ContactProps) {
  const [isWeChatQRVisible, setIsWeChatQRVisible] = useState(false);

  return (
    <motion.div variants={itemVariants} className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <h3 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent text-center lg:text-left">
          联系方式
        </h3>
        <div className="hidden lg:block h-0.5 flex-grow bg-gradient-to-r from-blue-600/50 to-transparent" />
      </div>
      <motion.div
        className="p-4 sm:p-6 bg-gray-50 dark:bg-gray-700/50 rounded-xl hover:shadow-lg transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm"
        whileHover={{ scale: 1.02, translateY: -5 }}
      >
        <div className="flex items-center gap-4 justify-center lg:justify-start">
          <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg">
            <TechStackIcon category="github" className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
              GitHub
            </div>
            <Link
              href="https://github.com/xLongDev"
              target="_blank"
              className="text-lg font-medium bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent hover:opacity-80 transition-opacity"
            >
              xlongDev
            </Link>
          </div>
        </div>
      </motion.div>
      <motion.div
        className="p-4 sm:p-6 bg-gray-50 dark:bg-gray-700/50 rounded-xl hover:shadow-lg transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm relative"
        whileHover={{ scale: 1.02, translateY: -5 }}
        onClick={() => setIsWeChatQRVisible(!isWeChatQRVisible)}
        onMouseEnter={() => setIsWeChatQRVisible(true)}
        onMouseLeave={() => setIsWeChatQRVisible(false)}
      >
        <div className="flex items-center gap-4 justify-center lg:justify-start">
          <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-gradient-to-r from-green-500 to-teal-500 text-white shadow-lg">
            <TechStackIcon category="wechat" className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
              WeChat
            </div>
            <div className="text-lg font-medium bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
              CAV_EMPT
            </div>
          </div>
        </div>
        <AnimatePresence mode="wait">
          {isWeChatQRVisible && (
            <motion.div
              className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-full backdrop-blur-sm bg-white/30 dark:bg-gray-800/30 p-4 rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 z-50"
              initial={{ opacity: 0, y: -60, scale: 0.8 }}
              animate={{ opacity: 1, y: -120, scale: 1 }}
              exit={{ opacity: 0, y: -60, scale: 0.8 }}
              transition={{
                duration: 0.3,
                ease: "easeInOut",
              }}
            >
              <Image
                src="/wechat.jpg"
                alt="WeChat QR Code"
                width={200}
                height={200}
                className="rounded-xl shadow-lg"
                priority
              />
              <div className="text-sm text-center mt-2 text-gray-600 dark:text-gray-400">
                扫码添加微信
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      <motion.div
        className="p-4 sm:p-6 bg-gray-50 dark:bg-gray-700/50 rounded-xl hover:shadow-lg transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm"
        whileHover={{ scale: 1.02, translateY: -5 }}
      >
        <div className="flex items-center gap-4 justify-center lg:justify-start">
          <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg">
            <TechStackIcon category="email" className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
              Email
            </div>
            <div className="text-lg font-medium bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              byte7956@gmail.com
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
