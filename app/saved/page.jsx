"use client";
import { useEffect, useState } from "react";
import { auth, db } from "@/components/firebase";
import { onAuthStateChanged } from "firebase/auth";
import Image from "next/image";
import { useRouter } from "next/navigation";
import LayoutSesion from "../layout/layoutSesion";
import CardMovie from "../component/cardMovie";
import { collection, getDocs } from "firebase/firestore";
import LayoutSection from "../layout/layoutSection";

export default function SavedPage() {
  const route = useRouter();

  // useEffect(() => {
  //   const unsub = onAuthStateChanged(auth, (u) => setUser(u));
  //   return () => unsub();
  // }, []);

  const [user, setUser] = useState(null);
  const [savedMovies, setSavedMovies] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const colRef = collection(db, "savedMovies", currentUser.uid, "movies");
        const snapshot = await getDocs(colRef);
        const movies = snapshot.docs.map((doc) => doc.data());
        setSavedMovies(movies);
      } else {
        setSavedMovies([]);
      }
    });
    return () => unsubscribe();
  }, []);

  if (!user)
    return (
      <div className="min-h-screen flex items-center justify-center text-base md:text-lg lg:text-xl font-semibold text-neutral-600">
        Memuat...
      </div>
    );

  return (
    <LayoutSesion>
      <div className=" mx-auto mt-20 md:mt-24 p-6 text-center ">
        <Image
          src={user.photoURL || "/default-avatar.png"}
          alt="User Avatar"
          width={100}
          height={100}
          className="mx-auto rounded-full border mb-4 md:h-28 md:w-28"
        />
        <h1 className="text-lg md:text-xl font-semibold">{user.displayName}</h1>
        <p className="text-sm md:text-base text-gray-500 mb-4">{user.email}</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => route.push("/profil")}
            className="px-4 py-2 text-sm md:text-base bg-red-500 font-semibold text-white rounded-xl hover:bg-red-700 cursor-pointer"
          >
            Edit Profil
          </button>
          <button
            onClick={() => route.push("/profil")}
            className="px-4  text-sm md:text-base border bg-neutral-200 rounded-xl font-semibold hover:bg-neutral-300 cursor-pointer"
          >
            Ganti Password
          </button>
        </div>
      </div>

      {/* card  saved */}
      <div className="mx-auto">
        <h1 className="text-xl md:text-2xl font-bold text-center py-4 md:py-8 mb-2">Saved Movies</h1>

        {savedMovies.length === 0 ? (
          <p className="text-gray-600 text-center">
            Belum ada film yang disimpan 😢
          </p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4 lg:gap-4 xl:gap-6 px-3 md:px-0">
              {savedMovies.map((movie) => (
                <CardMovie
                  key={movie.id}
                  id={movie.id}
                  title={movie.title}
                  img={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  rating={movie.vote_average}
                />
              ))}
          </div>
        )}
      </div>
    </LayoutSesion>
  );
}
