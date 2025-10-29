import { FaStar, FaFire, FaPlay, FaInfoCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import Link from "next/link";

const CardSlider = ({ id, title, img, rating, popularity }) => {
  const Toggle = () => {
    toast.error("tidak bisa menonton karna hak cipta");
  };

  return (
    <div className=" h-[400px] sm:h-[450px] md:h-[600px]  w-full relative rounded-2xl overflow-hidden">
      {/* Gambar */}
      <img src={img} alt={title} className="object-cover w-full h-full " />

      {/* Overlay dan Konten */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent flex items-center ">
        <div className="grid gap-6 sm:gap-8 md:gap-10 px-5 sm:px-10">
          {/* Judul */}
          <div className="text-white max-w-xl">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
              {title}
            </h2>

            {/* Rating & Popularity */}
            <div className="mt-4 sm:mt-6 md:mt-10 gap-2 grid ">
              <div className="flex items-center gap-2 sm:gap-3 text-base sm:text-lg md:text-xl font-semibold">
                <FaStar className="text-yellow-400" />
                <p>Rating: {rating.toFixed(2)}</p>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 text-base sm:text-lg md:text-xl font-semibold">
                <FaFire className="text-red-500" />
                <p>Popularity: {popularity}</p>
              </div>
            </div>
          </div>

          {/* Tombol */}
          <div className="flex flex-wrap gap-3 sm:gap-5">
            <Link href={`/detailMovie/${id}`}>
              <button className="flex items-center gap-2 bg-red-500 border border-white text-white font-semibold py-2 px-5 sm:py-3 sm:px-6 rounded-full hover:bg-transparent hover:scale-105 duration-300 cursor-pointer text-sm sm:text-base">
                <FaPlay />
                Watch Now
              </button>
            </Link>
            <Link href={`/detailMovie/${id}`}>
              <button className="flex items-center gap-2 border border-white text-white font-semibold py-2 px-5 sm:py-3 sm:px-6 rounded-full hover:bg-red-600 hover:scale-105 duration-300 cursor-pointer text-sm sm:text-base">
                <FaInfoCircle />
                Details
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardSlider;
