import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./context/ThemeProvider";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import QueryProvider from "@/lib/QueryProvider";
const inter = Cairo({ subsets: ["latin"], weight: ["400", "700", "500"] });

export const metadata: Metadata = {
  title: "تعلم اللغة العربية مع الأستاذ الشادي - دروس متميزة للمرحلة الثانوية",
  description:
    "انضم إلى دروس الأستاذ الشادي لتعلم اللغة العربية بأسلوب مبتكر وممتع. تغطية شاملة لمنهج المرحلة الثانوية مع تحضير مميز للامتحانات.",
  keywords: [
    "دروس لغة عربية",
    "تعلم اللغة العربية",
    "تعليم عربي للثانوية",
    "دروس النحو",
    "تحضير الامتحانات",
    "تعليم عربي عبر الإنترنت",
    "الأستاذ الشادي",
    "دروس البلاغة",
    "دروس الأدب العربي",
    "دروس اللغة العربية للثانوية",
  ],
  alternates: {
    canonical: "https://arabic-language-learning.vercel.app/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar">
      <body  className={`${inter.className}   text-right `}>
        <ToastContainer
          position="top-center"
          autoClose={3500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnFocusLoss
          pauseOnHover={false}
          theme="light"
        />
        <QueryProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
