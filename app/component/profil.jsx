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
// toast
import { toast } from "react-toastify";
// firebase
import { auth, provider } from "@/components/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { useRouter } from "next/navigation";

export default function Profil() {
  const router = useRouter();
  const [sesion, setSesion] = useState("login");
  // register
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // login
  const [emailLogin, setEmailLogin] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");
  // handle login
  const handleLogin = async (e) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Berhasil login");
      router.push("/");
    } catch (error) {
      toast.error("Gagal login: " + error.message);
    }
  };
  // handle google
  const handleGoogle = async () => {
    try {
      await signInWithPopup(auth, provider);
      toast.success("Login Google sukses!");
      router.push("/");
    } catch (error) {
      toast.error("Gagal login dengan Google: " + error.message);
      console.error("gagal with google", error.message);
    }
  };
  // handle register form
  const handleRegister = async (e) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      toast.success("Registrasi sukses!");
      router.push("/");
    } catch (error) {
      toast.error("Gagal daftar: " + error.message);
    }
  };

  // function sesion
  const handleSesion = (data) => {
    setSesion(data);
  };

  const testing = () => {
    toast.success("testing toast aja");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {/* avatar */}
        {/* <Avatar className="h-12 w-12">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar> */}
        {/* profil */}
        <button className="hover:bg-white hover:text-black text-sm md:text-base font-semibold px-6 py-2 rounded-full border border-red-400 cursor-pointer bg-red-500 text-white">
          Login
        </button>
      </DialogTrigger>
      {/* login */}
      {sesion === "login" ? (
        <DialogContent className="sm:max-w-[425px] md:px-10">
          <form onSubmit={handleLogin}>
            <DialogHeader>
              <DialogTitle className="text-center text-base text-gray-600 w-56 mx-auto space-y-4">
                {" "}
                <p className="text-red-500 text-2xl font-bold">MovieApp</p>
                <p>Masuk Untuk Melihat Lainnya</p>
              </DialogTitle>
              {/* <DialogDescription>
              
            </DialogDescription> */}
            </DialogHeader>
            <div className="grid gap-4">
              {/* email login */}
              <div className="grid gap-3">
                <Label htmlFor="name-1">Email</Label>
                <Input
                  className="h-12 rounded-2xl border border-gray-300"
                  id="name-1"
                  name="name"
                  placeholder="email"
                  onChange={(e)=> setEmail(e.target.value)}
                />
              </div>
              {/* password login */}
              <div className="grid gap-3">
                <Label htmlFor="username-1">Password</Label>
                <Input
                  className="h-12 rounded-2xl border border-gray-300"
                  id="username-1"
                  name="username"
                  placeholder="Password"
                  onChange={(e)=> setPassword(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                className="w-full h-12 rounded-2xl bg-red-500 hover:bg-red-700 cursor-pointer mt-6"
                type="submit"
              >
                Login
              </Button>
            </DialogFooter>
            <p className="text-center text-sm my-4">Atau</p>
            {/* button with google */}
            <Button
              onClick={handleGoogle}
              type="button"
              className="flex items-center cursor-pointer justify-center w-full h-12 md:h-12 bg-neutral-100 border rounded-xl border-gray-300 shadow-sm hover:bg-gray-50 transition"
            >
              <div className="flex items-center gap-3">
                {/* with google */}
                <FcGoogle className="w-8 h-8" />
                <div className="text-left">
                  <p className="text-sm font-medium text-gray-900 leading-tight">
                    Login With Google
                  </p>
                </div>
              </div>
            </Button>
            <p className="text-xs md:text-sm text-center py-2">
              Belum bergabung dengan MovieApp?{" "}
              <button
                className="font-bold cursor-pointer hover:text-red-500"
                onClick={() => handleSesion("register")}
              >
                Daftar
              </button>
            </p>
            {/* end Login */}
          </form>
        </DialogContent>
      ) : (
        // register
        <DialogContent className="sm:max-w-[425px] md:px-10">
          <form onSubmit={handleRegister}>
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
              {/* <div className="grid gap-3">
                <Label htmlFor="username-1">Name</Label>
                <Input
                  className="h-12 rounded-2xl border border-gray-300"
                  id="username-1"
                  name="username"
                  placeholder="Name"
                />
              </div> */}
              {/* email register*/}
              <div className="grid gap-3 mt-4">
                <Label htmlFor="name-1">Email</Label>
                <Input
                  className="h-12 rounded-2xl border border-gray-300"
                  id="name-1"
                  name="name"
                  placeholder="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              {/* password register*/}
              <div className="grid gap-3">
                <Label htmlFor="username-1">Password</Label>
                <Input
                  className="h-12 rounded-2xl border border-gray-300"
                  id="username-1"
                  name="username"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <p className="text-sm md:text-base text-gray-500">
                Gunakan 8 atau lebih huruf, angka, dan simbol
              </p>
            </div>
            <DialogFooter>
              {/* button daftar */}
              <Button
                className="w-full h-12 rounded-2xl bg-red-500 hover:bg-red-700 cursor-pointer mt-6"
                type="submit"
              >
                Daftar
              </Button>
            </DialogFooter>
            <p className="text-center text-sm my-4">Atau</p>
            {/* button with google */}
            <Button
              onClick={handleGoogle}
              type="button"
              className="flex items-center cursor-pointer justify-center w-full h-12 md:h-12 bg-neutral-100 border rounded-xl border-gray-300 shadow-sm hover:bg-gray-50 transition"
            >
              <div className="flex items-center gap-3">
                {/* with google */}
                <FcGoogle className="w-8 h-8" />
                <div className="text-left">
                  <p className="text-sm font-medium text-gray-900 leading-tight">
                    Register With Google
                  </p>
                </div>
              </div>
            </Button>
            <p className="text-xs md:text-sm text-center py-2 mt-4">
              Belum bergabung dengan MovieApp?{" "}
              <button
                className="font-bold cursor-pointer hover:text-red-500"
                onClick={() => handleSesion("login")}
              >
                Login
              </button>
            </p>
          </form>
        </DialogContent>
      )}
    </Dialog>
  );
}
