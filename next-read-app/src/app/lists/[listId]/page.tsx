"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getListById } from "@/app/lists/_lib/ListApi";
import { getAllTags } from "@/app/tags/_lib/TagsApi";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { getAllAuthors } from "@/app/lists/_lib/ListApi";
import { useRouter } from "next/navigation";


const ListDetailPage = () => {
  const { listId } = useParams();
  const router = useRouter();
  const [list, setList] = useState<any>(null);
  const [tags, setTags] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [authors, setAuthors] = useState<any>([]);

  useEffect(() => {
    const fetchListAndTags = async () => {
      try {
        setLoading(true);
        const fetchedList = await getListById(listId as string);
        const allTags = await getAllTags();

        if (fetchedList) {
          // console.log("FETCHED LIST:", fetchedList);
          console.log("Books in the list:", fetchedList.fields.books);
          // console.log("Books JSON:", JSON.stringify(fetchedList.fields.books, null, 2));
          setList(fetchedList);
        } else {
          console.log("Fetched list is null or undefined");
        }

        setTags(allTags);
      } catch (error) {
        console.error("Error fetching list or tags:", error);
      } finally {
        setLoading(false);
      }
    };
    const fetchAuthors = async () => {
      const authorsData = await getAllAuthors();
      setAuthors(authorsData);
      // console.log("Authors with books:", authorsData);
    };

    fetchAuthors();

    fetchListAndTags();
  }, [listId]);

  if (loading) {
    return <div className="text-center text-lg">Loading list details...</div>;
  }

  if (!list) {
    return <div className="text-center text-red-500">List not found.</div>;
  }

  return (
    <div className="w-full my-4 px-4 md:px-10 lg:px-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Glavni sadržaj */}
        <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-md border">
          <h2 className="text-3xl font-bold text-[#593E2E] mb-6">
            {list.fields.name}
          </h2>
  
          {/* Opis liste */}
          <div className="mb-10 prose max-w-none">
            {list.fields.description
              ? documentToReactComponents(list.fields.description)
              : null}
          </div>
  
          {/* Knjige u listi */}
          <div className="space-y-6">
            {list.fields.books?.map((book: any, index: number) => (
              <div
                key={index}
                className="flex items-start justify-between bg-white shadow-md border rounded-xl p-4"
              >
                <div className="flex flex-1">
                  <img
                    onClick={() => router.push(`/books/${book.sys.id}`)}
                    src={book.fields.coverImage?.fields.file.url}
                    alt={book.fields.title}
                    className="w-24 h-32 object-cover rounded-md mr-4 cursor-pointer hover:opacity-80 transition"
                  />
                  <div>
                    <h3
                      onClick={() => router.push(`/books/${book.sys.id}`)}
                      className="text-xl font-semibold text-gray-900 mb-1 cursor-pointer hover:text-[#593E2E]"
                    >
                      {book.fields.title}
                    </h3>
                    <p className="text-sm text-gray-700 mb-1">
                      by {book.fields.author?.fields.fullName || "Unknown Author"}
                    </p>
                    <p className="text-sm text-gray-600 line-clamp-2 max-w-xl">
                      {book.fields.description}
                    </p>
                  </div>
                </div>
  
                {/* Dropdown meni */}
                <div className="relative">
                  <details className="dropdown">
                    <summary className="btn bg-[#593E2E] text-white px-3 py-1 rounded-md cursor-pointer text-lg leading-none">
                      +
                    </summary>
                    <ul className="dropdown-content menu p-2 shadow bg-white rounded-box w-40 mt-2 border z-10">
                      <li>
                        <button className="text-left w-full">Opcija 1</button>
                      </li>
                      <li>
                        <button className="text-left w-full">Opcija 2</button>
                      </li>
                      <li>
                        <button className="text-left w-full">Opcija 3</button>
                      </li>
                    </ul>
                  </details>
                </div>
              </div>
            ))}
          </div>
        </div>
  
        {/* Desni sidebar s tagovima */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-md border">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
            Browse by Tags
          </h2>
  
          <ul className="grid grid-cols-2 gap-x-6 gap-y-4">
            {tags.length > 0 ? (
              tags.map((tag: any) => (
                <li key={tag.sys.id} className="border-b pb-2">
                  <a
                    href={`/tags/${tag.fields.tagName.toLowerCase()}`}
                    className="text-gray-800 hover:text-blue-500 transition"
                  >
                    {tag.fields.tagName}
                  </a>
                </li>
              ))
            ) : (
              <p>No tags available.</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
  
};

export default ListDetailPage;
