"use client"
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Footer from "./components/Footer/Footer";
import { Navbar} from "./components/Navbar/Navbar";
import LoginPage from "./auth/login/page";

import { usePathname } from "next/navigation";  

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();  // Get the current pathname

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>

          <Navbar />
          {children} 
          <Footer />
        
      </body>
    </html>
  );
};

export default RootLayout;
