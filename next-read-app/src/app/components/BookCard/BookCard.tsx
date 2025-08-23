"use client";

import React, { useState } from "react";
import Link from "next/link";

interface Book {
  id: string;
  title: string;
  coverImageUrl?: string;
  authorName?: string;
  description?: string;
  // Dodaj ostala polja koja koristiš
}

interface BookCardProps {
  book: Book;
  onCategoryChange?: (newCategory: string) => void; // callback za dropdown akciju
}

export default function BookCard({ book, onCategoryChange }: BookCardProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const categories = ["Favorites", "To Read", "Completed"]; // Primjer kategorija

  function toggleDropdown() {
    setDropdownOpen((open) => !open);
  }

  function handleSelectCategory(category: string) {
    setDropdownOpen(false);
    if (onCategoryChange) onCategoryChange(category);
  }

  return (
    <div className="relative flex items-start gap-3 p-4 bg-white rounded-xl shadow-md border hover:shadow-lg transition">
      <Link href={`/books/${book.id}`} className="flex-shrink-0 cursor-pointer">
        <img
          src={book.coverImageUrl || "/placeholder_book.png"}
          alt={book.title}
          className="w-20 h-28 md:w-24 md:h-32 object-cover rounded-md"
        />
      </Link>

      <div className="flex flex-col flex-1">
        <Link
          href={`/books/${book.id}`}
          className="text-lg md:text-xl font-semibold text-gray-900 hover:text-[#593E2E] hover:underline cursor-pointer"
        >
          {book.title}
        </Link>

        {book.authorName ? (
          <span className="text-sm text-gray-700 mt-1 mb-1">
            by {book.authorName}
          </span>
        ) : (
          <span className="text-sm text-gray-700 mt-1 mb-1">by Unknown Author</span>
        )}

        {book.description && (
          <p className="text-sm text-gray-600 line-clamp-2">{book.description}</p>
        )}
      </div>

      {/* Dropdown menu gumb u gornjem desnom kutu */}
      <div className="relative ml-2">
        <button
          onClick={toggleDropdown}
          className="p-1 rounded-md hover:bg-gray-200 focus:outline-none"
          aria-haspopup="true"
          aria-expanded={dropdownOpen}
          aria-label="Open categories menu"
        >
          ⋮
        </button>

        {dropdownOpen && (
          <ul className="absolute right-0 mt-2 w-36 bg-white border border-gray-300 rounded shadow-md z-10">
            {categories.map((category) => (
              <li
                key={category}
                className="px-4 py-2 cursor-pointer hover:bg-[#faf3ec]"
                onClick={() => handleSelectCategory(category)}
              >
                {category}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
