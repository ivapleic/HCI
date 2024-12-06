// DesktopNavbar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import SearchBar from "../SearchBar/SearchBar";
import Image from "next/image";

const DesktopNavbar = () => {
  const pathname = usePathname();

  return (
    <div className="hidden md:flex justify-between items-center w-full">
      {/* Logo */}
      <div className="flex items-center mr-10">
        <Image
          src="/assets/Logo.png"
          alt="Logo"
          height={250}
          width={150}
          className="mr-2"
        />
      </div>

      <ul className="flex space-x-6 relative">
        <li className="relative">
          <Link
            href="/"
            className={`navbar-link ${pathname === "/" ? "font-bold" : ""}`}
          >
            Home
          </Link>
          {pathname === "/" && (
            <div className="absolute left-1/2 transform -translate-x-1/2 -top-4 w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-transparent border-t-[#593E2E]"></div>
          )}
        </li>
        <li className="relative">
          <Link
            href="/search"
            className={`navbar-link ${
              pathname === "/search" ? "font-bold" : ""
            }`}
          >
            Browse Books
          </Link>
          {pathname === "/search" && (
            <div className="absolute left-1/2 transform -translate-x-1/2 -top-4 w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-transparent border-t-[#593E2E]"></div>
          )}
        </li>
      </ul>

      <SearchBar onSearchPath={() => {}} />

      <div className="flex space-x-10">
        <div className="relative">
          <Link
            href="/auth/register"
            className={`navbar-link ${
              pathname === "/auth/register" ? "font-bold" : ""
            }`}
          >
            Register
          </Link>
        </div>

        <div className="relative">
          <Link
            href="/auth/login"
            className="bg-[#593E2E] text-white px-4 py-2 rounded-md hover:bg-[#8C6954]"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DesktopNavbar;
