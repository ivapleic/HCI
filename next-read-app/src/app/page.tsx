"use client";

import React, { useEffect, useState } from "react";
import contentfulService from "./lib/ContenfulClient";
import { Entry } from "contentful";

const HomePage = () => {
  const [genres, setGenres] = useState<Entry<any>[]>([]);
  const [users, setUsers] = useState<Entry<any>[]>([]);

  useEffect(() => {
    const fetchGenres = async () => {
      const fetchedGenres = await contentfulService.getAllGenres();
      setGenres(fetchedGenres);
      console.log(fetchedGenres);
    };

    const fetchUsers= async () => {
      const fetchedUsers = await contentfulService.getAllUsers();
      setUsers(fetchedUsers);
      console.log(fetchedUsers);
    };


    fetchGenres();
    fetchUsers();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center p-10">
      <h1 className="text-6xl font-extrabold tracking-tight">Home Page</h1>
      <p>List of genres:</p>
      <ul>
        {genres.map((genre) => (
          <li key={genre.sys.id}>
     
          </li>
        ))}
      </ul>
    </main>
  );
};

export default HomePage;
