"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getGenreList } from "./lib/api";

const HomePage = () => {
  const scrollersRef = useRef<HTMLElement | null>(null);
  const [genres,setGenres]=useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true); 

  const fetchGenres = async () => {
    try {
      const data = await getGenreList();
      setGenres(data); 
    } catch (error) {
      console.error("Error fetching genres:", error);
    } finally {
      setLoading(false);
    }
  };

  console.log(genres);
 

  useEffect(() => {
    const scrollers = scrollersRef.current?.querySelectorAll(".scroller");

    if (
      scrollers &&
      scrollers.length > 0 &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      addAnimation(scrollers);
    }

    fetchGenres(); 
  }, []);

 

  function addAnimation(scrollers: NodeListOf<Element>) {
    scrollers.forEach((scroller) => {
      scroller.setAttribute("data-animated", "true");

      const scrollerInner = scroller.querySelector(
        ".scroller__inner"
      ) as HTMLElement;
      const scrollerContent = Array.from(
        scrollerInner.children
      ) as HTMLElement[];

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true) as HTMLElement;
        duplicatedItem.setAttribute("aria-hidden", "true");
        scrollerInner.appendChild(duplicatedItem);
      });
    });
  }

  return (
    <main
      ref={scrollersRef}
      className="flex items-center min-h-screen flex-col p-10 bg-[#F2F2F2]"
    >
      {/* Hero layer
      <div className="flex items-center justify-center w-full">
        <div className="flex flex-col md:flex-row items-center justify-around w-full max-w-screen-2xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          <Image
            src="/assets/home-page-image-2.png"
            alt="author"
            width={300}
            height={300}
            className="object-cover w-full md:w-1/2"
          />
          <div className="p-8 md:w-1/3">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-right">
              "A reader has a thousand lives before he dies. The man who never
              reads lives only one."
            </h2>
            <p className="text-gray-600 leading-relaxed text-right">
              - George R.R. Martin, A Dance with Dragons
            </p>
          </div>
        </div>
      </div> */}

      {/* Books Scroller */}
      <div className="top-books-scroller w-full max-w-screen-2xl border-b-[0.5px] border-[#F2CAB3]">
        <p className="text-3xl text-[#593E2E] tracking-tight text-left my-6">
          Top Books this week
        </p>

        <div
          className="scroller mx-4 sm:mx-6 lg:mx-8"
          data-direction="left"
          data-speed="slow"
        >
          <div className="scroller__inner mb-8">
            <Image
              src="/book_image_1.jpg"
              alt="book cover 1"
              width={200}
              height={230}
            />
            <Image
              src="/book_image_2.jpg"
              alt="book cover 2"
              width={200}
              height={230}
            />
            <Image
              src="/book_image_3.jpg"
              alt="book cover 3"
              width={200}
              height={230}
            />
            <Image
              src="/book_image_4.jpg"
              alt="book cover 4"
              width={200}
              height={230}
            />
            <Image
              src="/book_image_5.jpg"
              alt="book cover 5"
              width={200}
              height={230}
            />
            <Image
              src="/book_image_6.jpg"
              alt="book cover 6"
              width={200}
              height={230}
            />
          </div>
        </div>
      </div>
 
      {/* Genre list */}
      <div className="w-full max-w-screen-2xl py-6 my-6 border-b-[0.5px] border-[#F2CAB3]">
        <p className="text-3xl text-[#593E2E] tracking-tight text-left mb-8">
          Browse books by your favourite genre
        </p>

        {loading ? (
          <div>Loading genres...</div> // Prikazuje se dok se žanrovi učitavaju
        ) : (
          <div className="grid grid-cols-2 gap-6">
            {genres.map((genre: any, index: number) => (
              <Link key={index} href={`/genres/${genre.sys.id}`}>
                <div className="bg-white p-6 rounded-lg shadow-md text-center cursor-pointer">
                 {genre.fields.name} {/* Prikazivanje imena žanra */}
                </div>
              </Link>
            ))}
            {/* Link to View All Genres */}
            <Link href="/genres">
              <div className="text-blue-500  max-w-screen-2xl underline text-right cursor-pointer">
                <p className="w-full max-w-screen-2xl">View All Genres</p>
              </div>
            </Link>
          </div>
        )}
      </div>

      

    </main>
  );
};

export default HomePage;
