"use client";

import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3 group">
      <Image
        src="/ava.jpg"
        alt="晓龙"
        width={32}
        height={32}
        className="rounded-full transform transition-transform duration-300 group-hover:scale-110"
      />
      <span className="text-xl font-bold truncate min-w-[3rem] bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent transition-all duration-300 group-hover:from-purple-600 group-hover:to-pink-600 group-hover:scale-105">
        晓龙的blog
      </span>
    </Link>
  );
}
