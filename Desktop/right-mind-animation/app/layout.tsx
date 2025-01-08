import type { Metadata } from "next";
import "./globals.css";
import "locomotive-scroll/src/locomotive-scroll.scss";
import { SmoothScrollProvider } from "./context/ScrollProviderContext";
import { LoadingProvider } from "./context/LoadingContext";
import NavBar from "./components/NavBar";
import { Afacad } from "next/font/google";
// const myFont = localFont({
//   src: [
//     { path: "../public/HalvarMittel-Lt.woff", weight: "400", style: "normal" },
//     { path: "../public/HalvarMittel-XBd.woff", weight: "700", style: "normal" },
//     { path: "../public/HalvarMittel-MdSlanted.woff", weight: "500", style: "normal" },
//   ],
// });
const afacd = Afacad({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${afacd.className} antialiased`}>
        <SmoothScrollProvider>
          <LoadingProvider>
            <div data-scroll-container className={`main-container relative h-full overflow-hidden `}>
              <NavBar />
              {children}
            </div>
          </LoadingProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}

/*
mobile 
continue pinning section
why choose us slider
numbers
news
*/
