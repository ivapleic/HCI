"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getLists } from "./_lib/ListApi";
import { getAllTags } from "../tags/_lib/TagsApi";

const ListsPage = () => {
  const [lists, setLists] = useState<any[]>([]);
  const [tags, setTags] = useState<any[]>([]); // Za pohranu svih tagova
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const itemsPerPage = 15;

  const totalPages = Math.ceil(lists.length / itemsPerPage);
  const displayedLists = lists.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  useEffect(() => {
    const fetchListsAndTags = async () => {
      try {
        setLoading(true);

        // Dohvat tagova
        const allTags = await getAllTags();
        setTags(allTags);

        // Dohvat lista
        const listsData = await getLists();
        setLists(listsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchListsAndTags();
  }, []);

  return (
    <div className="w-full my-4 px-4 md:px-10 lg:px-20">
      {loading ? (
        <div className="text-center text-lg">Loading lists...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Glavni dio - paginirane liste */}
          <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-md border">
            <h1 className="text-xl sm:text-2xl md:text-3xl text-[#593E2E] font-bold tracking-tight text-left mb-6">
              Lists
            </h1>
            <h3 className="text-xl text-[#593E2E] font-bold tracking-tight text-left mb-6 inline-block border-b-2 border-[#593E2E] pb-1">
  Most popular lists
</h3>



            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              {displayedLists.map((list, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-sm p-3 border border-gray-200 flex flex-col items-start"
                >
                  <Link href={`/lists/${list.fields.name.toLowerCase()}`}>
                    <div className="w-full">
                      {/* Grid sa 4 knjige u istom redu */}
                      <div className="grid grid-cols-4 gap-1 w-full mb-2">
                        {list.fields.books?.length > 0 ? (
                          list.fields.books.slice(0, 4).map((book: any, idx: number) => (
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

            {/* Navigacija stranica */}
            <div className="flex justify-center space-x-4 mt-6">
              <button
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                className={`px-4 py-2 rounded-md ${
                  page === 1
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-[#593E2E] text-white hover:bg-[#8C6954]"
                }`}
              >
                Previous
              </button>
              <span className="text-gray-700 font-semibold flex items-center justify-center">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() => setPage(page + 1)}
                disabled={page === totalPages}
                className={`px-4 py-2 rounded-md ${
                  page === totalPages
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-[#593E2E] text-white hover:bg-[#8C6954]"
                }`}
              >
                Next
              </button>
            </div>
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

export default ListsPage;
