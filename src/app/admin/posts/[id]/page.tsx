"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import {
  ArrowLeftIcon,
  DocumentIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";

interface PostData {
  id: string;
  title: string;
  content: string;
  category: string;
  status: "draft" | "published";
}

export default function PostEditor({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [post, setPost] = useState<PostData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isPreview, setIsPreview] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // TODO: 从API获取文章数据
    // 模拟加载数据
    setTimeout(() => {
      setPost({
        id: params.id,
        title: "新文章",
        content: "# 开始编写你的文章\n\n在这里输入内容...",
        category: "未分类",
        status: "draft",
      });
      setIsLoading(false);
    }, 1000);
  }, [params.id]);

  const handleSave = async () => {
    if (!post) return;

    setIsSaving(true);
    setError("");

    try {
      // TODO: 实现保存逻辑
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // 模拟保存成功
      console.log("保存文章:", post);
    } catch (err) {
      setError(err instanceof Error ? err.message : "保存失败");
    } finally {
      setIsSaving(false);
    }
  };

  const handlePublish = async () => {
    if (!post) return;

    setIsSaving(true);
    setError("");

    try {
      // TODO: 实现发布逻辑
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // 模拟发布成功
      console.log("发布文章:", post);
    } catch (err) {
      setError(err instanceof Error ? err.message : "发布失败");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-4rem)]">
        <Spinner className="w-8 h-8" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-4rem)]">
        <p className="text-red-600 dark:text-red-400">文章不存在</p>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col">
      {/* 工具栏 */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.back()}
              className="flex items-center gap-2"
            >
              <ArrowLeftIcon className="w-4 h-4" />
              返回
            </Button>
            <Input
              value={post.title}
              onChange={(e) =>
                setPost((prev) =>
                  prev ? { ...prev, title: e.target.value } : null
                )
              }
              placeholder="文章标题"
              className="w-96"
            />
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsPreview(!isPreview)}
              className="flex items-center gap-2"
            >
              {isPreview ? (
                <>
                  <DocumentIcon className="w-4 h-4" />
                  编辑
                </>
              ) : (
                <>
                  <EyeIcon className="w-4 h-4" />
                  预览
                </>
              )}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleSave}
              disabled={isSaving}
            >
              保存草稿
            </Button>
            <Button size="sm" onClick={handlePublish} disabled={isSaving}>
              发布
            </Button>
          </div>
        </div>

        {error && (
          <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400">
            {error}
          </div>
        )}
      </div>

      {/* 编辑器区域 */}
      <div className="flex-1 overflow-hidden">
        {isPreview ? (
          <div className="h-full overflow-y-auto p-6">
            {/* TODO: 实现Markdown预览 */}
            <div className="prose dark:prose-invert max-w-none">
              {post.content}
            </div>
          </div>
        ) : (
          <textarea
            value={post.content}
            onChange={(e) =>
              setPost((prev) =>
                prev ? { ...prev, content: e.target.value } : null
              )
            }
            className="w-full h-full p-6 bg-transparent border-none outline-none resize-none font-mono"
            placeholder="开始编写你的文章..."
          />
        )}
      </div>
    </div>
  );
}
