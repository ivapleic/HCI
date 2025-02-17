import contentfulClient from "./contentfulClient";
import { TypeUserFields, TypeUserSkeleton } from '@/content-types'; // Importiraj definiciju tipa korisnika

export const loginUser = async (email: string, password: string): Promise<TypeUserFields | null> => {
  try {
    // Dohvati sve korisnike iz Contentful-a
    const data = await contentfulClient.withoutUnresolvableLinks.getEntries<TypeUserSkeleton>({
      content_type: 'user',  // Content type za korisnike
      select: ['fields'],  // Vraća samo polja, ne cijeli objekt
    });

    // Filtriraj korisnike prema emailu
    const user = data.items.find(item => item.fields.email && item.fields.email === email);

    if (user) {
      // Provjeri lozinku
      if (user.fields.password && user.fields.password === password) {
        // Vratit ćemo korisničke podatke ako su ispravni
        return user.fields;  // Vraća podatke iz `fields` objekta
      } else {
        // Ako lozinka nije ispravna
        return null;  // Vraćamo null ako lozinka nije ispravna
      }
    } else {
      // Ako korisnik nije pronađen
      return null;
    }
  } catch (error) {
    console.error("Error fetching user from Contentful:", error);
    return null;  // Ako dođe do greške, vraćamo null
  }
};
