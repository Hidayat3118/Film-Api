"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, Briefcase, User } from "lucide-react";
import { BookmarkIcon } from "lucide-react";

export default function ProfilMenu() {
  return (
    <div className="bg-red-400 justify-end flex ">
      <DropdownMenu className="">
        <DropdownMenuTrigger asChild>
          <button className="flex items-center gap-2 focus:outline-none">
            <Avatar className="h-12 w-12 md:h-14 md:w-14">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          className=" rounded-2xl shadow-lg border border-gray-200 mt-2 mr-3"
          align="end"
        >
          {/* Bagian profil atas */}
          <DropdownMenuLabel className="flex items-center gap-3 p-3">
            <Avatar className="h-12 w-12 md:h-14 md:w-14">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-gray-800">Muhammad Hidayat</p>
              <p className="text-sm text-gray-500 truncate">
                muhammadhidayat3118@gmail.com
              </p>
            </div>
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          {/* Menu bagian tengah */}
          <DropdownMenuItem className="cursor-pointer px-4 py-2.5 text-sm flex items-center gap-2 hover:bg-gray-100">
            <User className="w-4 h-4 text-gray-600" />
            Profil Anda
          </DropdownMenuItem>

          <DropdownMenuItem className="cursor-pointer px-4 py-2.5 text-sm flex items-center gap-2 hover:bg-gray-100">
            <BookmarkIcon className="w-4 h-4 text-gray-600" />
            Movie Tersimpan
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          {/* Menu logout */}
          <DropdownMenuItem className="cursor-pointer px-4 py-2.5 text-sm flex items-center gap-2 text-red-600 hover:bg-red-50 focus:bg-red-50">
            <LogOut className="w-4 h-4 text-red-500" />
            Keluar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
