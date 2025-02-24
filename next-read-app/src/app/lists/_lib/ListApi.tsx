import contentfulClient from "@/lib/contentfulClient";
import { Entry } from "contentful";
import { TypeGenreSkeleton, TypeListSkeleton, TypeBooksSkeleton } from "@/content-types";


// ✅ 1. Dohvaćanje svih lista
export const getLists = async (): Promise<
  Entry<TypeListSkeleton, "WITHOUT_UNRESOLVABLE_LINKS", string>[]
> => {
  try {
    const data =
      await contentfulClient.withoutUnresolvableLinks.getEntries<TypeListSkeleton>({
        content_type: "list",
        select: ["fields"],
      });
console.log(data.items);
    return data.items; 
  } catch (error) {
    console.error("Error fetching lists:", error);
    return [];
  }
};