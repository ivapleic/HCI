// SearchBar.tsx
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

interface SearchBarProps {
  onSearchPath: (path: string) => void;
}

const SearchBar = ({ onSearchPath }: SearchBarProps) => {
  const [searchInput, setSearchInput] = useState("");

  const handleSearch = () => {
    if (/^\d+$/.test(searchInput.trim())) {
      onSearchPath(`/author/${searchInput}`);
    } else if (searchInput.trim()) {
      onSearchPath(`/book/${searchInput}`);
    } else {
      alert("Please enter a valid book title or author ID.");
    }
  };

  return (
    <div className="mx-4 w-96 px-4 flex items-center bg-[#F9F3EE] rounded-lg">
      <input
        type="text"
        placeholder="Search books or authors..."
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        className="bg-transparent border-none p-2 w-full rounded-l-lg focus:outline-none"
      />
      <Link href="#">
        <Image
          src="/assets/icons8-search-30.png"
          alt="Search"
          width={24}
          height={24}
          onClick={handleSearch}
          className="ml-2 cursor-pointer w-6 h-6 rounded-md"
        />
      </Link>
    </div>
  );
};

export default SearchBar;
