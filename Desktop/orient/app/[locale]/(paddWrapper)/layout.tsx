

export default async function RootLayout({
  children,

}: Readonly<{
  children: React.ReactNode;

}>) {
  return <main className=" py-40">{children}</main>;
}
