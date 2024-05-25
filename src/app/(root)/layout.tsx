import React from 'react'
import { SessionProvider } from 'next-auth/react';
import Header from '@/components/Header';
import { Toaster } from '@/components/ui/toaster';
import Footer from '@/components/Footer';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <html lang="en">
       
          <body className={inter.className}>
           <Header/>
            {children}
            <Footer />
            <Toaster />
          </body>
      </html>
    );
  }