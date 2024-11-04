"use client";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import "./Navbar.css";
import Image from "next/image";

const Navbar = () => {
  // pathname represents the current URL path in the app
  const pathname = usePathname();

  // searchInput holds the user's search query from the search bar
  const [searchInput, setSearchInput] = useState("");

  // searchPath stores the route to navigate to after searching
  const [searchPath, setSearchPath] = useState("");

  const handleSearchPath = () => {
    if (/^\d+$/.test(searchInput.trim())) {
      // Check if search input is a number
      setSearchPath(`/author/${searchInput}`);
    } else if (searchInput.trim()) {
      setSearchPath(`/book/${searchInput}`);
    } else {
      alert("Please enter a valid book title or author ID.");
      setSearchPath("");
    }
  };

  //Rendering the Navigation bar
  return (
    <nav className="py-1 flex justify-between items-center px-7 border-b border-[#F2CAB3]">
      <div className="flex items-center">
        <Image
          src="/assets/Logo.png"
          alt="Logo"
          height={250}
          width={150}
          className="mr-2 items-center"  
        />{" "}
      </div>

      {/* Links */}
      <ul className="flex space-x-6 relative">
        <li className="relative">
          <Link
            href="/"
            className={`navbar-link ${
              pathname === "/" ? "font-bold" : ""
            }`}
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

      {/* Search bar */}
      <div className="mx-4 w-96 px-4 flex items-center bg-[#F9F3EE] rounded-lg">
        <input
          type="text"
          placeholder="Search books or authors..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearchPath();
          }}
          className="bg-transparent border-none p-2 w-full rounded-l-lg focus:outline-none"
        />
        <Link href={searchPath}>
          <Image
            src="/assets/icons8-search-30.png"
            alt="Search"
            width={24}
            height={24}
            onClick={handleSearchPath}
            className="ml-2 cursor-pointer w-6 h-6  rounded-md"
          />
        </Link>
      </div>

      {/* Buttons for log/sign in */}
      <div className="flex space-x-10 justify-between items-center px-10 relative">
        <div className="relative">
          <Link
            href="/auth/register"
            className={`navbar-link ${
              pathname === "/auth/register" ? "underline"  : ""
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
    </nav>
  );
};

export default Navbar;
