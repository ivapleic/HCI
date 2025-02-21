import { useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "../Logo/Logo";
import { cn } from "@/lib/utils";
import { useClickOutside } from "@/hooks/useClickOutside"; // Your custom hook
import SearchBar from "../SearchBar/SearchBar";
import MegaMenu from "../MegaMenu/MegaMenu";

type HamburgerProps = {
  isOpen: boolean;
  toggleMenu: () => void;
};

// function Hamburger({ isOpen, toggleMenu }: HamburgerProps) {
//   return (
//     <button
//       className="flex sm:hidden flex-col justify-center items-center w-10 h-10 space-y-1 rounded hover:bg-gray-200"
//       aria-label={isOpen ? "Close menu" : "Open menu"}
//       onClick={toggleMenu}
//     >
//       <span
//         className={cn("w-8 h-1 bg-black rounded transition-transform", {
//           "rotate-45 translate-y-2": isOpen,
//         })}
//       />
//       <span
//         className={cn("w-6 h-1 bg-black rounded transition-opacity", {
//           "opacity-0": isOpen,
//         })}
//       />
//       <span
//         className={cn("w-8 h-1 bg-black rounded transition-transform", {
//           "-rotate-45 -translate-y-2": isOpen,
//         })}
//       />
//     </button>
//   );
// }

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

  useClickOutside(navRef, closeMenu); // Close the main menu if clicked outside
  useClickOutside(megaMenuRef, closeMegaMenu); // Close the mega menu if clicked outside

  const linkStyles =
    "px-4 py-2 text-sm sm:border-b-2 sm:hover:text-[#593E2E] sm:text-[#593E2E]";

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

        {/* Desktop navigation */}
        <div className="flex items-center ml-auto gap-x-8">
          <ul className="hidden sm:flex gap-x-4">
            {/* Home Link */}
            <li key="home" className="relative">
              <Link href="/" onClick={closeMenu}>
                <span
                  className={cn(linkStyles, {
                    "text-[#593E2E] sm:border-b-2 sm:border-[#593E2E] sm:hover:text-[#593E2E]":
                      pathname === "/",
                    "text-gray-800": pathname !== "/",
                    "sm:border-b-0": pathname !== "/",
                  })}
                >
                  Home
                </span>
              </Link>
            </li>

            {/* Browse Books Link with Mega Menu */}
            <li key="browse-books" className="relative">
              <div onClick={toggleMegaMenu} className="w-max">
                <span
                  className={cn(linkStyles, "cursor-pointer", {
                    "text-[#593E2E] sm:border-b-2 sm:border-[#593E2E] sm:hover:text-[#593E2E]":
                      pathname === "/browse-books",
                    "text-gray-800": pathname !== "/browse-books",
                    "sm:border-b-0": pathname !== "/browse-books",
                  })}
                >
                  Browse Books
                </span>
              </div>

              {/* Mega Menu Component */}
              <div ref={megaMenuRef}>
                <MegaMenu
                  isOpen={isMegaMenuOpen}
                  // Dodaj odgovarajući prop za širinu
                  customWidth="w-screen md:w-[700px]" // Ovo će postaviti širinu na 1200px
                />
              </div>
            </li>
          </ul>

          {/* Pretraga, Register, Login */}
          <div className="flex items-center ml-auto gap-x-2 sm:gap-x-4">
            <div className="hidden sm:flex flex-grow justify-center">
              <SearchBar onSearchPath={() => {}} />
            </div>

            <div className="hidden sm:flex space-x-2 sm:space-x-4 ml-auto">
              <Link
                href="/auth/register"
                className="px-4 py-2 text-sm font-medium hover:text-brand-primary"
              >
                Register
              </Link>
              <Link
                href="/auth/login"
                className="bg-[#593E2E] text-white px-4 py-2 rounded-md hover:bg-[#8C6954] "
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile navigation */}
      <ul
        className={cn(
          "absolute top-full left-0 w-full bg-white flex flex-col items-center space-y-4 py-6 border-t border-gray-300 sm:hidden",
          { hidden: !isMenuOpen }
        )}
      >
        {/* Home Link */}
        <li key="home" className="relative">
          <Link href="/" onClick={closeMenu}>
            <span
              className={cn(linkStyles, {
                "text-[#593E2E] sm:border-b-2 sm:border-[#593E2E] sm:hover:text-[#593E2E]":
                  pathname === "/",
                "text-gray-800": pathname !== "/",
                "sm:border-b-0": pathname !== "/",
              })}
            >
              Home
            </span>
          </Link>
        </li>

        {/* Browse Books Link */}
        <li key="browse-books" className="relative">
          <Link href="/browse-books" onClick={closeMenu}>
            <span
              className={cn(linkStyles, {
                "text-[#593E2E] sm:border-b-2 sm:border-[#593E2E] sm:hover:text-[#593E2E]":
                  pathname === "/browse-books",
                "text-gray-800": pathname !== "/browse-books",
                "sm:border-b-0": pathname !== "/browse-books",
              })}
            >
              Browse Books
            </span>
          </Link>
        </li>

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

        <div className="w-full px-4 flex justify-center">
          <SearchBar onSearchPath={() => {}} />
        </div>
      </ul>
    </nav>
  );
}

