import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "凡真 - 炼体修真综合指导平台",
  description: "凡真是一个整合儒释道医武等各派之长的炼体修真综合指导平台，让普通人也能走上修炼之路。提供系统化的修炼体系、功法数据库、典籍文献和AI智能辅导。",
  keywords: ["修真", "修炼", "道家", "佛家", "养生", "气功", "太极", "瑜伽", "冥想"],
  authors: [{ name: "凡真" }],
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180" },
    ],
  },
  manifest: "/site.webmanifest",
  themeColor: "#1a1a2e",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "凡真",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className={inter.className}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
