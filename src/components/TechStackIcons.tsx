import { motion } from "framer-motion";

interface TechStackIconProps {
  category: string;
  className?: string;
}

export function TechStackIcon({
  category,
  className = "",
}: TechStackIconProps) {
  const iconVariants = {
    hover: {
      scale: 1.1,
      rotate: 12,
      transition: { duration: 0.3 },
    },
  };

  const getIconByCategory = (category: string) => {
    switch (category) {
      case "前端基础":
        return (
          <motion.svg
            viewBox="0 0 24 24"
            className={className}
            variants={iconVariants}
            whileHover="hover"
          >
            <path
              fill="currentColor"
              d="M4.192 3.143h15.615l-1.42 16.034-6.404 1.812-6.369-1.813L4.192 3.143zM16.9 6.424l-9.8-.002.158 1.949 7.529.002-.189 2.02H9.66l.179 1.913h4.597l-.272 2.62-2.164.598-2.197-.603-.141-1.569h-1.94l.216 2.867L12 17.484l3.995-1.137.905-9.923z"
            />
          </motion.svg>
        );
      case "前端框架":
        return (
          <motion.svg
            viewBox="0 0 24 24"
            className={className}
            variants={iconVariants}
            whileHover="hover"
          >
            <path
              fill="currentColor"
              d="M12 9.861A2.139 2.139 0 1 0 12 14.139 2.139 2.139 0 1 0 12 9.861zM6.008 16.255l-.472-.12C2.018 15.246 0 13.737 0 11.996s2.018-3.25 5.536-4.139l.472-.119.133.468a23.53 23.53 0 0 0 1.363 3.578l.101.213-.101.213a23.307 23.307 0 0 0-1.363 3.578l-.133.467zM5.317 8.95c-2.674.751-4.315 1.9-4.315 3.046 0 1.145 1.641 2.294 4.315 3.046a24.95 24.95 0 0 1 1.182-3.046A24.752 24.752 0 0 1 5.317 8.95zM17.992 16.255l-.133-.469a23.357 23.357 0 0 0-1.364-3.577l-.101-.213.101-.213a23.42 23.42 0 0 0 1.364-3.578l.133-.468.473.119c3.517.889 5.535 2.398 5.535 4.14s-2.018 3.25-5.535 4.139l-.473.12zm-.491-4.259c.48 1.039.877 2.06 1.182 3.046 2.675-.752 4.315-1.901 4.315-3.046 0-1.146-1.641-2.294-4.315-3.046a24.788 24.788 0 0 1-1.182 3.046z"
            />
          </motion.svg>
        );
      case "构建工具":
        return (
          <motion.svg
            viewBox="0 0 24 24"
            className={className}
            variants={iconVariants}
            whileHover="hover"
          >
            <path
              fill="currentColor"
              d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"
            />
          </motion.svg>
        );
      case "后端技术":
        return (
          <motion.svg
            viewBox="0 0 24 24"
            className={className}
            variants={iconVariants}
            whileHover="hover"
          >
            <path
              fill="currentColor"
              d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
            />
          </motion.svg>
        );
      case "跨平台开发":
        return (
          <motion.svg
            viewBox="0 0 24 24"
            className={className}
            variants={iconVariants}
            whileHover="hover"
          >
            <path
              fill="currentColor"
              d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16.01H3V4.99h18v14.02zM8 16h2.5l1.5 1.5 1.5-1.5H16v-2.5l1.5-1.5-1.5-1.5V8h-2.5L12 6.5 10.5 8H8v2.5L6.5 12 8 13.5V16zm4-7c1.66 0 3 1.34 3 3s-1.34 3-3 3V9z"
            />
          </motion.svg>
        );
      case "数据库技术":
        return (
          <motion.svg
            viewBox="0 0 24 24"
            className={className}
            variants={iconVariants}
            whileHover="hover"
          >
            <path
              fill="currentColor"
              d="M12 3C7.58 3 4 4.79 4 7s3.58 4 8 4 8-1.79 8-4-3.58-4-8-4zM4 9v3c0 2.21 3.58 4 8 4s8-1.79 8-4V9c0 2.21-3.58 4-8 4s-8-1.79-8-4zm0 5v3c0 2.21 3.58 4 8 4s8-1.79 8-4v-3c0 2.21-3.58 4-8 4s-8-1.79-8-4z"
            />
          </motion.svg>
        );
      case "容器技术":
        return (
          <motion.svg
            viewBox="0 0 24 24"
            className={className}
            variants={iconVariants}
            whileHover="hover"
          >
            <path
              fill="currentColor"
              d="M13.5 1.5L9 7.5l2 1-5.5 6.5L3 14l-1 9 9-1-1-2.5L16.5 14l1 2 6-4.5-4-5.5-2 1-4-5.5zm-7 12l4-4 1 1-4 4-1-1z"
            />
          </motion.svg>
        );
      case "开发工具":
        return (
          <motion.svg
            viewBox="0 0 24 24"
            className={className}
            variants={iconVariants}
            whileHover="hover"
          >
            <path
              fill="currentColor"
              d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"
            />
          </motion.svg>
        );
      case "可视化技能":
        return (
          <motion.svg
            viewBox="0 0 24 24"
            className={className}
            variants={iconVariants}
            whileHover="hover"
          >
            <path
              fill="currentColor"
              d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"
            />
          </motion.svg>
        );
      case "UI组件库":
        return (
          <motion.svg
            viewBox="0 0 24 24"
            className={className}
            variants={iconVariants}
            whileHover="hover"
          >
            <path
              fill="currentColor"
              d="M4 8h4V4H4v4zm6 12h4v-4h-4v4zm-6 0h4v-4H4v4zm0-6h4v-4H4v4zm6 0h4v-4h-4v4zm6-10v4h4V4h-4zm-6 4h4V4h-4v4zm6 6h4v-4h-4v4zm0 6h4v-4h-4v4z"
            />
          </motion.svg>
        );
      case "github":
        return (
          <motion.svg
            viewBox="0 0 24 24"
            className={className}
            variants={iconVariants}
            whileHover="hover"
          >
            <path
              fill="currentColor"
              d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
            />
          </motion.svg>
        );
      case "email":
        return (
          <motion.svg
            viewBox="0 0 24 24"
            className={className}
            variants={iconVariants}
            whileHover="hover"
          >
            <path
              fill="currentColor"
              d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"
            />
          </motion.svg>
        );
      case "wechat":
        return (
          <motion.svg
            viewBox="0 0 24 24"
            className={className}
            variants={iconVariants}
            whileHover="hover"
          >
            <path
              fill="currentColor"
              d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178A1.17 1.17 0 0 1 4.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178 1.17 1.17 0 0 1-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.507-5.174 1.71-1.475 1.244-2.46 3.057-2.46 5.013 0 3.556 3.392 6.445 7.573 6.445 1.051 0 2.057-.183 2.979-.515.097-.034.199-.05.3-.05.096 0 .192.026.276.077l1.566.826a.327.327 0 0 0 .166.054c.16 0 .29-.13.29-.295 0-.072-.029-.143-.048-.213l-.391-1.478a.59.59 0 0 1 .213-.666c1.423-1.047 2.512-2.593 2.512-4.185 0-3.096-2.916-5.657-6.59-5.81l-.193-.913zm-2.977 3.637c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178 1.17 1.17 0 0 1-1.162-1.178c0-.651.52-1.18 1.162-1.18zm4.894 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178 1.17 1.17 0 0 1-1.162-1.178c0-.651.52-1.18 1.162-1.18z"
            />
          </motion.svg>
        );
      default:
        return null;
    }
  };

  return getIconByCategory(category);
}
