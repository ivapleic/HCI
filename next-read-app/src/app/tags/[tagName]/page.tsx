"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { getListsByTagName } from "@/app/lists/_lib/ListApi";
import { getAllTags } from "../_lib/TagsApi";

const TagPage = () => {
  const { tagName } = useParams();
  const [filteredLists, setFilteredLists] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [tags, setTags] = useState<any[]>([]); 


  useEffect(() => {
    const fetchListsAndTags = async () => {
      try {
        setLoading(true);
        
        // Dohvat tagova
        const allTags = await getAllTags();
        setTags(allTags);

        // Osiguranje da je tagName string, ako je niz, uzmi prvi element
        const tag = Array.isArray(tagName) ? tagName[0] : tagName;

        if (tag) {
          // Dohvat lista prema tagu
          const taggedLists = await getListsByTagName(tag);
          setFilteredLists(taggedLists);
        } else {
          console.error("No valid tag provided");
          setFilteredLists([]);
        }
      } catch (error) {
        console.error(" Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchListsAndTags();
  }, [tagName]);

  return (
    <div className="w-full my-4 px-4 md:px-10 lg:px-20">
      {loading ? (
        <div className="text-center text-lg">Loading lists...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Glavni dio - filtrirane liste */}
          <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-md border">
            <h1 className="text-xl sm:text-2xl md:text-3xl text-[#593E2E] font-bold tracking-tight text-left mb-6">
              Lists for tag: <span className="text-red-700">{tagName}</span>
            </h1>

            {filteredLists.length > 0 ? (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredLists.map((list, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg shadow-sm p-3 border border-gray-200 flex flex-col items-start"
                  >
                    <Link href={`/lists/${list.fields.name.toLowerCase()}`}>
                      <div className="w-full">
                        {/* Grid sa 4 knjige u istom redu */}
                        <div className="grid grid-cols-4 gap-1 w-full mb-2">
                          {list.fields.books?.length > 0 ? (
                            list.fields.books
                              .slice(0, 4) // Prikazivanje samo 4 knjige
                              .map((book: any, idx: number) => (
                                <div key={idx} className="relative">
                                  <img
                                    src={book.fields.coverImage?.fields.file.url}
                                    alt={book.fields.title}
                                    className="object-cover rounded-md shadow-md w-full h-20"
                                  />
                                </div>
                              ))
                          ) : (
                            <p className="text-sm col-span-4 text-center">
                              No books available
                            </p>
                          )}
                        </div>
                        {/* Ime liste ispod slika */}
                        <h3 className="text-sm sm:text-base text-start font-bold text-gray-900 hover:text-blue-500 transition-colors duration-200">
                          {list.fields.name}
                        </h3>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">No lists available for this tag.</p>
            )}
          </div>

        {/* Desni div: Popis svih tagova */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-md border">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
              Browse by Tags
            </h2>

            <ul className="grid grid-cols-2 gap-x-6 gap-y-4">
              {tags.length > 0 ? (
                tags.map((tag: any) => (
                  <li key={tag.sys.id} className="border-b pb-2">
                    <Link href={`/tags/${tag.fields.tagName.toLowerCase()}`}>
                      <span className="text-gray-800 hover:text-blue-500 transition">
                        {tag.fields.tagName}
                      </span>
                    </Link>
                  </li>
                ))
              ) : (
                <p>No tags available.</p>
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default TagPage;
