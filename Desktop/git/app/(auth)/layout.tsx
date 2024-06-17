import Slider from "../components/Slider";
import "../globals.css";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex h-[100vh] items-stretch justify-center">
      {children}
      <Slider />
    </main>
  );
}
