'use client';
import './globals.css';
import { useState } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <html lang='en'>
      <head>
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' />
        <link
          href='https://fonts.googleapis.com/css2?family=Lexend:wght@100..900&display=swap'
          rel='stylesheet'
        />
      </head>
      <body className={`antialiased font-serif`}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </body>
    </html>
  );
}
