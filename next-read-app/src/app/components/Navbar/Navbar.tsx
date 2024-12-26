"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "../Logo/Logo"; 
import { cn } from "@/app/lib/utils"; 
import { useClickOutside } from "@/app/hooks/useClickOutside";
import SearchBar from "../SearchBar/SearchBar";

// Definirane stranice navigacije
type Page = {
  title: string;
  path: `/${string}`;
};

const pages: Page[] = [
  { title: "Home", path: "/" },
  { title: "Browse Books", path: "/search" },
];

type HamburgerProps = {
  isOpen: boolean;
  toggleMenu: () => void;
};

function Hamburger({ isOpen, toggleMenu }: HamburgerProps) {
  return (
    <button
      className="flex sm:hidden flex-col justify-center items-center w-10 h-10 space-y-1 rounded hover:bg-gray-200"
      aria-label={isOpen ? "Close menu" : "Open menu"}
      onClick={toggleMenu}
    >
      <span
        className={cn("w-8 h-1 bg-black rounded transition-transform", {
          "rotate-45 translate-y-2": isOpen,
        })}
      />
      <span
        className={cn("w-6 h-1 bg-black rounded transition-opacity", {
          "opacity-0": isOpen,
        })}
      />
      <span
        className={cn("w-8 h-1 bg-black rounded transition-transform", {
          "-rotate-45 -translate-y-2": isOpen,
        })}
      />
    </button>
  );
}


function processPage(
  page: Page,
  index: number,
  pathname: string,
  onClick?: () => void
) {
  const isActive = pathname === page.path;
  return (
    <li key={index} className="relative">
      <Link href={page.path} onClick={onClick}>
        <span
          className={cn(
            "border rounded-sm border-transparent px-4 py-2 whitespace-nowrap",
            {
              "": !isActive,
              "border rounded-sm":
                isActive,
            }
          )}
        >
          {page.title}
        </span>
      </Link>
    
    </li>
  );
}

// Glavna navigacijska komponenta
export function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  useClickOutside(navRef, closeMenu);

  return (
    <nav
      className="py-6 px-6 border-b border-gray-300 bg-white sticky top-0 z-10"
      ref={navRef}
    >
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" onClick={closeMenu}>
          <Logo className="text-2xl" />
        </Link>

        {/* Desni blok koji sadrži navigaciju, search bar i login/register */}
        <div className="flex items-center ml-auto gap-x-8">
          {/* Desktop navigacija - Home i Browse Books */}
          <ul className="hidden sm:flex gap-x-4">
            {pages.map((page, index) => processPage(page, index, pathname))}
          </ul>

          <div className="flex items-center ml-auto gap-x-2 sm:gap-x-4">
            {/* SearchBar */}
            <div className="hidden sm:flex flex-grow justify-center">
              <SearchBar onSearchPath={() => {}} />
            </div>

            {/* Register i Login */}
            <div className="hidden sm:flex space-x-2 sm:space-x-4 ml-auto">
              <Link
                href="/auth/register"
                className="px-4 py-2 text-sm font-medium hover:text-brand-primary"
              >
                Register
              </Link>
              <Link
                href="/auth/login"
                className="bg-[#593E2E] text-white px-4 py-2 rounded-md hover:bg-[#8C6954]"
              >
                Login
              </Link>
            </div>
          </div>
        </div>

        {/* Hamburger meni za mobilne uređaje */}
        <Hamburger isOpen={isMenuOpen} toggleMenu={toggleMenu} />
      </div>

      {/* Mobilna navigacija */}
      <ul
        className={cn(
          "absolute top-full left-0 w-full bg-white flex flex-col items-center space-y-4 py-6 border-t border-gray-300 sm:hidden", // Ovdje koristimo sm:hidden da bismo sakrili meni na desktopu
          { hidden: !isMenuOpen }
        )}
      >
        {pages.map((page, index) =>
          // Mobilni meni ne koristi aktivne stilove
          processPage(page, index, pathname, closeMenu)
        )}
        {/* Dodaj mobilnu verziju za login/register u mobilnoj verziji */}
        <li className="flex flex-col space-y-4 w-full">
          <Link
            href="/auth/register"
            className="w-full px-4 py-2 text-sm font-medium text-center"
          >
            Register
          </Link>
          <Link
            href="/auth/login"
            className="w-full bg-[#593E2E] text-white px-4 py-2 rounded-md text-center"
          >
            Login
          </Link>
        </li>

        {/* Pretraga u mobilnom meniju */}
        <div className="w-full px-4 flex justify-center">
          <SearchBar onSearchPath={() => {}} />
        </div>
      </ul>
    </nav>
  );
}
