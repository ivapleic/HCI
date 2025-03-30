"use client"
import "./globals.css";
import Footer from "./components/Footer/Footer";
import { Navbar} from "./components/Navbar/Navbar";

import { usePathname } from "next/navigation";  

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();  // Get the current pathname

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/assets/favicon.ico" />
      </head>
      <body className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow ">
          {children} 
        </main>
        <Footer />  
      </body>
    </html>
  );
};

export default RootLayout;
