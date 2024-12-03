import type { Metadata } from 'next';

import { inter } from '@/config/fonts';

import './globals.css';

export const metadata: Metadata = {
  title: {
    template: '%s - OnShop | E-commerce',
    default: 'Home - OnShop | E-commerce',
  },
  description: 'Your trusted online store',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
