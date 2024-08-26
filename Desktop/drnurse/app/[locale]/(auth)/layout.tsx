import { unstable_setRequestLocale } from "next-intl/server";
import Image from "next/image";

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  unstable_setRequestLocale(locale);
  return <main className=" h-full w-full ">{children}</main>;
}
