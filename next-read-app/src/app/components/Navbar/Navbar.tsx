import { useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "../Logo/Logo";
import { cn } from "@/lib/utils";
import { useClickOutside } from "@/hooks/useClickOutside";
import SearchBar from "../SearchBar/SearchBar";
import MegaMenu from "../MegaMenu/MegaMenu";
import Image from "next/image";

export function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const megaMenuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const toggleMegaMenu = () => setIsMegaMenuOpen(!isMegaMenuOpen);
  const closeMegaMenu = () => setIsMegaMenuOpen(false);

  useClickOutside(navRef, closeMenu);
  useClickOutside(megaMenuRef, closeMegaMenu);

  const linkStyles =
    "px-4 py-2 text-sm md:text-xs lg:text-sm hover:text-[#593E2E] transition-colors";

  return (
    <nav
      className="px-4 sm:px-8 lg:px-17 py-6 border-b border-gray-300 bg-white sticky top-0 z-50"
      ref={navRef}
    >
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link href="/" onClick={closeMenu}>
          <Logo className="text-2xl" />
        </Link>

        {/* Hamburger button - ispod 850px */}
        <button
          onClick={toggleMenu}
          className="max-[850px]:block hidden p-2 text-gray-800 focus:outline-none"
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          <Image
            src="/assets/icons8-hamburger-menu-50 (1).png"
            alt={isMenuOpen ? "Close menu" : "Open menu"}
            width={24}
            height={24}
          />
        </button>

        {/* Desktop navigation - iznad 850px */}
        <div className="hidden min-[851px]:flex items-center gap-x-8">
          <ul className="flex gap-x-4">
            <li>
              <Link href="/" onClick={closeMenu}>
                <span
                  className={cn(linkStyles, {
                    "text-[#593E2E] border-b-2 border-[#593E2E]": pathname === "/",
                    "text-gray-800": pathname !== "/",
                  })}
                >
                  Home
                </span>
              </Link>
            </li>
            <li className="relative">
              <div onClick={toggleMegaMenu} className="cursor-pointer">
                <span
                  className={cn(linkStyles, {
                    "text-[#593E2E] border-b-2 border-[#593E2E]": pathname === "/browse-books",
                    "text-gray-800": pathname !== "/browse-books",
                  })}
                >
                  Browse Books
                </span>
              </div>
              <div ref={megaMenuRef}>
                <MegaMenu
                  isOpen={isMegaMenuOpen}
                  customWidth="w-screen md:w-[600px]"
                />
              </div>
            </li>
          </ul>
          <div className="flex items-center gap-x-4">
            <div className="w-80">
              <SearchBar onSearchPath={() => {}} />
            </div>
            <Link
              href="/auth/register"
              className="px-4 py-2 text-sm md:text-xs lg:text-sm font-medium hover:text-brand-primary"
            >
              Register
            </Link>
            <Link
              href="/auth/login"
              className="bg-[#593E2E] text-white px-4 py-2 rounded-md hover:bg-[#8C6954] text-sm md:text-xs lg:text-sm"
            >
              Login
            </Link>
          </div>
        </div>
      </div>

      {/* Mobilni dropdown meni */}
      {isMenuOpen && (
        <div className="max-[850px]:block hidden w-full px-4">
          <ul className="flex flex-col items-center justify-center w-full space-y-4 mt-4 py-6 border-t border-gray-300 animate-slideDown">
            <li className="w-full text-center">
              <Link href="/" onClick={closeMenu}>
                <span
                  className={cn(linkStyles, {
                    "text-[#593E2E]": pathname === "/",
                    "text-gray-800": pathname !== "/",
                  })}
                >
                  Home
                </span>
              </Link>
            </li>
            <li className="w-full text-center">
              <Link href="/browse-books" onClick={closeMenu}>
                <span
                  className={cn(linkStyles, {
                    "text-[#593E2E]": pathname === "/browse-books",
                    "text-gray-800": pathname !== "/browse-books",
                  })}
                >
                  Browse Books
                </span>
              </Link>
            </li>
            <li className="flex flex-col items-center w-full space-y-4">
              <Link
                href="/auth/register"
                className="w-full px-4 py-2 text-sm font-medium text-center"
                onClick={closeMenu}
              >
                Register
              </Link>
              <Link
                href="/auth/login"
                className="w-full bg-[#593E2E] text-white px-4 py-2 rounded-md text-center"
                onClick={closeMenu}
              >
                Login
              </Link>
            </li>
            <li className="w-full flex justify-center">
              <div className="w-full max-w-md">
                <SearchBar onSearchPath={() => {}} />
              </div>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
