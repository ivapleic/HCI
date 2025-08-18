"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getListById } from "@/app/lists/_lib/ListApi";
import { getAllTags } from "@/app/tags/_lib/TagsApi";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Link from "next/link";

const ListDetailPage = () => {
  const { listId } = useParams();
  const router = useRouter();
  const [list, setList] = useState<any>(null);
  const [tags, setTags] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListAndTags = async () => {
      try {
        setLoading(true);
        const fetchedList = await getListById(listId as string);
        const allTags = await getAllTags();

        if (fetchedList) {
          setList(fetchedList);
        }
        setTags(allTags);
      } catch (error) {
        console.error("Error fetching list or tags:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchListAndTags();
  }, [listId]);

  if (loading) {
    return <div className="text-center text-lg mt-12">Loading list details...</div>;
  }

  if (!list) {
    return <div className="text-center text-red-500 mt-12">List not found.</div>;
  }

  return (
    <div className="md:max-w-[1200px] md:mx-auto p-4 md:p-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Glavni sadržaj */}
        <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-md border">
          <h2 className="text-3xl font-bold text-[#593E2E] mb-6">{list.fields.name}</h2>

          {/* Opis liste */}
          <div className="mb-10 prose max-w-none">
            {list.fields.description ? documentToReactComponents(list.fields.description) : null}
          </div>

          {/* Knjige u listi */}
          <div className="space-y-6">
            {list.fields.books?.map((book: any) => (
              <div
                key={book.sys.id}
                className="relative flex items-start gap-3 bg-white rounded-xl p-4 shadow-md border"
              >
                <img
                  onClick={() => router.push(`/books/${book.sys.id}`)}
                  src={book.fields.coverImage?.fields.file.url}
                  alt={book.fields.title}
                  className="w-20 h-28 md:w-24 md:h-32 object-cover rounded-md cursor-pointer hover:opacity-80 transition flex-shrink-0"
                />
                <div className="flex flex-col flex-1">
                  <Link
                    href={`/books/${book.sys.id}`}
                    className="text-lg md:text-xl font-semibold text-gray-900 cursor-pointer hover:text-[#593E2E] hover:underline"
                  >
                    {book.fields.title}
                  </Link>

                  {book.fields.author?.fields.fullName ? (
                    <Link
                      href={`/author/${book.fields.author.sys.id}`}
                      className="text-[15px] text-gray-700 mt-1 mb-1 cursor-pointer hover:underline"
                    >
                      by {book.fields.author.fields.fullName}
                    </Link>
                  ) : (
                    <p className="text-[15px] mt-1 mb-1 text-gray-700">by Unknown Author</p>
                  )}

                  <p className="text-sm text-gray-600 line-clamp-2 max-w-xl">
                    {book.fields.description || "No description available."}
                  </p>
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
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">Browse by Tags</h2>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-4">
            {tags.length > 0 ? (
              tags.map((tag: any) => (
                <li key={tag.sys.id} className="border-b pb-2">
                  <Link
                    href={`/tags/${tag.fields.tagName.toLowerCase()}`}
                    className="text-gray-800 hover:text-blue-500 transition"
                  >
                    {tag.fields.tagName}
                  </Link>
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
