"use client";
import { useEffect, useState } from "react";
import {
  onAuthStateChanged,
  updateProfile,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "@/components/firebase";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { Edit3, Save, X, KeyRound } from "lucide-react";
import LayoutSesion from "../layout/layoutSesion";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const router = useRouter();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      if (!u) router.push("/");
      setUser(u);
      setDisplayName(u?.displayName || "");
    });
    return () => unsub();
  }, [router]);

  const handleSave = async () => {
    try {
      if (displayName && user) {
        await updateProfile(user, { displayName });
        toast.success("Nama berhasil diperbarui!");
        setEditMode(false);
      }
    } catch (error) {
      console.error(error);
      toast.error("Gagal memperbarui profil");
    }
  };

  const handleSendResetEmail = async () => {
    try {
      if (!user?.email) {
        toast.error("Email pengguna tidak ditemukan.");
        return;
      }
      await sendPasswordResetEmail(auth, user.email);
      toast.success("Link reset password telah dikirim ke email Anda!");
    } catch (error) {
      console.error(error);
      toast.error("Gagal mengirim email reset password");
    }
  };

  if (!user)
    return (
      <div className="min-h-screen flex items-center justify-center text-base md:text-lg lg:text-xl font-semibold text-neutral-600">
        Memuat profil...
      </div>
    );

  return (
    <LayoutSesion>
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md md:max-w-lg p-8 md:p-16 text-center relative">
          {/* Avatar */}
          <div className="flex flex-col items-center">
            <div className="relative group">
              <Image
                src={user.photoURL || "/profil-default.jpg"}
                alt="User Avatar"
                width={96}
                height={96}
                quality={100}
                className="rounded-full border md:h-36 md:w-36 border-neutral-200 shadow-md transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <h1 className="mt-4 text-xl font-semibold text-neutral-900">
              {user.displayName || "Tanpa Nama"}
            </h1>
            <p className="text-sm text-neutral-500">{user.email}</p>
          </div>

          <p className="mt-4 text-neutral-600 text-xs md:text-sm">
            Jaga informasi pribadi Anda tetap aman. Data yang Anda ubah di sini
            hanya akan terlihat oleh Anda sendiri.
          </p>

          {/* Form */}
          <div className="mt-8 space-y-6">
            {editMode ? (
              <div className="space-y-4">
                <Input
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="Nama baru"
                  className="rounded-2xl bg-neutral-50 h-10 md:h-12 border-neutral-300 text-neutral-900 focus:ring-2 focus:ring-red-400"
                />
                <div className="flex gap-3">
                  <Button
                    onClick={handleSave}
                    className="flex-1 bg-red-500 h-10 md:h-12 cursor-pointer hover:bg-red-700 text-white rounded-2xl font-medium flex items-center justify-center gap-2"
                  >
                    <Save size={18} /> Simpan
                  </Button>
                  <Button
                    onClick={() => setEditMode(false)}
                    variant="outline"
                    className="flex-1 h-10 md:h-12 border-neutral-300 cursor-pointer bg-neutral-100 text-neutral-700 hover:bg-neutral-200 rounded-2xl font-medium flex items-center justify-center gap-2"
                  >
                    <X size={18} /> Batal
                  </Button>
                </div>
              </div>
            ) : (
              <Button
                onClick={() => setEditMode(true)}
                className="w-full bg-red-500 h-10 md:h-12 cursor-pointer hover:bg-red-700 text-white rounded-2xl font-semibold flex items-center justify-center gap-2"
              >
                <Edit3 size={18} /> Edit Profil
              </Button>
            )}

            {/* Ganti Password */}
            <div className="space-y-3 text-left">
              <label className="text-sm font-medium text-neutral-700 flex items-center gap-2">
                <KeyRound size={16} /> Ganti Password
              </label>

              <p className="text-xs md:text-sm text-neutral-600 text-center mb-4">
                Untuk alasan keamanan, semua perubahan password dilakukan melalui email.
                Klik tombol di bawah untuk menerima link reset password.
              </p>
              <Button
                onClick={handleSendResetEmail}
                className="w-full bg-neutral-700 cursor-pointer hover:bg-neutral-800 text-white rounded-2xl font-semibold h-10 md:h-12"
              >
                Kirim Link Reset Password
              </Button>
            </div>
          </div>
        </div>
      </div>
    </LayoutSesion>
  );
}
