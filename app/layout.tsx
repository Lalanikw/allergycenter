import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import React from "react";
import Header from '../components/Header';
import Topnav from "../components/Topnav";
import Footer from "../components/Footer"

const inter = Inter({ subsets: ["latin"] });

export const metadata= {
  title:"Allergy Center",
  description: "Breath Clear",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang="en">
      <head>
    <title>{metadata.title}</title>
    <meta name="description" content={metadata.description} />
    <link rel="icon" href='/allerylogo.jpg' />
</head>

      <body className={inter.className}>
        {/* <Topnav/> */}
        <Header />

        {children}

        <Footer/>

      </body>
    </html>
  );
}
