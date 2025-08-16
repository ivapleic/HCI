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

  if (loading) return <div className="text-center mt-12">Loading...</div>;

  if (books.length === 0)
    return (
      <p className="text-gray-600 text-center mt-12">
        No recent releases available in this genre.
      </p>
    );

  return (
    <div className="max-w-[1200px] mx-auto p-4 md:p-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Lijevi blok: po gušćem rasporedu i sa svijetlom pozadinom */}
        <div className="md:col-span-2 space-y-4 bg-white p-6 rounded-lg shadow-md border">
          <h2 className="text-2xl font-bold mb-4 text-[#593e2e]">
            New Releases
          </h2>
          {books.slice(0, 10).map((book: any) => (
            <div
              key={book.sys.id}
              className="flex items-start justify-between bg-white  rounded-xl p-4"
            >
              <img
                onClick={() => router.push(`/books/${book.sys.id}`)}
                src={book.fields.coverImage?.fields.file.url}
                alt={book.fields.title}
                className="w-24 h-32 object-cover rounded-md mr-6 cursor-pointer hover:opacity-80 transition"
              />
              <div className="flex-1">
                <h3
                  onClick={() => router.push(`/books/${book.sys.id}`)}
                  className="text-xl font-semibold text-gray-900 mb-1 cursor-pointer hover:text-[#593e2e] hover:underline"
                >
                  {book.fields.title}
                </h3>

                <p className="text-sm text-gray-700 mb-2">
                  by{" "}
                  {book.fields.author?.fields.fullName ? (
                    <Link
                      href={`/author/${book.fields.author.sys.id}`}
                      className="text-gray-700 hover:underline"
                    >
                      {book.fields.author.fields.fullName}
                    </Link>
                  ) : (
                    "Unknown Author"
                  )}
                </p>
                <p className="text-sm text-gray-600 line-clamp-2 max-w-xl">
                  {book.fields.description || "No description available."}
                </p>
              </div>
              {/* Dropdown meni */}
              <div className="relative">
                <details className="dropdown">
                  <summary className="btn bg-[#593E2E] text-white px-3 py-1 rounded-md cursor-pointer text-lg leading-none">
                    +
                  </summary>
                  <ul className="dropdown-content menu p-2 shadow bg-white rounded-box w-40 mt-2 border z-10">
                    <li>
                      <button className="text-left w-full">Option 1</button>
                    </li>
                    <li>
                      <button className="text-left w-full">Option 2</button>
                    </li>
                    <li>
                      <button className="text-left w-full">Option 3</button>
                    </li>
                  </ul>
                </details>
              </div>
            </div>
          ))}
        </div>

        {/* Desni blok: Genres list sidebar */}
        <div>
          <GenresList genres={genres} />
        </div>
      </div>
    </div>
  );
}
