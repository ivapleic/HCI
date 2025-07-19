"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getBookById } from "../_lib/booksApi";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

const BookDetailPage = () => {
  const { bookId } = useParams();
  const [book, setBook] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      const data = await getBookById(bookId as string);
      console.log("Fetched book data:", data); // <-- ispis u konzolu
      setBook(data);
      setLoading(false);
    };
  
    fetchBook();
  }, [bookId]);
  

  if (loading) return <div className="text-center">Loading...</div>;
  if (!book) return <div className="text-center text-red-500">Book not found</div>;

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
          <h2 className="text-lg text-gray-600 mb-3">{fields.author?.fields.fullName}</h2>
  
          <div className="prose prose-sm mb-4 max-w-none">
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
  
          <button className="border px-3 py-1.5 rounded bg-white text-sm hover:bg-gray-100">
            Show more ▾
          </button>
  
          {/* Žanrovi */}
          <div className="mt-5">
            <h3 className="text-md font-semibold mb-1">Genres</h3>
            <div className="flex flex-wrap gap-1">
              {Array.isArray(fields.genre) &&
                fields.genre.map((genre: any) => (
                  <span
                    key={genre.sys.id}
                    className="bg-gray-200 px-2 py-0.5 rounded-full text-xs"
                  >
                    {genre.fields.name}
                  </span>
                ))}
            </div>
          </div>
  
          {/* Detalji knjige */}
          <div className="mt-7 border-t pt-4">
            <h3 className="text-md font-semibold mb-3">Book details</h3>
            <ul className="text-xs space-y-1">
              <li>
                <strong>Original title:</strong> {fields.originalTitle}
              </li>
              <li>
                <strong>Series:</strong> {fields.series}
              </li>
              <li>
                <strong>Characters:</strong> {fields.characters?.join(", ")}
              </li>
              <li>
                <strong>Format:</strong> {fields.format}
              </li>
              <li>
                <strong>Published:</strong> {fields.publicationDate} by {fields.publisher}
              </li>
              <li>
                <strong>Language:</strong> {fields.language}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
  
};

export default BookDetailPage;
