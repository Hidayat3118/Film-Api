"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { getDetailMovie } from "../../lib/detailMovieApi";
import { FaStar, FaPlay, FaCalendarAlt } from "react-icons/fa";
import { getMovieTrailer } from "@/app/lib/trailerVideo";
import LayoutSesion from "./layoutSesion";
import { BookmarkIcon } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import { doc, setDoc, deleteDoc, getDoc } from "firebase/firestore";
import { db, auth } from "@/components/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { toast } from "react-toastify";

export default function MovieDetailPage() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [trailer, setTrailer] = useState([]);
  const [user, setUser] = useState(null);
  const [isSaved, setIsSaved] = useState(false); 

  // Cek status login
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Ambil detail movie
  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        const data = await getDetailMovie(id);
        setMovie(data);
      } catch (error) {
        console.error("Gagal ambil detail movie:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchMovieDetail();
  }, [id]);

  // Ambil trailer
  useEffect(() => {
    const fetchTrailer = async () => {
      try {
        const data = await getMovieTrailer(id);
        setTrailer(data);
      } catch (error) {
        console.error("Gagal ambil trailer:", error);
      }
    };

    if (id) fetchTrailer();
  }, [id]);

  // Cek apakah movie sudah disimpan
  useEffect(() => {
    const checkIfSaved = async () => {
      if (!user || !id) return;
      const movieRef = doc(db, "savedMovies", user.uid, "movies", id.toString());
      const docSnap = await getDoc(movieRef);
      setIsSaved(docSnap.exists());
    };
    checkIfSaved();
  }, [user, id]);

  // Fungsi toggle save/remove
  const handleToggleSave = async () => {
    if (!user) {
      toast.error("Silakan login dulu sebelum menyimpan film!");
      return;
    }

    const movieRef = doc(db, "savedMovies", user.uid, "movies", movie.id.toString());

    try {
      if (isSaved) {
        // 🔴 Remove movie
        await deleteDoc(movieRef);
        setIsSaved(false);
        toast.info("Film dihapus dari daftar favorit!");
      } else {
        // Save movie
        await setDoc(movieRef, {
          id: movie.id,
          title: movie.title,
          poster_path: movie.poster_path,
          vote_average: movie.vote_average,
        });
        setIsSaved(true);
        toast.success("Film berhasil disimpan!");
      }
    } catch (error) {
      console.error("Gagal toggle save:", error);
      toast.error("Terjadi kesalahan saat menyimpan data.");
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg font-semibold text-neutral-600">
        Memuat Movie...
      </div>
    );
  }

  // Movie tidak ditemukan
  if (!movie) {
    return (
      <div className="text-center text-xl mt-20 text-red-500">
        Film tidak ditemukan 
      </div>
    );
  }

  
  return (
    <LayoutSesion>
      <div className="max-w-7xl mt-10 md:mt-1 mx-auto px-4 md:px-6 py-12 text-gray-900 min-h-screen flex items-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 p-6 sm:p-10 md:p-16 w-full">
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

            {/* Genre */}
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

            {/* Tombol aksi */}
            <div className="flex flex-col sm:flex-row gap-4 mt-2 md:mt-4 justify-center md:justify-start">
              {trailer ? (
                <a href={trailer} target="_blank" rel="noopener noreferrer">
                  <button className="flex items-center h-12 justify-center md:text-lg gap-2 bg-red-500 cursor-pointer hover:scale-105 hover:bg-red-700 text-white px-5 py-2 rounded-xl font-medium shadow-md transition w-full sm:w-auto">
                    <FaPlay className="text-white" />
                    Tonton Trailer
                  </button>
                </a>
              ) : (
                <button
                  disabled
                  className="flex items-center justify-center h-12 text-sm md:text-base gap-2 bg-gray-300 text-gray-600 px-5 py-2 rounded-xl font-medium cursor-not-allowed w-full sm:w-auto"
                >
                  <FaPlay />
                  Trailer Tidak Tersedia
                </button>
              )}

              {/* Toggle Save/Remove */}
              <Toggle
                pressed={isSaved}
                onPressedChange={handleToggleSave}
                aria-label="Toggle bookmark"
                size="lg"
                variant="outline"
                className="cursor-pointer transition hover:scale-105 duration-100 data-[state=on]:*:[svg]:fill-red-500 data-[state=on]:*:[svg]:stroke-red-500 px-5 py-2 border border-gray-300 rounded-xl font-semibold text-sm md:text-base"
              >
                <BookmarkIcon />
                {isSaved ? "Saved" : "Save Movie"}
              </Toggle>
            </div>
          </div>
        </div>
      </div>
    </LayoutSesion>
  );
}
