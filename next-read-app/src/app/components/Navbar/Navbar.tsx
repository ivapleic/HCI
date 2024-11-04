"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import "./Navbar.css";
import Image from "next/image";
import Logo from "C:/Users/Korisnik/Desktop/HCI/next-read-app/public/assets/Logo.png";
import SearchIcon from "C:/Users/Korisnik/Desktop/HCI/next-read-app/public/assets/icons8-search-30.png";

type Page = {
  title: string;
  path: `/${string}`;
};



export default function Navbar() {
  const pathname = usePathname();
  const [searchInput, setSearchInput] = useState("");
  const [searchPath, setSearchPath] = useState("");

  // Funkcija za postavljanje rute na osnovu unosa
  const handleSearchPath = () => {
    if (/^\d+$/.test(searchInput.trim())) {
      // Ako je unos broj, postavljamo putanju na autora s ID-em
      setSearchPath(`/author/${searchInput}`);
    } else if (searchInput.trim()) {
      // Ako je unos string, postavljamo putanju na knjige sa query parametrom
      setSearchPath(`/book/${searchInput}`);
    } else {
      alert("Unesite ispravan naziv knjige ili ID autora.");
      setSearchPath("");
    }
  };

  return (
    <nav className="py-4 flex justify-between items-center px-6">
      {/* Logo */}
      <div className="flex items-center">
        <Image src={Logo} alt="Logo" height={80} className="mr-2" />{" "}
      </div>

      {/* Linkovi */}
      <ul className="flex space-x-6">
        <li>
          <Link
            href="/"
            className={`navbar-link ${pathname === "/" ? "font-extrabold" : ""}`}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            href="/search"
            className={`navbar-link ${
              pathname === "/search" ? "font-extrabold" : ""
            }`}
          >
            Browse Books
          </Link>
        </li>
      </ul>

      {/* Pretraživač */}
      <div className="mx-4 flex items-center bg-[#F2CAB3] rounded-lg">
        <input
          type="text"
          placeholder="Pretraži knjige ili autora..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearchPath();
          }}
          className="rounded-lg p-2 w-80 bg-[#F2CAB3] border-none placeholder-gray-600 focus:outline-none"
        />
        {searchPath ? (
          <Link href={searchPath}>
            <Image
              src={SearchIcon}
              alt="Search"
              width={24}
              height={24}
              onClick={handleSearchPath}
              className="ml-2 cursor-pointer"
            />
          </Link>
        ) : (
          <Image
            src={SearchIcon}
            alt="Search"
            width={24}
            height={24}
            onClick={handleSearchPath}
            className="ml-2 cursor-pointer"
          />
        )}
      </div>

      {/* Botuni za prijavu i registraciju */}
      <div className="flex space-x-4 justify-between items-center">
        <Link
          href="/auth/register"
          className={`navbar-link ${
            pathname === "/register" ? "font-extrabold" : ""
          }`}
        >
          Register
        </Link>
        <Link
          href="/auth/login"
          className="login-button text-white px-4 py-2 rounded-md"
        >
          Prijava
        </Link>
      </div>
    </nav>
  );
}
