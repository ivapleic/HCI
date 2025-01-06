import contentfulClient from "./contentfulClient";
import {
  TypeGenreSkeleton,
  TypeBookSkeleton,
  TypeAuthorSkeleton,
  TypeUserSkeleton,
  TypeListSkeleton,
} from "@/content-types";

export const getGenreList = async () => {
  try {
    const data =
      await contentfulClient.withoutUnresolvableLinks.getEntries<TypeGenreSkeleton>(
        {
          content_type: "genre",
          select: ["fields"],
        }
      );

    if (data.items.length > 0) {
      return data.items;
    }

    return [];
  } catch (error) {
    console.error("Error fetching genre list:", error);
    return [];
  }
};

// Funkcija koja dohvaća specifičan žanr prema njegovom ID-u
export const getGenreById = async (genreId: string) => {
  try {
    const data =
      await contentfulClient.withoutUnresolvableLinks.getEntries<TypeGenreSkeleton>(
        {
          content_type: "genre",
          "sys.id": genreId,
          select: ["fields"],
        }
      );

    if (data.items.length > 0) {
      return data.items[0];
    }

    return null;
  } catch (error) {
    console.error("Error fetching genre by ID:", error);
    return null;
  }
};

export const getListsByGenre = async (genreId: string) => {
  try {
    const data = await contentfulClient.withoutUnresolvableLinks.getEntries<TypeListSkeleton>({
      content_type: "list",
      select: ["fields"],
    });

    console.log("All data items:", data.items);  // Ispisivanje svih podataka

    // ZASTO OVO NE RADI???

      // const filteredItems = data.items.filter((item) => 
      //   item.fields.Genres.filter((genre: any) => genre.sys.id === genreId) 
     // );
    

    // console.log("Filtered Lists:", filteredItems);  // Log za filtrirane rezultate
    return data.items;  // Vraćanje filtrirane liste
  } catch (error) {
    console.error("Error fetching lists by genre:", error);
    return [];  // Ako dođe do greške, vraćamo prazan niz
  }
};


