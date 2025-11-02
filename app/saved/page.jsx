"use client";
import { useEffect, useState } from "react";
import { auth } from "@/components/firebase";
import { onAuthStateChanged } from "firebase/auth";
import Image from "next/image";
import { useRouter } from "next/navigation";
import LayoutSesion from "../layout/layoutSesion";

export default function SavedPage() {
  const [user, setUser] = useState(null);
  const route = useRouter();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsub();
  }, []);

  if (!user)
    return (
      <div className="min-h-screen flex items-center justify-center text-base md:text-lg lg:text-xl font-semibold text-neutral-600">
        Memuat...
      </div>
    );

  return (
    <LayoutSesion>
      <div className="max-w-md mx-auto mt-20 md:mt-24  p-6 text-center">
        <Image
          src={user.photoURL || "/default-avatar.png"}
          alt="User Avatar"
          width={80}
          height={80}
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
            className="px-4 py-2 text-sm md:text-base border bg-neutral-200 rounded-xl font-semibold hover:bg-neutral-300 cursor-pointer"
          >
            Ganti Password
          </button>
        </div>
      </div>
    </LayoutSesion>
  );
}
