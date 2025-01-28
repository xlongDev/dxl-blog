"use client";

import { useState } from "react";
import { Post } from "contentlayer/generated";
import { ChevronRight, ChevronDown, FileText } from "lucide-react";

interface TreeNode {
  name: string;
  children?: TreeNode[];
  posts?: Post[];
  isExpanded?: boolean;
}

interface ArticleTreeProps {
  posts: Post[];
}

const ArticleTree = ({ posts }: ArticleTreeProps) => {
  const [treeData, setTreeData] = useState(() => buildTree(posts));

  function buildTree(posts: Post[]): TreeNode[] {
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

    // 将对象值转换为数组并按照分类名称排序
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

  const renderNode = (node: TreeNode) => {
    return (
      <div key={node.name} className="pl-4">
        <div
          className="flex items-center gap-2 py-2 cursor-pointer hover:text-blue-500"
          onClick={() => toggleNode(node)}
        >
          {node.posts && node.posts.length > 0 ? (
            node.isExpanded ? (
              <ChevronDown size={16} />
            ) : (
              <ChevronRight size={16} />
            )
          ) : null}
          <span>{node.name}</span>
          {node.posts && (
            <span className="text-sm text-gray-500">({node.posts.length})</span>
          )}
        </div>
        {node.isExpanded && node.posts && (
          <div className="pl-6">
            {node.posts.map((post) => (
              <a
                key={post.url}
                href={post.url}
                className="flex items-center gap-2 py-1 text-sm hover:text-blue-500"
              >
                <FileText size={14} />
                <span>{post.title}</span>
              </a>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-full max-w-xs bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
      <h3 className="text-lg font-semibold mb-4">文章目录</h3>
      <div className="overflow-y-auto max-h-[600px]">
        {treeData.map((node) => renderNode(node))}
      </div>
    </div>
  );
};

export default ArticleTree;
