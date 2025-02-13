"use client";

import { motion } from "framer-motion";
import { TechStackIcon } from "@/components/TechStackIcons";

interface TechStackProps {
  itemVariants: any;
}

export default function TechStack({ itemVariants }: TechStackProps) {
  const techStacks = [
    {
      category: "前端基础",
      skills:
        "HTML5 / CSS3 / Sass / Less / TailwindCSS / JavaScript / TypeScript",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      category: "前端框架",
      skills: "React / Vue / Next.js / Nuxt",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      category: "构建工具",
      skills: "Webpack / Vite / Rollup / Babel / ESBuild",
      gradient: "from-yellow-500 to-orange-500",
    },
    {
      category: "跨平台开发",
      skills: "UniApp / Taro / 小程序",
      gradient: "from-indigo-500 to-violet-500",
    },
    {
      category: "可视化技能",
      skills: "SVG / Canvas / ECharts",
      gradient: "from-pink-500 to-rose-500",
    },
    {
      category: "UI组件库",
      skills: "Ant Design / Element Plus / Vant / Material-UI",
      gradient: "from-emerald-500 to-green-500",
    },
    {
      category: "后端技术",
      skills: "Node.js / Express / Koa / RESTful API",
      gradient: "from-teal-500 to-cyan-500",
    },
    {
      category: "数据库技术",
      skills: "MySQL / MongoDB",
      gradient: "from-fuchsia-500 to-pink-500",
    },
    {
      category: "容器技术",
      skills: "Docker / CI/CD / Jenkins",
      gradient: "from-amber-500 to-yellow-500",
    },
    {
      category: "开发工具",
      skills: "Git / VS Code / Chrome DevTools / Postman",
      gradient: "from-sky-500 to-blue-500",
    },
  ];

  return (
    <motion.div variants={itemVariants}>
      <div className="flex items-center gap-4 mb-8">
        <h3 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent text-center lg:text-left">
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
              <p className="text-gray-600 dark:text-gray-400">{stack.skills}</p>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
