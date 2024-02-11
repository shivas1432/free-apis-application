// Enhanced: Update styling - Feb 2024
// Enhanced: Fix TypeScript types - Jan 2024
// Enhanced: Add dark mode support - Jan 2024
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from 'next-themes';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Free APIs - Comprehensive Directory of 1000+ Public APIs',
  description: 'Discover 1000+ free public APIs for developers. Browse by category, search by functionality, and find the perfect API for your next project.',
  keywords: 'free apis, public apis, developer tools, api directory, rest apis, json apis',
  authors: [{ name: 'Free APIs Directory' }],
  openGraph: {
    title: 'Free APIs - Comprehensive Directory of 1000+ Public APIs',
    description: 'Discover 1000+ free public APIs for developers. Browse by category, search by functionality, and find the perfect API for your next project.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free APIs - Comprehensive Directory of 1000+ Public APIs',
    description: 'Discover 1000+ free public APIs for developers. Browse by category, search by functionality, and find the perfect API for your next project.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}


