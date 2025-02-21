"use client";

import Link from "next/link";
import { notFound, useParams } from "next/navigation"; 
import { getGenreById, getListsByGenre } from "@/lib/api";
import { useState, useEffect } from "react";

export default function GenrePage() {
  const params = useParams(); 
  const genreId = params?.genreId as string; 

  const [genre, setGenre] = useState<any>(null);
  const [lists, setLists] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!genreId) return; 

    const fetchData = async () => {
      setLoading(true);
      try {
        const genreData = await getGenreById(genreId);
        console.log("Fetched Genre Data:", genreData);

        const listsData = await getListsByGenre(genreId);
        console.log("Fetched Lists Data:", listsData);

        setGenre(genreData || null);
        setLists(listsData || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [genreId]);

  if (!loading && !genre) {
    return notFound();
  }

  const name = genre?.fields?.name || "Unknown Genre";
  const description = genre?.fields?.description || "No description available.";

  return (
    <main className="flex min-h-screen flex-col items-center p-10 bg-gray-50">
      <article className="w-full max-w-2xl bg-white shadow-lg rounded-lg overflow-hidden p-6">
        <Link href="/genres" className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200 mb-6">
          ← Back to Genres
        </Link>
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 mb-4">{name}</h1>
        <p className="text-gray-700">{description}</p>
        <div className="mt-10">
          <h2 className="text-xl font-bold mb-4 text-gray-900">Lists under this Genre:</h2>
          {lists.length > 0 ? (
            lists.map((list: any, index: number) => (
              <div key={index} className="p-4 bg-gray-100 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-red-800 mb-4">{list.fields.name}</h3>
                {list.fields.books?.map((book: any, bookIndex: number) => (
                  <div key={bookIndex} className="p-2 bg-white rounded-md shadow-sm">
                    <h4 className="font-medium text-gray-700">{book.fields.title}</h4>
                  </div>
                ))}
              </div>
            ))
          ) : (
            <p className="text-gray-600">No lists available for this genre.</p>
          )}
        </div>
      </article>
    </main>
  );
}
