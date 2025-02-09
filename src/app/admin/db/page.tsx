"use client";

import { useEffect, useState } from "react";

interface TableData {
  table_name: string;
  data: any[];
}

export default function DatabaseAdmin() {
  const [tables, setTables] = useState<TableData[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/db");
        if (!response.ok) {
          throw new Error("获取数据失败");
        }
        const data = await response.json();
        setTables(data.tables);
      } catch (err) {
        setError(err instanceof Error ? err.message : "获取数据失败");
      }
    };

    fetchData();
  }, []);

  if (error) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">数据库管理</h1>
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">数据库管理</h1>
      {tables.map((table) => (
        <div key={table.table_name} className="mb-8">
          <h2 className="text-xl font-semibold mb-2">{table.table_name}</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 dark:border-gray-700">
              <thead>
                <tr>
                  {table.data.length > 0 &&
                    Object.keys(table.data[0]).map((key) => (
                      <th
                        key={key}
                        className="px-4 py-2 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
                      >
                        {key}
                      </th>
                    ))}
                </tr>
              </thead>
              <tbody>
                {table.data.map((row, index) => (
                  <tr key={index}>
                    {Object.values(row).map((value: any, i) => (
                      <td
                        key={i}
                        className="px-4 py-2 border-b border-gray-200 dark:border-gray-700"
                      >
                        {value?.toString() || ""}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}
