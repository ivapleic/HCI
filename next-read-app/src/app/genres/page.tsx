"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getGenreList, getBooks } from "./_lib/genresApi"; // Dohvati podatke


const GenresPage = () => {
  const [genres, setGenres] = useState<any[]>([]);
  const [books, setBooks] = useState<any[]>([]); // Sve knjige
  const [filteredBooksByGenre, setFilteredBooksByGenre] = useState<any>(
    {} // Objekt koji sadrži filtrirane knjige za svaki žanr
  );
  
  const [loading, setLoading] = useState<boolean>(true);

  const [page, setPage] = useState(1);
  const itemsPerPage = 3;

  const totalPages = Math.ceil(genres.length / itemsPerPage);
  const displayedGenres = genres.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  // Fetch žanrova i knjiga
  useEffect(() => {
    const fetchGenresAndBooks = async () => {
      try {
        const genreData = await getGenreList();
        setGenres(genreData); // Postavite žanrove
        const booksData = await getBooks(); // Dohvatite sve knjige
        setBooks(booksData); // Postavite sve knjige

        // Filtriranje knjiga po žanrovima
        const filteredBooks: any = {};
        genreData.forEach((genre: any) => {
          filteredBooks[genre.sys.id] = booksData.filter((book) =>
            book.fields.genre.some(
              (genreItem: any) => genreItem.sys.id === genre.sys.id
            )
          );
        });
        setFilteredBooksByGenre(filteredBooks); // Postavite filtrirane knjige po žanrovima
      } catch (error) {
        console.error("Error fetching genres or books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGenresAndBooks();
  }, []);

  return (
    <div className="w-full my-4 px-20 mx-0">
      {loading ? (
        <div className="text-center text-lg">Loading genres...</div>
      ) : (
        <div className="grid grid-cols-3 gap-10">
          {/* Lijevi div: Paginirani žanrovi + detalji */}
          <div className="col-span-2 bg-white p-6 rounded-lg shadow-md border">
            <h1 className="text-3xl text-[#593E2E] font-bold tracking-tight text-left mb-8">
              Genres
            </h1>
            <div className="space-y-8">
              {displayedGenres.map((genre, index) => (
                <div key={index} className="border-b pb-6">
                  {/* Naslov žanra */}
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {genre.fields.name}
                  </h3>

                  {/* Grid s knjigama za ovaj žanr */}
                  <div className="flex space-x-4 overflow-hidden">
                    {filteredBooksByGenre[genre.sys.id]
                      ?.slice(0, 6)
                      .map((book: any, idx: number) => (
                        <img
                          key={idx}
                          src={book.fields.coverImage.fields.file.url}
                          alt={book.fields.title}
                          className="w-20 h-28 object-cover rounded-md shadow-md"
                        />
                      ))}
                  </div>

                  {/* Link na desnoj strani */}
                  <div className="text-right mt-4">
                    <Link
                      href={`/genres/${genre.fields.name.toLowerCase()}`}
                      className="text-[#593E2E] hover:underline font-medium"
                    >
                      More {genre.fields.name} Books →
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigacija stranica */}
            <div className="flex justify-center space-x-6 mt-6">
              <button
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                className={`px-4 py-2 rounded-md ${
                  page === 1
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-[#593E2E] text-white hover:bg-[#8C6954]"
                }`}
              >
                Previous
              </button>
              <span className="text-gray-700 font-semibold flex items-center justify-center">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() => setPage(page + 1)}
                disabled={page === totalPages}
                className={`px-4 py-2 rounded-md ${
                  page === totalPages
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-[#593E2E] text-white hover:bg-[#8C6954]"
                }`}
              >
                Next
              </button>
            </div>
          </div>

          {/* Desni div: Popis svih žanrova */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-md border">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              All Genres
            </h2>

            <ul className="grid grid-cols-2 gap-x-6 gap-y-4">
              {genres.map((genre, index) => (
                <li key={`${genre.sys.id}-${index}`} className="border-b pb-2">
                  <Link
                    href={`/genres/${genre.fields.name
                      .toLowerCase()
                      .replace(/\s+/g, "-")}`}
                  >
                    <span className="text-gray-800 hover:text-blue-500 transition">
                      {genre.fields.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default GenresPage;
