import contentfulClient from "@/lib/contentfulClient";
import { TypeBooksSkeleton } from "@/content-types";

export const getBooksByGenre = async (genreId: string) => {
    try {
      // Dohvaćanje svih knjiga
      const data = await contentfulClient.withoutUnresolvableLinks.getEntries<TypeBooksSkeleton>({
        content_type: "books", // Pretpostavljamo da je ovo ispravan content_type za knjige
        select: ["fields"], // Možete specificirati polja koja želite dohvatiti
      });

      // Provjera što dolazi u response
      console.log('Dohvaćeni podaci:', data);

      // 🔹 Filtriranje knjiga prema žanru
      const filteredBooks = data.items.filter((item) =>
        item.fields.genre?.some((genre: any) => genre.sys.id === genreId) // Filtriramo knjige koje imaju traženi žanr
      );

      // Logiramo filtrirane knjige
      console.log('Filtrirane knjige:', filteredBooks);
      
      return filteredBooks; // Vraćamo filtrirane knjige
    } catch (error) {
      console.error("Error fetching books by genre:", error);
      return []; // Vraćamo praznu listu ako dođe do greške
    }
};