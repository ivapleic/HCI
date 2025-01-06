import Link from "next/link";
import { notFound } from "next/navigation"; // Ovaj dio koristi Next.js funkcionalnost za prikazivanje stranice 404 ako žanr nije pronađen
import { getGenreById } from "@/app/lib/api"; // Importirajte funkciju za dohvat žanra prema ID-u

type GenrePageProps = {
  params: { genreId: string }; // Parametar za ID žanra u URL-u
};

export const metadata = {
  title: "Genre Details", // Metapodaci za stranicu (možete promijeniti)
};

async function getGenre(id: string) {
  // Funkcija koja poziva Contentful API za dohvat žanra prema ID-u
  const genre = await getGenreById(id);
  return genre;
}

export default async function GenrePage({ params }: GenrePageProps) {
  const genre = await getGenre(params.genreId); // Dohvati žanr na temelju ID-a iz URL-a
  if (!genre) {
    notFound(); // Ako žanr ne postoji, prikazujemo 404 stranicu
  }

  const { name, description } = genre.fields; // Izdvajamo podatke žanra (prema Contentful strukturi)

  return (
    <main className="flex min-h-screen flex-col items-center p-10">
      <article className="w-full max-w-2xl bg-white shadow-lg rounded-lg overflow-hidden p-6">
        <Link
          href="/genres" // Povratak na popis svih žanrova
          className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200 mb-6"
        >
        </Link>
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 mb-4">
          {name} {/* Prikaz imena žanra */}
        </h1>
        <p>{description}</p> {/* Prikaz opisa žanra */}
      </article>
    </main>
  );
}
