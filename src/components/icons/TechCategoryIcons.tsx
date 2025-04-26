"use client";

import { motion } from "framer-motion";

interface TechCategoryIconProps {
  category: string;
  className?: string;
}

const iconVariants = {
  hover: {
    scale: 1.1,
    rotate: 12,
    transition: { duration: 0.3 },
  },
};

export default function TechCategoryIcon({
  category,
  className = "",
}: TechCategoryIconProps) {
  const getIconByCategory = () => {
    switch (category) {
      case "Browser":
        return (
          <motion.svg
            viewBox="0 0 512 512"
            className={className}
            variants={iconVariants}
            whileHover="hover"
          >
            <image href="/svg/edge.svg" width="512" height="512" />
          </motion.svg>
        );
      case "Build-Tools":
        return (
          <motion.svg
            viewBox="0 0 512 512"
            className={className}
            variants={iconVariants}
            whileHover="hover"
          >
            <image href="/svg/vitejs.svg" width="512" height="512" />
          </motion.svg>
        );
      case "Next.js":
        return (
          <motion.svg
            viewBox="0 0 512 512"
            className={className}
            variants={iconVariants}
            whileHover="hover"
          >
            <image href="/svg/next-js.svg" width="512" height="512" />
          </motion.svg>
        );
      case "Nuxt.js":
        return (
          <motion.svg
            viewBox="0 0 512 512"
            className={className}
            variants={iconVariants}
            whileHover="hover"
          >
            <image href="/svg/nuxt-js.svg" width="512" height="512" />
          </motion.svg>
        );
      case "React":
        return (
          <motion.svg
            viewBox="0 0 512 512"
            className={className}
            variants={iconVariants}
            whileHover="hover"
          >
            <image href="/svg/react.svg" width="512" height="512" />
          </motion.svg>
        );
      case "Bun.js":
        return (
          <motion.svg
            viewBox="0 0 512 512"
            className={className}
            variants={iconVariants}
            whileHover="hover"
          >
            <image href="/svg/bun.svg" width="512" height="512" />
          </motion.svg>
        );
      case "CSS":
        return (
          <motion.svg
            viewBox="0 0 512 512"
            className={className}
            variants={iconVariants}
            whileHover="hover"
          >
            <image href="/svg/css-3.svg" width="512" height="512" />
          </motion.svg>
        );
      case "HTML":
        return (
          <motion.svg
            viewBox="0 0 512 512"
            className={className}
            variants={iconVariants}
            whileHover="hover"
          >
            <image href="/svg/html.svg" width="512" height="512" />
          </motion.svg>
        );
      case "DB":
        return (
          <motion.svg
            viewBox="0 0 512 512"
            className={className}
            variants={iconVariants}
            whileHover="hover"
          >
            <image href="/svg/mysql-logo.svg" width="512" height="512" />
          </motion.svg>
        );
      case "Container":
        return (
          <motion.svg
            viewBox="0 0 512 512"
            className={className}
            variants={iconVariants}
            whileHover="hover"
          >
            <image href="/svg/docker.svg" width="512" height="512" />
          </motion.svg>
        );
      case "DB":
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
      case "Flutter":
        return (
          <motion.svg
            viewBox="0 0 512 512"
            className={className}
            variants={iconVariants}
            whileHover="hover"
          >
            <image href="/svg/flutter.svg" width="512" height="512" />
          </motion.svg>
        );
      case "React-Native":
        return (
          <motion.svg
            viewBox="0 0 512 512"
            className={className}
            variants={iconVariants}
            whileHover="hover"
          >
            <image href="/svg/react-native.svg" width="512" height="512" />
          </motion.svg>
        );
      case "DSA":
        return (
          <motion.svg
            viewBox="0 0 512 512"
            className={className}
            variants={iconVariants}
            whileHover="hover"
          >
            <image href="/svg/data.svg" width="512" height="512" />
          </motion.svg>
        );
      case "Deno":
        return (
          <motion.svg
            viewBox="0 0 512 512"
            className={className}
            variants={iconVariants}
            whileHover="hover"
          >
            <image href="/svg/deno.svg" width="512" height="512" />
          </motion.svg>
        );
      case "JavaScript":
        return (
          <motion.svg
            viewBox="0 0 512 512"
            className={className}
            variants={iconVariants}
            whileHover="hover"
          >
            <image href="/svg/javascript.svg" width="512" height="512" />
          </motion.svg>
        );
      case "Network":
        return (
          <motion.svg
            viewBox="0 0 512 512"
            className={className}
            variants={iconVariants}
            whileHover="hover"
          >
            <image href="/svg/axios.svg" width="512" height="512" />
          </motion.svg>
        );
      case "Next.js":
        return (
          <motion.svg
            viewBox="0 0 24 24"
            className={className}
            variants={iconVariants}
            whileHover="hover"
          >
            <path
              fill="currentColor"
              d="M11.5725 0c-.1763 0-.3098.0013-.3584.0067-.0516.0053-.2159.021-.3636.0328-3.4088.3073-6.6017 2.1463-8.624 4.9728C1.1004 6.584.3802 8.3666.1082 10.255c-.0962.659-.108.8537-.108 1.7474s.012 1.0884.108 1.7476c.652 4.506 3.8591 8.2919 8.2087 9.6945.7789.2511 1.6.4223 2.5337.5255.3636.04 1.9354.04 2.299 0 1.6117-.1783 2.9772-.577 4.3237-1.2643.2065-.1056.2464-.1337.2183-.1573-.0188-.0139-.8987-1.1938-1.9543-2.62l-1.919-2.592-2.4047-3.5583c-1.3231-1.9564-2.4117-3.556-2.4211-3.556-.0094-.0026-.0187 1.5787-.0235 3.509-.0067 3.3802-.0093 3.5162-.0516 3.596-.061.115-.108.1618-.2064.2134-.075.0374-.1408.0445-.495.0445h-.406l-.1078-.068a.4383.4383 0 01-.1572-.1712l-.0493-.1056.0053-4.703.0067-4.7054.0726-.0915c.0376-.0493.1174-.1125.1736-.143.0962-.047.1338-.0517.5396-.0517.4787 0 .5584.0187.6827.1547.0353.0377 1.3373 1.9987 2.895 4.3608a10760.433 10760.433 0 004.7344 7.1706l1.9002 2.8782.096-.0633c.8518-.5536 1.7525-1.3418 2.4657-2.1627 1.5179-1.7429 2.4963-3.868 2.8247-6.134.0961-.6591.1078-.854.1078-1.7475 0-.8937-.012-1.0884-.1078-1.7476-.6522-4.506-3.8592-8.2919-8.2087-9.6945-.7672-.2487-1.5836-.42-2.4985-.5232-.169-.0176-1.0835-.0366-1.6123-.037zm4.0685 7.217c.3473 0 .4082.0053.4857.047.1127.0562.204.1642.237.2767.0186.061.0234 1.3653.0186 4.3044l-.0067 4.2175-.7436-1.14-.7461-1.14v-3.066c0-1.982.0093-3.0963.0234-3.1502.0375-.1313.1196-.2346.2323-.2955.0961-.0494.1313-.054.4997-.054z"
            />
          </motion.svg>
        );
      case "Node.js":
        return (
          <motion.svg
            viewBox="0 0 512 512"
            className={className}
            variants={iconVariants}
            whileHover="hover"
          >
            <image href="/svg/nodejs.svg" width="512" height="512" />
          </motion.svg>
        );
      case "Container":
        return (
          <motion.svg
            viewBox="0 0 256 215"
            className={className}
            variants={iconVariants}
            whileHover="hover"
          >
            <path
              fill="currentColor"
              d="M147.488 45.732h22.866v23.375h11.561c5.34 0 10.831-.951 15.887-2.664 2.485-.843 5.273-2.015 7.724-3.49-3.228-4.214-4.876-9.535-5.36-14.78-.66-7.135.78-16.421 5.608-22.005l2.404-2.78 2.864 2.303c7.211 5.793 13.276 13.889 14.345 23.118 8.683-2.554 18.878-1.95 26.531 2.467l3.14 1.812-1.652 3.226C246.933 68.946 233.4 72.86 220.17 72.167c-19.797 49.309-62.898 72.653-115.157 72.653-27 0-51.77-10.093-65.876-34.047l-.231-.39-2.055-4.182c-4.768-10.544-6.352-22.095-5.278-33.637l.323-3.457H51.45V45.732h22.865V22.866h45.733V0h27.44v45.732"
            />
          </motion.svg>
        );
      case "DB": // 新增数据库分类图标
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
      case "Flutter":
        return (
          <motion.svg
            viewBox="0 0 512 512"
            className={className}
            variants={iconVariants}
            whileHover="hover"
          >
            <image href="/svg/flutter.svg" width="512" height="512" />
          </motion.svg>
        );
      case "React-Native":
        return (
          <motion.svg
            viewBox="0 0 512 512"
            className={className}
            variants={iconVariants}
            whileHover="hover"
          >
            <image href="/svg/react-native.svg" width="512" height="512" />
          </motion.svg>
        );
      case "DSA":
        return (
          <motion.svg
            viewBox="0 0 281.79 325.28"
            className={className}
            variants={iconVariants}
            whileHover="hover"
          >
            <path
              d="M96.52 325.28l185.27-106.06-.29-80.79-13.38.47 1.58 25.46-173 99.8L58.71 242l131.91-76.16-7.23-5.84-136.16 80.75-.63 57zm4.86-55.28l172.73-99.53-.51 45.85-173 99.8z"
              fill="currentColor"
            />
            <path
              d="M280.83 106.74L96 0 26.81 41.91l27.81-3.86 173.3 99.28v44l-132.7-76.21-1.39 9.18 140.76 79.09 46.91-25.47zm-50.27 23.65L57.64 31.19 97.52 8.56l173.29 99.28z"
              fill="currentColor"
            />
            <path
              fill="currentColor"
              d="M50.94 27.17L0 56.66v211.8l46.92 29.49v-12.07L8.04 263.09V63.36l38.88 22.79v155.68l6.7-3.92V86.15l38.87-22.79V214.8l6.71-3.99.59-155.23-48.85-28.41z"
            />
          </motion.svg>
        );
      case "前端工程化": // 修改为中文分类名
        return (
          <motion.svg
            viewBox="0 0 512 512"
            className={className}
            variants={iconVariants}
            whileHover="hover"
          >
            <image href="/svg/webpack.svg" width="512" height="512" />
          </motion.svg>
        );
      case "Visualization":
        return (
          <motion.svg
            viewBox="0 0 512 512"
            className={className}
            variants={iconVariants}
            whileHover="hover"
          >
            <image href="/svg/threejs.svg" width="512" height="512" />
          </motion.svg>
        );
      case "Network":
        return (
          <motion.svg
            viewBox="0 0 512 512"
            className={className}
            variants={iconVariants}
            whileHover="hover"
          >
            <image href="/svg/axios.svg" width="512" height="512" />
          </motion.svg>
        );
      case "Next.js":
        return (
          <motion.svg
            viewBox="0 0 128 128"
            className={className}
            variants={iconVariants}
            whileHover="hover"
          >
            <path
              fill="currentColor"
              d="M64 0C28.7 0 0 28.7 0 64s28.7 64 64 64c11.2 0 21.7-2.9 30.8-7.9L48.4 55.3v36.6h-6.8V41.8h6.8l50.5 75.8C116.4 106.2 128 86.5 128 64c0-35.3-28.7-64-64-64zm22.1 84.6l-7.5-11.3V41.8h7.5v42.8z"
            />
          </motion.svg>
        );
      case "Nuxt.js":
        return (
          <motion.svg
            viewBox="0 0 512 512"
            className={className}
            variants={iconVariants}
            whileHover="hover"
          >
            <path
              fill="currentColor"
              d="M281.44 397.667H438.32C443.326 397.667 448.118 395.908 452.453 393.427C456.789 390.946 461.258 387.831 463.76 383.533C466.262 379.236 468.002 374.36 468 369.399C467.998 364.437 466.266 359.563 463.76 355.268L357.76 172.947C355.258 168.65 352.201 165.534 347.867 163.053C343.532 160.573 337.325 158.813 332.32 158.813C327.315 158.813 322.521 160.573 318.187 163.053C313.852 165.534 310.795 168.65 308.293 172.947L281.44 219.587L227.733 129.13C225.229 124.834 222.176 120.307 217.84 117.827C213.504 115.346 208.713 115 203.707 115C198.701 115 193.909 115.346 189.573 117.827C185.238 120.307 180.771 124.834 178.267 129.13L46.8267 355.268C44.3208 359.563 44.0022 364.437 44 369.399C43.9978 374.36 44.3246 379.235 46.8267 383.533C49.3288 387.83 53.7979 390.946 58.1333 393.427C62.4688 395.908 67.2603 397.667 72.2667 397.667H171.2C210.401 397.667 238.934 380.082 258.827 346.787L306.88 263.4L332.32 219.587L410.053 352.44H306.88L281.44 397.667ZM169.787 352.44H100.533L203.707 174.36L256 263.4L221.361 323.784C208.151 345.387 193.089 352.44 169.787 352.44Z"
            />
          </motion.svg>
        );
      case "Web3":
        return (
          <motion.svg
            viewBox="0 0 512 512"
            className={className}
            variants={iconVariants}
            whileHover="hover"
          >
            <image href="/svg/web3.svg" width="512" height="512" />
          </motion.svg>
        );
      case "Node.js":
        return (
          <motion.svg
            viewBox="0 0 24 24"
            className={className}
            variants={iconVariants}
            whileHover="hover"
          >
            <path
              fill="currentColor"
              d="M12 1.85c-.27 0-.55.07-.78.2l-7.44 4.3c-.48.28-.78.8-.78 1.36v8.58c0 .56.3 1.08.78 1.36l1.95 1.12c.95.46 1.27.47 1.71.47 1.4 0 2.21-.85 2.21-2.33V8.44c0-.12-.1-.22-.22-.22H8.5c-.13 0-.23.1-.23.22v8.47c0 .66-.68 1.31-1.77.76L4.45 16.5c-.07-.04-.12-.13-.12-.22V7.71c0-.1.04-.19.12-.24l7.44-4.3c.06-.04.16-.04.22 0l7.44 4.3c.08.04.12.13.12.23v8.58c0 .09-.04.18-.12.22l-7.44 4.3c-.07.04-.17.04-.23 0l-1.89-1.12c-.07-.04-.16-.04-.23-.01-.64.36-.76.44-1.35.62-.15.05-.37.12.08.34l2.46 1.45c.23.13.5.2.78.2s.54-.07.78-.2l7.44-4.3c.48-.28.78-.8.78-1.36V7.71c0-.56-.3-1.08-.78-1.36l-7.44-4.3c-.23-.13-.5-.2-.78-.2zm2 6.31c-2.12 0-3.39.89-3.39 2.39 0 1.61 1.26 2.08 3.3 2.28 2.43.24 2.62.6 2.62 1.08 0 .83-.67 1.18-2.23 1.18-1.98 0-2.4-.49-2.55-1.47a.226.226 0 0 0-.22-.18h-.96c-.12 0-.21.09-.21.22 0 1.24.68 2.74 3.94 2.74 2.35 0 3.7-.93 3.7-2.55 0-1.61-1.08-2.03-3.37-2.34-2.31-.3-2.54-.46-2.54-1 0-.45.2-1.05 1.91-1.05 1.5 0 2.09.33 2.32 1.36.02.1.11.17.21.17h.97c.05 0 .11-.02.15-.07.04-.04.07-.1.05-.16-.14-1.78-1.32-2.6-3.7-2.6z"
            />
          </motion.svg>
        );
      case "Nest.js":
        return (
          <motion.svg
            viewBox="0 0 512 512"
            className={className}
            variants={iconVariants}
            whileHover="hover"
          >
            <image href="/svg/nestjs.svg" width="512" height="512" />
          </motion.svg>
        );
      case "前端技术": // 修改为中文分类名
        return (
          <motion.svg
            viewBox="0 0 512 512"
            className={className}
            variants={iconVariants}
            whileHover="hover"
          >
            <image href="/svg/FE.svg" width="512" height="512" />
          </motion.svg>
        );
      case "前端工程化":
        return (
          <motion.svg
            viewBox="0 0 512 512"
            className={className}
            variants={iconVariants}
            whileHover="hover"
          >
            <image href="/svg/webpack.svg" width="512" height="512" />
          </motion.svg>
        );
      case "Visualization":
        return (
          <motion.svg
            viewBox="0 0 512 512"
            className={className}
            variants={iconVariants}
            whileHover="hover"
          >
            <image href="/svg/threejs.svg" width="512" height="512" />
          </motion.svg>
        );
      case "Network":
        return (
          <motion.svg
            viewBox="0 0 512 512"
            className={className}
            variants={iconVariants}
            whileHover="hover"
          >
            <image href="/svg/axios.svg" width="512" height="512" />
          </motion.svg>
        );
      case "Next.js":
        return (
          <motion.svg
            viewBox="0 0 128 128"
            className={className}
            variants={iconVariants}
            whileHover="hover"
          >
            <path
              fill="currentColor"
              d="M64 0C28.7 0 0 28.7 0 64s28.7 64 64 64c11.2 0 21.7-2.9 30.8-7.9L48.4 55.3v36.6h-6.8V41.8h6.8l50.5 75.8C116.4 106.2 128 86.5 128 64c0-35.3-28.7-64-64-64zm22.1 84.6l-7.5-11.3V41.8h7.5v42.8z"
            />
          </motion.svg>
        );
      case "Nuxt.js":
        return (
          <motion.svg
            viewBox="0 0 512 512"
            className={className}
            variants={iconVariants}
            whileHover="hover"
          >
            <path
              fill="currentColor"
              d="M281.44 397.667H438.32C443.326 397.667 448.118 395.908 452.453 393.427C456.789 390.946 461.258 387.831 463.76 383.533C466.262 379.236 468.002 374.36 468 369.399C467.998 364.437 466.266 359.563 463.76 355.268L357.76 172.947C355.258 168.65 352.201 165.534 347.867 163.053C343.532 160.573 337.325 158.813 332.32 158.813C327.315 158.813 322.521 160.573 318.187 163.053C313.852 165.534 310.795 168.65 308.293 172.947L281.44 219.587L227.733 129.13C225.229 124.834 222.176 120.307 217.84 117.827C213.504 115.346 208.713 115 203.707 115C198.701 115 193.909 115.346 189.573 117.827C185.238 120.307 180.771 124.834 178.267 129.13L46.8267 355.268C44.3208 359.563 44.0022 364.437 44 369.399C43.9978 374.36 44.3246 379.235 46.8267 383.533C49.3288 387.83 53.7979 390.946 58.1333 393.427C62.4688 395.908 67.2603 397.667 72.2667 397.667H171.2C210.401 397.667 238.934 380.082 258.827 346.787L306.88 263.4L332.32 219.587L410.053 352.44H306.88L281.44 397.667ZM169.787 352.44H100.533L203.707 174.36L256 263.4L221.361 323.784C208.151 345.387 193.089 352.44 169.787 352.44Z"
            />
          </motion.svg>
        );
      case "Web3":
        return (
          <motion.svg
            viewBox="0 0 512 512"
            className={className}
            variants={iconVariants}
            whileHover="hover"
          >
            <image href="/svg/web3.svg" width="512" height="512" />
          </motion.svg>
        );
      case "Node.js":
        return (
          <motion.svg
            viewBox="0 0 24 24"
            className={className}
            variants={iconVariants}
            whileHover="hover"
          >
            <path
              fill="currentColor"
              d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zm0 22.5C6.2 22.5 1.5 17.8 1.5 12S6.2 1.5 12 1.5 22.5 6.2 22.5 12 17.8 22.5 12 22.5zm0-19.5c-4.9 0-9 4-9 9s4 9 9 9 9-4 9-9-4-9-9-9zm0 16.5c-4.1 0-7.5-3.4-7.5-7.5S7.9 4.5 12 4.5s7.5 3.4 7.5 7.5-3.4 7.5-7.5 7.5z"
            />
          </motion.svg>
        );
      case "Node.js":
        return (
          <motion.svg
            viewBox="0 0 24 24"
            className={className}
            variants={iconVariants}
            whileHover="hover"
          >
            <path
              fill="currentColor"
              d="M12 1.85c-.27 0-.55.07-.78.2l-7.44 4.3c-.48.28-.78.8-.78 1.36v8.58c0 .56.3 1.08.78 1.36l1.95 1.12c.95.46 1.27.47 1.71.47 1.4 0 2.21-.85 2.21-2.33V8.44c0-.12-.1-.22-.22-.22H8.5c-.13 0-.23.1-.23.22v8.47c0 .66-.68 1.31-1.77.76L4.45 16.5c-.07-.04-.12-.13-.12-.22V7.71c0-.1.04-.19.12-.24l7.44-4.3c.06-.04.16-.04.22 0l7.44 4.3c.08.04.12.13.12.23v8.58c0 .09-.04.18-.12.22l-7.44 4.3c-.07.04-.17.04-.23 0l-1.89-1.12c-.07-.04-.16-.04-.23-.01-.64.36-.76.44-1.35.62-.15.05-.37.12.08.34l2.46 1.45c.23.13.5.2.78.2s.54-.07.78-.2l7.44-4.3c.48-.28.78-.8.78-1.36V7.71c0-.56-.3-1.08-.78-1.36l-7.44-4.3c-.23-.13-.5-.2-.78-.2zm2 6.31c-2.12 0-3.39.89-3.39 2.39 0 1.61 1.26 2.08 3.3 2.28 2.43.24 2.62.6 2.62 1.08 0 .83-.67 1.18-2.23 1.18-1.98 0-2.4-.49-2.55-1.47a.226.226 0 0 0-.22-.18h-.96c-.12 0-.21.09-.21.22 0 1.24.68 2.74 3.94 2.74 2.35 0 3.7-.93 3.7-2.55 0-1.61-1.08-2.03-3.37-2.34-2.31-.3-2.54-.46-2.54-1 0-.45.2-1.05 1.91-1.05 1.5 0 2.09.33 2.32 1.36.02.1.11.17.21.17h.97c.05 0 .11-.02.15-.07.04-.04.07-.1.05-.16-.14-1.78-1.32-2.6-3.7-2.6z"
            />
          </motion.svg>
        );
      case "Nest.js":
        return (
          <motion.svg
            viewBox="0 0 512 512"
            className={className}
            variants={iconVariants}
            whileHover="hover"
          >
            <image href="/svg/nestjs.svg" width="512" height="512" />
          </motion.svg>
        );
      case "前端技术": // 修改为中文分类名
        return (
          <motion.svg
            viewBox="0 0 24 24"
            className={className}
            variants={iconVariants}
            whileHover="hover"
          >
            <path
              fill="currentColor"
              d="M3 3h18v2H3V3zm0 4h18v2H3V7zm0 4h18v2H3v-2zm0 4h18v2H3v-2zm0 4h18v2H3v-2z"
            />
          </motion.svg>
        );
      case "Visualization":
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
      case "小程序":
        return (
          <motion.svg
            viewBox="0 0 512 512"
            className={className}
            variants={iconVariants}
            whileHover="hover"
          >
            <image href="/svg/uniapp.svg" width="512" height="512" />
          </motion.svg>
        );
      case "JavaScript":
        return (
          <motion.svg
            viewBox="0 0 512 512"
            className={className}
            variants={iconVariants}
            whileHover="hover"
          >
            <image href="/svg/javascript.svg" width="512" height="512" />
          </motion.svg>
        );
      case "TypeScript":
        return (
          <motion.svg
            viewBox="0 0 512 512"
            className={className}
            variants={iconVariants}
            whileHover="hover"
          >
            <image href="/svg/typescript.svg" width="512" height="512" />
          </motion.svg>
        );
      case "React":
        return (
          <motion.svg
            viewBox="0 0 24 24"
            className={className}
            variants={iconVariants}
            whileHover="hover"
          >
            <path
              fill="currentColor"
              d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915.01 1.36.034.44-.572.895-1.096 1.345-1.565z"
            />
          </motion.svg>
        );
      case "Vue.js":
        return (
          <motion.svg
            viewBox="0 0 512 512"
            className={className}
            variants={iconVariants}
            whileHover="hover"
          >
            <image href="/svg/vue.svg" width="512" height="512" />
          </motion.svg>
        );
      case "Bun.js":
        return (
          <motion.svg
            viewBox="0.5 0.5 79 69.25"
            className={className}
            variants={iconVariants}
            whileHover="hover"
          >
            <path
              fill="currentColor"
              d="M71.09 20.74c-.16-.17-.33-.34-.5-.5s-.33-.34-.5-.5-.33-.34-.5-.5-.33-.34-.5-.5-.33-.34-.5-.5-.33-.34-.5-.5-.33-.34-.5-.5-.33-.34-.5-.5-.33-.34-.5-.5-.33-.34-.5-.5A26.46 26.46 0 0 1 75.5 35.7c0 16.57-16.82 30.05-37.5 30.05-11.58 0-21.94-4.23-28.83-10.86l.5.5.5.5.5.5.5.5.5.5.5.5.5.5C19.55 65.3 30.14 69.75 42 69.75c20.68 0 37.5-13.48 37.5-30 0-7.06-3.04-13.75-8.41-19.01z M73 35.7c0 15.21-15.67 27.54-35 27.54S3 50.91 3 35.7C3 26.27 9 17.94 18.22 13S33.18 3 38 3s8.94 4.13 19.78 10C67 17.94 73 26.27 73 35.7z M73 35.7a21.67 21.67 0 0 0-.8-5.78c-2.73 33.3-43.35 34.9-59.32 24.94A40 40 0 0 0 38 63.24c19.3 0 35-12.35 35-27.54z M24.53 11.17C29 8.49 34.94 3.46 40.78 3.45A9.29 9.29 0 0 0 38 3c-2.42 0-5 1.25-8.25 3.13-1.13.66-2.3 1.39-3.54 2.15-2.33 1.44-5 3.07-8 4.7C8.69 18.13 3 26.62 3 35.7v1.19c6.06-21.41 17.07-23.04 21.53-25.72z M35.12 5.53A16.41 16.41 0 0 1 29.49 18c-.28.25-.06.73.3.59 3.37-1.31 7.92-5.23 6-13.14-.08-.45-.67-.33-.67.08zm2.27 0A16.24 16.24 0 0 1 39 19c-.12.35.31.65.55.36 2.19-2.8 4.1-8.36-1.62-14.36-.29-.26-.74.14-.54.49zm2.76-.17A16.42 16.42 0 0 1 47 17.12a.33.33 0 0 0 .65.11c.92-3.49.4-9.44-7.17-12.53-.4-.16-.66.38-.33.62zm-18.46 10.4a16.94 16.94 0 0 0 10.47-9c.18-.36.75-.22.66.18-1.73 8-7.52 9.67-11.12 9.45-.38.01-.37-.52-.01-.63z"
            />
          </motion.svg>
        );
      default:
        return (
          <motion.svg
            viewBox="0 0 24 24"
            className={className}
            variants={iconVariants}
            whileHover="hover"
          >
            <path
              fill="currentColor"
              d="M12 2L1 21h22L12 2zm0 4.871L19.372 19H4.628L12 6.871z"
            />
          </motion.svg>
        );
    }
  };

  return getIconByCategory();
}
