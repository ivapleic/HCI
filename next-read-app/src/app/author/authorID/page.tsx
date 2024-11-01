// app/author/[authorId]/page.js
export default function AuthorDetailsPage({ params }:any) {
    return <h1>Detalji o autoru: {params.authorId}</h1>;
  }
  