import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">关于我</h1>
      <div className="prose dark:prose-invert">
        <div className="flex items-center gap-6 mb-8">
          <Image
            src="/ava.jpg"
            alt="晓龙"
            width={120}
            height={120}
            className="rounded-full"
          />
          <div>
            <h2 className="!mt-0">晓龙</h2>
            <p className="text-gray-600 dark:text-gray-400">
              前端开发工程师 / 跑者
            </p>
          </div>
        </div>

        <h3>技术栈</h3>
        <ul>
          <li>HTML5 / CSS3 / Sass / Less / TailwindCSS / Bootstrap</li>
          <li>React / Vue / Next.js / Nuxt / TypeScript / JavaScript</li>
          <li>WebPack / Vite / Rollup / babel </li>
          <li>Node.js / Express / Koa</li>
          <li>MongoDB / MySQL </li>
        </ul>

        <h3>联系方式</h3>
        <ul>
          <li>
            GitHub:{" "}
            <Link href="https://github.com/xLongDev" target="_blank">
              xLongDev
            </Link>
          </li>
          {/* <li>
            Twitter:{" "}
            <Link href="https://twitter.com/你的用户名" target="_blank">
              @你的用户名
            </Link>
          </li> */}
          <li>Email: byte7956@gmail.com</li>
        </ul>
      </div>
    </div>
  );
}
