"use client";

import Image from "next/image";
import Link from "next/link";
import { useThemeUtils } from "@/hooks/useThemeUtils";
import { useEffect, useState } from "react";

export default function Logo() {
  const { theme, getThemeValue } = useThemeUtils();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 根据主题获取标题渐变色
  const getTitleGradient = () => {
    return getThemeValue(
      {
        light: "from-blue-600 to-purple-600",
        dark: "from-blue-400 to-purple-400",
        green: "from-green-500 to-teal-400",
        purple: "from-purple-500 to-indigo-400",
        orange: "from-orange-500 to-yellow-400",
        blue: "from-blue-500 to-cyan-400",
        pink: "from-pink-500 to-red-400",
        brown: "from-amber-700 to-yellow-500",
      },
      "from-blue-600 to-purple-600"
    );
  };

  // 根据主题获取hover时的渐变色
  const getHoverGradient = () => {
    return getThemeValue(
      {
        light: "group-hover:from-purple-600 group-hover:to-pink-600",
        dark: "group-hover:from-purple-400 group-hover:to-pink-400",
        green: "group-hover:from-teal-500 group-hover:to-emerald-400",
        purple: "group-hover:from-indigo-500 group-hover:to-violet-400",
        orange: "group-hover:from-yellow-500 group-hover:to-amber-400",
        blue: "group-hover:from-cyan-500 group-hover:to-sky-400",
        pink: "group-hover:from-red-500 group-hover:to-rose-400",
        brown: "group-hover:from-yellow-600 group-hover:to-amber-500",
      },
      "group-hover:from-purple-600 group-hover:to-pink-600"
    );
  };

  const titleGradient = mounted
    ? getTitleGradient()
    : "from-blue-600 to-purple-600";
  const hoverGradient = mounted
    ? getHoverGradient()
    : "group-hover:from-purple-600 group-hover:to-pink-600";

  return (
    <Link href="/" className="flex items-center gap-3 group">
      <Image
        src="/ava.jpg"
        alt="晓龙"
        width={32}
        height={32}
        className="rounded-full transform transition-transform duration-300 group-hover:scale-110"
      />
      <span
        className={`text-xl font-bold truncate min-w-[3rem] bg-gradient-to-r ${titleGradient} bg-clip-text text-transparent transition-all duration-300 ${hoverGradient} group-hover:scale-105`}
      >
        晓龙的blog
      </span>
    </Link>
  );
}
