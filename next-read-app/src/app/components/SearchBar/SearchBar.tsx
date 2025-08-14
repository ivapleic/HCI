// SearchBar.tsx
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

interface SearchBarProps {
  onSearchPath: (path: string) => void;
  className?: string;
}

const SearchBar = ({ onSearchPath, className = "" }: SearchBarProps) => {
  const [searchInput, setSearchInput] = useState("");

  const handleSearch = () => {
    const trimmed = searchInput.trim();
    if (/^\d+$/.test(trimmed)) {
      onSearchPath(`/author/${trimmed}`);
    } else if (trimmed) {
      onSearchPath(`/book/${trimmed}`);
    } else {
      alert("Please enter a valid book title or author ID.");
    }
  };

 return (
  <div
    className={`flex items-center bg-[#F9F3EE] rounded-lg px-3 py-2 ${className}`}
  >
    <input
      type="text"
      placeholder="Search books or authors..."
      value={searchInput}
      onChange={(e) => setSearchInput(e.target.value)}
      onKeyDown={(e) => e.key === "Enter" && handleSearch()}
      className="flex-1 bg-transparent border-none text-sm focus:outline-none"
    />
    <Link href="#">
      <Image
        src="/assets/icons8-search-50 (1).png"
        alt="Search"
        width={24}
        height={24}
        onClick={handleSearch}
        className="ml-2 cursor-pointer w-6 h-6"
      />
    </Link>
  </div>
);
};

export default SearchBar;
