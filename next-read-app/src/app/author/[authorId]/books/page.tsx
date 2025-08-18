"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getBooksByAuthorId, getAuthorById } from "../../_lib/AuthorApi";
import Link from "next/link";

const AuthorBooksPage = () => {
  const { authorId } = useParams();
  const [author, setAuthor] = useState<any>(null);
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 3;

  useEffect(() => {
    const fetchData = async () => {
      const authorData = await getAuthorById(authorId as string);
      const booksData = await getBooksByAuthorId(authorId as string);

      setAuthor(authorData);
      setBooks(booksData);
      setLoading(false);
    };

    fetchData();
  }, [authorId]);

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (!author) return <div className="text-center text-red-500">Author not found</div>;

  const { fields } = author;

  // Izračunaj knjige prikazane na trenutnoj stranici
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

  const totalPages = Math.ceil(books.length / booksPerPage);

  const handlePrev = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const handleNext = () => {
    setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-6">All Books by {fields.fullName}</h1>

        <div className="grid grid-cols-1 gap-6">
          {currentBooks.map((book) => (
            <Link
              key={book.sys.id}
              href={`/books/${book.sys.id}`}
              className="flex gap-4 border-b pb-4 group hover:bg-gray-50 rounded p-2 transition"
            >
              {/* Stilizirano za responzivni prikaz */}
              <img
                src={book.fields.coverImage?.fields.file.url}
                alt={book.fields.title}
                className="w-16 h-24 md:w-24 md:h-36 object-cover rounded-md cursor-pointer hover:opacity-80 transition flex-shrink-0"
              />
              <div className="flex flex-col justify-start">
                <h3 className="text-base md:text-lg font-semibold group-hover:underline cursor-pointer">
                  {book.fields.title}
                </h3>
                <Link
                  href={`/author/${authorId}`}
                  className="text-sm text-gray-700 mb-1 hover:underline"
                >
                  by {fields.fullName}
                </Link>
                <p className="text-sm text-gray-600 line-clamp-3 mt-2 max-w-[250px]">
                  {book.fields.description || "No description available."}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* PAGINACIJA */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-6 gap-4">
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded border ${
                currentPage === 1
                  ? "text-gray-400 border-gray-300 cursor-not-allowed"
                  : "text-[#593E2E] border-[#593E2E] hover:bg-[#593E2E] hover:text-white transition"
              }`}
            >
              Prev
            </button>

            <span className="flex items-center gap-1 text-sm">
              Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
            </span>

            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded border ${
                currentPage === totalPages
                  ? "text-gray-400 border-gray-300 cursor-not-allowed"
                  : "text-[#593E2E] border-[#593E2E] hover:bg-[#593E2E] hover:text-white transition"
              }`}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthorBooksPage;
