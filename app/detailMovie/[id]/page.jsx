"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { getDetailMovie } from "../../lib/detailMovieApi";
import { FaStar, FaHeart, FaPlay, FaCalendarAlt } from "react-icons/fa";
import { getMovieTrailer } from "@/app/lib/trailerVideo";
import Link from "next/link";

export default function MovieDetailPage() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [trailer, setTrailer] = useState([]);
  // api detail movie
  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        const data = await getDetailMovie(id);
        setMovie(data);
      } catch (error) {
        console.error("gagal di page detail", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchMovieDetail();
  }, [id]); // ✅ tetap `[id]`

  // api trailer movie
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMovieTrailer(id);
        console.log("Trailer URL:", data);
        setTrailer(data);
      } catch (error) {
        console.error("gagal di page trailer movie", error);
      }
    };

    if (id) fetchData();
  }, [id]); // ✅ juga `[id]`

  if (loading) {
    return (
      <div className="flex justify-center text-lg md:text-xl items-center min-h-screen text-gray-500 font-semibold">
        Loading...
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="text-center text-lg md:text-xl mt-20 text-red-500">
        Film tidak ditemukan 😢
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 text-gray-900 min-h-screen flex items-center">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-gray-100 rounded-3xl p-6 sm:p-10 md:p-16 shadow-xl border border-gray-200 w-full">
        {/* Poster */}
        <div className="flex justify-center">
          <Image
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : "/no-image.jpg"
            }
            alt={movie.title}
            width={400}
            height={600}
            className="rounded-2xl shadow-lg object-cover border border-gray-200 w-full max-w-sm md:max-w-md"
            priority
          />
        </div>

        {/* Info */}
        <div className="flex flex-col justify-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3 text-center md:text-left">
            {movie.title}
          </h1>

          {/* Release date + Rating */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-gray-600 mb-4 text-sm md:text-base">
            <div className="flex items-center gap-2">
              <FaCalendarAlt className="text-red-500" />
              <p>{movie.release_date}</p>
            </div>
            <div className="flex items-center gap-2">
              <FaStar className="text-yellow-500" />
              <p className="font-semibold text-gray-800">
                {movie.vote_average.toFixed(2)}
              </p>
            </div>
          </div>

          {/* Deskripsi */}
          <p className="text-gray-700 leading-relaxed mb-6 text-sm sm:text-base text-justify md:text-left">
            {movie.overview || (
              <span className="italic text-gray-500">
                Tidak ada deskripsi tersedia.
              </span>
            )}
          </p>

          {/* Genres */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2 text-gray-800 text-center md:text-left">
              Genre:
            </h3>
            <div className="flex flex-wrap justify-center md:justify-start gap-2">
              {movie.genres?.map((g) => (
                <span
                  key={g.id}
                  className="bg-white text-gray-700 px-5 py-2 rounded-full text-sm md:text-base border border-red-500 shadow-sm"
                >
                  {g.name}
                </span>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center md:justify-start">
            {trailer ? (
              <a href={trailer} target="_blank" rel="noopener noreferrer">
                <button className="flex items-center justify-center md:text-lg gap-2 bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-xl font-medium shadow-md transition w-full sm:w-auto">
                  <FaPlay className="text-white" />
                  Tonton Trailer
                </button>
              </a>
            ) : (
              <button
                disabled
                className="flex items-center justify-center md:text-lg gap-2 bg-gray-300 text-gray-600 px-5 py-2 rounded-xl font-medium cursor-not-allowed w-full sm:w-auto"
              >
                <FaPlay />
                Trailer Tidak Tersedia
              </button>
            )}

            <button className="flex items-center justify-center md:text-lg gap-2 hover:bg-gray-200  text-gray-800 px-5 py-2 rounded-xl font-medium border border-gray-300 shadow-sm transition w-full sm:w-auto">
              <FaHeart className="text-red-500" />
              Tambah ke Favorit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
