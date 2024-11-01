// app/search/[query]/page.js
export default function SearchResultsPage({ params }:any) {
    return <h1>Rezultati pretrage za: {params.query}</h1>;
  }
  