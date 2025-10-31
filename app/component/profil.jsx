import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
// avatar
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";

export default function Profil() {
  const [sesion, setSesion] = useState("login");

  // function sesion
  const handleSesion = (data) => {
    setSesion(data);
  };

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          {/* avatar */}
          {/* <Avatar className="h-12 w-12">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar> */}
          {/* profil */}
          <button className="hover:bg-white hover:text-black font-semibold px-6 py-2 rounded-full border border-red-400 cursor-pointer bg-red-500 text-white">
            Login
          </button>
        </DialogTrigger>
        {/* login */}
        {sesion === "login" ? (
          <DialogContent className="sm:max-w-[425px] px-14">
            <DialogHeader>
              <DialogTitle className="text-center text-base text-gray-600 w-56 mx-auto space-y-4">
                {" "}
                <p className="text-red-500 text-2xl font-bold">MovieApp</p>
                <p>Masuk Untuk Melihat Lainnya</p>
              </DialogTitle>
              {/* <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription> */}
            </DialogHeader>
            <div className="grid gap-4">
              <div className="grid gap-3">
                <Label htmlFor="name-1">Email</Label>
                <Input
                  className="h-12 rounded-2xl border border-gray-300"
                  id="name-1"
                  name="name"
                  placeholder="email"
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="username-1">Password</Label>
                <Input
                  className="h-12 rounded-2xl border border-gray-300"
                  id="username-1"
                  name="username"
                  placeholder="Password"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                className="w-full h-12 rounded-2xl bg-red-500 hover:bg-red-700 cursor-pointer"
                type="submit"
              >
                Login
              </Button>
            </DialogFooter>
            <p className="text-center text-sm">Atau</p>
            {/* button with google */}
            <Button className="flex items-center cursor-pointer justify-between w-full h-14 bg-neutral-100 border rounded-xl border-gray-300 shadow-sm hover:bg-gray-50 transition">
              <div className="flex items-center gap-3">
                <img
                  src="https://www.gstatic.com/images/branding/product/2x/avatar_circle_blue_512dp.png"
                  alt="Profile"
                  className="w-8 h-8 rounded-full "
                />
                <div className="text-left">
                  <p className="text-sm font-medium text-gray-900 leading-tight">
                    Lanjutkan sebagai Muhammad
                  </p>
                  <p className="text-xs text-gray-500 leading-tight">
                    muhammadhidayat3118@gmail.com
                  </p>
                </div>
                <FcGoogle className="w-6 h-6" />
              </div>
            </Button>
            <p className="text-sm text-center py-2">
              Belum bergabung dengan MovieApp?{" "}
              <button
                className="font-bold cursor-pointer hover:text-red-500"
                onClick={() => handleSesion("register")}
              >
                Daftar
              </button>
            </p>
            {/* end Login */}
          </DialogContent>
        ) : (
          // register
          <DialogContent className="sm:max-w-[425px] px-14">
            <DialogHeader>
              <DialogTitle className="text-center text-base text-gray-600 w-56 mx-auto space-y-4">
                {" "}
                <p className="text-red-500 text-2xl font-bold">MovieApp</p>
                <p>Daftar Untuk Melihat Lainnya</p>
              </DialogTitle>
              {/* <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription> */}
            </DialogHeader>
            <div className="grid gap-4">
              {/* Nama Lengkap */}
              <div className="grid gap-3">
                <Label htmlFor="username-1">Name</Label>
                <Input
                  className="h-12 rounded-2xl border border-gray-300"
                  id="username-1"
                  name="username"
                  placeholder="Name"
                />
              </div>
              {/* email */}
              <div className="grid gap-3">
                <Label htmlFor="name-1">Email</Label>
                <Input
                  className="h-12 rounded-2xl border border-gray-300"
                  id="name-1"
                  name="name"
                  placeholder="email"
                />
              </div>
              {/* password */}
              <div className="grid gap-3">
                <Label htmlFor="username-1">Password</Label>
                <Input
                  className="h-12 rounded-2xl border border-gray-300"
                  id="username-1"
                  name="username"
                  placeholder="Password"
                />
              </div>
            </div>
            <DialogFooter>
              {/* button daftar */}
              <Button
                className="w-full h-12 rounded-2xl bg-red-500 hover:bg-red-700 cursor-pointer"
                type="submit"
              >
                Daftar
              </Button>
            </DialogFooter>
            <p className="text-center text-sm">Atau</p>
            {/* button with google */}
            <Button className="flex items-center cursor-pointer justify-between w-full h-14 bg-neutral-100 border rounded-xl border-gray-300 shadow-sm hover:bg-gray-50 transition">
              <div className="flex items-center gap-3">
                <img
                  src="https://www.gstatic.com/images/branding/product/2x/avatar_circle_blue_512dp.png"
                  alt="Profile"
                  className="w-8 h-8 rounded-full "
                />
                <div className="text-left">
                  <p className="text-sm font-medium text-gray-900 leading-tight">
                    Lanjutkan sebagai Muhammad
                  </p>
                  <p className="text-xs text-gray-500 leading-tight">
                    muhammadhidayat3118@gmail.com
                  </p>
                </div>
                <FcGoogle className="w-6 h-6" />
              </div>
            </Button>
            <p className="text-sm text-center py-2">
              Belum bergabung dengan MovieApp?{" "}
              <button
                className="font-bold cursor-pointer hover:text-red-500"
                onClick={() => handleSesion("login")}
              >
                Login
              </button>
            </p>
          </DialogContent>
        )}
      </form>
    </Dialog>
  );
}
