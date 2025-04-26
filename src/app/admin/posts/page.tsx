"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import {
  PlusIcon,
  MagnifyingGlassIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

interface Post {
  id: string;
  title: string;
  slug: string;
  category: string;
  status: "draft" | "published";
  views: number;
  likes: number;
  createdAt: string;
  updatedAt: string;
}

export default function PostsManagement() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // 模拟数据
  const mockPosts: Post[] = [
    {
      id: "1",
      title: "Vue3响应式系统实现原理",
      slug: "vue3-reactivity",
      category: "Vue",
      status: "published",
      views: 1234,
      likes: 56,
      createdAt: "2024-02-14T08:42:43",
      updatedAt: "2024-02-14T08:42:49",
    },
    {
      id: "2",
      title: "Next.js 14 新特性解析",
      slug: "nextjs-14-features",
      category: "Next.js",
      status: "draft",
      views: 890,
      likes: 34,
      createdAt: "2024-02-14T06:46:20",
      updatedAt: "2024-02-14T06:46:35",
    },
  ];

  // 过滤文章
  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // 分页
  const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // 处理删除
  const handleDelete = async (id: string) => {
    if (!confirm("确定要删除这篇文章吗？")) return;
    // TODO: 实现删除逻辑
    console.log("删除文章:", id);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">文章管理</h1>
        <Button className="flex items-center gap-2">
          <PlusIcon className="w-5 h-5" />
          新建文章
        </Button>
      </div>

      <div className="flex gap-4 items-center">
        <div className="relative flex-1">
          <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="search"
            placeholder="搜索文章标题或分类..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800/60">
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-400">
                  标题
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-400">
                  分类
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-400">
                  状态
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-400">
                  浏览
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-400">
                  点赞
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-400">
                  创建时间
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-400">
                  更新时间
                </th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-600 dark:text-gray-400">
                  操作
                </th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center">
                    <Spinner className="w-8 h-8 mx-auto" />
                  </td>
                </tr>
              ) : paginatedPosts.length === 0 ? (
                <tr>
                  <td
                    colSpan={8}
                    className="px-4 py-8 text-center text-gray-500 dark:text-gray-400"
                  >
                    暂无数据
                  </td>
                </tr>
              ) : (
                paginatedPosts.map((post) => (
                  <tr
                    key={post.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800/60"
                  >
                    <td className="px-4 py-3 text-sm">{post.title}</td>
                    <td className="px-4 py-3 text-sm">{post.category}</td>
                    <td className="px-4 py-3 text-sm">
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          post.status === "published"
                            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                            : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                        }`}
                      >
                        {post.status === "published" ? "已发布" : "草稿"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm">{post.views}</td>
                    <td className="px-4 py-3 text-sm">{post.likes}</td>
                    <td className="px-4 py-3 text-sm">
                      {new Date(post.createdAt).toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {new Date(post.updatedAt).toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-sm text-right space-x-2">
                      <Button variant="ghost" size="sm">
                        <PencilIcon className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-600 hover:text-red-700"
                        onClick={() => handleDelete(post.id)}
                      >
                        <TrashIcon className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              第 {currentPage} 页，共 {totalPages} 页
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              >
                上一页
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === totalPages}
                onClick={() =>
                  setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                }
              >
                下一页
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
