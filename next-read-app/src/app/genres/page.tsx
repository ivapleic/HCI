"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getGenreList } from "@/lib/api"; // Importirajte funkciju za dohvat žanrova

const GenresPage = () => {
  const [genres, setGenres] = useState<any[]>([]); // State za spremanje žanrova
  const [loading, setLoading] = useState<boolean>(true); // State za prikazivanje loading statusa

  useEffect(() => {
    // Dohvat žanrova kad se komponenta montira
    const fetchGenres = async () => {
      try {
        const data = await getGenreList(); // Dohvat žanrova
        setGenres(data); // Spremanje žanrova u state
      } catch (error) {
        console.error("Error fetching genres:", error);
      } finally {
        setLoading(false); // Kada su podaci dohvaćeni, postavljamo loading na false
      }
    };

    fetchGenres(); // Pozivanje funkcije za dohvat žanrova
  }, []);

  console.log(genres);

  return (
    <div className="w-full max-w-screen-2xl my-6 px-6">
      <h1 className="text-3xl text-[#593E2E] font-bold tracking-tight text-left mb-8">
        Browse All Genres
      </h1>

      {loading ? (
        <div className="text-center text-lg">Loading genres...</div> // Prikazujemo loading dok se žanrovi učitavaju
      ) : (
        <div className="space-y-4">
          {/* Prikazivanje žanrova kao lista */}
          {genres.map((genre: any) => (
            <Link key={genre.sys.id} href={`/genres/${genre.sys.id}`}>
              <div className="p-4 my-8 bg-gray-100 rounded-md shadow-md hover:bg-gray-200 transition-all">
                <h3 className="text-xl font-semibold text-gray-800">{genre.fields.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default GenresPage;
