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

    console.log("All data items:", data.items);  

    // ZASTO OVO NE RADI???

      // const filteredItems = data.items.filter((item) => 
      //   item.fields.Genres.filter((genre: any) => genre.sys.id === genreId) 
     // );
    

    // console.log("Filtered Lists:", filteredItems);  
    return data.items; 
  } catch (error) {
    console.error("Error fetching lists by genre:", error);
    return [];  
  }
};


