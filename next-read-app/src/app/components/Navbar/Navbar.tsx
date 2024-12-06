"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "../Logo/Logo"; // Zamijeni svojim logotipom ako je potrebno
import { cn } from "@/app/lib/utils"; // Utility funkcija za kombiniranje klasa
import { useClickOutside } from "@/app/hooks/useClickOutside"; // Hook za zatvaranje izvan elemenata
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

// Komponenta za hamburger meni
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

// Funkcija za prikaz stranica u navigaciji
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
            "px-4 py-2 text-sm", // Osnovni stilovi
            {
              // Aktivni linkovi u desktop verziji
              "text-[#593E2E] sm:border-b-2 sm:border-[#593E2E] sm:hover:text-[#593E2E]":
                isActive, // Samo za desktop
              "sm:border-b-0": !isActive, // Nema border-a za neaktivne linkove na desktopu
              "sm:hover:text-[#593E2E]": !isActive, // Hover efekat samo za desktop
              // Stilovi za mobilnu verziju
              "text-gray-800": !isActive, // Non-active links na mobilnoj verziji
              "sm:hidden": false, // Mobilni linkovi nisu skriveni na mobilnim uređajima
            }
          )}
        >
          {page.title}
        </span>
      </Link>
      {/* Trokut za aktivne linkove  */}
      {isActive && (
        <div className="absolute left-1/2 transform -translate-x-1/2 -top-4 w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-transparent border-t-[#593E2E]"></div>
      )}
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
      className="py-4 px-6 border-b border-gray-300 bg-white sticky top-0 z-10"
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
