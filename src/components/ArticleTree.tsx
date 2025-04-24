"use client";

import { useState, useEffect } from "react";
import { ChevronRight, ChevronDown, FileText } from "lucide-react";
import { useThemeUtils } from "@/hooks/useThemeUtils";
import Link from "next/link";
import { MinimalPost } from "@/types";
import { motion, AnimatePresence } from "framer-motion";

interface TreeNode {
  name: string;
  children?: TreeNode[];
  posts?: MinimalPost[];
  isExpanded?: boolean;
}

interface ArticleTreeProps {
  posts: MinimalPost[];
}

interface CachedTreeData {
  treeData: TreeNode[];
}

const ArticleTree = ({ posts }: ArticleTreeProps) => {
  const [treeData, setTreeData] = useState<TreeNode[]>([]);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const { theme } = useThemeUtils();

  useEffect(() => {
    const fetchTreeData = async () => {
      try {
        const response = await fetch("/cache/articleTree.json");
        if (response.ok) {
          const cachedData = await response.json();
          setTreeData(cachedData.treeData);
        } else {
          const newTreeData = buildTree(posts);
          setTreeData(newTreeData);
        }
      } catch (error) {
        console.error("Failed to load article tree cache:", error);
        const newTreeData = buildTree(posts);
        setTreeData(newTreeData);
      }
    };

    fetchTreeData();
  }, [posts]);

  const getAccentColor = () => {
    const themeColors = {
      light: "text-blue-500",
      dark: "text-blue-500",
      green: "text-green-500",
      purple: "text-purple-500",
      orange: "text-orange-500",
      blue: "text-blue-500",
      pink: "text-pink-500",
      brown: "text-amber-500",
    };

    return themeColors[theme as keyof typeof themeColors] || themeColors.light;
  };

  const getHoverTextClass = () => {
    const themeColors = {
      light: "hover:text-blue-600",
      dark: "hover:text-blue-600",
      green: "hover:text-green-600",
      purple: "hover:text-purple-600",
      orange: "hover:text-orange-600",
      blue: "hover:text-blue-600",
      pink: "hover:text-pink-600",
      brown: "hover:text-amber-600",
    };

    return themeColors[theme as keyof typeof themeColors] || themeColors.light;
  };

  const getBgClass = () => {
    const themeColors = {
      light: "bg-white/80 dark:bg-gray-800/80",
      dark: "bg-gray-800/80",
      green:
        "bg-green-50/80 dark:bg-green-900/20 hover:bg-green-50/90 dark:hover:bg-green-900/30",
      purple:
        "bg-purple-50/80 dark:bg-purple-900/20 hover:bg-purple-50/90 dark:hover:bg-purple-900/30",
      orange:
        "bg-orange-50/80 dark:bg-orange-900/20 hover:bg-orange-50/90 dark:hover:bg-orange-900/30",
      blue: "bg-blue-50/80 dark:bg-blue-900/20 hover:bg-blue-50/90 dark:hover:bg-blue-900/30",
      pink: "bg-pink-50/80 dark:bg-pink-900/20 hover:bg-pink-50/90 dark:hover:bg-pink-900/30",
      brown:
        "bg-amber-50/80 dark:bg-amber-900/20 hover:bg-amber-50/90 dark:hover:bg-amber-900/30",
    };

    return themeColors[theme as keyof typeof themeColors] || themeColors.light;
  };

  const getBorderClass = () => {
    const themeColors = {
      light: "border-gray-200/50 dark:border-gray-700/50",
      dark: "border-gray-700/50",
      green:
        "border-green-200/50 dark:border-green-700/50 hover:border-green-300/70 dark:hover:border-green-600/70",
      purple:
        "border-purple-200/50 dark:border-purple-700/50 hover:border-purple-300/70 dark:hover:border-purple-600/70",
      orange:
        "border-orange-200/50 dark:border-orange-700/50 hover:border-orange-300/70 dark:hover:border-orange-600/70",
      blue: "border-blue-200/50 dark:border-blue-700/50 hover:border-blue-300/70 dark:hover:border-blue-600/70",
      pink: "border-pink-200/50 dark:border-pink-700/50 hover:border-pink-300/70 dark:hover:border-pink-600/70",
      brown:
        "border-amber-200/50 dark:border-amber-700/50 hover:border-amber-300/70 dark:hover:border-amber-600/70",
    };

    return themeColors[theme as keyof typeof themeColors] || themeColors.light;
  };

  const accentColor = getAccentColor();
  const bgClass = getBgClass();
  const borderClass = getBorderClass();
  const hoverTextClass = getHoverTextClass();

  function buildTree(posts: MinimalPost[]): TreeNode[] {
    const tree: { [key: string]: TreeNode } = {};

    posts.forEach((post) => {
      const category = post.category || "未分类";
      if (!tree[category]) {
        tree[category] = {
          name: category,
          posts: [],
          isExpanded: false,
        };
      }
      tree[category].posts?.push(post);
    });

    return Object.values(tree).sort((a, b) => {
      const isAEnglish = /^[A-Za-z]/.test(a.name);
      const isBEnglish = /^[A-Za-z]/.test(b.name);

      if (isAEnglish && !isBEnglish) return -1;
      if (!isAEnglish && isBEnglish) return 1;

      return a.name.localeCompare(b.name);
    });
  }

  const toggleNode = (node: TreeNode) => {
    node.isExpanded = !node.isExpanded;
    setTreeData([...treeData]);
  };

  const handleKeyDown = (
    event: React.KeyboardEvent,
    node: TreeNode,
    index: number
  ) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleNode(node);
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      setFocusedIndex((prev) =>
        prev === null ? 0 : Math.min(prev + 1, treeData.length - 1)
      );
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setFocusedIndex((prev) => (prev === null ? 0 : Math.max(prev - 1, 0)));
    }
  };

  const renderNode = (node: TreeNode, index: number) => {
    return (
      <div key={node.name} className="pl-4">
        <div
          tabIndex={0}
          className={`flex items-center gap-2 py-2 cursor-pointer ${hoverTextClass} transition-all duration-200 outline-none focus:ring-0`}
          onClick={() => toggleNode(node)}
          onKeyDown={(e) => handleKeyDown(e, node, index)}
        >
          {node.posts && node.posts.length > 0 ? (
            node.isExpanded ? (
              <ChevronDown
                size={16}
                className="transform transition-transform duration-200"
              />
            ) : (
              <ChevronRight
                size={16}
                className="transform transition-transform duration-200"
              />
            )
          ) : null}
          <span>{node.name}</span>
          {node.posts && (
            <span className="text-sm text-gray-500 dark:text-gray-400">
              ({node.posts.length})
            </span>
          )}
        </div>
        <AnimatePresence>
          {node.isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0, y: -10 }}
              animate={{ height: "auto", opacity: 1, y: 0 }}
              exit={{ height: 0, opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="pl-6 pt-1"
            >
              {node.posts && (
                <div>
                  {node.posts.map((post) => (
                    <Link
                      key={post.url}
                      href={post.url}
                      tabIndex={0}
                      className={`flex items-center gap-2 py-1 text-sm ${hoverTextClass} transition-all duration-200 outline-none focus:ring-0`}
                    >
                      <FileText size={14} className={accentColor} />
                      <span
                        className="block"
                        title={post.description || post.title}
                      >
                        {post.title}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <div
      className={`w-full max-w-sm ${bgClass} rounded-lg shadow-lg p-4 transition-all duration-200 hover:shadow-xl border ${borderClass} backdrop-blur-sm`}
    >
      <h3 className={`text-lg font-semibold mb-4 ${accentColor}`}>文章目录</h3>
      <div className="overflow-y-auto max-h-[600px]">
        {treeData.map((node, index) => renderNode(node, index))}
      </div>
    </div>
  );
};

export default ArticleTree;