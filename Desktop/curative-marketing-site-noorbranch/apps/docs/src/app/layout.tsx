import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Webstacks Documentation',
  description: 'Documentation and component library for Webstacks',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
