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
