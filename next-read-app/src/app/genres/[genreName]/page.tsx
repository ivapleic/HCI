"use client";

import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { getGenreList } from "../_lib/genresApi"; // Promijeniti prema tvojoj funkciji za dohvat žanrova
import { useState, useEffect } from "react";
import { getBooks } from "../_lib/genresApi";
import { getLists } from "@/app/lists/_lib/ListApi";
import { list } from "postcss";

export default function GenrePage() {
  const params = useParams();
  const genreName = params?.genreName as string; // dohvaćamo ime žanra

  const [genre, setGenre] = useState<any>(null);
  const [lists, setLists] = useState<any[]>([]);
  const [filteredLists, setFilteredLists] = useState<any[]>([]); // Filtrirane liste po žanru
  const [loading, setLoading] = useState<boolean>(true);
  const [genres, setGenres] = useState<any[]>([]); // Svi žanrovi za desni popis
  const [books, setBooks] = useState<any[]>([]);
  const [newReleases, setNewReleases] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Dohvati sve žanrove
        const genresData = await getGenreList();
        setGenres(genresData || []);

        // Pronađi točan žanr prema URL parametru
        const genreData = genresData.find(
          (g: any) => g.fields.name.toLowerCase() === genreName.toLowerCase()
        );

        if (!genreData) {
          return notFound();
        }

        setGenre(genreData);

        // Dohvati sve knjige i filtriraj prema žanru
        const allBooks = await getBooks();
        const genreBooks = allBooks.filter((book: any) =>
          book.fields.genre?.some((g: any) => g.sys.id === genreData.sys.id)
        );

        setBooks(genreBooks);

        // Dohvati sve liste
        const listsData = await getLists();
        setLists(listsData);

        // 📌 **Ključni popravak: Pravilno filtriranje lista prema žanru**
        const genreLists = listsData.filter((list: any) =>
          list.fields.genres?.some((g: any) => g.sys.id === genreData.sys.id)
        );

        setFilteredLists(genreLists);

        // Filtriraj knjige koje su objavljene ove godine
        const currentYear = new Date().getFullYear();
        const recentBooks = genreBooks.filter((book: any) => {
          const publicationYear = parseInt(book.fields.publicationYear, 10);
          return publicationYear && publicationYear === currentYear;
        });

        setNewReleases(recentBooks.slice(0, 5));
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [genreName]);

  if (!loading && !genre) {
    return notFound();
  }

  const name = genre?.fields?.name || "Unknown Genre";
  const description = genre?.fields?.description || "No description available.";

  return (
    <div className="w-full my-4 px-20 mx-0">
      {/* Grid Layout sa lijevim i desnim dijelom */}
      <div className="grid grid-cols-4 gap-10">
        {/* Lijevi div: Detalji o žanru (širi dio) */}
        <div className="col-span-3 bg-white shadow-lg rounded-lg p-6">
          <Link
            href="/genres"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200 mb-6"
          >
            ← Back to Genres
          </Link>

          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 mb-4">
            {name}
          </h1>
          <p className="text-gray-700 mb-6">{description}</p>

          {/* Sekcija: New Releases */}
          <div className="mb-10">
            <h2 className="text-xl font-bold mb-4 text-gray-900">
              New Releases
            </h2>
            <div className="flex flex-wrap gap-4">
              {newReleases.length > 0 ? (
                newReleases.map((book: any, index: number) => (
                  <img
                    key={index}
                    src={book.fields.coverImage.fields.file.url}
                    alt={book.fields.title}
                    className="w-28 h-40 object-cover rounded-md"
                  />
                ))
              ) : (
                <p className="text-gray-600">No new releases this year.</p>
              )}
            </div>
          </div>

          {/* Sekcija: Lists under this Genre */}
          <div className="mb-10">
            <Link
              href={`/tags/${genreName.toLowerCase()}`}
              className="text-blue-600 hover:underline font-semibold"
            >
              Lists with this genre →
            </Link>

            {filteredLists.length > 0 ? (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredLists.map((list, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg shadow-sm p-3 border border-gray-200 flex flex-col items-start"
                  >
                    <Link href={`/lists/${list.sys.id}`}>
                      <div className="w-full">
                        {/* Grid sa 4 knjige u istom redu */}
                        <div className="grid grid-cols-4 gap-1 w-full mb-2">
                          {list.fields.books?.length > 0 ? (
                            list.fields.books
                              .slice(0, 4)
                              .map((book: any, idx: number) => (
                                <div key={idx} className="relative">
                                  <img
                                    src={
                                      book.fields.coverImage?.fields.file.url
                                    }
                                    alt={book.fields.title}
                                    className="object-cover rounded-md shadow-md w-full h-20"
                                  />
                                </div>
                              ))
                          ) : (
                            <p className="text-sm col-span-4 text-center">
                              No books available
                            </p>
                          )}
                        </div>
                        {/* Ime liste ispod slika */}
                        <h3 className="text-sm sm:text-base text-start font-bold text-gray-900 hover:text-blue-500 transition-colors duration-200">
                          {list.fields.name}
                        </h3>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">
                No lists available for this genre.
              </p>
            )}
          </div>

          <div className="mb-10">
  <h2 className="text-xl font-bold mb-4 text-gray-900">
    <Link href={`/books?genre=${genreName}`}>
      Books of this Genre
    </Link>
  </h2>
  <div className="flex flex-wrap gap-4">
    {books.length > 0 ? (
      books
        .slice(0, 5) // Prikazuje prvih 5 knjiga
        .map((book: any, index: number) => (
          <img
            key={index}
            src={book.fields.coverImage.fields.file.url}
            alt={book.fields.title}
            className="w-28 h-40 object-cover rounded-md"
          />
        ))
    ) : (
      <p className="text-gray-600">
        No books available for this genre.
      </p>
    )}
  </div>
</div>

        </div>

        {/* Desni div: Popis svih žanrova (uži dio) */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-md border">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            All Genres
          </h2>

          <ul className="grid grid-cols-2 gap-x-6 gap-y-4">
            {genres.map((genre, index) => (
              <li key={`${genre.sys.id}-${index}`} className="border-b pb-2">
                <Link href={`/genres/${genre.fields.name.toLowerCase()}`}>
                  <span className="text-gray-800 hover:text-blue-500 transition">
                    {genre.fields.name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
