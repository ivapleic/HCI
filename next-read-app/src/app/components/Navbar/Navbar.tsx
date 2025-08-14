import { useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "../Logo/Logo";
import { cn } from "@/lib/utils";
import { useClickOutside } from "@/hooks/useClickOutside";
import SearchBar from "../SearchBar/SearchBar";
import MegaMenu from "../MegaMenu/MegaMenu";

export function Navbar() {
  const pathname = usePathname();
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isBrowseDropdownOpen, setIsBrowseDropdownOpen] = useState(false);
  const megaMenuRef = useRef(null);

  useClickOutside(megaMenuRef, () => setIsMegaMenuOpen(false));
  const linkStyles =
    "px-3 py-2 text-sm whitespace-nowrap font-medium rounded hover:text-[#593E2E] transition-colors";

  return (
    <nav className="border-b border-gray-300 bg-white sticky top-0 z-50">

      {/* MOBILNI NAVIGACIJSKI DIO */}
      <div className="flex flex-col min-[851px]:hidden">

        {/* Gornji red */}
        <div className="flex items-center justify-between px-3 py-2">
          <button
            aria-label="Open search"
            className="p-2"
            onClick={() => setIsSearchOpen(v => !v)}
          >
            {/* Search ikona */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6 text-gray-700"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35M7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0z"
              />
            </svg>
          </button>

          <Link href="/" className="mx-auto">
            <Logo className="text-2xl" />
          </Link>

          <Link
            href="/auth/login"
            className="bg-[#593E2E] text-white px-3 py-1.5 rounded-md text-sm font-medium"
          >
            Login
          </Link>
        </div>

        {/* SearchBar dropdown */}
        {isSearchOpen && (
          <div className="px-4 pb-2">
            <SearchBar onSearchPath={() => {}} />
          </div>
        )}

    {/* Donji red linkova */}
<div className="border-t border-gray-200 bg-white">
  <ul className="flex flex-row items-center justify-center gap-1 py-1 overflow-x-auto">
    <li>
      <Link
        href="/"
        className={cn(
          linkStyles,
          pathname === "/" ? "text-[#593E2E] font-bold" : "text-gray-800"
        )}
      >
        Home
      </Link>
    </li>

    <li>
      <button
        type="button"
        className={cn(
          linkStyles,
          pathname === "/browse-books"
            ? "text-[#593E2E] font-bold"
            : "text-gray-800"
        )}
        onClick={() => setIsBrowseDropdownOpen(v => !v)}
      >
        Browse Books
        <svg
          className="inline ml-1 w-4 h-4"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
    </li>

    <li>
      <Link
        href="/my-books"
        className={cn(
          linkStyles,
          pathname === "/my-books" ? "text-[#593E2E] font-bold" : "text-gray-800"
        )}
      >
        My Books
      </Link>
    </li>
  </ul>

  {/* Dropdown blok ispod */}
  {isBrowseDropdownOpen && (
    <div className="flex flex-col bg-white border-t border-b border-gray-100">
      <Link
        href="/recommendations"
        className="px-4 py-2 text-gray-700 hover:bg-gray-50"
        onClick={() => setIsBrowseDropdownOpen(false)}
      >
        Recommendations
      </Link>
      <Link
        href="/new-releases"
        className="px-4 py-2 text-gray-700 hover:bg-gray-50"
        onClick={() => setIsBrowseDropdownOpen(false)}
      >
        New Releases
      </Link>
      <Link
        href="/genres"
        className="px-4 py-2 text-gray-700 hover:bg-gray-50"
        onClick={() => setIsBrowseDropdownOpen(false)}
      >
        Genres
      </Link>
      <Link
        href="/lists"
        className="px-4 py-2 text-gray-700 hover:bg-gray-50"
        onClick={() => setIsBrowseDropdownOpen(false)}
      >
        Lists
      </Link>
    </div>
  )}
</div>

      </div>

      {/* DESKTOP NAVBAR – NE DIRAMO */}
      <div className="hidden min-[851px]:flex items-center justify-between px-4 sm:px-8 lg:px-17 py-6">
        <Link href="/">
          <Logo className="text-2xl" />
        </Link>

        <ul className="flex gap-x-4">
          <li>
            <Link href="/">
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
            <div onClick={() => setIsMegaMenuOpen(v => !v)} className="cursor-pointer">
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
    </nav>
  );
}
