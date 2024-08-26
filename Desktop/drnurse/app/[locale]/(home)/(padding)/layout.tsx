import BreadCrumb from "@/app/components/BreadCrumb";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className=" pb-14 pt-40">
      <BreadCrumb />
      {children}
    </section>
  );
}
