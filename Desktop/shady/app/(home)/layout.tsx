import Footer from "../components/Footer";
import NavBar from "../components/NavBar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className=" pt-28 lg:pt-16">
      <NavBar />
      {children}
      <Footer />
    </main>
  );
}
