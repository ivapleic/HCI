"use client";

import React, { useState } from "react";
import Link from "next/link";

interface Author {
  id: string;
  fullName: string;
  profileImageUrl?: string;
  bio?: string;
  // možeš dodati ostala polja koja su ti relevantna
}

interface AuthorCardProps {
  author: Author;
  onCategoryChange?: (category: string) => void;
}

export default function AuthorCard({ author, onCategoryChange }: AuthorCardProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const categories = ["Favorite Authors", "To Follow", "Read"]; // Primjer kategorija

  function toggleDropdown() {
    setDropdownOpen((open) => !open);
  }

  function handleSelectCategory(category: string) {
    setDropdownOpen(false);
    if (onCategoryChange) onCategoryChange(category);
  }

  return (
    <div className="relative flex items-center gap-4 p-4 bg-white rounded-xl shadow-md border hover:shadow-lg transition">
      <Link href={`/author/${author.id}`} className="flex-shrink-0 cursor-pointer">
        <img
          src={author.profileImageUrl || "/placeholder_author.png"}
          alt={author.fullName}
          className="w-20 h-20 object-cover rounded-full shadow"
        />
      </Link>

      <div className="flex flex-col flex-1">
        <Link
          href={`/author/${author.id}`}
          className="text-lg md:text-xl font-semibold text-gray-900 hover:text-[#593E2E] hover:underline cursor-pointer"
        >
          {author.fullName}
        </Link>
        {author.bio && (
          <p className="text-sm text-gray-600 mt-1 line-clamp-3">{author.bio}</p>
        )}
      </div>

      {/* Dropdown menu gumb u gornjem desnom kutu */}
      <div className="relative ml-2">
        <button
          onClick={toggleDropdown}
          className="p-1 rounded-md hover:bg-gray-200 focus:outline-none"
          aria-haspopup="true"
          aria-expanded={dropdownOpen}
          aria-label="Open author categories"
        >
          ⋮
        </button>

        {dropdownOpen && (
          <ul className="absolute right-0 mt-2 w-40 bg-white border border-gray-300 rounded shadow-md z-10">
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
