"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface RecordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Record<string, any>) => void;
  tableName: string;
  initialData?: Record<string, any>;
}

export default function RecordModal({
  isOpen,
  onClose,
  onSubmit,
  tableName,
  initialData,
}: RecordModalProps) {
  const [formData, setFormData] = useState<Record<string, any>>(
    initialData || {}
  );

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  if (!isOpen) return null;

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">编辑记录</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              {Object.entries(formData).map(([field, value]) => (
                <div key={field}>
                  <label className="block text-sm font-medium mb-2">
                    {field}
                  </label>
                  <Input
                    value={value?.toString() || ""}
                    onChange={(e) => handleChange(field, e.target.value)}
                    placeholder={`请输入${field}`}
                  />
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-3 pt-4 mt-6 border-t">
              <Button type="button" variant="outline" onClick={onClose}>
                取消
              </Button>
              <Button type="submit">保存</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
