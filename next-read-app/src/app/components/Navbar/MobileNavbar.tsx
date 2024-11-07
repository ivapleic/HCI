"use client";
import Link from "next/link";
import { useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import Image from "next/image";

const MobileNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="lg:hidden flex justify-between items-center w-full px-7 py-2"> 
      {/* Logo */}
      <div className="flex items-center">
        <Image src="/assets/Logo.png" alt="Logo" width={100} height={50} className="mr-2" />
      </div>

      {/* Hamburger menu */}
      <button onClick={() => setMenuOpen(!menuOpen)} className="focus:outline-none">
        <img src="/assets/icons8-hamburger-menu-50.png" alt="Menu" width={24} height={24} />
      </button>

      {/* Menu */}
      {menuOpen && (
        <div className="py-4 absolute top-16 left-0 w-full bg-white shadow-md flex flex-col items-center">
          <Link href="/" className="py-2 px-4 hover:bg-gray-100 w-full text-center" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
          <Link href="/search" className="py-2 px-4 hover:bg-gray-100 w-full text-center" onClick={() => setMenuOpen(false)}>
            Browse Books
          </Link>
          <Link href="/auth/register" className="py-2 px-4 hover:bg-gray-100 w-full text-center" onClick={() => setMenuOpen(false)}>
            Register
          </Link>
          <Link href="/auth/login" className="py-2 px-4 hover:bg-gray-100 w-full text-center" onClick={() => setMenuOpen(false)}>
            Login
          </Link>
          <SearchBar onSearchPath={() => setMenuOpen(false)} />
        </div>
      )}
    </div>
  );
};

export default MobileNavbar;
