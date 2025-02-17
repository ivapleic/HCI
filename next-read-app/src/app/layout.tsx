"use client"
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Footer from "./components/Footer/Footer";
import { Navbar} from "./components/Navbar/Navbar";
import { AuthProvider } from "./auth/login/components/auth-context";
import LoginPage from "./auth/login/page";

import { usePathname } from "next/navigation";  // Hook to track the current path

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();  // Get the current pathname

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
      <AuthProvider>
          <Navbar />
          {children} {/* Ovo je slot za sadržaj koji dolazi iz paralelnih ruta */}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
};

export default RootLayout;
