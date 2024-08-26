import Footer from "@/app/components/Footer";
import NavBar from "@/app/components/NavBar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <NavBar />
      <section className="">{children}</section>
      <Footer />
    </main>
  );
}
