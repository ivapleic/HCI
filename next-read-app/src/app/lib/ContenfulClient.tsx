import * as contentful from "contentful";
import { Entry } from "contentful";

const client = contentful.createClient({
  space: "tpcs1tvipqs5",
  accessToken: "-KLDK621J9yUh93LYorLeVRlnvnukrlhEg615XQ_LIk",
});

export const getAllGenres = async (): Promise<Entry<any>[]> => {
  try {
    const response = await client.getEntries({ content_type: "genre" });
    return response.items;
  } catch (error) {
    console.error("Error fetching genres:", error);
    return [];
  }
};

export const getAllUsers= async (): Promise<Entry<any>[]> => {
  try {
    const response = await client.getEntries({ content_type: "user" });
    return response.items;
  } catch (error) {
    console.error("Error fetching genres:", error);
    return [];
  }
};


export default { getAllGenres,getAllUsers };
