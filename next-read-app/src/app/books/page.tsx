"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation"; // Import useSearchParams
import Link from "next/link";
import { getBooksByGenre } from "./_lib/booksApi";

const BooksPage = () => {
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams(); // Use searchParams to access query parameters

  // Access the query parameters
  const genre = searchParams.get("genre");
  const tag = searchParams.get("tag");

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);

      try {
        if (genre) {
          // Fetch books based on genre
          const fetchedBooks = await getBooksByGenre(genre); 
          setBooks(fetchedBooks);
        } else if (tag) {
          // Fetch books based on tag (if you implement this logic as well)
          // const fetchedBooks = await getBooksByTag(tag);
          setBooks([]); // Adjust this if tag-based fetching is implemented
        }
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [genre, tag]); // Trigger refetch on genre or tag change

  return (
    <div className="w-full my-4 px-4 md:px-10 lg:px-20">
      {loading ? (
        <div className="text-center text-lg">Loading books...</div>
      ) : (
        <div>
          <h1 className="text-3xl font-bold text-[#593E2E] mb-6">
            {genre ? `Books in ${genre}` : tag ? `Books with tag: ${tag}` : "All Books"}
          </h1>

          <div className="flex flex-wrap gap-6">
            {books.length > 0 ? (
              books.map((book: any, index: number) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-4 w-60">
                  <img
                    src={book.coverImage}
                    alt={book.title}
                    className="w-full h-40 object-cover rounded-md mb-4"
                  />
                  <h3 className="font-semibold text-lg">{book.title}</h3>
                  <p className="text-sm text-gray-600">{book.author}</p>
                  <p className="text-sm text-gray-500">{book.description.slice(0, 100)}...</p>
                </div>
              ))
            ) : (
              <p className="text-gray-600">No books available.</p>
            )}
          </div>

          <div className="mt-8">
            {/* Optional pagination or other elements */}
          </div>
        </div>
      )}
    </div>
  );
};

export default BooksPage;
