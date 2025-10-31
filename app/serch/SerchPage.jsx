"use client";

import { useEffect, useState } from "react";
import { getSerchMovie } from "../lib/serch";
import CardMovie from "../component/cardMovie";
import Layout from "../layout/layout";
import { useSearchParams } from "next/navigation";
import { FaSearch } from "react-icons/fa";
import SkeletonCardMovie from "../component/skeleton/skeletonCardMovie";

const SerchPage = () => {
  const [serchs, setSerchs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const serchParams = useSearchParams();
  const query = serchParams.get("query");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setNotFound(false);

      try {
        const data = await getSerchMovie(query);

        if (!data || data.length === 0) {
          setNotFound(true);
        } else {
          setSerchs(data);
        }
      } catch (err) {
        console.error("Error fetching serch data:", err);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchData();
    } else {
      setLoading(false);
    }
  }, [query]);

  return (
    <Layout>
      {/* Skeleton tampil saat loading */}
      {loading && (
        <section className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4 lg:gap-5 xl:gap-10 px-3 mt-10">
          {Array.from({ length: 12 }).map((_, index) => (
            <SkeletonCardMovie key={index} />
          ))}
        </section>
      )}

      {/* Jika pencarian tidak ditemukan */}
      {!loading && notFound && (
        <div className="flex justify-center items-center min-h-[200px]">
          <div className="text-gray-500 px-6 py-4 max-w-md text-center space-y-1 mt-12 md:mt-32 lg:mt-52">
            <div className="flex gap-2 justify-center items-center">
              <p className="text-base md:text-lg font-semibold">
                Tidak ditemukan hasil pencarian
              </p>
              <FaSearch className="text-xl md:text-2xl text-gray-500" />
            </div>
            <p className="italic text-base md:text-lg text-red-500 mt-1">
              "{query}"
            </p>
          </div>
        </div>
      )}

      {/* Jika hasil pencarian ditemukan */}
      {!loading && !notFound && (
        <section className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4 lg:gap-5 xl:gap-10 px-3">
          {serchs.map((serch) => (
            <CardMovie
              key={serch.id}
              id={serch.id}
              title={serch.title}
              rating={serch.vote_average}
              date={serch.release_date}
              img={`https://image.tmdb.org/t/p/w500${serch.poster_path}`}
            />
          ))}
        </section>
      )}
    </Layout>
  );
};

export default SerchPage;
