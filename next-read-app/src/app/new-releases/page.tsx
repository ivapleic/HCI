"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getBooks, getGenreList } from "../genres/_lib/genresApi";
import GenresList from "../components/GenresList/GenresList";
import Link from "next/link";

export default function NewReleasesPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const genreName = searchParams.get("genre") || "";
  const [genreId, setGenreId] = useState<string | null>(null);
  const [books, setBooks] = useState<any[]>([]);
  const [genres, setGenres] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGenreAndBooks = async () => {
      setLoading(true);
      try {
        const genresData = await getGenreList();
        setGenres(genresData || []);

        const genre = genresData.find(
          (g: any) => g.fields.name.toLowerCase() === genreName.toLowerCase()
        );

        if (!genre) {
          router.push("/genres");
          return;
        }

        setGenreId(genre.sys.id);

        const allBooks = await getBooks();

        const currentYear = new Date().getFullYear();
        const prevYear = currentYear - 1;

        const filteredBooks = allBooks.filter(
          (book: any) =>
            book.fields.genre?.some((g: any) => g.sys.id === genre.sys.id) &&
            (parseInt(book.fields.publicationYear, 10) === currentYear ||
              parseInt(book.fields.publicationYear, 10) === prevYear)
        );

        filteredBooks.sort((a, b) => {
          const yearB =
            typeof b.fields.publicationYear === "number"
              ? b.fields.publicationYear
              : 0;
          const yearA =
            typeof a.fields.publicationYear === "number"
              ? a.fields.publicationYear
              : 0;
          return yearB - yearA;
        });

        setBooks(filteredBooks);
      } catch (error) {
        console.error("Error fetching new releases or genres:", error);
        router.push("/genres");
      } finally {
        setLoading(false);
      }
    };

    if (genreName) {
      fetchGenreAndBooks();
    } else {
      router.push("/genres");
    }
  }, [genreName, router]);

  if (loading)
    return <div className="text-center mt-12">Loading...</div>;

  if (books.length === 0)
    return (
      <p className="text-gray-600 text-center mt-12">
        No recent releases available in this genre.
      </p>
    );

  return (
    <div className="md:max-w-[1200px] md:mx-auto p-0 md:p-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-10">
        {/* Lijevi blok: New Releases lista */}
        <div
          className="
            w-full
            md:col-span-2
            space-y-4
            bg-white
            p-0
            md:p-6
            rounded-none
            md:rounded-lg
            shadow-none
            md:shadow-md
            border-none
            md:border
            mb-4
          "
        >
          <h2 className="text-2xl font-bold mb-4 text-[#593e2e] px-4 md:px-0 pt-4 md:pt-0">
            New Releases
          </h2>
          {books.slice(0, 10).map((book: any) => (
            <div
              key={book.sys.id}
              className="relative flex items-start gap-3 bg-white rounded-none md:rounded-xl p-3 md:p-4 shadow-none"
            >
              <img
                onClick={() => router.push(`/books/${book.sys.id}`)}
                src={book.fields.coverImage?.fields.file.url}
                alt={book.fields.title}
                className="w-20 h-28 md:w-24 md:h-32 object-cover rounded-md cursor-pointer hover:opacity-80 transition flex-shrink-0"
              />
              <div className="flex-1 flex flex-col">
                <h3
                  onClick={() => router.push(`/books/${book.sys.id}`)}
                  className="text-lg md:text-xl font-semibold text-gray-900 cursor-pointer hover:text-[#593e2e] hover:underline"
                >
                  {book.fields.title}
                </h3>
                <div className="text-[15px] text-gray-700 mt-1 flex items-center mb-1">
                  by{" "}
                  {book.fields.author?.fields.fullName ? (
                    <Link
                      href={`/author/${book.fields.author.sys.id}`}
                      className="ml-1 text-gray-700 hover:underline"
                    >
                      {book.fields.author.fields.fullName}
                    </Link>
                  ) : (
                    <span className="ml-1">Unknown Author</span>
                  )}
                </div>
                <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                  {book.fields.description || "No description available."}
                </p>
                {/* Botun na mobitelu ispod opisa, na desktopu uopće ne prikazuj ovdje */}
                <div className="block md:hidden">
                  <button className="btn bg-[#593E2E] text-white px-3 py-1 rounded-md cursor-pointer text-lg leading-none">
                    +
                  </button>
                </div>
              </div>
              {/* Botun u gornjem desnom kutu diva na desktopu */}
              <div className="hidden md:block absolute top-4 right-4">
                <button className="btn bg-[#593E2E] text-white px-3 py-1 rounded-md cursor-pointer text-lg leading-none">
                  +
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Desni blok */}
          <div className="flex justify-center md:justify-start mb-4">
            <div className="w-full md:w-auto">
              <GenresList genres={genres} />
            </div>
          </div>
        </div>
      </div>
  );
}
