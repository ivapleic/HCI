"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  getBooksByAuthorId,
  getAuthorById,
  getSeriesByAuthorId,
} from "../_lib/AuthorApi";
import Link from "next/link";

interface AuthorPageProps {}

const AuthorPage = ({}: AuthorPageProps) => {
  const { authorId } = useParams();
  const [author, setAuthor] = useState<any>(null);
  const [books, setBooks] = useState<any[]>([]);
  const [series, setSeries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showMoreBio, setShowMoreBio] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const authorData = await getAuthorById(authorId as string);
      console.log("📌 authorData:", authorData); // <-- dodaj ovo

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
  if (!author)
    return <div className="text-center text-red-500">Author not found</div>;

  const { fields } = author;

  // 🔧 Ispravni URL za sliku autora
  const imageUrl = fields.profileImage?.fields.file?.url;
  const safeUrl = imageUrl?.startsWith("//") ? `https:${imageUrl}` : imageUrl;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* Autor Info */}
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={safeUrl}
          alt={fields.fullName}
          className="w-40 h-52 object-cover rounded shadow"
        />

        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-4">{fields.fullName}</h1>

          {/* Bio ispod svega */}
          <div
            className={`mt-6 text-sm text-gray-800 ${
              showMoreBio ? "" : "line-clamp-4"
            }`}
          >
            {fields.bio}
          </div>
          {!showMoreBio && (
            <button
              onClick={() => setShowMoreBio(true)}
              className="mt-2 text-sm border px-3 py-1 rounded hover:bg-gray-100"
            >
              Show more ▾
            </button>
          )}
        </div>
      </div>

      {/* Autorove knjige */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">
          {fields.fullName}’s Books
        </h2>
        <div className="space-y-6">
          {books.map((book) => (
            <div key={book.sys.id} className="flex gap-4 border-b pb-4">
              <img
                src={book.fields.coverImage?.fields.file.url}
                alt={book.fields.title}
                className="w-20 h-28 object-cover rounded"
              />
              <div className="flex-1">
                <h3 className="text-lg font-semibold">{book.fields.title}</h3>
                <p className="text-sm text-gray-600">
                  {book.fields.description?.substring(0, 100)}...
                </p>
              </div>
              <button className="border text-sm px-3 py-1 rounded bg-gray-100 hover:bg-gray-200">
                Want to Read ▾
              </button>
            </div>
          ))}
        </div>
        <Link href={`/author/${authorId}/books`}>
          <p className="mt-4 text-sm text-blue-600 hover:underline">
            More books from {fields.fullName}
          </p>
        </Link>
      </div>

      {/* Serije autora */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">
          Series by {fields.fullName}
        </h2>
        {series.map((serie) => (
          <div key={serie.sys.id} className="mb-6">
            <h3 className="font-medium">{serie.fields.title}</h3>
            <div className="flex gap-2 mt-2">
              {serie.fields.books?.map((b: any) => (
                <img
                  key={b.sys.id}
                  src={b.fields.coverImage?.fields.file.url}
                  alt={b.fields.title}
                  className="w-16 h-24 object-cover rounded"
                />
              ))}
            </div>
          </div>
        ))}
        <Link href={`/author/${authorId}/series`}>
          <p className="mt-4 text-sm text-blue-600 hover:underline">
            More series from {fields.fullName}
          </p>
        </Link>
      </div>
    </div>
  );
};

export default AuthorPage;
