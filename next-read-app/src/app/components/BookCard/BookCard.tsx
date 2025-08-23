"use client";

import React, { useState } from "react";
import Link from "next/link";

export interface BookCardProps {
  book: {
    id: string;
    title: string;
    coverImageUrl?: string;
    authorName?: string;
    authorId?: string;
    description?: string;
  };
  onCategoryChange?: (newCategory: string) => void;
}

export default function BookCard({ book, onCategoryChange }: BookCardProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const categories = ["To Read", "Completed"]; // Favourite je glavni gumb, ostale idu u dropdown

  function toggleDropdown() {
    setDropdownOpen((open) => !open);
  }

  function handleSelectCategory(category: string) {
    setDropdownOpen(false);
    if (onCategoryChange) onCategoryChange(category);
  }

  const coverImageUrl = book.coverImageUrl ?? "/placeholder_book.png";

  return (
    <div className="relative flex items-start gap-3 p-4 bg-white rounded-xl shadow-md border hover:shadow-lg transition">
      <Link href={`/books/${book.id}`} className="flex-shrink-0 cursor-pointer">
        <img
          src={coverImageUrl}
          alt={book.title}
          className="w-20 h-28 md:w-24 md:h-32 object-cover rounded-md"
        />
      </Link>

      <div className="flex flex-col flex-1">
        {/* Naslov knjige */}
        <Link
          href={`/books/${book.id}`}
          className="text-lg md:text-xl font-semibold text-gray-900 hover:text-[#593E2E] hover:underline cursor-pointer"
        >
          {book.title}
        </Link>

        {/* Klikabilno ime autora (samo ako ima i authorId i authorName) */}
        {book.authorId && book.authorName ? (
          <Link
            href={`/author/${book.authorId}`}
            className="text-sm text-gray-700 mt-1 mb-1 hover:text-[#593E2E] hover:underline"
          >
            by {book.authorName}
          </Link>
        ) : book.authorName ? (
          <p className="text-sm text-gray-700 mt-1 mb-1">by {book.authorName}</p>
        ) : null}

        {book.description && (
          <p className="text-sm text-gray-600 line-clamp-2">{book.description}</p>
        )}
      </div>

      {/* Dropdown button */}
      <div className="relative ml-2">
        <button
          onClick={toggleDropdown}
          className={`flex items-center gap-1 px-3 py-1.5 text-sm rounded-md focus:outline-none transition ${
            dropdownOpen
              ? "bg-[#725040] text-white rounded-b-none"
              : "bg-[#593E2E] text-white hover:bg-[#725040]"
          }`}
          aria-haspopup="true"
          aria-expanded={dropdownOpen}
          aria-label="Open categories menu"
        >
          Favourite <span className="text-xs">▼</span>
        </button>

        {dropdownOpen && (
          <ul className="absolute right-0 w-36 bg-white border border-gray-300 rounded-b-md shadow-md z-10">
            {categories.map((category) => (
              <li
                key={category}
                className="px-4 py-2 text-sm cursor-pointer hover:bg-[#faf3ec]"
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
