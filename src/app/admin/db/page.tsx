"use client";

import { useEffect, useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import {
  PlusIcon,
  ArrowPathIcon,
  ChevronUpIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";

import TableModal from "./components/TableModal";
import RecordModal from "./components/RecordModal";

interface TableData {
  table_name: string;
  data: any[];
}

interface SortConfig {
  key: string;
  direction: "asc" | "desc";
}

export default function DatabaseAdmin() {
  const [tables, setTables] = useState<TableData[]>([]);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [dbStatus, setDbStatus] = useState<
    "connected" | "disconnected" | "connecting"
  >("connecting");
  const [currentPage, setCurrentPage] = useState<Record<string, number>>({});
  const [sortConfig, setSortConfig] = useState<Record<string, SortConfig>>({});
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isRecordModalOpen, setIsRecordModalOpen] = useState(false);
  const [selectedTable, setSelectedTable] = useState("");
  const [selectedRow, setSelectedRow] = useState<any>(null);
  const itemsPerPage = 10;

  const fetchData = async () => {
    setIsLoading(true);
    setError("");
    try {
      const response = await fetch("/api/db");
      if (!response.ok) {
        throw new Error("获取数据失败");
      }
      const data = await response.json();
      setTables(data.tables);
      setDbStatus("connected");
    } catch (err) {
      setError(err instanceof Error ? err.message : "获取数据失败");
      setDbStatus("disconnected");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSort = (tableName: string, key: string) => {
    setSortConfig((prev) => {
      const currentSort = prev[tableName];
      if (currentSort?.key === key) {
        return {
          ...prev,
          [tableName]: {
            key,
            direction: currentSort.direction === "asc" ? "desc" : "asc",
          },
        };
      }
      return {
        ...prev,
        [tableName]: { key, direction: "asc" },
      };
    });
  };

  const getSortedData = (tableName: string, data: any[]) => {
    const sort = sortConfig[tableName];
    if (!sort) return data;

    return [...data].sort((a, b) => {
      if (a[sort.key] < b[sort.key]) return sort.direction === "asc" ? -1 : 1;
      if (a[sort.key] > b[sort.key]) return sort.direction === "asc" ? 1 : -1;
      return 0;
    });
  };

  const getPaginatedData = (tableName: string, data: any[]) => {
    const page = currentPage[tableName] || 1;
    const start = (page - 1) * itemsPerPage;
    return data.slice(start, start + itemsPerPage);
  };

  const getPageCount = (dataLength: number) => {
    return Math.ceil(dataLength / itemsPerPage);
  };

  const handleCreateTable = () => {
    setIsCreateModalOpen(true);
  };

  const handleCreateSubmit = async (data: {
    tableName: string;
    columns: any[];
  }) => {
    try {
      const response = await fetch("/api/db/tables", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("创建表失败");
      fetchData();
      setIsCreateModalOpen(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "创建表失败");
    }
  };

  const handleEditSubmit = async (data: {
    tableName: string;
    columns: any[];
  }) => {
    try {
      const response = await fetch(`/api/db/tables/${selectedTable}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("更新表失败");
      fetchData();
      setIsEditModalOpen(false);
      setSelectedTable("");
      setSelectedRow(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "更新表失败");
    }
  };

  const handleEditRow = (tableName: string, row: any) => {
    setSelectedTable(tableName);
    setSelectedRow(row);
    setIsRecordModalOpen(true);
  };

  const handleEditRecordSubmit = async (data: Record<string, any>) => {
    try {
      // 格式化日期时间字段
      const formattedData = Object.entries(data).reduce((acc, [key, value]) => {
        if (
          value instanceof Date ||
          (typeof value === "string" &&
            value.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/))
        ) {
          const date = new Date(value);
          acc[key] = date.toISOString().slice(0, 19).replace("T", " ");
        } else {
          acc[key] = value;
        }
        return acc;
      }, {} as Record<string, any>);

      // 添加更新时间
      formattedData.updated_at = new Date()
        .toISOString()
        .slice(0, 19)
        .replace("T", " ");

      const response = await fetch(`/api/db/tables/${selectedTable}/rows`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          oldData: selectedRow,
          newData: formattedData,
        }),
      });
      if (!response.ok) throw new Error("更新记录失败");
      fetchData();
      setIsRecordModalOpen(false);
      setSelectedTable("");
      setSelectedRow(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "更新记录失败");
    }
  };

  const handleDeleteRow = async (tableName: string, row: any) => {
    if (!confirm("确定要删除这条记录吗？")) return;

    try {
      const response = await fetch(`/api/db/tables/${tableName}/rows`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(row),
      });
      if (!response.ok) throw new Error("删除记录失败");
      fetchData();
    } catch (err) {
      setError(err instanceof Error ? err.message : "删除记录失败");
    }
  };

  return (
    <>
      <div className="p-6 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">数据库管理</h1>
            <div className="mt-2 flex items-center gap-2">
              <div
                className={`w-2 h-2 rounded-full ${
                  dbStatus === "connected"
                    ? "bg-green-500"
                    : dbStatus === "connecting"
                    ? "bg-yellow-500"
                    : "bg-red-500"
                }`}
              />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {dbStatus === "connected"
                  ? "数据库已连接"
                  : dbStatus === "connecting"
                  ? "正在连接..."
                  : "连接失败"}
              </span>
            </div>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={fetchData}
              variant="outline"
              className="flex items-center gap-2"
              disabled={isLoading}
            >
              <ArrowPathIcon className="w-4 h-4" />
              刷新
            </Button>
            <Button
              className="flex items-center gap-2"
              onClick={handleCreateTable}
            >
              <PlusIcon className="w-4 h-4" />
              新建表
            </Button>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400">
            {error}
          </div>
        )}

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Spinner className="w-8 h-8" />
          </div>
        ) : tables.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
            <p className="text-gray-600 dark:text-gray-400">暂无数据表</p>
          </div>
        ) : (
          <div className="space-y-8">
            {tables.map((table) => {
              const sortedData = getSortedData(table.table_name, table.data);
              const paginatedData = getPaginatedData(
                table.table_name,
                sortedData
              );
              const pageCount = getPageCount(sortedData.length);
              const currentTablePage = currentPage[table.table_name] || 1;

              return (
                <div
                  key={table.table_name}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden"
                >
                  <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                    <h2 className="text-xl font-semibold">
                      {table.table_name}
                    </h2>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        编辑
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600 hover:text-red-700 border-red-200 hover:border-red-300 dark:border-red-800 dark:hover:border-red-700"
                      >
                        删除
                      </Button>
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gray-50 dark:bg-gray-800/60">
                          {table.data.length > 0 &&
                            Object.keys(table.data[0]).map((key) => {
                              const sort = sortConfig[table.table_name];
                              const isActive = sort?.key === key;
                              return (
                                <th
                                  key={key}
                                  className="px-4 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700/50"
                                  onClick={() =>
                                    handleSort(table.table_name, key)
                                  }
                                >
                                  <div className="flex items-center gap-1">
                                    {key}
                                    {isActive &&
                                      (sort.direction === "asc" ? (
                                        <ChevronUpIcon className="w-4 h-4" />
                                      ) : (
                                        <ChevronDownIcon className="w-4 h-4" />
                                      ))}
                                  </div>
                                </th>
                              );
                            })}
                          <th className="px-4 py-3 text-right border-b border-gray-200 dark:border-gray-700">
                            操作
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {paginatedData.map((row, index) => (
                          <tr
                            key={index}
                            className="hover:bg-gray-50 dark:hover:bg-gray-800/60"
                          >
                            {Object.values(row).map((value: any, i) => {
                              let displayValue = value?.toString() || "";
                              // 检查是否为ISO格式的日期时间字符串
                              if (
                                typeof value === "string" &&
                                value.match(
                                  /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/
                                )
                              ) {
                                const date = new Date(value);
                                // 转换为北京时间
                                const utc8Date = new Date(
                                  date.getTime() + 8 * 60 * 60 * 1000
                                );
                                displayValue = utc8Date.toLocaleString(
                                  "zh-CN",
                                  {
                                    year: "numeric",
                                    month: "2-digit",
                                    day: "2-digit",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    second: "2-digit",
                                    hour12: false,
                                    timeZone: "Asia/Shanghai",
                                  }
                                );
                              }
                              return (
                                <td
                                  key={i}
                                  className="px-4 py-3 text-sm border-b border-gray-200 dark:border-gray-700"
                                >
                                  {displayValue}
                                </td>
                              );
                            })}
                            <td className="px-4 py-3 text-sm text-right border-b border-gray-200 dark:border-gray-700">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() =>
                                  handleEditRow(table.table_name, row)
                                }
                              >
                                编辑
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-red-600 hover:text-red-700 ml-2"
                                onClick={() =>
                                  handleDeleteRow(table.table_name, row)
                                }
                              >
                                删除
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {pageCount > 1 && (
                    <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        第 {currentTablePage} 页，共 {pageCount} 页
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          disabled={currentTablePage === 1}
                          onClick={() =>
                            setCurrentPage((prev) => ({
                              ...prev,
                              [table.table_name]: Math.max(
                                1,
                                (prev[table.table_name] || 1) - 1
                              ),
                            }))
                          }
                        >
                          上一页
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          disabled={currentTablePage === pageCount}
                          onClick={() =>
                            setCurrentPage((prev) => ({
                              ...prev,
                              [table.table_name]: Math.min(
                                pageCount,
                                (prev[table.table_name] || 1) + 1
                              ),
                            }))
                          }
                        >
                          下一页
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* 新建表模态框 */}
        <TableModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onSubmit={handleCreateSubmit}
          mode="create"
        />

        {/* 编辑表模态框 */}
        <TableModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedTable("");
            setSelectedRow(null);
          }}
          onSubmit={handleEditSubmit}
          mode="edit"
          initialData={{
            tableName: selectedTable,
            columns: [], // 这里需要根据实际情况获取表的列信息
          }}
        />
      </div>

      {/* 记录编辑模态框 */}
      <RecordModal
        isOpen={isRecordModalOpen}
        onClose={() => {
          setIsRecordModalOpen(false);
          setSelectedTable("");
          setSelectedRow(null);
        }}
        onSubmit={handleEditRecordSubmit}
        tableName={selectedTable}
        initialData={selectedRow}
      />
    </>
  );
}
