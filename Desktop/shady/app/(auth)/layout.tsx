import Image from "next/image";

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  return (
    <main className=" min-h-screen h-full flex items-stretch  w-full ">
      <div className=" hidden md:block md:w-[40%] lg:w-[55%]  min-h-full relative">
        <Image src="/123A2320.JPG" alt="login" className=" object-cover" fill />
      </div>
      {children}
    </main>
  );
}
