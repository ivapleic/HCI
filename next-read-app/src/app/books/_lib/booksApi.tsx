import contentfulClient from "@/lib/contentfulClient";
import { TypeBooksSkeleton } from "@/content-types";

// Funkcija za dohvat ID-a žanra prema imenu
export const getGenreById = async (genreName: string) => {
  try {
    // Dohvaćanje svih žanrova iz Contentful-a
    const data = await contentfulClient.withoutUnresolvableLinks.getEntries({
      content_type: "genre", // Pretpostavljamo da je ovo content_type za žanrove
      select: ["fields", "sys.id"], // Dohvati ime i ID žanra
    });


    // Pronađi žanr prema imenu
    const genre = data.items.find((item: any) =>
      item.fields.name.toLowerCase() === genreName.toLowerCase()
    );

    if (!genre) {
      console.error(`Žanr s imenom "${genreName}" nije pronađen.`);
      return null; // Ako žanr nije pronađen, vraćamo null
    }

    // Vraćamo ID žanra
    return genre.sys.id;
  } catch (error) {
    console.error("Greška pri dohvaćanju ID-a žanra:", error);
    return null; // Vraćamo null ako je došlo do greške
  }
};

// Funkcija za dohvat knjiga prema žanru
export const getBooksByGenre = async (genreName: string) => {
  try {
    // Normaliziraj ime žanra (prvo slovo veliko)
    const normalizedGenreName = capitalizeGenreName(genreName);

    // Dohvati ID žanra prema normaliziranom imenu
    const genreId = await getGenreById(normalizedGenreName);

    if (!genreId) {
      throw new Error(`Žanr s imenom "${normalizedGenreName}" nije pronađen.`);
    }

    // Dohvaćanje svih knjiga
    const data = await contentfulClient.withoutUnresolvableLinks.getEntries<TypeBooksSkeleton>({
      content_type: "books", // Pretpostavljamo da je ovo ispravan content_type za knjige
      select: ["fields"], // Možete specificirati polja koja želite dohvatiti
    });


    // 🔹 Filtriranje knjiga prema žanru
    const filteredBooks = data.items.filter((item) =>
      item.fields.genre?.some((genre: any) => genre.sys.id === genreId) // Filtriramo knjige koje imaju traženi žanr
    );

    // Logiramo filtrirane knjige
    console.log('Filtrirane knjige:', filteredBooks);
    
    return filteredBooks; // Vraćamo filtrirane knjige
  } catch (error) {
    console.error("Greška pri dohvaćanju knjiga:", error);
    return []; // Vraćamo praznu listu ako dođe do greške
  }
};

// Funkcija za dohvat svih knjiga
export const getAllBooks = async () => {
  try {
    const data = await contentfulClient.withoutUnresolvableLinks.getEntries<TypeBooksSkeleton>({
      content_type: "books", // Contentful Content Type za knjige
      select: ["fields"], // Možeš dodati dodatna polja ako su potrebna
    });

    
    return data.items; // Vraćamo sve knjige
  } catch (error) {
    console.error("Greška pri dohvaćanju svih knjiga:", error);
    return [];
  }
};

// Funkcija za normalizaciju imena žanra (prvo slovo veliko)
const capitalizeGenreName = (genreName: string) => {
  return genreName.charAt(0).toUpperCase() + genreName.slice(1).toLowerCase();
};

