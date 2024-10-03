import type { Metadata } from "next";
import "./globals.css";
import "locomotive-scroll/src/locomotive-scroll.scss";

import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Noor Hesham Portfolio",
  icons: { icon: "/logo.png" },
  description:
    "MERN Stack Developer specializing in React, Next.js, TypeScript,Node .js,Mongo DB and Tailwind CSS. Proven track record of crafting high-performance web applications with sleek, user-friendly interfaces. Adaptable and detail-oriented, committed to delivering top-notch solutions. Passionate about staying ahead in technology and contributing to dynamic teams.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className}  `}>
        <main data-scroll-container className="main-container">
          {children}
        </main>
      </body>
    </html>
  );
}
