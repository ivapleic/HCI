import contentfulClient from "./contentfulClient";
import {
  TypeGenreSkeleton,
  TypeBookSkeleton,
  TypeAuthorSkeleton,
  TypeUserSkeleton,
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
