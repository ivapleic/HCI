import type { Metadata } from "next";
import Link from "next/link";


export const metadata: Metadata = {
  title: "Author",
};

const authors = [12, 3, 56, 7, 89];

function processPost(id: number) {
  return (
    <li key={id}>
      <Link href={`/author/${id}`}>Author {id}</Link>
    </li>
  );
}

export default function AuthorPage(props:any) {
  const params=props.params;
  return (
    <main className="flex min-h-screen flex-col items-center p-10">
      <h1>Autor: </h1>;
      <ul>{authors.map(processPost)}</ul>
    </main>
  );
}
