"use client";

import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { getGenreList } from "../_lib/genresApi"; // Promijeniti prema tvojoj funkciji za dohvat žanrova
import { useState, useEffect } from "react";

export default function GenrePage() {
  const params = useParams(); 
  const genreName = params?.genreName as string; // dohvaćamo ime žanra

  const [genre, setGenre] = useState<any>(null);
  const [lists, setLists] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [genres, setGenres] = useState<any[]>([]); // Svi žanrovi za desni popis

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Dohvat svih žanrova
        const genresData = await getGenreList();
        setGenres(genresData || []);

        // Dohvat žanra prema imenu
        const genreData = genresData.find((g: any) => g.fields.name.toLowerCase() === genreName.toLowerCase());

        if (!genreData) {
          return notFound(); // Ako žanr nije pronađen
        }

        setGenre(genreData);
        // Pretpostavljam da ćeš za liste dohvatiti po ID-u žanra, stoga ga moraš dodati
        // const listsData = await getListsByGenre(genreData.sys.id);
        // setLists(listsData || []);
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
  <Link href="/genres" className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200 mb-6">
    ← Back to Genres
  </Link>
  
  <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 mb-4">{name}</h1>
  <p className="text-gray-700 mb-6">{description}</p>

  {/* Sekcija: New Releases */}
  <div className="mb-10">
    <h2 className="text-xl font-bold mb-4 text-gray-900">New Releases</h2>
    <div className="grid grid-cols-2 gap-6">
      {/* Ovdje ćeš dodati 5 knjiga koje su objavljene ove godine */}
      {/* Na početku ćemo samo koristiti placeholder knjige */}
      <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
        <h3 className="font-semibold text-gray-800">Book Title 1</h3>
        <p className="text-gray-600">Author 1</p>
      </div>
      <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
        <h3 className="font-semibold text-gray-800">Book Title 2</h3>
        <p className="text-gray-600">Author 2</p>
      </div>
      <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
        <h3 className="font-semibold text-gray-800">Book Title 3</h3>
        <p className="text-gray-600">Author 3</p>
      </div>
      <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
        <h3 className="font-semibold text-gray-800">Book Title 4</h3>
        <p className="text-gray-600">Author 4</p>
      </div>
      <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
        <h3 className="font-semibold text-gray-800">Book Title 5</h3>
        <p className="text-gray-600">Author 5</p>
      </div>
    </div>
  </div>

  {/* Sekcija: Lists under this Genre */}
  <div className="mb-10">
    <h2 className="text-xl font-bold mb-4 text-gray-900">Lists under this Genre:</h2>
    {lists.length > 0 ? (
      lists.map((list: any, index: number) => (
        <div key={index} className="p-4 bg-gray-100 rounded-lg shadow-sm mb-4">
          <h3 className="text-lg font-semibold text-red-800 mb-4">{list.fields.name}</h3>
          {list.fields.books?.map((book: any, bookIndex: number) => (
            <div key={bookIndex} className="p-2 bg-white rounded-md shadow-sm mb-2">
              <h4 className="font-medium text-gray-700">{book.fields.title}</h4>
            </div>
          ))}
        </div>
      ))
    ) : (
      <p className="text-gray-600">No lists available for this genre.</p>
    )}
  </div>

  {/* Sekcija: Books of this Genre */}
  <div className="mb-10">
    <h2 className="text-xl font-bold mb-4 text-gray-900">Books of this Genre</h2>
    <div className="grid grid-cols-2 gap-6">
      {/* Ovdje ćeš dodati knjige koje pripadaju ovom žanru */}
      {/* Na početku ćemo koristiti placeholder knjige */}
      <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
        <h3 className="font-semibold text-gray-800">Genre Book 1</h3>
        <p className="text-gray-600">Author 1</p>
      </div>
      <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
        <h3 className="font-semibold text-gray-800">Genre Book 2</h3>
        <p className="text-gray-600">Author 2</p>
      </div>
      <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
        <h3 className="font-semibold text-gray-800">Genre Book 3</h3>
        <p className="text-gray-600">Author 3</p>
      </div>
      <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
        <h3 className="font-semibold text-gray-800">Genre Book 4</h3>
        <p className="text-gray-600">Author 4</p>
      </div>
      <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
        <h3 className="font-semibold text-gray-800">Genre Book 5</h3>
        <p className="text-gray-600">Author 5</p>
      </div>
    </div>
  </div>
</div>


        {/* Desni div: Popis svih žanrova (uži dio) */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-md border">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">All Genres</h2>

          <ul className="grid grid-cols-2 gap-x-6 gap-y-4">
            {genres.map((genre, index) => (
              <li key={`${genre.sys.id}-${index}`} className="border-b pb-2">
                <Link href={`/genres/${genre.fields.name.toLowerCase()}`}>
                  <span className="text-gray-800 hover:text-blue-500 transition">{genre.fields.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
}
