"use client";

import Link from "next/link";
import { FaStar } from "react-icons/fa";
import {
  MdOutlinePlayCircleFilled,
  MdOutlineCalendarToday,
} from "react-icons/md";
import { toast } from "react-toastify";

const CardMovie = ({ id, title, img, rating }) => {
  // const handlePlay = (e) => {
  //   e.preventDefault();
  //   toast.error("Tidak bisa menonton karena hak cipta 🎬");
  // };

  return (
    <Link href={`/detailMovie/${id}`} className="group">
      <div className="relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer border border-gray-200">
        {/* Gambar */}
        <div className="relative">
          <img
            src={img}
            alt={title}
            className="object-cover w-full h-64 md:h-80 transition duration-500 group-hover:brightness-90"
          />

          {/* Tombol Play */}
          <div
          
            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300"
          >
            <div className="bg-white rounded-full ">
              <MdOutlinePlayCircleFilled
              size={64}
              className="text-red-500 drop-shadow-md transition-transform scale-105"
            />
            </div>
          </div>

          {/* Rating Badge */}
          <div className="absolute top-3 left-3 flex items-center gap-1 bg-black/80 backdrop-blur-sm text-yellow-500 px-2 py-1 rounded-full text-xs font-semibold shadow-sm">
            <FaStar className="text-yellow-400" />
            <span>{rating.toFixed(1)}</span>
          </div>
        </div>

        {/* Konten */}
        <div className="px-4 py-2 md:py-5 flex flex-col items-center text-center">
          <h2 className="font-semibold text-base md:text-lg text-gray-800 line-clamp-1">
            {title}
          </h2>
        </div>

        {/* Efek lembut di bawah */}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white via-transparent to-transparent pointer-events-none"></div>
      </div>
    </Link>
  );
};

export default CardMovie;
