'use client';
import './globals.css';
import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Lexend, Niconne } from 'next/font/google';
import { ThemeProvider } from './providers/ThemeContext';

const fontLexend = Lexend({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-lexend',
});

const fontNiconne = Niconne({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-niconne',
  weight: ['400'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <html lang="en">
      <ThemeProvider>
        <body className={`${fontLexend.variable} ${fontNiconne.variable}`}>
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </body>
      </ThemeProvider>
    </html>
  );
}
