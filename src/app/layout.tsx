'use client'

import './globals.css'
import 'react-toastify/dist/ReactToastify.css';
import { Inter } from "next/font/google";
import { ThirdwebProvider } from "thirdweb/react";
import { RecoilRoot } from 'recoil';
import Header from "@/Components/Header";
import { ToastContainer } from "react-toastify";
import Footer from "@/Components/Footer";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <RecoilRoot>
          <ThirdwebProvider>
            <Header />
            {children}
            <ToastContainer />
            <Footer />
          </ThirdwebProvider>
        </RecoilRoot>
      </body>
    </html>
  );
}
