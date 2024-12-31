"use client"

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import React from "react";
import Header from '../components/Header';
import Footer from "../components/Footer";
import { ReactNode } from 'react';

const inter = Inter({ subsets: ["latin"] });

const metadata= {
  title:"Allergy Center",
  description: "Breath Clear",
};

export default function RootLayout({ 
  children 
}: { 
  children: ReactNode  // This defines the type
}) {

  return (
    <html lang="en">
      <head>
    <title>{metadata.title}</title>
    <meta name="description" content={metadata.description} />
    <link rel="icon" href='/allerylogo.jpg' />
</head>

      <body className={inter.className}>
        <Header />

        {children}

        <Footer/>

      </body>
    </html>
  );
}
