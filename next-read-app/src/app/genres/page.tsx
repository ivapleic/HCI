"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getGenreList } from "../lib/api"; // Importirajte funkciju za dohvat žanrova

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
    <div className="w-full max-w-screen-2xl my-6">
      <p className="text-3xl text-[#593E2E] tracking-tight text-left mb-8">
        Browse All Genres
      </p>

      {loading ? (
        <div>Loading genres...</div> // Prikazujemo loading dok se žanrovi učitavaju
      ) : (
        <div className="grid grid-cols-2 gap-6">
          {genres.map((genre: any) => (
            <Link key={genre.sys.id} href={`/genres/${genre.sys.id}`}>
              <p>
                {genre.fields.name} {/* Prikazivanje imena žanra */}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default GenresPage;
