"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getBookById } from "../_lib/booksApi";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Link from "next/link";

const BookDetailPage = () => {
  const { bookId } = useParams(); // parametar koji dobijem iz url-a, prosljedi se u komponentu
  const [book, setBook] = useState<any>(null); //objekt knjige sa tim id-em
  const [loading, setLoading] = useState(true);
  const [showFullDescription, setShowFullDescription] = useState(false);

  useEffect(() => {
    const fetchBook = async () => {
      const data = await getBookById(bookId as string);
      // console.log("Fetched book data:", data);
      setBook(data);
      setLoading(false);
    };

    fetchBook();
  }, [bookId]);

  if (loading) return <div className="text-center">Loading...</div>;
  if (!book)
    return <div className="text-center text-red-500">Book not found</div>;

  const { fields } = book;

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Slika knjige */}
        <div className="w-full md:w-1/4">
          <img
            src={fields.coverImage?.fields.file.url}
            alt={fields.title}
            className="w-full rounded shadow-md object-contain max-h-64 mx-auto"
          />

          <button className="mt-3 w-full border px-3 py-1.5 rounded bg-gray-100 text-sm hover:bg-gray-200">
            Want to Read ▾
          </button>
        </div>

        {/* Glavni sadržaj */}
        <div className="flex-1">
          <h1 className="text-2xl font-semibold mb-1">{fields.title}</h1>
          <h2 className="text-lg text-gray-600 mb-3">
            <Link
              href={`/author/${fields.author.sys.id}`}
              className="text-blue-600 hover:underline"
            >
              {fields.author?.fields.fullName}
            </Link>
          </h2>

          <div
            className={`prose prose-sm mb-4 max-w-none ${
              showFullDescription ? "" : "line-clamp-4"
            }`}
          >
            {fields.description ? (
              typeof fields.description === "string" ? (
                <p>{fields.description}</p>
              ) : (
                documentToReactComponents(fields.description)
              )
            ) : (
              <p>No description available.</p>
            )}
          </div>

          {/* Prikazuje botun samo ako postoji više teksta */}
          {!showFullDescription && (
            <button
              onClick={() => setShowFullDescription(true)}
              className="border px-3 py-1.5 rounded bg-white text-sm hover:bg-gray-100"
            >
              Show more ▾
            </button>
          )}

          {/* Žanrovi */}
          <div className="mt-5">
            <h3 className="text-md font-semibold mb-1">Genres</h3>
            <div className="flex flex-wrap gap-1">
              {Array.isArray(fields.genre) &&
                fields.genre.map((genre: any) => (
                  <Link
                    key={genre.sys.id}
                    href={`/genres/${genre.fields.name.toLowerCase()}`}
                  >
                    <span className="bg-gray-200 px-2 py-0.5 rounded-full text-xs text-blue-700 hover:underline cursor-pointer">
                      {genre.fields.name}
                    </span>
                  </Link>
                ))}
            </div>
          </div>

          {/* Detalji knjige */}
          <div className="mt-7 border-t pt-4">
            <h3 className="text-md font-semibold mb-3">Book Details</h3>
            <ul className="text-xs space-y-1 text-gray-800">
              {fields.isbn && (
                <li>
                  <strong>ISBN:</strong> {fields.isbn}
                </li>
              )}
              {fields.publicationYear && (
                <li>
                  <strong>Publication Year:</strong> {fields.publicationYear}
                </li>
              )}
              {fields.language && (
                <li>
                  <strong>Language:</strong> {fields.language}
                </li>
              )}
              {fields.rating && (
                <li className="flex items-center gap-2">
                  <strong>Rating:</strong>
                  <div className="flex items-center">
                    {Array.from({ length: 5 }, (_, i) => {
                      const full = i + 1 <= Math.floor(fields.rating);
                      const half = i + 0.5 === fields.rating;
                      return (
                        <span
                          key={i}
                          className={`text-2xl ${
                            full || half ? "text-yellow-400" : "text-gray-300"
                          }`}
                        >
                          {full ? "★" : half ? "★" : "☆"}
                        </span>
                      );
                    })}
                    <span className="ml-2 text-sm text-gray-600">
                      ({fields.rating.toFixed(1)})
                    </span>
                  </div>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetailPage;
