"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  CodeBracketIcon,
  CommandLineIcon,
  CubeIcon,
  CircleStackIcon,
  DevicePhoneMobileIcon,
  GlobeAltIcon,
  ServerIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline";
import { TechStackIcon } from "@/components/TechStackIcons";

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

  const techStacks = [
    {
      category: "前端基础",
      skills: "HTML5 / CSS3 / Sass / Less / TailwindCSS / Bootstrap",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      category: "前端框架",
      skills: "React / Vue / Next.js / Nuxt / TypeScript / JavaScript",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      category: "构建工具",
      skills: "Webpack / Vite / Rollup / Babel / ESBuild",
      gradient: "from-yellow-500 to-orange-500",
    },
    {
      category: "后端技术",
      skills: "Node.js / Express / Koa / Nest.js / RESTful API",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      category: "跨平台开发",
      skills: "UniApp / Taro / 微信小程序 / React Native / Flutter",
      gradient: "from-indigo-500 to-violet-500",
    },
    {
      category: "数据库技术",
      skills: "MySQL / MongoDB / Redis / PostgreSQL",
      gradient: "from-rose-500 to-red-500",
    },
    {
      category: "容器技术",
      skills: "Docker / Kubernetes / CI/CD / Jenkins",
      gradient: "from-teal-500 to-cyan-500",
    },
    {
      category: "开发工具",
      skills: "Git / VS Code / Chrome DevTools / Postman",
      gradient: "from-blue-500 to-indigo-500",
    },
    {
      category: "可视化技能",
      skills: "Echarts / D3.js / Three.js / Chart.js / AntV",
      gradient: "from-amber-500 to-orange-500",
    },
    {
      category: "UI组件库",
      skills: "Ant Design / Element Plus / Vant / Material-UI / Chakra UI",
      gradient: "from-lime-500 to-green-500",
    },
  ];

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

            <motion.div variants={itemVariants} className="space-y-6">
              <div className="flex items-center gap-4 mb-6">
                <h3 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent text-center lg:text-left">
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
                className="p-4 sm:p-6 bg-gray-50 dark:bg-gray-700/50 rounded-xl hover:shadow-lg transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm group relative"
                whileHover={{ scale: 1.02, translateY: -5 }}
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
                <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-full opacity-0 group-hover:opacity-100 group-hover:translate-y-[-120%] transition-all duration-300 ease-in-out z-50 backdrop-blur-sm bg-white/30 dark:bg-gray-800/30 p-4 rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50">
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
                </div>
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
          </div>

          {/* 右侧技术栈 */}
          <div className="lg:col-span-8">
            <motion.div variants={itemVariants}>
              <div className="flex items-center gap-4 mb-8">
                <h3 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent text-center lg:text-left">
                  技术栈
                </h3>
                <div className="hidden lg:block h-0.5 flex-grow bg-gradient-to-r from-blue-600/50 to-transparent" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {techStacks.map((stack, index) => {
                  return (
                    <motion.div
                      key={index}
                      className="p-4 sm:p-6 bg-gray-50 dark:bg-gray-700/50 rounded-xl hover:shadow-lg transition-all duration-300"
                      whileHover={{ scale: 1.02, translateY: -5 }}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <TechStackIcon
                          category={stack.category}
                          className={`w-6 h-6 bg-gradient-to-r ${stack.gradient} bg-clip-text`}
                        />
                        <h4
                          className={`text-lg font-semibold bg-gradient-to-r ${stack.gradient} bg-clip-text text-transparent`}
                        >
                          {stack.category}
                        </h4>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400">
                        {stack.skills}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
