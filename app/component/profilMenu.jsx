"use client";

import React, { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, User } from "lucide-react";
import { BookmarkIcon } from "lucide-react";
import { signOut, getAuth, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/components/firebase"; // pastikan path sesuai
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Image from "next/image";

export function ProfilMenu() {
  const [user, setUser] = useState(null);
  const firebaseAuth = getAuth();
  const route = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, [firebaseAuth]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Berhasil keluar");
      // route.push("/");
    } catch (error) {
      console.error("Gagal keluar:", error);
      toast.error("Gagal keluar");
    }
  };

  if (!user)
    return (
      <Avatar className="h-12 w-12 md:h-14 md:w-14">
        <AvatarFallback>...</AvatarFallback>
      </Avatar>
    );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 focus:outline-none cursor-pointer ">
          <Image
            src={user.photoURL || "/profil-default.jpg"}
            alt="User Avatar"
            width={96}
            height={96}
            quality={100}
            className="rounded-full border h-14 w-14 md:h-16 md:w-16 border-neutral-200 shadow-md "
          />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="rounded-2xl shadow-lg border border-gray-200 mt-2 "
        align="end"
      >
        {/* Bagian profil atas */}
        <DropdownMenuLabel className="flex items-center gap-3 p-3">
            <Image
              src={user.photoURL || "/profil-default.jpg"}
              alt="User Avatar"
              width={96}
              height={96}
              quality={100}
              className="rounded-full border h-12 w-12 md:h-14 md:w-14 border-neutral-200 shadow-md "
            />
          <div>
            {/* nama user */}
            <p className="font-semibold text-gray-800 truncate">
              {user.displayName || "User"}
            </p>
            {/* email */}
            <p className="text-sm text-gray-500 truncate">{user.email}</p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        {/* Menu tengah */}
        <DropdownMenuItem
          onClick={() => route.push("/profil")}
          className="cursor-pointer px-4 py-2.5 text-sm flex items-center gap-2 hover:bg-gray-100"
        >
          <User className="w-4 h-4 text-gray-600" />
          Profil Anda
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => route.push("/saved")}
          className="cursor-pointer px-4 py-2.5 text-sm flex items-center gap-2 hover:bg-gray-100"
        >
          <BookmarkIcon className="w-4 h-4 text-gray-600" />
          Movie Tersimpan
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* Logout */}
        <DropdownMenuItem
          onClick={handleLogout}
          className="cursor-pointer px-4 py-2.5 text-sm flex items-center gap-2 text-red-600 hover:bg-red-50 focus:bg-red-50"
        >
          <LogOut className="w-4 h-4 text-red-500" />
          Keluar
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
