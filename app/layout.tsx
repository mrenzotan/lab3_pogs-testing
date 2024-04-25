import type { Metadata } from 'next';
import './globals.css';
import '@/styles/globals.css';
import { Inter as FontSans } from 'next/font/google';
import { cn } from '@/lib/utils';
import { UserProvider } from '@auth0/nextjs-auth0/client';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'PogsChamp',
  description: 'Lab 2 and 3 activity by Tan and Mamosto',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <UserProvider>
        <body
        className={cn(
          'min-h-screen bg-[#F5F5F5]  font-sans antialiased',
          fontSans.variable
        )}
      >
        {children}
      </body></UserProvider>
    </html>
  );
}
