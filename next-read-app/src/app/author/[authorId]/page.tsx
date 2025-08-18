"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  getBooksByAuthorId,
  getAuthorById,
  getSeriesByAuthorId,
} from "../_lib/AuthorApi";
import Link from "next/link";

const AuthorPage = () => {
  const { authorId } = useParams();
  const [author, setAuthor] = useState<any>(null);
  const [books, setBooks] = useState<any[]>([]);
  const [series, setSeries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showMoreBio, setShowMoreBio] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const authorData = await getAuthorById(authorId as string);
      const booksData = await getBooksByAuthorId(authorId as string);
      const seriesData = await getSeriesByAuthorId(authorId as string);

      setAuthor(authorData);
      setBooks(booksData);
      setSeries(seriesData);
      setLoading(false);
    };

    fetchData();
  }, [authorId]);

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (!author) return <div className="text-center text-red-500">Author not found</div>;

  const { fields } = author;
  const imageUrl = fields.profileImage?.fields.file?.url;
  const safeUrl = imageUrl?.startsWith("//") ? `https:${imageUrl}` : imageUrl;

  return (
    <>
      {/* MOBILE VERZIJA */}
      <div className="block md:hidden max-w-md mx-auto bg-white rounded-lg shadow-md p-6 my-8 border border-gray-200">
        {/* Slika i ime autora centrirano */}
        <div className="flex flex-col items-center mb-6">
          <img
            src={safeUrl}
            alt={fields.fullName}
            className="w-36 h-44 object-cover rounded-lg shadow mb-3"
          />
          <h1 className="text-3xl font-bold text-center">{fields.fullName}</h1>
          <div className={`text-gray-800 text-sm mt-4 text-start ${showMoreBio ? "" : "line-clamp-5"}`}>
            {fields.bio}
          </div>
          {!showMoreBio && fields.bio && fields.bio.length > 180 && (
            <button
              onClick={() => setShowMoreBio(true)}
              className="mt-2 text-sm border px-3 py-1 rounded hover:bg-gray-100 transition"
            >
              Show more ▾
            </button>
          )}
        </div>

        {/* Knjige - jedna po jedna, slika lijevo, tekst desno */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-4 text-[#593e2e]">Books by {fields.fullName}</h2>
          <div className="flex flex-col space-y-6">
            {books.slice(0, 5).map((book) => (
              <Link
                key={book.sys.id}
                href={`/books/${book.sys.id}`}
                className="flex gap-4"
              >
                <img
                  src={book.fields.coverImage?.fields.file.url}
                  alt={book.fields.title}
                  className="w-20 h-28 object-cover rounded cursor-pointer hover:opacity-80 transition flex-shrink-0"
                />
                <div className="flex flex-col justify-start">
                  <h3 className="text-lg font-semibold hover:underline cursor-pointer">{book.fields.title}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2 mt-2 max-w-[250px]">
                    {book.fields.description || "No description available."}
                  </p>
                </div>
              </Link>
            ))}
          </div>
          {books.length > 4 && (
            <div className="flex justify-end mt-4">
              <Link href={`/author/${authorId}/books`} className="text-sm text-[#593E2E] hover:underline">
                More books from {fields.fullName}
                <span className="ml-1 text-lg leading-none">→</span>
              </Link>
            </div>
          )}
        </div>

        {/* Serije - jedna po jedna u užem bloku */}
        <div>
          <h2 className="text-xl font-bold mb-4 text-[#593e2e]">Series by {fields.fullName}</h2>
          <div className="flex flex-col space-y-4 px-4">
            {series.slice(0, 10).map((serie) => (
              <Link
                key={serie.sys.id}
                href={`/series/${serie.sys.id}`}
                className="flex flex-col items-center bg-white rounded-xl shadow-md border border-gray-200 p-4 hover:shadow-lg transition"
              >
                <div className="flex gap-2 justify-center  max-w-[180px]">
                  {serie.fields.books?.slice(0, 3).map((b: any) => (
                    <img
                      key={b.sys.id}
                      src={b.fields.coverImage?.fields.file.url}
                      alt={b.fields.title}
                      className="w-20 h-28 object-cover rounded shadow cursor-pointer hover:opacity-80 transition"
                    />
                  ))}
                </div>
                                <div className="font-semibold text-lg text-gray-900 mt-3 text-center w-full">{serie.fields.title}</div>

              </Link>
            ))}
          </div>
          {series.length > 4 && (
            <div className="flex justify-end mt-4">
              <Link href={`/author/${authorId}/series`} className="text-sm text-[#593E2E] hover:underline">
                More series by {fields.fullName}
                <span className="ml-1 text-lg leading-none">→</span>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* DESKTOP VERZIJA */}
      <div className="hidden md:block max-w-4xl mx-auto bg-white rounded-lg shadow-md px-8 py-10">
        {/* Autor info */}
        <div className="flex flex-row gap-6 mb-10 items-start">
          <img
            src={safeUrl}
            alt={fields.fullName}
            className="w-40 h-52 object-cover rounded shadow shrink-0"
          />
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-4">{fields.fullName}</h1>
            <div className={`text-gray-800 text-sm ${showMoreBio ? "" : "line-clamp-4"}`}>
              {fields.bio}
            </div>
            {!showMoreBio && fields.bio && fields.bio.length > 180 && (
              <button
                onClick={() => setShowMoreBio(true)}
                className="mt-2 text-sm px-3 py-1 rounded hover:bg-gray-100 transition"
              >
                Show more ▾
              </button>
            )}
          </div>
        </div>

        {/* Knjige - na desktopu kao i do sad */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-[#593e2e]">{fields.fullName}’s Books</h2>
          <div className="space-y-6">
            {books.slice(0, 5).map((book) => (
              <div key={book.sys.id} className="flex gap-4 border-b pb-4 relative">
                <Link href={`/books/${book.sys.id}`}>
                  <img
                    src={book.fields.coverImage?.fields.file.url}
                    alt={book.fields.title}
                    className="w-20 h-28 object-cover rounded cursor-pointer hover:opacity-80 transition"
                  />
                </Link>
                <div className="flex-1">
                  <Link href={`/books/${book.sys.id}`}>
                    <h3 className="text-lg font-semibold hover:underline cursor-pointer">
                      {book.fields.title}
                    </h3>
                  </Link>
                  <p className="text-sm text-gray-600 line-clamp-2 mt-4">
                    {book.fields.description || "No description available."}
                  </p>
                </div>
                <button
                  className="absolute top-2 right-0 border text-xs px-2 py-[3px] rounded bg-[#593E2E] text-white hover:bg-[#7a5e43] transition"
                  type="button"
                >
                  Want to Read ▾
                </button>
              </div>
            ))}
          </div>
          {books.length > 4 && (
            <div className="flex justify-end mt-4">
              <Link
                href={`/author/${authorId}/books`}
                className="mt-4 inline-flex items-center text-sm text-[#593E2E] hover:underline cursor-pointer"
              >
                More books from {fields.fullName}
                <span className="ml-1 text-lg leading-none">→</span>
              </Link>
            </div>
          )}
        </div>

        {/* Serije - na desktopu grid */}
        <div>
          <h2 className="text-xl font-bold mb-4 text-[#593e2e]">Series by {fields.fullName}</h2>
          {series.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {series.slice(0, 6).map((serie, index) => (
                <Link
                  key={index}
                  href={`/series/${serie.sys.id}`}
                  className="group"
                >
                  <div className="w-full bg-white rounded-xl shadow-md border border-gray-200 p-4 flex flex-col items-center transition-all duration-200 hover:shadow-lg">
                    <div className="flex gap-2 mb-2 justify-center max-w-[180px]">
                      {serie.fields.books?.length > 0 ? (
                        serie.fields.books
                          .slice(0, 3)
                          .map((b: any, idx: number) => (
                            <img
                              key={idx}
                              src={b.fields.coverImage?.fields.file.url}
                              alt={b.fields.title}
                              className="object-cover rounded-md shadow-md w-20 h-28"
                            />
                          ))
                      ) : (
                        <p className="text-sm text-gray-400">
                          No books available
                        </p>
                      )}
                    </div>
                    <h3 className="text-center text-[15px] font-bold text-gray-900 mt-1 group-hover:text-[#8c6954] transition-colors duration-200">
                      {serie.fields.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 mt-2">No series available for this author.</p>
          )}

          {series.length > 4 && (
            <div className="flex justify-end mt-4">
              <Link
                href={`/author/${authorId}/series`}
                className="inline-flex items-center text-sm text-[#593E2E] hover:underline cursor-pointer"
              >
                More series by {fields.fullName}
                <span className="ml-1 text-lg leading-none">→</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AuthorPage;
