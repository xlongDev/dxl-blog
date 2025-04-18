"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";

interface Column {
  name: string;
  type: string;
  nullable: boolean;
}

interface TableModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { tableName: string; columns: Column[] }) => void;
  mode: "create" | "edit";
  initialData?: {
    tableName: string;
    columns: Column[];
  };
}

export default function TableModal({
  isOpen,
  onClose,
  onSubmit,
  mode,
  initialData,
}: TableModalProps) {
  const [tableName, setTableName] = useState(initialData?.tableName || "");
  const [columns, setColumns] = useState<Column[]>(
    initialData?.columns || [{ name: "", type: "VARCHAR", nullable: true }]
  );

  if (!isOpen) return null;

  const handleAddColumn = () => {
    setColumns([...columns, { name: "", type: "VARCHAR", nullable: true }]);
  };

  const handleRemoveColumn = (index: number) => {
    setColumns(columns.filter((_, i) => i !== index));
  };

  const handleColumnChange = (
    index: number,
    field: keyof Column,
    value: any
  ) => {
    const newColumns = [...columns];
    newColumns[index] = { ...newColumns[index], [field]: value };
    setColumns(newColumns);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ tableName, columns });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">
              {mode === "create" ? "新建表" : "编辑表"}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">表名</label>
                <Input
                  value={tableName}
                  onChange={(e) => setTableName(e.target.value)}
                  placeholder="请输入表名"
                  required
                  disabled={mode === "edit"}
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium">列定义</label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleAddColumn}
                    className="flex items-center gap-1"
                  >
                    <PlusIcon className="w-4 h-4" />
                    添加列
                  </Button>
                </div>

                <div className="space-y-4">
                  {columns.map((column, index) => (
                    <div
                      key={index}
                      className="flex gap-4 items-start bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg"
                    >
                      <div className="flex-1">
                        <Input
                          value={column.name}
                          onChange={(e) =>
                            handleColumnChange(index, "name", e.target.value)
                          }
                          placeholder="列名"
                          required
                        />
                      </div>
                      <div className="flex-1">
                        <select
                          value={column.type}
                          onChange={(e) =>
                            handleColumnChange(index, "type", e.target.value)
                          }
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700"
                        >
                          <option value="VARCHAR">VARCHAR</option>
                          <option value="INT">INT</option>
                          <option value="DATETIME">DATETIME</option>
                          <option value="TEXT">TEXT</option>
                          <option value="BOOLEAN">BOOLEAN</option>
                        </select>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={column.nullable}
                          onChange={(e) =>
                            handleColumnChange(
                              index,
                              "nullable",
                              e.target.checked
                            )
                          }
                          className="w-4 h-4"
                        />
                        <span className="text-sm">可空</span>
                      </div>
                      {columns.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveColumn(index)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <XMarkIcon className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t">
                <Button type="button" variant="outline" onClick={onClose}>
                  取消
                </Button>
                <Button type="submit">
                  {mode === "create" ? "创建" : "保存"}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
