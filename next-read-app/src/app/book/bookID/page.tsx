// app/book/[bookId]/page.js
export default function BookDetailPage({ params }:any) {
    return <h1>Detalji o knjizi: {params.bookId}</h1>;
  }
  