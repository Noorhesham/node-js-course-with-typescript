import '@/styles/global.css';
import { Metadata } from 'next';
import { ThemeProvider } from './providers';
import SegmentScript from '@/lib/analytics/SegmentScript';
import { ToastManager } from '@/components/primatives/ToastManager';

export const metadata: Metadata = {
  title: 'Webstacks Dev Blog',
  description: 'Insights and articles from the Webstacks development team',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `
          try {
            const theme = localStorage.getItem('theme');
            if (theme === 'dark') {
              document.documentElement.classList.add('dark');
            } else if (theme === 'light') {
              document.documentElement.classList.remove('dark');
            } else {
              if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                document.documentElement.classList.add('dark');
              }
            }
          } catch (e) {}
        ` }} />
      </head>
      <body className="bg-white text-gray-900 dark:bg-gray-900 dark:text-white transition-colors duration-200">
        <ThemeProvider>
          <ToastManager position="bottom-right">
            {children}
          </ToastManager>
        </ThemeProvider>
        <SegmentScript />
      </body>
    </html>
  );
}
