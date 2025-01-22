"use client";

import { useRef } from "react";
import TableOfContents from "./TableOfContents";

export default function MobileTableOfContents() {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const handleOpen = () => {
    dialogRef.current?.showModal();
  };

  const handleClose = () => {
    dialogRef.current?.close();
  };

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-[100] bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 p-4">
      <button
        onClick={handleOpen}
        className="w-full py-2.5 px-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      >
        显示目录
      </button>
      <dialog
        ref={dialogRef}
        className="fixed inset-0 bg-black/20 backdrop-blur-sm w-full h-full p-0 m-0 z-[101]"
      >
        <div className="bg-white dark:bg-gray-900 w-full h-[85vh] absolute bottom-0 rounded-t-2xl p-4 sm:p-6 overflow-hidden shadow-lg">
          <div className="flex justify-between items-center mb-4 sticky top-0 bg-white dark:bg-gray-900 py-2">
            <h2 className="font-bold text-lg">目录</h2>
            <button
              onClick={handleClose}
              className="p-2.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
            >
              关闭
            </button>
          </div>
          <div className="overflow-auto h-[calc(85vh-5rem)] pb-safe">
            <TableOfContents />
          </div>
        </div>
      </dialog>
    </div>
  );
}
