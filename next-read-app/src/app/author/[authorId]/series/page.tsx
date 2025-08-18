"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getSeriesByAuthorId, getAuthorById } from "../../_lib/AuthorApi";
import Link from "next/link";

const AuthorSeriesPage = () => {
  const { authorId } = useParams();
  const [author, setAuthor] = useState<any>(null);
  const [series, setSeries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const seriesPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      const authorData = await getAuthorById(authorId as string);
      const seriesData = await getSeriesByAuthorId(authorId as string);

      setAuthor(authorData);
      setSeries(seriesData);
      setLoading(false);
    };

    fetchData();
  }, [authorId]);

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (!author) return <div className="text-center text-red-500">Author not found</div>;

  const { fields } = author;

  // Paginate series
  const indexOfLastSerie = currentPage * seriesPerPage;
  const indexOfFirstSerie = indexOfLastSerie - seriesPerPage;
  const currentSeries = series.slice(indexOfFirstSerie, indexOfLastSerie);
  const totalPages = Math.ceil(series.length / seriesPerPage);

  const handlePrev = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const handleNext = () => {
    setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-6">All Series by {fields.fullName}</h1>
        {series.length === 0 ? (
          <div className="text-sm text-gray-500">No series available for this author.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {currentSeries.map((serie, index) => (
              <Link
                key={serie.sys.id}
                href={`/series/${serie.sys.id}`}
                className="group"
              >
                <div className="w-full bg-white rounded-xl shadow-md border border-gray-200 p-4 flex flex-col items-center transition hover:shadow-lg">
                  <div className="flex gap-2 mb-2 justify-center max-w-[180px]">
                    {serie.fields.books?.length > 0 ? (
                      serie.fields.books.slice(0, 3).map((b: any, idx: number) => (
                        <img
                          key={idx}
                          src={b.fields.coverImage?.fields.file.url}
                          alt={b.fields.title}
                          className="object-cover rounded-md shadow-md w-16 h-24 sm:w-20 sm:h-28"
                        />
                      ))
                    ) : (
                      <p className="text-sm text-gray-400">No books available</p>
                    )}
                  </div>
                  <h3 className="text-center text-base sm:text-[15px] font-bold text-gray-900 mt-1 group-hover:text-[#8c6954] transition-colors duration-200">
                    {serie.fields.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-6 gap-4">
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded border ${
                currentPage === 1
                  ? "text-gray-400 border-gray-300 cursor-not-allowed"
                  : "text-[#593E2E] border-[#593E2E] hover:bg-[#593E2E] hover:text-white transition"
              }`}
            >
              Prev
            </button>
            <span className="flex items-center gap-1 text-sm">
              Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
            </span>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded border ${
                currentPage === totalPages
                  ? "text-gray-400 border-gray-300 cursor-not-allowed"
                  : "text-[#593E2E] border-[#593E2E] hover:bg-[#593E2E] hover:text-white transition"
              }`}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthorSeriesPage;
