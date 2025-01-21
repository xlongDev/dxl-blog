import type { Metadata } from "next";
import { Inter, Noto_Serif_SC, Noto_Sans_SC } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";

const inter = Inter({ subsets: ["latin"] });
const notoSerifSC = Noto_Serif_SC({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-noto-serif-sc",
});
const notoSansSC = Noto_Sans_SC({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-noto-sans-sc",
});

export const metadata: Metadata = {
  title: "段晓龙的博客 | 前端技术分享",
  description: "分享前端开发技术、经验和见解",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh" suppressHydrationWarning>
      <head></head>
      <body
        suppressHydrationWarning
        className={`${inter.className} ${notoSerifSC.variable} ${notoSansSC.variable} bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100`}
      >
        <Providers>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
            <BackToTop />
          </div>
        </Providers>
      </body>
    </html>
  );
}
