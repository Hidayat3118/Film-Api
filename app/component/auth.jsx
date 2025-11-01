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
import { FiEye, FiEyeOff } from "react-icons/fi";
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
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  updateProfile,
} from "firebase/auth";
// react
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { ProfilMenu } from "./profilMenu";
import { Spinner } from "@/components/ui/spinner";

export default function Auth() {
  const router = useRouter();
  const [sesion, setSesion] = useState("login");
  // handle error
  const [error, setError] = useState({
    email: "",
    password: "",
    name: "",
    general: "",
  });

  // register dan login
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  // cek user login
  const [user, setUser] = useState(null);
  //  kontrol buka/tutup dialog
  const [open, setOpen] = useState(false);
  // loading
  const [loading, setLoading] = useState(false);
  // input password
  const [visible, setVisible] = useState(true);

  // handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError({ email: "", password: "", name: "", general: "" });

    if (!email || !password) {
      setError({
        email: !email ? "Email wajib diisi" : "",
        password: !password ? "Password wajib diisi" : "",
        general: "",
      });
      setLoading(false);
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Berhasil login");
      setOpen(false);
    } catch (error) {
      console.log("Error code:", error.code);
      console.log("Error message:", error.message);

      if (error.code === "auth/invalid-email") {
        setError((prev) => ({ ...prev, email: "Format email tidak valid" }));
      } else if (error.code === "auth/user-not-found") {
        setError((prev) => ({ ...prev, email: "Email tidak terdaftar" }));
      } else if (
        error.code === "auth/wrong-password" ||
        error.code === "auth/invalid-credential"
      ) {
        setError((prev) => ({ ...prev, password: "Password salah" }));
      } else {
        setError((prev) => ({
          ...prev,
          general: "Terjadi kesalahan, coba lagi nanti.",
        }));
      }
    } finally {
      setLoading(false);
    }
  };

  // handle google
  const handleGoogle = async () => {
    try {
      setLoading(true);
      await signInWithPopup(auth, provider);
      toast.success("Login Google sukses!");
      setOpen(false);
      // router.push("/");
    } catch (error) {
      toast.error("Gagal login dengan Google: " + error.message);
      console.error("gagal with google", error.message);
    } finally {
      setLoading(false);
    }
  };

  // handle register form
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError({ email: "", password: "", name: "", general: "" }); // reset error

    // ✅ Validasi field kosong
    if (!name || !email || !password) {
      setError({
        name: !name ? "Nama wajib diisi" : "",
        email: !email ? "Email wajib diisi" : "",
        password: !password ? "Password wajib diisi" : "",
        general: "",
      });
      setLoading(false);
      return;
    }

    // ✅ Validasi format email sebelum ke Firebase
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError((prev) => ({
        ...prev,
        email: "Format email tidak valid",
      }));
      setLoading(false);
      return;
    }

    try {
      // ✅ Register user
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // ✅ Update profil (nama + avatar unik)
      await updateProfile(userCredential.user, {
        displayName: name,
        photoURL: `https://api.dicebear.com/8.x/identicon/svg?seed=${userCredential.user.uid}`,
      });

      toast.success("Registrasi sukses!");
      setOpen(false);
    } catch (error) {
      // console.error("Register error:", error.code, error.message);

      // ✅ Tangani error Firebase yang umum
      if (error.code === "auth/email-already-in-use") {
        setError((prev) => ({ ...prev, email: "Email sudah terdaftar" }));
      } else if (error.code === "auth/weak-password") {
        setError((prev) => ({ ...prev, password: "Password terlalu lemah" }));
      } else if (error.code === "auth/invalid-email") {
        setError((prev) => ({ ...prev, email: "Format email tidak valid" }));
      } else {
        setError((prev) => ({
          ...prev,
          general: "Terjadi kesalahan. Coba lagi nanti.",
        }));
      }
    } finally {
      setLoading(false);
    }
  };

  // cek login user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  // function sesion
  const handleSesion = (data) => {
    setSesion(data);
  };

  const testing = () => {
    toast.success("testing toast aja");
  };

  return (
    <Dialog  open={open} onOpenChange={(v) => setOpen(v)}>
      {/* avatar */}
      {user ? (
        <div>
          <ProfilMenu />
        </div>
      ) : (
        <DialogTrigger asChild>
          {/* profil */}
          <button
            onClick={() => setOpen(true)}
            className="hover:bg-white hover:text-black text-sm md:text-base font-semibold px-6 py-2 rounded-full border border-red-400 cursor-pointer bg-red-500 text-white"
          >
            Login
          </button>
        </DialogTrigger>
      )}

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
                  onChange={(e) => setEmail(e.target.value)}
                />
                {/* error email */}
                {error.email && (
                  <p className="text-red-500 text-sm">{error.email}</p>
                )}
              </div>
              {/* password login */}
              <Label htmlFor="username-1 ">Password</Label>
              <div className="grid gap-3 relative">
                <Input
                  type={visible ? "password" : "text"}
                  className="h-12 rounded-2xl border border-gray-300"
                  id="username-1"
                  name="username"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                {/* salah password */}
                {error.password && (
                  <p className="text-red-500 text-sm">{error.password}</p>
                )}

                <button
                  type="button"
                  onClick={() => setVisible(!visible)}
                  className="text-gray-500 hover:text-gray-700 p-1 absolute right-2 top-3"
                >
                  {visible ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                </button>
              </div>
              {/* error umum */}
              {error.general && (
                <p className="text-center text-red-500 text-sm mt-2">
                  {error.general}
                </p>
              )}
            </div>
            <DialogFooter>
              {/* button login */}
              <Button
                disabled={loading}
                className="w-full h-12 rounded-2xl bg-red-500 hover:bg-red-700 cursor-pointer mt-6"
                type="submit"
              >
                {loading ? (
                  <>
                    <Spinner /> Loading
                  </>
                ) : (
                  "Login"
                )}
              </Button>
            </DialogFooter>
            <p className="text-center text-sm my-4">Atau</p>
            {/* button with google */}
            <Button
              onClick={handleGoogle}
              type="button"
              className="flex items-center cursor-pointer justify-center w-full h-12 md:h-12 bg-neutral-100 hover:bg-neutral-200 border rounded-xl border-gray-300 shadow-sm  transition"
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
            <p className="text-xs md:text-sm text-center py-2 mt-4">
              Belum bergabung dengan MovieApp?{" "}
              <button
                type="button"
                className="font-bold cursor-pointer hover:text-red-500"
                onClick={() => handleSesion("register")}
              >
                Register
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
              <div className="grid gap-3">
                <Label htmlFor="username-2">Name</Label>
                <Input
                  className="h-12 rounded-2xl border border-gray-300"
                  id="username-2"
                  placeholder="Masukan Nama Lengkap"
                  onChange={(e) => setName(e.target.value)}
                />
                {/* error nama */}
                {error.name && (
                  <p className="text-red-500 text-sm">{error.name}</p>
                )}
              </div>
              {/* email register*/}
              <div className="grid gap-3">
                <Label htmlFor="name-1">Email</Label>
                <Input
                  className="h-12 rounded-2xl border border-gray-300"
                  id="name-1"
                  name="name"
                  placeholder="Masukan Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
                {/* eror email */}
                {error.email && (
                  <p className="text-red-500 text-sm">{error.email}</p>
                )}
              </div>
              {/* password register*/}
              <Label htmlFor="username-1 ">Password</Label>
              <div className="grid gap-3 relative">
                <Input
                  type={visible ? "password" : "text"}
                  className="h-12 rounded-2xl border border-gray-300"
                  id="username-1"
                  name="username"
                  placeholder="Masukan Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setVisible(!visible)}
                  className="text-gray-500 hover:text-gray-700 p-1 absolute right-2 top-3"
                >
                  {visible ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                </button>
                {/* error password */}
                {error.password && (
                  <p className="text-red-500 text-sm mt-1">{error.password}</p>
                )}
              </div>
              <p className="text-sm md:text-base text-gray-500">
                Gunakan 8 atau lebih huruf, angka, dan simbol
              </p>
            </div>
            {error.general && (
              <p className="text-red-500 text-sm text-center mt-2">
                {error.general}
              </p>
            )}
            <DialogFooter>
              {/* button daftar */}
              <Button
                disabled={loading}
                className="w-full h-12 rounded-2xl bg-red-500 hover:bg-red-700 cursor-pointer mt-6"
                type="submit"
              >
                {loading ? (
                  <>
                    <Spinner /> Loading
                  </>
                ) : (
                  "Register"
                )}
              </Button>
            </DialogFooter>
            <p className="text-center text-sm my-4">Atau</p>
            {/* button with google */}
            <Button
              onClick={handleGoogle}
              type="button"
              className="flex items-center cursor-pointer justify-center w-full h-12 md:h-12 bg-neutral-100 border rounded-xl border-gray-300 shadow-sm hover:bg-neutral-200 transition"
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
                type="button"
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
