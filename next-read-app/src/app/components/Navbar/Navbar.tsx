"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import "./Navbar.css";
import Image from "next/image";
import Logo from "C:/Users/Korisnik/Desktop/HCI/next-read-app/public/assets/Logo.png";
import SearchIcon from "C:/Users/Korisnik/Desktop/HCI/next-read-app/public/assets/icons8-search-30.png"
type Page = {
  title: string;
  path: `/${string}`;
};

const pages: Page[] = [
  { title: "Home", path: "/" },
  { title: "Login", path: "/auth/login" },
  { title: "Register", path: "/auth/register" },
  { title: "Profile", path: "/profile" },
  { title: "My Books", path: "/book-lists" },
  { title: "Search Books", path: "/search/query" },
  //{ title: "Book Details", path: "/book/[bookId]" },
  //{ title: "Author Details", path: "/author/[authorId]" },
];

function processPage(page: Page, index: number, pathname: string) {
  return (
    <li key={index}>
      <Link
        href={page.path}
        className={pathname === page.path ? "font-extrabold" : ""}
      >
        {page.title}
      </Link>
    </li>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  return (
    <nav className=" py-4 flex justify-between items-center px-6">
      {/* Logo */}
      <div className="flex items-center">
        <Image src={Logo} alt="Logo" height={80} className="mr-2" />{" "}
      </div>

      {/* Linkovi */}
      <ul className="flex space-x-6">
        <li>
          <Link
            href="/"
            className={`navbar-link ${
              pathname === "/" ? "font-extrabold" : ""
            }`}
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
      <div className="mx-4 search-input-container">
        <input
          type="text"
          placeholder="Pretraži knjige..."
          className=" custom-input rounded-lg w-80  p-2" 
        />
        <Image
          src={SearchIcon}
          alt="Search"
          style={{ height: '24px', width: '24px' }} 
        />{""}
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
