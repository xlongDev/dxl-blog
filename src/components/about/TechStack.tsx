"use client";

import { motion } from "framer-motion";
import { TechStackIcon } from "@/components/TechStackIcons";
import { useThemeUtils } from "@/hooks/useThemeUtils";
import { THEME_COLORS } from "@/hooks/themeConstants";

interface TechStackProps {
  itemVariants: any;
}

export default function TechStack({ itemVariants }: TechStackProps) {
  const { getThemeColor } = useThemeUtils();
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

  // 根据主题获取标题渐变色
  const titleGradient = getThemeColor(
    "from-indigo-600 to-cyan-600",
    "from-indigo-600 to-cyan-600",
    {
      green: "from-green-600 to-teal-600",
      purple: "from-indigo-600 to-purple-600",
      orange: "from-orange-600 to-amber-600",
      blue: "from-blue-600 to-cyan-600",
      pink: "from-pink-600 to-rose-600",
      brown: "from-amber-700 to-yellow-700",
    }
  );

  // 根据主题获取装饰线条渐变色
  const decorLineGradient = getThemeColor(
    "from-blue-600/50 to-transparent",
    "from-blue-600/50 to-transparent",
    {
      green: "from-green-600/50 to-transparent",
      purple: "from-purple-600/50 to-transparent",
      orange: "from-orange-600/50 to-transparent",
      blue: "from-blue-600/50 to-transparent",
      pink: "from-pink-600/50 to-transparent",
      brown: "from-amber-700/50 to-transparent",
    }
  );

  return (
    <motion.div variants={itemVariants}>
      <div className="flex items-center gap-4 mb-8">
        <h3
          className={`text-2xl sm:text-3xl font-bold bg-gradient-to-r ${titleGradient} bg-clip-text text-transparent text-center lg:text-left`}
        >
          技术栈
        </h3>
        <div
          className={`hidden lg:block h-0.5 flex-grow bg-gradient-to-r ${decorLineGradient}`}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {techStacks.map((stack, index) => {
          // 根据主题获取卡片边框颜色
          const borderColor = getThemeColor(
            "border-gray-700/30",
            "border-gray-200/30",
            {
              green: "border-green-200/30 dark:border-green-700/30",
              purple: "border-purple-200/30 dark:border-purple-700/30",
              orange: "border-orange-200/30 dark:border-orange-700/30",
              blue: "border-blue-200/30 dark:border-blue-700/30",
              pink: "border-pink-200/30 dark:border-pink-700/30",
              brown: "border-amber-200/30 dark:border-amber-700/30",
            }
          );

          return (
            <motion.div
              key={index}
              className={`p-4 sm:p-6 bg-gray-50 dark:bg-gray-700/50 rounded-xl hover:shadow-lg transition-all duration-300 border ${borderColor}`}
              style={
                {
                  "--hover-border-color": getThemeColor(
                    "#1a1b26",
                    "#a9b1d6",
                    THEME_COLORS
                  ),
                } as React.CSSProperties
              }
              whileHover={{
                scale: 1.02,
                translateY: -5,
                boxShadow:
                  "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
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
