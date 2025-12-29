// 从 React 库中导入 useState 和 useMemo 钩子
// useState 用于在函数组件中添加状态管理
// useMemo 用于缓存计算结果，避免不必要的重复计算
import { useState, useMemo } from "react";
// 从 contentlayer/generated 模块中导入 Post 类型，代表文章数据的类型
import { Post } from "contentlayer/generated";

// 定义 usePaginatedPosts 钩子的属性接口
// 该接口描述了传递给 usePaginatedPosts 钩子的参数类型
interface UsePaginatedPostsProps {
  // 接收一个 Post 类型的数组，表示文章列表
  posts: Post[];
  // 可选参数，表示每页显示的文章数量，默认值在钩子内部设置
  postsPerPage?: number;
}

// 导出一个自定义钩子 usePaginatedPosts，用于对文章进行分页处理
export function usePaginatedPosts({
  // 文章列表
  posts,
  // 每页显示的文章数量，默认为 12
  postsPerPage = 12,
}: UsePaginatedPostsProps) {
  // 使用 useState 钩子来管理当前页码，初始值为 1
  const [currentPage, setCurrentPage] = useState(1);

  // 计算总页数，使用 Math.ceil 函数确保结果为向上取整
  // 总页数等于文章总数除以每页显示的文章数量
  const totalPages = Math.ceil(posts.length / postsPerPage);

  // 使用 useMemo 钩子来缓存分页后的文章列表
  // 只有当 posts、currentPage 或 postsPerPage 发生变化时，才会重新计算分页后的文章列表
  const paginatedPosts = useMemo(() => {
    // 计算当前页的起始索引
    const startIndex = (currentPage - 1) * postsPerPage;
    // 计算当前页的结束索引
    const endIndex = startIndex + postsPerPage;
    // 使用 slice 方法从文章列表中截取当前页的文章
    return posts.slice(startIndex, endIndex);
  }, [posts, currentPage, postsPerPage]);

  // 定义一个函数，用于滚动到文章列表的位置
  const scrollToPostList = () => {
    // 通过 ID 获取文章列表容器元素
    const postListContainer = document.getElementById("post-list-container");
    // 如果找到了文章列表容器元素
    if (postListContainer) {
      // 定义一个偏移量，用于调整滚动位置
      const headerOffset = -1000;
      // 获取文章列表容器元素相对于视口顶部的距离，并加上当前窗口的滚动位置
      const elementPosition =
        postListContainer.getBoundingClientRect().top + window.scrollY;
      // 计算最终的滚动位置
      const offsetPosition = elementPosition - headerOffset;

      // 使用 requestAnimationFrame 来优化滚动动画
      requestAnimationFrame(() => {
        // 平滑滚动到指定位置
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      });
    }
  };

  // 修改 goToPreviousPage 函数，支持事件处理器
  const goToPreviousPage = (event?: React.MouseEvent | boolean) => {
    // 更新当前页码，确保不小于 1
    setCurrentPage((prev) => Math.max(prev - 1, 1));
    // 判断是否需要滚动到文章列表位置
    const shouldScroll = typeof event === "boolean" ? event : true;
    // 如果需要滚动，则调用 scrollToPostList 函数
    if (shouldScroll) scrollToPostList();
  };

  // 修改 goToNextPage 函数，支持事件处理器
  const goToNextPage = (event?: React.MouseEvent | boolean) => {
    // 更新当前页码，确保不大于总页数
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    // 判断是否需要滚动到文章列表位置
    const shouldScroll = typeof event === "boolean" ? event : true;
    // 如果需要滚动，则调用 scrollToPostList 函数
    if (shouldScroll) scrollToPostList();
  };

  // 定义一个函数，用于跳转到指定页码
  const goToPage = (page: number, shouldScroll: boolean = true) => {
    // 确保输入的页码在 1 到总页数之间
    const pageNumber = Math.max(1, Math.min(page, totalPages));
    // 更新当前页码
    setCurrentPage(pageNumber);
    // 如果需要滚动，则调用 scrollToPostList 函数
    if (shouldScroll) scrollToPostList();
  };

  // 返回分页相关的状态和函数
  return {
    // 当前页码
    currentPage,
    // 总页数
    totalPages,
    // 分页后的文章列表
    paginatedPosts,
    // 跳转到下一页的函数
    goToNextPage,
    // 跳转到上一页的函数
    goToPreviousPage,
    // 跳转到指定页码的函数
    goToPage,
  };
}