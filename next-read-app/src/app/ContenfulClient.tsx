import { Entry, createClient, EntryCollection } from 'contentful';

// Definirajte tipove za Contentful klijent
const client = createClient({
  space: 'tpcs1tvipqs5', // Zamijenite sa svojim Space ID
  environment: 'master', // Po defaultu je 'master', možete promijeniti ako koristite drugo okruženje
  accessToken: '-KLDK621J9yUh93LYorLeVRlnvnukrlhEg615XQ_LIk', // Zamijenite sa svojim Access Tokenom
});

// Funkcija za dohvat jednog unosa s Contentful-a
export const getEntry = async (entryId: string): Promise<Entry<any>> => {
  try {
    const entry = await client.getEntry(entryId);
    return entry;
  } catch (error) {
    throw new Error(`Failed to fetch entry: ${error}`);
  }
};

// Funkcija za dohvat više unosa (npr. knjige)
export const getEntries = async (contentType: string): Promise<EntryCollection<any>> => {
  try {
    const entries = await client.getEntries({
      content_type: contentType,
    });
    return entries;
  } catch (error) {
    throw new Error(`Failed to fetch entries: ${error}`);
  }
};

export default client;
