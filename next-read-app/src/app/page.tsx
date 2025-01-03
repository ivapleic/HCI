"use client"

import React, { useEffect, useRef } from "react";
import Image from "next/image";

const HomePage = () => {
  // Tipizacija useRef kao HTMLElement | null
  const scrollersRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // Proveravamo da li scrollersRef.current nije null i da li querySelectorAll vraća vrednost
    const scrollers = scrollersRef.current?.querySelectorAll(".scroller");

    // Proveravamo da li je scrollers definisano i da li nije prazan niz
    if (scrollers && scrollers.length > 0 && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      addAnimation(scrollers);  // Pozivamo funkciju addAnimation
    }
  }, []);

  function addAnimation(scrollers: NodeListOf<Element>) {
    // Prolazimo kroz sve skrolere
    scrollers.forEach((scroller) => {
      scroller.setAttribute("data-animated", "true");

      const scrollerInner = scroller.querySelector(".scroller__inner") as HTMLElement;
      const scrollerContent = Array.from(scrollerInner.children) as HTMLElement[];

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
    </main>
  );
};

export default HomePage;
